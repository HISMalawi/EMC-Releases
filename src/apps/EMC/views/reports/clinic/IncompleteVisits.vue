<template>
  <base-report-table
    title="Incomplete Visits Clinic Report"
    report-icon="reports/refill.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    @custom-filter="getData"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import dayjs from "dayjs";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "IncompleteVisits",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
      { path: "national_id", label: "NHID" },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
      { path: "dates", label: "Date(s)" }
    ]

    const getData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new PatientReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data = await report.getIncompleteVisits()
      rows.value = Object.values(data).map((d: any) => ({
        ...d,
        dates: d.dates.map((d: string) => {
          return dayjs(d).format("DD/MMM/YYYY")
        }).join(", ")
      }))
      await loader.hide();
    }

    return {
      rows,
      columns,
      period,
      getData,
    }
  }
})
</script>