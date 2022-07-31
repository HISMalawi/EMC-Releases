<template>
  <base-report-table
    title="Clinic Regimen Switch Report"
    report-icon="reports/regimen-switch.png"
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
      { path: "previous_regimen", label: "Prev Regimen" },
      { path: "current_regimen", label: "Curr Regimen" },
      { path: "medications", label: "ARVs"},
      { path: "dispensation_date", label: "Dispensation Date", date: true }
    ]

    const getData = async (period: {startDate: string; endDate: string}) => {
      await loader.show()
      const report = new RegimenReportService()
      report.setStartDate(period.startDate)
      report.setEndDate(period.endDate)
      const data: any = await report.getRegimenSwitchReport()
      rows.value = Object.values(data).map((d: Record<string, any>) => {
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