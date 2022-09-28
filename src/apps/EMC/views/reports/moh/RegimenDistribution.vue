<template>
  <base-report-table
    title="MoH Regimen Distribution By Weight Report"
    report-icon="reports/electronics.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    @custom-filter="fetchData"
    @regenerate="onRegenerate"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { RegimenReportService, REGIMEN_WEIGHT_DISTRIBUTION, WEIGHT_BAND } from "@/apps/ART/services/reports/regimen_report_service";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";

export default defineComponent({
  name: "RegimenDistribution",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "weight_band", label: "Weight Band" },
      { path: "gender", label: "Gender", formatter: toGenderString },
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
              const d = rowData[gender].find((d: any) => Object.keys(d)[0] === regimen)
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

    return {
      rows,
      columns,
      period,
      fetchData,
      onRegenerate,
    }
  }
})
</script>