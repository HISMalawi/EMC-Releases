<template>
  <base-report-table
    title="Clinic Appointments Report"
    report-icon="reports/appointments.png"
    :columns="columns"
    :rows="rows"
    :date="date"
    useDateFilter="true"
    :rowActionButtons="rowActionBtns"
    @custom-filter="getData"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";

export default defineComponent({
  name: "ClinicAppointments",
  components: { BaseReportTable },
  setup() {
    const date = ref("");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number" },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender" },
      { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
    ]

    const getData = async (filters: Record<string, any>) => {
      await loader.show()
      date.value = filters.date
      const report = new PatientReportService();
      rows.value = await report.getBookedAppointments(date.value);
      await loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [
      { label: "Select", default: true, action: (r) => router.push(`/emc/patient/${r['person_id']}`) },
    ]

    onMounted(async () => await getData({date: PatientReportService.getSessionDate()}))

    return {
      date,
      rows,
      columns,
      rowActionBtns,
      getData,
    }
  }
})
</script>