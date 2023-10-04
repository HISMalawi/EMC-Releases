<template>
  <ion-page>
    <report-template
      :title="title"
      :rows="rows"
      :fields="fields"
      :columns="columns"
      :period="period"
      :reportPrefix="'Clinic'"
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
import ReportMixin from '@/apps/ART/views/reports/ReportMixin.vue'
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
      onClick: async () => await this.showModal()
    })
  },
  methods: {
    async init(_: any, config: any){
      const reportService = new OpdReportService()
      reportService.setStartDate(config.start_date)
      reportService.setEndDate(config.end_date)
      this.period = reportService.getDateIntervalPeriod()
      this.reportData = await reportService.getDrugsGivenWithPrescription();
      this.rows = this.buildRows(this.reportData)
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
      await this.buildHighlevelView();
      const columns = [
        [
          table.thTxt('Number'),
          table.thTxt('Drug Name'),
          table.thTxt('Quantity')
        ]
      ]
      let counter = 1;
      const asyncRows = this.highLevelStats.map((drug: any) => ([
                          table.td(counter++),
                          table.td(drug.label),
                          table.td(drug.value)
                        ]))

      await this.drilldownData("Durgs Given with prescription Report Summary", columns, asyncRows, false)
    },
    async buildHighlevelView(){
      const result = await this.reportData.reduce(function(r: any, e: any) {
        if(!r[e.drug_name]) {
          r[e.drug_name] = {label:e.drug_name,value:0}
        }
        r[e.drug_name].value += e.quantity
        return r
      }, {})
      this.highLevelStats = Object.keys(result).map((d) => {return result[d]})
    }
  },
})
</script>
