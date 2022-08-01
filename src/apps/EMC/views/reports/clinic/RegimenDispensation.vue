<template>
  <base-report-table
    title="Clinic Regimen Dispensation Report"
    report-icon="reports/regimen-give.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    @custom-filter="fetchData"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { RegimenReportService } from "@/apps/ART/services/reports/regimen_report_service";

export default defineComponent({
  name: "RegimenDispensation",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
      { path: "gender", label: "Gender" },
      { path: "birthdate", label: "DOB", date: true },
      { path: "art_start_date", label: "Start Date", date: true },
      { path: "current_weight", label: "Weight (Kg)" },
      { path: "current_regimen", label: "Regimen" },
      { path: "medications", label: "ARVs"},
      { path: "dispensation_date", label: "Dispensation Date", date: true },
      { path: "vl_result", label: "VL Result" },
      { path: "vl_result_date", label: "Date of VL Result", date: true }
    ]

    const fetchData =  async (filters: Record<string, any>) => {
      await loader.show()
      const report = new RegimenReportService()
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getRegimenReport()
      rows.value = Object.values(data).map((d: any) => {
        let dispensationDate = ""
        const medications = d.medication.map((m: any) => {
          dispensationDate = m.start_date
          return `${m.medication} (${m.quantity})`
        })
        return {
          ...d,
          "dispensation_date": dispensationDate,
          medications: medications.join(", ")
        }
      })
      await loader.hide();
    }

    return {
      rows,
      columns,
      period,
      fetchData
    }
  }
})
</script>