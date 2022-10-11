<template>
  <base-report-table
    title="Pregnant Patients Clinic Report"
    report-icon="reports/pregnant.png"
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
import { RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
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
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
    ]

    const getData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new PatientReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      rows.value = await report.getPregnantWomen()
      await loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [{ 
      label: "Select", 
      default: true, 
      action: (row) => {
        router.push(`/emc/patient/${row['patient_id']}`)
      } 
    }]

    return {
      rows,
      columns,
      rowActionBtns,
      period,
      getData,
    }
  }
})
</script>