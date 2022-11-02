<template>
  <base-report-table
    :title="title"
    report-icon="reports/appointment-missed.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    :rowActionButtons="rowActionBtns"
    useDateRangeFilter
    @custom-filter=" getData"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "ClinicAppointments",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const title = ref("Clinic Appointment missed report");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
      { path: "appointment_date", label: "Appointment Date", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
      { path: "days_missed", label: "Days Missed" },
      { path: "current_outcome", label: "Current Outcome" },
      { path: "address", label: "Contact Details", exportable: false }
    ]

    const getData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new PatientReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any[] = await report.getMissedAppointments()
      rows.value = data.map(d => ({
        ...d,
        address: `CELL: ${d.cell_number}
                  District: ${d.district}
                  Village: ${d.village}
                  TA: ${d.ta}`
      }))
      await loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [{ 
      label: "Select", 
      default: true, 
      action: (row) => {
        router.push(`/emc/patient/${row['person_id']}`)
      } 
    }]

    return {
      rows,
      title,
      columns,
      rowActionBtns,
      period,
      getData,
    }
  }
})
</script>