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
        <idsr-h :key="componentKey" :reportparams="period" ref="header" :weekdates="weekDates" :clinicName="clinicName" :totalOPDVisits="TotalOPDVisits" ></idsr-h>
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
    weekDates: '' as string,
    TotalOPDVisits: 0 as number,
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
      let data: any = {}
      this.computedFormData = config
      this.reportReady = true 
      this.isLoading = true
      this.report = new IDSRReportService()
      this.weekDates = this.report.Span(form.epiweek.other.start, form.epiweek.other.end)
      this.report.setRegenerate(regenerate)
      this.report.setEpiWeek(form.epiweek.label)
      this.report.setStartDate(HisDate.toStandardHisFormat(form.epiweek.other.start))
      this.report.setEndDate(HisDate.toStandardHisFormat(form.epiweek.other.end))
      data = this.report.epiWeeksRequestParams()
      this.period = form.epiweek.label
      this.reportUrlParams = Url.parameterizeObjToString({ 
        'start_date': HisDate.toStandardHisFormat(form.epiweek.other.start),
        'end_date': HisDate.toStandardHisFormat(form.epiweek.other.end),
        'epiweek': form.epiweek.label
      })

      const request = await this.report.requestIDSR(data)
      if (request.ok) {
          const OPDVisitsRequest = await this.report.getOPDVisits(this.report.registrationRequestParams())
          if (OPDVisitsRequest.ok) {
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
