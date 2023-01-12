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
import { TableColumnInterface } from "@uniquedj95/vtable";
import { RegimenReportService } from "@/apps/ART/services/reports/regimen_report_service";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "RegimenDispensation",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const rows = ref<any[]>([]);
    const formatter = (v: any) => dayjs(v).format(DISPLAY_DATE_FORMAT) 
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "DOB", formatter},
      { path: "art_start_date", label: "ART Start Date", formatter },
      { path: "current_weight", label: "Weight (Kg)" },
      { path: "current_regimen", label: "Curr. Reg" },
      { path: "medications", label: "ARVs"},
      { path: "dispensation_date", label: "Curr. reg Dispensed", formatter },
      { path: "vl_result", label: "VL Result" },
      { path: "vl_result_date", label: "Date of VL Result", formatter }
    ]

    const fetchData =  async (filters: Record<string, any>) => {
      await loader.show()
      const report = new RegimenReportService()
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      report.setReportType("moh")
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
