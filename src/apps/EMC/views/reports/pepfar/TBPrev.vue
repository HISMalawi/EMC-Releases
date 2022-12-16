<template>
  <base-report-table
    title="PEPFAR TB Prev Report"
    report-icon="reports/previous.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    @custom-filter="fetchData"
    @drilldown="onDrilldown"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { indicators, TbPrevReportService } from "@/apps/ART/services/reports/tb_prev_report_service";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "TBPrev",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);

    const toDisplayString = (label: string) => label.replaceAll('_', " ");

    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      ...indicators.map(indicator => [
        { path: `3hp_${indicator}`, label: `3HP (${toDisplayString(indicator)})`, drillable: true },
        { path: `6h_${indicator}`, label: `6H (${toDisplayString(indicator)})`, drillable: true },
      ]).flat(),
    ]

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new TbPrevReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const cohort: any = await report.getTBPrevReport()
      rows.value = report.buildReportData(cohort);
      rows.value.push(report.getAggregatedMaleData(cohort))
      rows.value.push(...(await report.getAggregatedMaternalStatus(cohort)))
      await loader.hide();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "tpt_initiation_date", label: "TPT Initiation Date", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "outcome", label: "Outcome" }
      ]
      const rows = data.row[data.column.path]

      await modal.show(DrilldownTableVue, {
        title: `${data.row.age_group} ${data.column.label} ${data.row.gender}s`,
        columns,
        rows,
      })
    }

    return {
      rows,
      columns,
      period,
      fetchData,
      onDrilldown,
    }
  }
})
</script>