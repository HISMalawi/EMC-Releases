<template>
  <ion-page>
    <ion-loading :is-open="isLoading" message="Please wait..." />
    <v2Datatable 
      title="Clinic Discrepancy Report" 
      report-prefix="Clinic"
      :subtitle="period" 
      :columns="columns" 
      :columnData="reportData" 
      :rowsPerPage="20" 
      :onConfigure="configure" 
      :onRefresh="generate" 
    />
  </ion-page>
</template>

<script lang='ts' setup>
import { IonPage, IonLoading } from "@ionic/vue"
import { onMounted, ref } from 'vue'
import v2Datatable from "@/components/DataViews/tables/v2PocDatatable/TableView.vue"
import { v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { toastDanger, toastWarning } from '@/utils/Alerts';
import { toDate, toNumString } from "@/utils/Strs";
import { StockReportService } from "@/apps/ART/services/reports/stock_report_service";
import { DateSelection } from "@/utils/ReportDateSelectionPrompt";

const reportData = ref([])
const period = ref('')
const isLoading = ref(false)
const report = new StockReportService()
const columns: Array<v2ColumnInterface[]> = [[
  {
    label: "Drug Count Date",
    ref: 'verification_date',
    value: (data) => toDate(data.verification_date)
  },
  {
    label: "Drug Name",
    ref: 'short_name',
  },
  {
    label: "Expected Count",
    ref: 'expected_quantity',
    value: (data) => toNumString(data.expected_quantity)
  },
  {
    label: "Verified Count",
    ref: 'current_quantity',
    value: (data) => toNumString(data.current_quantity)
  },
  {
    label: "Difference",
    ref: 'difference',
    value: (data) => toNumString(data.difference)
  },
  {
    label: "Reason",
    ref: 'variance_reason',
  }
]]

/**
 * Generates report by start date and end date
 */
const generate = async () => {
  if (!(report.startDate && report.endDate)) {
    return toastWarning('Start date and end date required!')
  }
  isLoading.value = true
  reportData.value = []
  try {
    reportData.value = await report.getDiscrepancyReport();
  } catch (e) {
    toastDanger("Unable to generate report!")
  }
  isLoading.value = false
}

/**
 * Loads a dialogue to allow users to configure start and end date
 */
const configure = () => DateSelection({
  onFinish: (sDate: string, eDate: string, periodstr: string) => {
    period.value = `Period (${periodstr})`
    report.startDate = sDate
    report.endDate = eDate
    generate()
  }
})

/**
 * Initialization code when the report is empty!
*/
onMounted(() => !reportData.value.length && configure())

</script>
