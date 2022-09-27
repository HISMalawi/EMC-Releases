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
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { RegimenReportService } from "@/apps/ART/services/reports/regimen_report_service";
import { toGenderString } from "@/utils/Strs";
import dayjs from "dayjs";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";

export default defineComponent({
  name: "RegimenSwitch",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
      { path: "gender", label: "Gender", formatter: (v) => toGenderString(v) },
      { path: "birthdate", label: "DOB", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
      { path: "art_start_date", label: "Start Date", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
      { path: "current_weight", label: "Weight (Kg)" },
      { path: "previous_regimen", label: "Prev Regimen" },
      { path: "current_regimen", label: "Curr Regimen" },
      { path: "medications", label: "ARVs"},
      { path: "dispensation_date", label: "Dispensation Date", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) }
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