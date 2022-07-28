<template>
  <base-report-table
    :title="title"
    report-icon="assets/images/reports/defaulter-list.png"
    :columns="columns"
    :rows="rows"
    :rowActionButtons="rowActionBtns"
    useDateRangeFilter
    @regenerate="(period: any) => getData(period)"
    @onDateRangeChange="(period: any) => getData(period)"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { DefaulterReportService } from "@/apps/ART/services/reports/defaulters_report_service";

export default defineComponent({
  name: "ClinicAppointments",
  components: { BaseReportTable },
  setup() {
    const title = ref("Clinic Defaulters List Report");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender" },
      { path: "birthdate", label: "Date of Birth", date: true},
      { path: "current_age", label: "Age (At reporting)"},
      { path: "defaulter_date", label: "Defaulted Date", date: true}
    ]

    const getData = async (period: {startDate: string; endDate: string}) => {
      await loader.show()
      const report = new DefaulterReportService()
      report.setIsPepfar(false)
      report.setStartDate(period.startDate)
      report.setEndDate(period.endDate)
      rows.value = await report.getDefaulters()
      title.value = `Clinic Defaulters List Report <b>(${rows.value.length} Defaulters)</b>`
      await loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [
      { label: "Select", default: true, action: (r) => router.push(`/emc/patient/${r['person_id']}`) },
    ]

    return {
      rows,
      title,
      columns,
      rowActionBtns,
      getData,
    }
  }
})
</script>