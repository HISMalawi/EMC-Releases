<template>
  <ion-loading
    :is-open="isLoading"
    message="Please wait..."
  >
  </ion-loading>
  <his-standard-form
    v-if="!reportReady"
    @onFinish="onPeriod"
    :skipSummary="true" 
    :fields="fields">
  </his-standard-form>
  <ion-page v-if="reportReady">
    <ion-content>
      <cohort-v :key="componentKey" :indicators="indicators"> </cohort-v>
      <div id="report-content">
        <cohort-h :key="componentKey" :reportparams="period" :clinicName="clinicName"></cohort-h>
        <cohort-ft :key="componentKey" @onClickIndicator="onDrillDown" :indicators="indicators"> </cohort-ft>
      </div>
    </ion-content>
    <his-footer :btns="btns"></his-footer>
  </ion-page>
  <div id='print'> </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HisFooter from "@/components/HisDynamicNavFooter.vue";
import { IonPage, IonContent, IonLoading } from "@ionic/vue"
import { Field } from '@/components/Forms/FieldInterface'
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import ReportMixinVue from "../../ReportMixin.vue";
import { MohCohortReportService } from "@/apps/ART/services/reports/moh_cohort_service"
import CohortH from "@/apps/ART/views/reports/moh/CohortReport/CohortHeader.vue"
import CohortV from "@/apps/ART/views/reports/moh/CohortReport/CohortValidation.vue"
import CohortFt from "@/apps/ART/views/reports/moh/CohortReport/CohortFT.vue"
import HisDate from "@/utils/Date"
import Url from "@/utils/Url"
import { modalController } from "@ionic/vue";
import table from "@/components/DataViews/tables/ReportDataTable"
import dayjs from "dayjs";
import { Service } from "@/services/service";
import { toCsv } from "@/utils/Export"
import { find } from "lodash";

export default defineComponent({
  mixins: [ReportMixinVue],
  components: { IonLoading, CohortH, CohortV, CohortFt, HisStandardForm, HisFooter, IonPage, IonContent },
  data: () => ({
    formData: {} as any,
    componentKey: 0 as number,
    computedFormData: {} as any,
    indicators: {} as any,
    cohort: {} as any,
    btns: [] as Array<any>,
    isLoading: false as boolean,
    fields: [] as Array<Field>,
    reportID: -1 as any,
    clinicName: MohCohortReportService.getLocationName(),
    reportReady: false as boolean,
    reportUrlParams: '' as string
  }),
  created() {
    this.btns = this.getBtns()
    this.fields = this.getDateDurationFields(true, true, 21)
  },
  methods: {
    async onPeriod(form: any, config: any, regenerate=false) {
      this.componentKey += 1
      this.formData = form
      this.computedFormData = config
      this.reportReady = true 
      this.isLoading = true
      this.report = new MohCohortReportService()
      this.report.setRegenerate(regenerate)
      let data: any = {}

      if (form.quarter.value === 'custom_period') {
        this.report.setStartDate(config.start_date)
        this.report.setEndDate(config.end_date)
        this.period = `Custom ${this.report.getDateIntervalPeriod()}`
        data = this.report.datePeriodRequestParams()
      } else {
        this.report.setQuarter(form.quarter.label)
        this.report.setStartDate(HisDate.toStandardHisFormat(form.quarter.other.start))
        this.report.setEndDate(HisDate.toStandardHisFormat(form.quarter.other.end))
        data = this.report.qaurterRequestParams()
        this.period = form.quarter.label
        this.reportUrlParams = Url.parameterizeObjToString({ 
          'start_date': HisDate.toStandardHisFormat(form.quarter.other.start),
          'end_date': HisDate.toStandardHisFormat(form.quarter.other.end),
          'quarter': form.quarter.label
        })
      }
      const request = await this.report.requestCohort(data)
      if (request.ok) {
        // Check the backend if background task is complete
        const interval = setInterval(async () => {
          data.regenerate = false
          const state = await this.report.requestCohort(data)
          if (state.status === 200) {
            const data = await state.json()
            this.reportID = data.id
            this.cohort = data.values
            this.indicators = this.toIndicators(data.values)
            this.isLoading = false
            this.report.cacheCohort(data.values)
            clearInterval(interval)
          }
        }, 3000)
      }
    },
    /**
     * Transform indicators from array to a simple key value pair object
    */ 
    toIndicators(params: any) {
      return params.reduce((data: Record<string, number>, indicator: any) => {
        data[indicator.name] = parseInt(indicator.contents)
        return data
      }, {})
    },
    async printSpec() {
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
    },
    regenerate() {
      this.onPeriod(this.formData, this.computedFormData, true)
    },
    async onDrillDown(indicatorName: string) {
      const indicator = find(this.cohort, {name: indicatorName})
      if (!indicator) return
      const resourceId = indicator.id
      const columns = [
        [
          table.thTxt('ARV number'),
          table.thTxt('Name'),
          table.thTxt('Gender'),
          table.thTxt('Birth Date'),
          table.thTxt('Outcome'),
          table.thTxt('Action')
        ]
      ]
      const asyncRows = async () => {
        const persons = await this.report.getCohortDrillDown(resourceId)
        return persons.map((person: any) => ([
          table.td(person['arv_number']),
          table.td(`${person['given_name']} ${person['family_name']}`),
          table.td(person['gender']),
          table.td(HisDate.getAgeInYears(person['birthdate'])),
          table.td(person['outcome'] || 'N/A'),
          table.tdBtn('Select', async () => {
            await modalController.dismiss({})
            this.$router.push({ path:`/patient/dashboard/${person.person_id}`})
          })
        ]))
      }
      await this.drilldownAsyncRows(`Drill table ${resourceId}`, columns, asyncRows)
    },
    exportToCsv() {
      const headers = ['Indicators', 'Value']
      const rows = Object.keys(this.indicators).map(k => [k, this.indicators[k]])
      const reportTitle = `${Service.getLocationName()} cohort report ${this.period}`
      toCsv([headers], [
        ...rows,
        [],
        [`Date Created: ${dayjs().format('DD/MMM/YYYY HH:MM:ss')}`],
        [`HIS-Core Version: ${Service.getCoreVersion()}`],
        [`API Version: ${Service.getApiVersion()}`],
        [`Site: ${Service.getLocationName()}`],
        [`Site UUID: ${Service.getSiteUUID()}`]
      ], reportTitle)
    },
    getBtns() {
      return  [
        {
          name: "CSV",
          size: "large",
          slot: "start",
          color: "primary",
          visible: true,
          onClick: () => this.exportToCsv()
        },
        {
          name: "PDF",
          size: "large",
          slot: "start",
          color: "primary",
          visible: true,
          onClick: () => this.printSpec()
        },
        {
          name: "Regenerate",
          size: "large",
          slot: "end",
          color: "danger",
          visible: true,
          onClick: async () => this.regenerate()
        },
        {
          name: "Disaggregeted",
          size: "large",
          slot: "end",
          color: "primary",
          visible: true,
          onClick: () => this.$router.push(`/art/moh_disaggregated_report?${this.reportUrlParams}`)
        },
        {
          name: "Finish",
          size: "large",
          slot: "end",
          color: "success",
          visible: true,
          onClick: () => this.$router.push({ path:'/' })
        }
      ]   
    }
  }
})
</script>
