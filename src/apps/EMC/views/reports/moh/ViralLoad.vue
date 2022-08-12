<template>
  <base-report-table
    title="MoH Viral Load Report"
    report-icon="reports/vl.png"
    :period="period"
    :columns="columns"
    :rows="rows"
    :custom-filters="filters"
    useDateRangeFilter
    @regenerate="() => regenerateReport()"
    @custom-filter="fetchData"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { CustomFilterInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { REGIMENS } from "@/apps/ART/services/reports/regimen_report_service";
import { ViralLoadReportService } from "@/apps/ART/services/reports/viral_load_report";
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";
import { get } from "lodash";

export default defineComponent({
  name: "ViralLoad",
  components: { BaseReportTable },
  setup() {
    const rows = ref<any[]>([]);
    const minVL = ref<number>();
    const maxVL = ref<number>();
    const period = ref("-");
    
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "ageGroup", label: "Age Group" },
      ...REGIMENS.map(regimen => ({ path: regimen, label: regimen })),
      { path: "N/A", label: "Uknown" }
    ]

    const fetchData = async (filters: Record<string, any>) => {
      await loader.show();
      const report = new ViralLoadReportService()
      minVL.value = filters.minVL;
      maxVL.value = filters.maxVL;
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data = await report.getViralLoad({from: minVL.value, to: maxVL.value})
      let index = 0;
      const rs: any[] = []
      for (let ageGroup of AGE_GROUPS) {
        ageGroup = ageGroup.replace("-", " - ")
        const row: Record<string, any> = {
          index: index++,
          ageGroup,
        }
        for(const regimen of [...REGIMENS, "N/A"]){
          row[regimen] = get(data, `${ageGroup}.${regimen}`, 0)
        }
        rs.push(row)
      }
      await loader.hide();
      rows.value = rs;
    }  

    const regenerateReport = async () => {
      const [startDate, endDate ] = period.value.split(' - ')
      if(startDate && endDate && minVL.value && maxVL.value) {
        await fetchData({
          dateRange: {
            startDate,
            endDate 
          }, 
          minVL: minVL.value, 
          maxVL: maxVL.value
        })
      }
    }

    const filters = computed<CustomFilterInterface[]>(() => [
      {
        id: "minVL",
        placeholder: "Min Viral Load",
        type: "number",
        value: minVL.value,
      },
      {
        id: "maxVL",
        placeholder: "Max Viral Load",
        type: "number",
        value: maxVL.value,
      },
    ])

    return {
      period,
      rows,
      columns,
      filters,
      regenerateReport,
      fetchData,
    }
  }
})
</script>