<template>
  <base-report-table
    title="Clients Due For Viral Load Clinic Report"
    report-icon="reports/viral_load.png"
    :columns="columns"
    :rows="rows"
    :rowActionButtons="rowActionBtns"
    useDateRangeFilter
    @regenerate="(period: any) => getData(period)"
    @onDateRangeChange="(period: any) => getData(period)"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";

export default defineComponent({
  name: "ClientsDueForVL",
  components: { BaseReportTable },
  setup() {
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender" },
      { path: "birthdate", label: "Date of Birth", date: true },
      { path: "appointment_date", label: "App Date", date: true },
      { path: "months_on_art", label: "Months on ART" },
      { path: "mile_stone", label: "Milestone", date: true },
    ]

    const getData = async (period: {startDate: string; endDate: string}) => {
      await loader.show()
      const report = new PatientReportService()
      report.setStartDate(period.startDate)
      report.setEndDate(period.endDate)
      rows.value = await report.getClientsDueForVl()
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
      getData,
    }
  }
})
</script>