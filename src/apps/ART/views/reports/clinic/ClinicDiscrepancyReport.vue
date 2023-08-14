<template>
  <ion-page>
    <ion-loading :is-open="isLoading" message="Please wait..." />
    <v2Datatable :title="title" :subtitle="period" :columns="columns" :columnData="reportData" :rowsPerPage="20" :onConfigure="configure" :onRefresh="() => generate()" />
  </ion-page>
</template>

<script lang='ts' setup>
import { IonPage, IonLoading, modalController } from "@ionic/vue"
import { computed, onMounted, ref } from 'vue'
import v2Datatable from "@/components/DataViews/tables/v2PocDatatable/TableView.vue"
import { ViralLoadReportService } from "@/apps/ART/services/reports/viral_load_report";
import { v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { toastDanger, toastWarning } from '@/utils/Alerts';
import { toDate, toNumString } from "@/utils/Strs";
import { MultiStepPopupForm } from "@/utils/PopupKeyboard";
import { Field } from "@/components/Forms/FieldInterface";
import { generateDateFields } from "@/utils/HisFormHelpers/MultiFieldDateHelper"
import { FieldType } from "@/components/Forms/BaseFormElements";
import { Option } from '@/components/Forms/FieldInterface'

const reportData = ref([])
const period = ref('')
const type = ref('')
const isLoading = ref(false)
const title = computed(() => `Clinic Discrepancy Report (${type.value})`);
const report = new ViralLoadReportService()
const columns: Array<v2ColumnInterface[]> = [[
  {
    label: "Drug Count Date",
    ref: 'verification_date',
    value: (data) => toDate(data.birthdate)
  },
  {
    label: "Drug Name",
    ref: 'drug_name',
  },
  {
    label: "Expected Count",
    ref: 'expected_count',
    value: (data) => toNumString(data.expected_count)
  },
  {
    label: "Verified Count",
    ref: 'verified_count',
    value: (data) => toNumString(data.verified_count)
  },
  {
    label: "Difference",
    ref: 'difference',
    value: (data) => toNumString(data.expected_count - data.verified_count)
  },
  {
    label: "Reason",
    ref: 'reason',
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
    reportData.value = []
  } catch (e) {
    toastDanger("Unable to generate report!")
  }
  isLoading.value = false
}

const getReportFilters = (): Array<Field> => [
  ...generateDateFields({
    id: 'startDate',
    helpText: 'Start',
    required: true,
    maxDate: () => report.date,
    estimation: { allowUnknown: false },
    computeValue: (date: string) => date 
  }),
  ...generateDateFields({
    id: 'endDate',
    helpText: 'End',
    required: true,
    minDate: (_f: any, c: any) => c.startDate,
    maxDate: () => report.date,
    estimation: { allowUnknown: false },
    computeValue: (date: string) => date
  }),
  {
    id: "reportType",
    helpText: "Report Type",
    type: FieldType.TT_SELECT,
    computedValue: (v: Option) => v.value,
    options: () => [
      { label: "Stock count data", value: "Stock count data" },
      { label: "Verified stock changes", value: "Verified stock changes" },
      { label: "All", value: "All" }
    ]
  }
]

/**
 * Loads a dialogue to allow users to configure start and end date
 */
const configure = () => {
  const fields = getReportFilters();
  const onFinish = (_f: any, c: any) => {
    modalController.dismiss();
    report.startDate = c.startDate;
    report.endDate = c.endDate;
    type.value = c.reportType;
    period.value = `Period (${report.getDateIntervalPeriod()})`;
    generate();
  }
  return MultiStepPopupForm(fields, onFinish);
}

/**
 * Initialization code when the report is empty!
*/
onMounted(() => !reportData.value.length && configure())

</script>
