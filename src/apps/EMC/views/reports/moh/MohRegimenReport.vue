<template>
    <base-report-table
      title="Regimen Report"
      report-icon="reports/stats.png"
      :columns="columns"
      :rows="rows"
      :period="period"
      useDateRangeFilter
      showIndices
      @custom-filter="fetchData"
      @regenerate="onRegenerate"
    />
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { loader } from "@/utils/loader";
  import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
  import { TableColumnInterface } from "@uniquedj95/vtable";
  import dayjs from "dayjs";
  import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
  import { toGenderString } from "@/utils/Strs";
  import { MohRegimenReportService } from "@/apps/ART/services/reports/moh_regimen_service";
  
const formatter = (v: any) => dayjs(v).format(DISPLAY_DATE_FORMAT) 

  export default defineComponent({
    name: "TptInitiation",
    components: { BaseReportTable },
    setup() {
      const period = ref("-");
      const rows = ref<any[]>([]);
      const columns: TableColumnInterface[] = [
        { path: "identifier", label: "ARV#" },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "dob", label: "DOB", formatter},
        { path: "drugName", label: "Drug Name"},
        { path: "dispensationDate", label: "Date", formatter},
        { path: "packSize", label: "Pack size"},
        { path: "packSizes", label: "Total pack"},
        { path: "quantity", label: "Total pills"},
        { path: "vlResult", label: "Latest VL result"},
        { path: "vlResultDate", label: "Latest VL date", formatter},
      ]
  
      const fetchData =  async ({ dateRange }: Record<string, any>) => {
        await loader.show()
        const report = new MohRegimenReportService()
        report.setStartDate(dateRange.startDate)
        report.setEndDate(dateRange.endDate)
        period.value = report.getDateIntervalPeriod()
        rows.value = await report.generateReport()
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