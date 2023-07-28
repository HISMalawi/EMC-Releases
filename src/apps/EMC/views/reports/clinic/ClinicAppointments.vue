<template>
  <base-report-table
    title="Clinic Appointments Report"
    report-icon="reports/appointments.png"
    :columns="columns"
    :rows="rows"
    :date="date"
    useDateFilter
    :rowActionButtons="rowActionBtns"
    @custom-filter="getData"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import HisDate from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";
import { toastWarning } from "@/utils/Alerts";

export default defineComponent({
  name: "ClinicAppointments",
  components: { BaseReportTable },
  setup() {
    const date = ref("");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
    ]

    const getData = async (filters: Record<string, any>) => {
      if(!filters.date) return toastWarning("Invalid report date");
      await loader.show()
      date.value = HisDate.toStandardHisDisplayFormat(filters.date)
      const report = new PatientReportService();
      rows.value = await report.getBookedAppointments(filters.date);
      await loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [
      { label: "Select", default: true, action: (r) => router.push(`/emc/patient/${r['person_id']}`) },
    ]
    
    return {
      date,
      rows,
      columns,
      rowActionBtns,
      getData,
    }
  }
})
</script>