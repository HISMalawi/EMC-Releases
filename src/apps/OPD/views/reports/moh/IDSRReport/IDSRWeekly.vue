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
      <div id="report-content">
        <idsr-h :key="componentKey" :reportparams="period" ref="header" :clinicName="clinicName"></idsr-h>
        <weekly :key="componentKey" :onDrillDown="onDrillDown" :params="idsr" :reportid="reportID" :epiweek="period" ref="rep"> </weekly>
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
import { IDSRReportService } from "@/apps/OPD/services/idsr_service"
import IdsrH from "@/apps/OPD/views/reports/moh/IDSRReport/IDSRHeader.vue"
import Weekly from "@/apps/OPD/views/reports/moh/IDSRReport/Weekly.vue"
import HisDate from "@/utils/Date"
import Url from "@/utils/Url"
import { modalController } from "@ionic/vue";
import table from "@/components/DataViews/tables/ReportDataTable"

export default defineComponent({
  mixins: [ReportMixinVue],
  components: { IonLoading, IdsrH, Weekly, HisStandardForm, HisFooter, IonPage, IonContent },
  data: () => ({
    formData: {} as any,
    componentKey: 0 as number,
    computedFormData: {} as any,
    idsr: {} as any,
    btns: [] as Array<any>,
    isLoading: false as boolean,
    fields: [] as Array<Field>,
    reportID: -1 as any,
    clinicName: IDSRReportService.getLocationName(),
    reportReady: false as boolean,
    reportUrlParams: '' as string
  }),
  created() {
    this.btns = this.getBtns()
    this.fields = this.getDateDurationFields()
  },
  methods: {
    async onPeriod(form: any, config: any, regenerate=false) {
      this.componentKey += 1
      this.formData = form
      this.computedFormData = config
      this.reportReady = true 
      this.isLoading = true
      this.report = new IDSRReportService()
      this.report.setRegenerate(regenerate)
      let data: any = {}

      if (form.epiweek.value === 'custom_period') {
        this.report.setStartDate(config.start_date)
        this.report.setEndDate(config.end_date)
        this.period = `Custom ${this.report.getDateIntervalPeriod()}`
        data = this.report.datePeriodRequestParams()
      } else {
        this.report.setEpiWeek(form.epiweek.label)
        this.report.setStartDate(HisDate.toStandardHisFormat(form.epiweek.other.start))
        this.report.setEndDate(HisDate.toStandardHisFormat(form.epiweek.other.end))
        data = this.report.qaurterRequestParams()
        this.period = form.epiweek.label
        this.reportUrlParams = Url.parameterizeObjToString({ 
          'start_date': HisDate.toStandardHisFormat(form.epiweek.other.start),
          'end_date': HisDate.toStandardHisFormat(form.epiweek.other.end),
          'epiweek': form.epiweek.label
        })
      }
      const request = await this.report.requestIDSR(data)
      if (request.ok) {
        // Check the backend if background task is complete
        const interval = setInterval(async () => {
          data.regenerate = false
          const state = await this.report.requestIDSR(data)
          if (state.status === 200) {
            const data = await state.json()
            this.reportID = data
            this.idsr = data
            this.isLoading = false
            this.report.cacheCohort(data)
            clearInterval(interval)
          }
        }, 3000)
      }
    },
    async printSpec() {
      const printW = open('', '', 'width:1024px, height:768px')
      const content = document.getElementById('report-content')
      if (content && printW) {
        printW.document.write(`
            <html>
              <head>
                <title>Print IDSR Weelky Report</title>
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
    async regenerate() {
      await this.onPeriod(this.formData, this.computedFormData, true)
    },
    async onDrillDown(resourceId: string) {
    },
    getBtns() {
      return  [
        {
          name: "PDF",
          size: "large",
          slot: "start",
          color: "primary",
          visible: true,
          onClick: () => this.printSpec()
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
