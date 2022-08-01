<template>
  <base-report-table
    title="Clinic Regimen Dispensation Report"
    report-icon="reports/regimen-give.png"
    :columns="columns"
    :rows="rows"
    useDateRangeFilter
    @regenerate="(period: any) => getData(period)"
    @onDateRangeChange="(period: any) => getData(period)"
  >
    <template #address="{value}">
      <i v-html="value" />
    </template>
  </base-report-table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { RegimenReportService } from "@/apps/ART/services/reports/regimen_report_service";

export default defineComponent({
  name: "ClinicAppointments",
  components: { BaseReportTable },
  setup() {
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

    const getData = async (period: {startDate: string; endDate: string}) => {
      await loader.show()
      const report = new RegimenReportService()
      report.setStartDate(period.startDate)
      report.setEndDate(period.endDate)
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
      getData,
    }
  }
})
</script>