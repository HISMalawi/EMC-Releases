<template>
  <base-report-table
    title="Regimen Formulation: Patient Level Clinic Report"
    report-icon="reports/medical.png"
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
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";

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
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
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