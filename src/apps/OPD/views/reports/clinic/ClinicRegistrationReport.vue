<template>
  <ion-page>
    <report-template
      :title="title"
      :rows="rows"
      :fields="fields"
      :columns="columns"
      :itemsPerPage="10"
      :period="period"
      :onReportConfiguration="init"
      :customBtns="customBtns"
      paginated
    ></report-template>
  </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { OpdReportService } from "@/apps/OPD/services/opd_report_service"
import ReportTemplate from "@/views/reports/BaseTableReport.vue"
import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"
import HisDate from '@/utils/Date'
import ReportMixin from '@/apps/ART/views/reports/ReportMixin.vue'
import { modalController } from '@ionic/core'
import SummaryModal from "@/apps/OPD/components/RegistrationSummaryModal.vue";
import { IonPage } from "@ionic/vue";
import { Service } from "@/services/service";

export default defineComponent({
  components: { ReportTemplate, IonPage },
  mixins: [ReportMixin],
  data: () => ({
    title: 'Clinic Registration',
    rows: [] as RowInterface[][], 
    reportData: [] as any,
    columns: [[
      table.thTxt('Reg'),
      table.thTxt('First Name'),
      table.thTxt('Last Name'),
      table.thTxt('Gender'),
      table.thTxt('DOB'),
      table.thTxt('Date reg.'),
    ]] as ColumnInterface[][],
    customBtns: [] as any
  }),
  created(){
    this.fields = this.getDateDurationFields()
    this.customBtns.push({
      name: "High level view",
      size: "large",
      slot: "start",
      color: "primary",
      visible: true,
      onClick: async () => this.showModal()
    })
    
  },
  methods: {
    async init(_: any, config: any){
      const reportService = new OpdReportService()
      reportService.setStartDate(config.start_date)
      reportService.setEndDate(config.end_date)
      this.period = reportService.getDateIntervalPeriod()
      const data = await reportService.getClinicRegistrations()
      this.reportData = data.sort((a: any, b: any) => 
        a.visit_type > b.visit_type ? 1 : a.visit_type < b.visit_type ? -1 : 0
      )
      this.rows = this.buildRows(this.reportData)
    },
    buildRows(data: any[]): RowInterface[][] {
      if(!data.length) return []
      return data.map((record: any) => [
        table.td(record.visit_type),
        table.td(record.given_name),
        table.td(record.family_name),
        table.td(record.gender),
        table.td(HisDate.toStandardHisDisplayFormat(record.birthdate)),
        table.td(HisDate.toStandardHisDisplayFormat(record.visit_date)),
      ])
    },
    calculateAge(date1:any, date2:any) {
      const birthDate = new Date(date1);
      const currentDate = new Date(date2);
      let ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = currentDate.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
        ageDifference--;
      }
      return ageDifference;
    },
    filterVisitType(visitType:any){
      return this.reportData.filter((d: any) => d.visit_type === visitType)
    },
    filterAge(data:any,ageType:any){
      if(ageType == 'under5')
        return data.filter((d: any) => this.calculateAge(d.birthdate,Service.getSessionDate()) <= 5)
      else if(ageType == 'over5')
        return data.filter((d: any) => this.calculateAge(d.birthdate,Service.getSessionDate()) > 5)
    },
    async showModal() {
      const data = [
        { label:  "New patient",
          under5:  [...this.filterAge(this.filterVisitType('New patient'),'under5')].length, 
          over5:  [...this.filterAge(this.filterVisitType('New patient'),'over5')].length, 
          value:  [...this.filterVisitType('New patient')].length },
        { label:  "Referral", 
          under5:  [...this.filterAge(this.filterVisitType('Referral'),'under5')].length, 
          over5:  [...this.filterAge(this.filterVisitType('Referral'),'over5')].length, 
          value:  [...this.filterVisitType('Referral')].length },
        { label:  "Revisiting", 
          under5:  [...this.filterAge(this.filterVisitType('Revisiting'),'under5')].length,
          over5:  [...this.filterAge(this.filterVisitType('Revisiting'),'over5')].length, 
          value:  [...this.filterVisitType('Revisiting')].length }
      ]
      const modal = await modalController.create({
        component: SummaryModal,
        backdropDismiss: true,
        cssClass: 'action-sheet-modal',
        componentProps: {
          list: data
        } 
      })
      modal.present()
    }
  },
})
</script>
