<template>
  <Layout>
    <ion-grid>
      <ion-row>
        <ion-col size="2">
          <SelectInput v-model="quarter" :options="quarters" /> 
        </ion-col>
        <ion-col size="4" v-if="quarter.value?.label === 'Custom'">
          <DateRangePicker
            :range="dateRange" 
            @rangeChange="onDateRangeChange" 
          />  
        </ion-col>
        <ion-col :size="quarter.value?.label === 'Custom' ? 6 : 10">
          <ion-button class="ion-float-end" color="primary" @click="exportToCsv" >Export CSV</ion-button>
          <ion-button class="ion-float-end" color="primary" @click="printSpec" >Print Report</ion-button>
          <ion-button class="ion-float-end" color="secondary" @click="disaggregateReport">Disaggregated</ion-button>
          <ion-button class="ion-float-end" color="warning" @click="fetchData(true)">Fresh Report</ion-button>
          <ion-button class="ion-float-end" color="success" @click="fetchData">Archived Report</ion-button>
        </ion-col>

      </ion-row>
      <ion-row class="his-card">
        <ion-col size="12" :key="componentKey">
          <cohort-v :indicators="indicators" style="font-weight: 600"> </cohort-v>
          <div id="report-content">
            <cohort-h :reportparams="period" :clinicName="clinicName"></cohort-h>
            <cohort-ft @onClickIndicator="onDrilldown" :indicators="indicators"> </cohort-ft>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { loader } from "@/utils/loader";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import dayjs from "dayjs";
