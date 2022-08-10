<template>
  <base-report-table
    title="MoH Regimen Distribution By Weight Report"
    report-icon="reports/electronics.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    @custom-filter="fetchData"
    @drilldown="onDrilldown"
    @regenerate="onRegenerate"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { RegimenReportService, REGIMEN_WEIGHT_DISTRIBUTION, WEIGHT_BAND } from "@/apps/ART/services/reports/regimen_report_service";
import dayjs from "dayjs";
import { get } from "lodash";

export default defineComponent({
  name: "RegimenDistribution",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "weight_band", label: "Weight Band" },
      { path: "gender", label: "Gender" },
      ...REGIMEN_WEIGHT_DISTRIBUTION.map(r => ({ 
        path: r, label: r,
      })),
      { path: "N/A", label: "Unknown" },
      { path: "total", label: "Total" },
    ]

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new RegimenReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getRegimensByWeight()
      const rs: any[] = []
      for(const weight of WEIGHT_BAND){
        for(const gender of ["females", "males"]) {
          const rowData = data.find((r: any) => r.weight === weight)
          if(rowData){
            const row: Record<string, any> = {
              "weight_band": weight,
              gender: gender === "females" ? "Female" : "Male",
              total: 0
            }
            for(const regimen of [...REGIMEN_WEIGHT_DISTRIBUTION, "N/A"]){
              const d = rowData[gender].find((d: any) => Object.keys(d).every(i => i === regimen))
              if(d){
                row[regimen] = d[regimen]
                row.total += d[regimen]
              } else {
                row[regimen] = 0
              }
            }
            rs.push(row)
          }
        }
      }
      rows.value = rs
      await loader.hide();
    }

    const onRegenerate = async () => {
      const [ start, end ] = period.value.split('-')
      if(start && end ) {
        fetchData({dateRange: {
          startDate: dayjs(start).format("YYYY-MM-DD"), 
          endDate: dayjs(end).format("YYYY-MM-DD")
        }})
      }
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "birthdate", label: "Date of Birth", date: true },
        { path: "gender", label: "Gender"},
        { path: "dispensation_date", label: "Dispensation Date", date: true },
        { path: "art_start_date", label: "Art Start Date", date: true },
        { path: "tpt_start_date", label: "TPT Start Date", date: true }
      ]
      const column = data.column.path.split(".")[0]
      const rows = data.row[column].patients

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
      onRegenerate,
    }
  }
})
</script>