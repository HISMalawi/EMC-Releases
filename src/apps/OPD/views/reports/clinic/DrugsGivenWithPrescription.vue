<template>
  <ion-page>
    <report-template
      :title="title"
      :rows="rows"
      :fields="fields"
      :columns="columns"
      :period="period"
      :onReportConfiguration="init"
      :customBtns="customBtns"
    ></report-template>
  </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { OpdReportService } from "@/apps/OPD/services/opd_report_service"
import ReportTemplate from "@/views/reports/BaseTableReport.vue"
import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"
import HisDate from '@/utils/Date'
import { modalController } from '@ionic/core'
import ReportMixin from '@/apps/ART/views/reports/ReportMixin.vue'
import SummaryModal from "@/apps/OPD/components/DrugsGivenSummaryModal.vue";
import { IonPage } from "@ionic/vue";

export default defineComponent({
  components: { ReportTemplate, IonPage },
  mixins: [ReportMixin],
  data: () => ({
    title: 'OPD medication given (with prescription)',
    rows: [] as RowInterface[][], 
    reportData: [] as any,
    highLevelStats: [] as any,
    columns: [[
      table.thTxt('First Name'),
      table.thTxt('Last Name'),
      table.thTxt('Gender'),
      table.thTxt('DOB'),
      table.thTxt('Drug'),
      table.thTxt('Quantity'),
      table.thTxt('Date'),
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
      this.reportData = await reportService.getDrugsGivenWithPrescription();
      this.rows = this.buildRows((await reportService.getDrugsGivenWithPrescription()))
    },
    buildRows(data: any[]): RowInterface[][] {
      if(!data.length) return []
      return data.map((record: any) => [
        table.td(record.given_name),
        table.td(record.family_name),
        table.td(record.gender),
        table.td(HisDate.toStandardHisDisplayFormat(record.birthdate)),
        table.td(record.drug_name),
        table.td(record.quantity),
        table.td(HisDate.toStandardHisDisplayFormat(record.date)),
      ])
    },
    async showModal() {
     
      this.buildHighlevelView();
      const data = [
        { count: 1 ,label: "New patient", value: [...this.reportData.filter((d: any) => d.visit_type === 'New patient')].length },
        { count: 1 ,label: "Referral", value: [...this.reportData.filter((d: any) => d.visit_type === 'Referral')].length },
        { count: 1 ,label: "Revisiting", value: [...this.reportData.filter((d: any) => d.visit_type === 'Revisiting')].length }
      ]
      console.log('show modal',this.highLevelStats)
      const modal = await modalController.create({
        component: SummaryModal,
        backdropDismiss: true,
        cssClass: 'action-sheet-modal',
        componentProps: {
          list: this.highLevelStats
        } 
      })
      modal.present()
    },
    buildHighlevelView(){
      const data: any = this.reportData;
        for(let value in data){
            const drug = data[value]['drug_name']
            let drugName = data.filter((item: any)=>{
                return item.drug_name == drug
            })
            
            let quantity =0;
            drugName = drugName.map((data: any) =>{
                quantity += data.quantity
                return {label : data.drug_name, value : quantity}
            })[drugName.length - 1]

            this.highLevelStats.push(drugName);
        }

        this.highLevelStats = this.highLevelStats.filter((v: any,i: any,a: any)=>a.findIndex((v2: any)=>['place','label'].every(k=>v2[k] ===v[k]))===i)
        console.log('build high',this.highLevelStats)
    }
  },
})
</script>
