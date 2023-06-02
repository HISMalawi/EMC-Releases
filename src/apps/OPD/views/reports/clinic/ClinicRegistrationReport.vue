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
    filterVisitTypeAge(visitType:any, ageType:any){
      if(ageType == 'under5')
        return this.reportData.filter((d: any) => d.visit_type === visitType && HisDate.calculateAge(d.birthdate,Service.getSessionDate()) <= 5)
      else if(ageType == 'over5')
        return this.reportData.filter((d: any) => d.visit_type === visitType && HisDate.calculateAge(d.birthdate,Service.getSessionDate()) > 5)
    },
    modalData(){
      let new_under5 = [...this.filterVisitTypeAge('New patient','under5')].length
      let new_over5 = [...this.filterVisitTypeAge('New patient','over5')].length
      const new_total = new_under5 + new_over5
      let ref_under5 = [...this.filterVisitTypeAge('Referral','under5')].length
      let ref_over5 = [...this.filterVisitTypeAge('Referral','over5')].length
      const ref_total = ref_under5 + ref_over5
      let rev_under5 = [...this.filterVisitTypeAge('Revisiting','under5')].length
      let rev_over5 = [...this.filterVisitTypeAge('Revisiting','over5')].length
      const rev_total = rev_under5 + rev_over5
      return [
        { label:  "New patient",
          under5: new_under5 , 
          over5:  new_over5, 
          value:  new_total
        },
        { label:  "Referral", 
          under5:  ref_under5, 
          over5:  ref_over5, 
          value:  ref_total
        },
        { label:  "Revisiting", 
          under5:  rev_under5,
          over5:  rev_over5, 
          value:   rev_total
        }
      ]
    },
    async showModal() {
      const data = [...this.modalData()]
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
