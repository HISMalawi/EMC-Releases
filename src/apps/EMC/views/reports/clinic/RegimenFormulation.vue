<template>
  <base-report-table
    title="Clients Due For Viral Load Clinic Report"
    report-icon="reports/viral_load.png"
    :period="period"
    :columns="columns"
    :rows="rows"
    :rowActionButtons="rowActionBtns"
    :custom-filters="filters"
    useDateRangeFilter
    @regenerate="() => regenerateReport()"
    @custom-filter="fetchData"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { CustomFilterInterface, RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { FORMULATIONS, RegimenReportService, REGIMENS } from "@/apps/ART/services/reports/regimen_report_service";

export default defineComponent({
  name: "RegimenFormulation",
  components: { BaseReportTable },
  setup() {
    const rows = ref<any[]>([]);
    const regimen = ref<string>("");
    const formulation = ref<string>("");
    const period = ref("-");
    const report = new RegimenReportService()
    
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

    const fetchData = async (filters: Record<string, any>) => {
      await loader.show();
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      regimen.value = filters.regimen
      formulation.value = filters.formulation
      rows.value = await report.getRegimenFormulationReport(regimen.value, formulation.value)
      await loader.hide();
    }  

    const regenerateReport = async () => {
      if(!period.value || !regimen.value || !formulation.value) return
      await loader.show();
      rows.value = await report.getRegimenFormulationReport(regimen.value, formulation.value)
      await loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [{ 
      label: "Select", 
      default: true, 
      action: (row) => {
        router.push(`/emc/patient/${row['patient_id']}`)
      } 
    }]

    const filters = computed<CustomFilterInterface[]>(() => [
      {
        id: "regimen",
        label: "Regimen",
        type: "select",
        value: regimen.value,
        options: REGIMENS,
      },
      {
        id: "formulation",
        label: "Formulation",
        type: "select",
        value: formulation.value,
        options: FORMULATIONS,
      },
    ])

    return {
      period,
      rows,
      columns,
      rowActionBtns,
      filters,
      regenerateReport,
      fetchData,
    }
  }
})
</script>