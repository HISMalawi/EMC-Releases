<template>
  <base-report-table
    :title="title"
    report-icon="reports/vl.png"
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
  name: "ClinicViralLoad",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const type = reactive({} as Option);
    const report = new PatientReportService()
    const title = computed(() => isEmpty(type) ? "Clinic Viral Load Report" : `${type.value} Report`);
    
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "specimen", label: "Specimen" },
      { path: "order_date", label: "Ordered", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "result_modifier", label: "Result", formatter: (_: any, row: any) => `${row.result_modifier || ''} ${row.result}` },
      { path: "result_date", label: "Released", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "current_regimen", label: "Curr. Regimen" },
    ]

    const fetchData = async (filters: Record<string, any>) => {
      await loader.show();
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      Object.assign(type, filters.type)
      rows.value = await report.getViralLoadResults(type.value as string)
      await loader.hide();
    }  

    const regenerateReport = async () => {
      if(!period.value || !type.value) return
      await loader.show();
      rows.value = await report.getViralLoadResults(type.value as string)
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
        id: "type",
        label: "Select result type",
        type: "select",
        value: type,
        options: [
          { label: 'Viraemia 1000+',  value: 'viraemia-1000' },
          { label: 'Suppressed', value: 'suppressed' },
          { label: 'Low level viraemia', value: 'low-level-viraemia' }
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