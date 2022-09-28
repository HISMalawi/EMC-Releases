<template>
  <base-report-table
    :title="title"
    report-icon="clean.jpg"
    :period="period"
    :columns="columns"
    :rows="rows"
    :rowActionButtons="rowActionBtns"
    :custom-filters="filters"
    useDateRangeFilter
    @custom-filter="fetchData"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { CustomFilterInterface, RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { CtIndicator, DataCleaningReportService } from "@/apps/ART/services/reports/data_cleaning_report_service";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";

export default defineComponent({
  name: "DataCleaning",
  components: { BaseReportTable },
  setup() {
    const rows = ref<any[]>([]);
    const tool = ref<CtIndicator>();
    const title = computed(() => `Data Cleaning Tools${
      tool.value ? ': '+ tool.value : ""
    }`);
    const period = ref("-");
    
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
      { path: "given_name", "label": "First Name" },
      { path: "family_name", label: "Last Name" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
    ]

    const fetchData = async (filters: Record<string, any>) => {
      await loader.show();
      const report = new DataCleaningReportService()
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      tool.value = filters.tool
      period.value = report.getDateIntervalPeriod()
      rows.value = await report.getCleaningToolReport(tool.value!)
      await loader.hide();
    }  

    const rowActionBtns: RowActionButtonInterface[] = [{ 
      label: "Show", 
      default: true, 
      action: (row) => {
        router.push(`/emc/patient/${row['patient_id']}`)
      } 
    }]

    const filters = computed<CustomFilterInterface[]>(() => [
      {
        id: "tool",
        label: "Select Cleaning Tool",
        type: "select",
        value: tool.value,
        gridSize: 8,
        options: Object.values(CtIndicator),
      }
    ])

    return {
      period,
      title,
      rows,
      columns,
      rowActionBtns,
      filters,
      fetchData,
    }
  }
})
</script>