<template>
  <base-report-table
    :title="title"
    report-icon="reports/defaulter-list.png"
    :period="period"
    :columns="columns"
    :rows="rows"
    :rowActionButtons="rowActionBtns"
    :custom-filters="filters"
    useDateRangeFilter
    @regenerate="regenerateReport"
    @custom-filter="fetchData"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { CustomFilterInterface, RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import HisDate from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";
import { Option } from "@/components/Forms/FieldInterface";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import { isEmpty } from "lodash";

export default defineComponent({
  name: "OtherOutcomes",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const outcome = reactive({} as Option);
    const report = new PatientReportService()
    const title = computed(() => `${outcome.value || "Other Outcomes"} Report`);
    
    const columns = computed<TableColumnInterface[]>(() => [
      { path: "identifier", label: "ARV Number", preSort: sortByARV, initialSort: true },
      { path: "given_name", label: "First Name", exportable: false },
      { path: "family_name", label: "Last Name", exportable: false },
      { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "outcome_date", label: "Outcome Date", formatter: HisDate.toStandardHisDisplayFormat },
      (/transfer/i.test(`${outcome.value}`) ? {path: "transferred_out_to", label: "To Location"} : {} as TableColumnInterface)
    ].filter(c => !isEmpty(c)));

    const fetchData = async (filters: Record<string, any>) => {
      await loader.show();
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      Object.assign(outcome, filters.outcome)
      rows.value = await report.getOtherOutcome(outcome.value as string)
      await loader.hide();
    }  

    const regenerateReport = async () => {
      if(!period.value || !outcome.value) return
      await loader.show();
      rows.value = await report.getOtherOutcome(outcome.value as string)
      await loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [{ 
      label: "Select", 
      default: true, 
      action: (row) => {
        router.push(`/emc/patient/${row['patient_id']}`)
      } 
    }]

    const filters = computed<CustomFilterInterface[]>(() => [
      {
        id: "outcome",
        label: "Select Outcome",
        type: "select",
        value: outcome,
        options: [
          { label: 'Transfer Out',  value: 'Transfer Out' },
          { label: 'Died', value: 'Died' },
          { label: 'Stopped', value: 'Stopped' }
        ],
      },
    ])

    return {
      title,
      period,
      rows,
      columns,
      rowActionBtns,
      filters,
      regenerateReport,
      fetchData,
    }
  }
})
</script>