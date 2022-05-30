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
        <hmis-header :key="componentKey" :reportName="reportName" ref="header" :periodLabel="periodLabel" :periodDates="periodDates" :clinicName="clinicName" :totalOPDVisits="TotalOPDVisits" ></hmis-header>
        <hmis-template :key="componentKey" :reportName="reportName" :onDrillDown="onDrillDown" :params="hmis15Data" :periodDates="periodDates" ref="rep"></hmis-template>
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
import { modalController } from "@ionic/vue";
import table from "@/components/DataViews/tables/ReportDataTable"
import { Patientservice } from "@/services/patient_service";
import { isEmpty } from "lodash";

export default defineComponent({
  mixins: [ReportMixinVue],
  components: { IonLoading, HmisHeader, HmisTemplate, HisStandardForm, HisFooter, IonPage, IonContent },
  data: () => ({
    formData: {} as any,
    componentKey: 0 as number,
    computedFormData: {} as any,
    hmis15Data: {} as any,
    btns: [] as Array<any>,
    isLoading: false as boolean,
    fields: [] as Array<Field>,
    reportID: -1 as any,
    periodLabel: 'Period',
    periodDates: '' as string,
    reportName: 'HMIS 17',
    TotalOPDVisits: 0 as number,
    clinicName: HMISReportService.getLocationName(),
    reportReady: false as boolean,
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
      this.report = new HMISReportService()
      this.report.setRegenerate(regenerate)
      this.report.setStartDate(HisDate.toStandardHisFormat(config.start_date))
      this.report.setEndDate(HisDate.toStandardHisFormat(config.end_date))
      this.periodDates = this.report.getReportPeriod()
      try {
        const hmis = await this.report.requestHMIS17()
        const visits = await this.report.getOPDVisits()
        if(hmis && visits) {
          this.TotalOPDVisits = visits.length
          this.hmis15Data = hmis
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async printSpec() {
      const printW = open('', '', 'width:1024px, height:768px')
      const content = document.getElementById('report-content')
      if (content && printW) {
        printW.document.write(`
            <html>
              <head>
                <title>Print ${this.reportName}</title>
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
    async onDrillDown(conditionName: string, patientIds: number[]) {
      if(isEmpty(patientIds)) return
      const columns = [[
        table.thTxt('First name'),
        table.thTxt('Last name'),
        table.thTxt('Gender'),
        table.thTxt('Age'),
        table.thTxt('Phone'),
        table.thTxt('Address'),
        table.thTxt('Action')
      ]]
      const rowParser = async (ids: number[]) => {
        return await Promise.all(ids.map(async (id) => {
          const personDetails = await Patientservice.findByID(id)
          const patient = new Patientservice(personDetails)
          return [
            table.td(patient.getGivenName()),
            table.td(patient.getFamilyName()),
            table.td(patient.getGender()),
            table.td(patient.getAge()),
            table.td(patient.getPhoneNumber()),
            table.td(`${patient.getCurrentDistrict()}, ${patient.getCurrentVillage()}, ${patient.getClosestLandmark()}`),
            table.tdBtn('Select', async () => {
              await modalController.dismiss({})
              this.$router.push({ path: `/patient/dashboard/${id}`})
            })
          ]
        })) 
      }
      return this.drilldownData(conditionName, columns, patientIds, rowParser)
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
          name: "Back",
          size: "large",
          slot: "end",
          color: "warning",
          visible: true,
          onClick: () => this.reportReady = false
        },
        {
          name: "Refresh",
          size: "large",
          slot: "end",
          color: "warning",
          visible: true,
          onClick: async () => this.regenerate()
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
