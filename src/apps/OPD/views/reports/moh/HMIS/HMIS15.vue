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
        <hmis-header :key="componentKey" :reportName="reportName" :rangeLabel="rangeLabel" :range="range" ref="header" :periodLabel="periodLabel" :periodDates="periodDates" :clinicName="clinicName" :totalOPDVisits="TotalOPDVisits" ></hmis-header>
        <hmis-template :key="componentKey" :onDrillDown="onDrillDown" :params="idsr" :periodDates="periodDates" ref="rep"></hmis-template>
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
import { HMISReportService } from "@/apps/OPD/services/hmis_report_service"
import HmisHeader from "@/apps/OPD/views/reports/moh/HMIS/HMISHeader.vue"
import HmisTemplate from "@/apps/OPD/views/reports/moh/HMIS/HMISTemplate.vue"
import HisDate from "@/utils/Date"
import Url from "@/utils/Url"
import { modalController } from "@ionic/vue";
import table from "@/components/DataViews/tables/ReportDataTable"

export default defineComponent({
  mixins: [ReportMixinVue],
  components: { IonLoading, HmisHeader, HmisTemplate, HisStandardForm, HisFooter, IonPage, IonContent },
  data: () => ({
    formData: {} as any,
    componentKey: 0 as number,
    computedFormData: {} as any,
    idsr: {} as any,
    btns: [] as Array<any>,
    isLoading: false as boolean,
    fields: [] as Array<Field>,
    reportID: -1 as any,
    periodLabel: 'Period',
    periodDates: '' as string,
    reportName: 'New Cases (OPD plus inpatient)',
    TotalOPDVisits: 0 as number,
    clinicName: HMISReportService.getLocationName(),
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
      let data: any = {}
      this.computedFormData = config
      this.reportReady = true 
      this.isLoading = true
      this.report = new HMISReportService()
      this.periodDates = this.report.Span(config.start_date, config.end_date)
      this.report.setRegenerate(regenerate)
      this.report.setEpiWeek(config.end_date)
      this.report.setStartDate(HisDate.toStandardHisFormat(config.start_date))
      this.report.setEndDate(HisDate.toStandardHisFormat(config.end_date))
      data = this.report.epiWeeksRequestParams()
      this.reportUrlParams = Url.parameterizeObjToString({ 
        'start_date': HisDate.toStandardHisFormat(config.start_date),
        'end_date': HisDate.toStandardHisFormat(config.end_date)
      })

      const request = await this.report.requestHMIS15(data)
      const OPDVisitsRequest = await this.report.getOPDVisits(this.report.registrationRequestParams())
      if (request.ok && OPDVisitsRequest.ok) {
            data.regenerate = false
            if(OPDVisitsRequest.status === 200) {
              const arrayOb =   await OPDVisitsRequest.json()
            this.TotalOPDVisits = arrayOb.length
            }
            if (request.status === 200) {
              const data = await request.json()
              this.reportID = "data"
              this.idsr = data
              this.isLoading = false
            }
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
    async onDrillDown(patientIds: string) {
      patientIds = this.report.getIdsArrayObj(patientIds)
      const patients = await this.report.getPatientsDetails(patientIds)
      const columns = [
        [
          table.thTxt('First name'),
          table.thTxt('Last name'),
          table.thTxt('Gender'),
          table.thTxt('Phone'),
          table.thTxt('Address'),
          table.thTxt('Action')
        ]
      ]
      const asyncRows = async () => {
        return patients.map((person: any) => ([
          table.td(person.givenName),
          table.td(person.familyName),
          table.td(person.gender),
          table.td(person.phone),
          table.td(person.address),
          table.tdBtn('Select', async () => {
            await modalController.dismiss({})
            this.$router.push({ path: `/patient/dashboard/${person.personId}`})
          })
        ]))
      }
      await this.drilldownAsyncRows(`Drill Down`, columns, asyncRows)
    },
    getBtns() {
      return  [
        {
          name: "CSV",
          size: "large",
          slot: "start",
          color: "primary",
          visible: true,
          onClick: async () => {
            const rep = this.$refs.rep as any
            rep.onDownload()
          }
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
