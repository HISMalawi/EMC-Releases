<template>
  <Layout>
    <ion-grid>
      <ion-row>
        <ion-col size="2">
          <ion-item lines="none" class="box">
            <ion-label>
              Select Quarter:
            </ion-label>
            <select v-model="quarter" ref="selectInput">
              <option v-for="(option, index) of quarters" :key="index" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </ion-item>  
        </ion-col>
        <ion-col size="4" v-if="quarter === 'Custom'">
          <DateRangePicker
            :range="dateRange" 
            @rangeChange="onDateRangeChange" 
          />  
        </ion-col>
        <ion-col size="6" :offset="quarter === 'Custom' ? 0 : 4">
          <ion-button class="ion-float-end" color="primary">Export CSV</ion-button>
          <ion-button class="ion-float-end" color="primary">Export PDF</ion-button>
          <ion-button class="ion-float-end" color="secondary">Disaggregated</ion-button>
          <ion-button class="ion-float-end" color="warning" @click="fetchData(true)">Fresh Report</ion-button>
          <ion-button class="ion-float-end" color="success" @click="fetchData">Archived Report</ion-button>
        </ion-col>

      </ion-row>
      <ion-row class="his-card">
        <ion-col size="12" :key="componentKey">
          <cohort-v :indicators="indicators" style="font-weight: 600"> </cohort-v>
          <div id="report-content">
            <cohort-h :reportparams="period" :clinicName="clinicName"></cohort-h>
            <cohort-ft @onClickIndicator="onDrillDown" :indicators="indicators"> </cohort-ft>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { loader } from "@/utils/loader";
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import dayjs from "dayjs";
import { toastWarning } from "@/utils/Alerts";
import { isEmpty } from "lodash";
import DateRangePicker, { DateRange } from "@/apps/EMC/Components/inputs/DateRangePicker.vue";
import { ArtReportService } from "@/apps/ART/services/reports/art_report_service";
import { Option } from "@/components/Forms/FieldInterface";
import { MohCohortReportService } from "@/apps/ART/services/reports/moh_cohort_service";
import CohortH from "@/apps/ART/views/reports/moh/CohortReport/CohortHeader.vue"
import CohortV from "@/apps/ART/views/reports/moh/CohortReport/CohortValidation.vue"
import CohortFt from "@/apps/ART/views/reports/moh/CohortReport/CohortFT.vue"
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonCol, IonRow, IonItem, IonLabel, IonGrid } from "@ionic/vue";
import Url from "@/utils/Url";

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
    IonItem,
    IonLabel,
    IonGrid,
  },
  setup () {
    const componentKey = ref(0);
    const quarter = ref<string>();
    const period = ref<string>('');
    const disaggregatedParams = ref<string>();
    const dateRange = reactive({} as DateRange);
    const indicators = ref({} as any);
    const cohort = ref({} as any);
    const reportID = ref<string>('');
    const clinicName = MohCohortReportService.getLocationName();
    const report = new MohCohortReportService();
    const quarters: Option[] = [
      {label: "Custom", value: "Custom"},
      ...ArtReportService.getReportQuarters(6).map(q => ({label: q.name, value: q.name, other: q}))
    ]

    const onDateRangeChange = (range: DateRange) => {
      Object.assign(dateRange, range);
    }

    const onQuarterChange = () => {
      if (quarter.value !== 'Custom') {
        dateRange.startDate = "";
        dateRange.endDate = "";
      }
    }

    const onDrillDown = (indicator: string) => {
      console.log(indicator);
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
      if((!quarter.value && isEmpty(dateRange)) || (quarter.value === "Custom" && isEmpty(dateRange))) {
        return toastWarning("Please select report period");
      }

      loader.show();
      let data: any = {};
      let startDate = "";
      let endDate = "";
      indicators.value = {};
      cohort.value = {};
      report.setRegenerate(regenerate);

      if(quarter.value === "Custom") {
        startDate = dateRange.startDate;
        endDate = dateRange.endDate;
        setReportPeriod(quarter.value, startDate, endDate);
        period.value = `Custom ${report.getDateIntervalPeriod()}`;
        data = report.datePeriodRequestParams();
      } else {
        const qtr = quarters.find(q => q.value === quarter.value);
        startDate = dayjs(qtr?.other?.start).format("YYYY-MM-DD");
        endDate = dayjs(qtr?.other?.end).format("YYYY-MM-DD");
        setReportPeriod(quarter.value!, startDate, endDate);
        period.value = quarter.value!;
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

    return {
      period,
      quarter,
      quarters,
      dateRange,
      clinicName,
      indicators,
      componentKey,
      fetchData,
      onDrillDown,
      onDateRangeChange,
      onQuarterChange,
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