<template>
  <base-report-table
    title="MoH Survival Analysis Report"
    report-icon="reports/refill.png"
    :columns="columns"
    :rows="rows"
    :quarter="quarter"
    useQuarterFilter
    :custom-filters="customFilters"
    @custom-filter="fetchData"
    @regenerate="onRegenerate"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { CustomFilterInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { AGE_GROUP, SurvivalAnalysisReportService } from "@/apps/ART/services/reports/survival_analysis_report_service";
import { get, isEmpty } from "lodash";

export default defineComponent({
  name: "SurvivalAnalysis",
  components: { BaseReportTable },
  setup() {
    const quarter = ref("")
    const ageGroup = ref("")
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "quarter", label: "Reg Cohort", initialSort: true, initialSortOrder: 'asc' },
      { path: "interval", label: "Interval (Months)" },
      { path: "subgroup", label: "Sub group" },
      { path: "totalReg", label: "Total Reg (database)" },
      { path: "totalConfirmed", label: "Total Reg (Confirmed)" },
      { path: "alive", label: "Alive" },
      { path: "died", label: "Died" },
      { path: "defaulted", label: "Defaulted" },
      { path: "stopped", label: "Stopped" },
      { path: 'transferred', label: "Transferred out" },
      { path: "unknown", label:"Unknown" }
    ]

    const fetchData =  async (filters: Record<string, any>, regenerate=false) => {
      await loader.show()
      quarter.value = filters.quarter
      ageGroup.value = filters.ageGroup
      const report = new SurvivalAnalysisReportService()
      report.setRegenerate(regenerate)
      report.setQuarter(filters.quarter)
      report.setAgeGroup(filters.ageGroup)
      const data: any = await report.getSurvivalAnalysis()
      const rs: any[] = []
      Object.keys(data)
        .filter((d: string) => !isEmpty(data[d]))
        .forEach((quarter: string) => {
          const outcomes: Record<string, any> = data[quarter]
          const interval = Object.keys(Object.values(outcomes)[0])[0];
          const alive = get(outcomes, `On antiretrovirals.${interval}`, 0);
          const died = get(outcomes, `Patient died.${interval}`, 0);
          const defaulted = get(outcomes, `Defaulted.${interval}`, 0);
          const stopped = get(outcomes, `Treatment stopped.${interval}`, 0);
          const transferred = get(outcomes, `Patient transferred out.${interval}`, 0);
          const unknown = get(outcomes, `N/A.${interval}`, 0);
          rs.push({
            quarter,
            interval,
            alive,
            died,
            defaulted,
            stopped,
            transferred,
            unknown,
            subgroup: ageGroup.value,
            totalReg: alive + died + defaulted + stopped + transferred + unknown,
          })
        })
      rows.value = rs
      await loader.hide();
    }

    const customFilters = computed<CustomFilterInterface[]>(() => [{
      id: "ageGroup",
      type: "select",
      label: "Sub Group:",
      value: ageGroup.value,
      options: Object.values(AGE_GROUP).map(age => age.toString()),
    }])

    const onRegenerate = async () => {
      if(quarter.value && ageGroup.value) {
        fetchData({quarter: quarter.value, ageGroup: ageGroup.value}, true)
      }
    }

    return {
      rows,
      columns,
      quarter,
      customFilters,
      fetchData,
      onRegenerate,
    }
  }
})
</script>