import { toastWarning } from "@/utils/Alerts";
import { find, isEmpty } from "lodash";
import DateRangePicker, { DateRange } from "@/apps/EMC/Components/inputs/DateRangePicker.vue";
import { ArtReportService } from "@/apps/ART/services/reports/art_report_service";
import { Option } from "@/components/Forms/FieldInterface";
import { MohCohortReportService } from "@/apps/ART/services/reports/moh_cohort_service";
import CohortH from "@/apps/ART/views/reports/moh/CohortReport/CohortHeader.vue"
import CohortV from "@/apps/ART/views/reports/moh/CohortReport/CohortValidation.vue"
import CohortFt from "@/apps/ART/views/reports/moh/CohortReport/CohortFT.vue"
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonCol, IonRow, IonGrid } from "@ionic/vue";
import Url from "@/utils/Url";
import router from "@/router";
import { toCsv } from "@/utils/Export";
import { Service } from "@/services/service";
import SelectInput from "@/apps/EMC/Components/inputs/SelectInput.vue";
import { DTFormField } from "@/apps/EMC/interfaces/dt_form_field";
import { RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";

export default defineComponent({
  name: "Cohort",
  components: {
    DateRangePicker,
    CohortH,
    CohortV,
    CohortFt,
    Layout,
    IonCol,
    IonRow,
    IonGrid,
    SelectInput
  },
  setup () {
    const componentKey = ref(0);
    const quarter = reactive<DTFormField>({value: '', placeholder: "Select Quarter"});
    const period = ref<string>('');
    const disaggregatedParams = ref<string>();
    const dateRange = reactive({} as DateRange);
    const indicators = ref({} as Record<string, any>);
    const cohort = ref({} as Record<string, any>);
    const reportID = ref<string>('');
    const clinicName = MohCohortReportService.getLocationName();
    const report = new MohCohortReportService();
    const quarters: Option[] = [
      {label: "Custom", value: "Custom"},
      ...ArtReportService.getReportQuarters(6).map(q => ({label: q.name, value: q.name, other: q}))
    ]

    watch(quarter, () => {
      if(quarter.value?.label === 'Custom') {
        Object.assign(dateRange, {
          startDate: "",
          endDate: ""
        });
      } 
    })

    const onDateRangeChange = (range: DateRange) => {
      Object.assign(dateRange, range);
    }

    const disaggregateReport = () => {
      if (disaggregatedParams.value) {
        router.push(`/emc/report/moh/cohort_disaggregated?${disaggregatedParams.value}`);
      } else {
        toastWarning('Please select a period');
      }
    }
    
    const onDrilldown = async (indicatorName: string) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "given_name", label: "First Name"},
        { path: "family_name", label: "Last Name"},
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "outcome", label: "Outcome" }
      ]
      const indicator = find(cohort.value, {name: indicatorName})
      if(!indicator) return
      const rows: any[] = await report.getCohortDrillDown(indicator.id)
      const rowActionButtons: RowActionButtonInterface[] = [{
        label: "select",
        action: (r) => router.push(`/emc/patient/${r['person_id']}`)
      }]

      await modal.show(DrilldownTableVue, {
        title: indicator['indicator_name'] || "Drill down",
        rowActionButtons,
        columns,
        rows,

      })
    }

    const setReportPeriod = (quarter: string, startDate: string, endDate: string) => {
      report.setQuarter(quarter);
      report.setStartDate(startDate);
      report.setEndDate(endDate);
    }

    /**
     * Transform indicators from array to a simple key value pair object
    */ 
    const toIndicators = (params: any) => {
      return params.reduce((data: Record<string, number>, indicator: any) => {
        data[indicator.name] = parseInt(indicator.contents)
        return data
      }, {})
    }

    const fetchData = async (regenerate = false) => {
      if((isEmpty(quarter.value) && isEmpty(dateRange)) || (quarter.value === "Custom" && isEmpty(dateRange))) {
        return toastWarning("Please select report period");
      }

      loader.show();
      let data: any = {};
      let startDate = "";
      let endDate = "";
      indicators.value = {};
      cohort.value = {};
      report.setRegenerate(regenerate);

      if(quarter.value?.label === "Custom") {
        startDate = dateRange.startDate;
        endDate = dateRange.endDate;
        setReportPeriod(quarter.value, startDate, endDate);
        period.value = `Custom ${report.getDateIntervalPeriod()}`;
        data = report.datePeriodRequestParams();
      } else {
        startDate = dayjs(quarter.value?.other.start).format("YYYY-MM-DD");
        endDate = dayjs(quarter.value?.other.end).format("YYYY-MM-DD");
        setReportPeriod(quarter.value?.label, startDate, endDate);
        period.value = quarter.value?.label;
        data = report.qaurterRequestParams();
      }

      disaggregatedParams.value = Url.parameterizeObjToString({
        'start_date': startDate,
        'end_date': endDate,
        'quarter': quarter.value
      })

      const response = await report.requestCohort(data);
      if (response?.ok) {
        // Check the backend if background task is complete
        const interval = setInterval(async () => {
          data.regenerate = false
          const state = await report.requestCohort(data)
          if (state?.status === 200) {
            const cohortData = await state.json()
            reportID.value = cohortData.id
            cohort.value = cohortData.values
            indicators.value = toIndicators(cohortData.values)
            await loader.hide();
            report.cacheCohort(cohortData.values)
            clearInterval(interval)
            componentKey.value++;
          }
        }, 3000)
      }
    }

    const printSpec = async () => {
      const printW = open('', '', 'width:1024px, height:768px')
      const content = document.getElementById('report-content')
      if (content && printW) {
        printW.document.write(`
            <html>
              <head>
                <title>Print Cohort</title>
                <link rel="stylesheet" media="print" href="/assets/css/cohort.css" />
              </head>
              <body>
                ${content.innerHTML}
              </body>
            </html>
          `)
          setTimeout(() => { printW.print(); printW.close() }, 3500)
      }
    }

    const exportToCsv = () => {
      const headers = ['Indicator', 'Value']
      const rows = Object.keys(indicators.value).map(k => [k, indicators.value[k]])
      const reportTitle = `${Service.getLocationName()} cohort report ${period.value}`
      toCsv([headers], [
        ...rows,
        [`Date Created: ${dayjs().format('DD/MMM/YYYY HH:MM:ss')}`],
        ['Quarter: ' + (quarter.value?.match(/custom/i) 
          ? `${dateRange.startDate} - ${dateRange.endDate}` 
          : quarter.value)
        ],
        [`HIS-Core Version: ${Service.getCoreVersion()}`],
        [`API Version: ${Service.getApiVersion()}`],
        [`Site: ${Service.getLocationName()}`],
        [`Site UUID: ${Service.getSiteUUID()}`]
      ], reportTitle)
    }

    return {
      period,
      quarter,
      quarters,
      dateRange,
      clinicName,
      indicators,
      componentKey,
      fetchData,
      onDrilldown,
      onDateRangeChange,
      disaggregateReport,
      printSpec,
      exportToCsv,
    }
  }
})
</script>

<style>
.box {
  border-color: #a3a3a3;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
  font-size: large;
  height: 44px;
}

select {
  background-color: white;
  border: none; 
}
</style>