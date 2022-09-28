<template>
  <base-report-table
    title="PEPFAR SC ARV Dispensation Report"
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
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { RegimenReportService } from "@/apps/ART/services/reports/regimen_report_service";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";

export default defineComponent({
  name: "SCARVDISP",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "name", label: "ARV drug category" },
      { path: "units", label: "# of bottles (units) dispensed", drillable: true },
    ]

    const fetchData =  async (filters: Record<string, any>) => {
      await loader.show()
      const report = new RegimenReportService()
      report.setReportType('pepfar')
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getSCReport()
      rows.value = data.map((d: any, index: number) => ({
        ...d,
        units: d.dispensations.length ? d.units : 0,
        index: index + 1,
      }))
      await loader.hide();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "name", label: "Drug" },
        { path: "quantity", label: "Quantity"},
        { path: "date", label: "Date", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) }
      ]
      const rows = data.row.dispensations.map((d: any[]) => ({
        'arv_number': d[3],
        name: d[0],
        quantity: d[1],
        date: d[2]
      }))

      await modal.show(DrilldownTableVue, {
        title: data.row.name,
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