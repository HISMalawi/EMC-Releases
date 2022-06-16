<template>
  <ion-page>
    <report-template
      :title="title"
      :rows="rows"
      :fields="fields"
      :columns="columns"
      :period="period"
      :onReportConfiguration="init"
    ></report-template>
  </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { NCD_TYPES, OpdReportService } from "@/apps/OPD/services/opd_report_service"
import ReportTemplate from "@/views/reports/BaseTableReport.vue"
import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"
import ReportMixin from '@/apps/ART/views/reports/ReportMixin.vue'
import { IonPage } from "@ionic/vue";

export default defineComponent({
  components: { ReportTemplate, IonPage },
  mixins: [ReportMixin],
  data: () => ({
    title: 'Cases seen report',
    rows: [] as RowInterface[][], 
    reportService: {} as any,
    columns: [
      [
        table.thTxt('', {
          sortable: false,
          exportable: false 
        }),
        table.thTxt('New cases', {
          colspan: 2,
          sortable: false,
          exportable: false 
        }),
        table.thTxt('All cases', {
          colspan: 2,
          sortable: false,
          exportable: false 
        }),
      ],
      [
        table.thTxt('NCD type'),
        table.thTxt('Male', { value: 'Male (New Cases)' }),
        table.thTxt('Female', { value: 'Female (New Cases)' }),
        table.thTxt('Male', { value: 'Male (All Cases)' }),
        table.thTxt('Female', { value: 'Female (All Cases)' }),
      ]
    ] as ColumnInterface[][],
  }),
  created(){
    this.fields = this.getDateDurationFields()
  },
  methods: {
    async init(_: any, config: any){
      this.reportService = new OpdReportService()
      this.reportService.setStartDate(config.start_date)
      this.reportService.setEndDate(config.end_date)
      this.period = this.reportService.getDateIntervalPeriod()
      this.rows = this.buildRows()
      
    },
    buildRows(): RowInterface[][] {
      return NCD_TYPES.map(type => ([
        table.td(type, {style: {textAlign: 'left'}}),
        table.td(''),
        table.td(''),
        table.td(''),
        table.td('')
      ]))
    },
  },
})
</script>
