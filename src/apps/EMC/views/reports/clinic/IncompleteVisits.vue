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
import { TableColumnInterface } from "@uniquedj95/vtable";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import dayjs from "dayjs";
import HisDate from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";

export default defineComponent({
  name: "IncompleteVisits",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true },
      { path: "arv_number", label: "ARV Number"},
      { path: "national_id", label: "NHID" },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "dates", label: "Date(s)" }
    ]

    const getData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new PatientReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data = await report.getIncompleteVisits()
      rows.value = Object.entries(data).map(([index, value]: any) => ({
        index: `${index}1`,
        ...value,
        dates: value.dates.map((d: string) => {
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