<template>
  <base-report-table
    title="Clinic Regimen Switch Report"
    report-icon="reports/regimen-switch.png"
    :period="period"
    :columns="columns"
    :rows="rows"
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
import { toGenderString } from "@/utils/Strs";
import HisDate from "@/utils/Date";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "RegimenSwitch",
  components: { BaseReportTable },
  setup() {
    const { toStandardHisDisplayFormat } = HisDate
    const period = ref("");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "DOB", formatter: toStandardHisDisplayFormat },
      { path: "art_start_date", label: "Start Date", formatter: toStandardHisDisplayFormat },
      { path: "current_weight", label: "Weight (Kg)" },
      { path: "previous_regimen", label: "Prev Regimen" },
      { path: "current_regimen", label: "Curr Regimen" },
      { path: "medications", label: "ARVs"},
      { path: "dispensation_date", label: "Dispensation Date", formatter: toStandardHisDisplayFormat }
    ]

    const fetchData =  async (filters: Record<string, any>) => {
      await loader.show()
      const report = new RegimenReportService()
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getRegimenSwitchReport()
      rows.value = Object.values(data).map((d: any) => {
        let dispensationDate = ""
        const medications = d.medication.map((m: any) => {
          dispensationDate = m.start_date
          return `${m.medication} (${m.quantity})`
        })
        return {
          ...d,
          gender: toGenderString(d.gender),
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
      fetchData,
    }
  }
})
</script>