<template>
  <base-report-table
    title="Clinic Appointments Report"
    report-icon="assets/images/reports/appointments.png"
    :columns="columns"
    :rows="rows"
    :rowActionButtons="rowActionBtns"
    @regenerate="(date: any) => getData(date)"
    @on-date-change="(date: any) => getData(date)"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import dayjs from "dayjs";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";

export default defineComponent({
  name: "ClinicAppointments",
  components: { BaseReportTable },
  setup() {
    const report = new PatientReportService();
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number" },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender" },
      { path: "birthdate", label: "Date of Birth", date: true },
    ]

    const getData = async (date: string) => {
      await loader.show()
      rows.value = await report.getBookedAppointments(date);
      await loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [
      { label: "Select", default: true, action: (r) => router.push(`/emc/patient/${r['person_id']}`) },
    ]


    onMounted(async () => await getData(PatientReportService.getSessionDate()))

    return {
      rows,
      columns,
      rowActionBtns,
      getData,
    }
  }
})
</script>