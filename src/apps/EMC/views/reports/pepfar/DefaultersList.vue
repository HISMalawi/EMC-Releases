<template>
  <base-report-table
    :title="title"
    report-icon="reports/defaulter-list.png"
    report-type="PEPFAR"
    :columns="columns"
    :rows="rows"
    :period="period"
    :rowActionButtons="rowActionBtns"
    useDateRangeFilter
    @custom-filter="getData"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { DefaulterReportService } from "@/apps/ART/services/reports/defaulters_report_service";
import HisDate from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "DefaultersList",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const title = ref("PEPFAR Defaulters List Report");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "current_age", label: "Age (At reporting)"},
      { path: "defaulter_date", label: "Defaulted Date", formatter: HisDate.toStandardHisDisplayFormat }
    ]

    const getData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new DefaulterReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      rows.value = await report.getDefaulters()
      title.value = `PEPFAR Defaulters List Report <b>(${rows.value.length} Defaulters)</b>`
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
      period,
      getData,
    }
  }
})
</script>