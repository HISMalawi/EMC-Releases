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
import { MENTAL_HEALTH_DIAGNOSIS, OpdReportService } from "@/apps/OPD/services/opd_report_service"
import ReportTemplate from "@/views/reports/BaseTableReport.vue"
import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"
import ReportMixin from '@/apps/ART/views/reports/ReportMixin.vue'
import { IonPage } from "@ionic/vue";

export default defineComponent({
  components: { ReportTemplate, IonPage },
  mixins: [ReportMixin],
  data: () => ({
    title: 'Mental health report',
    rows: [] as RowInterface[][],
    reportService: {} as any,
    columns: [
      [
        table.thTxt('', {
          sortable: false,
          exportable: false 
        }),
        table.thTxt('New cases', {
          colspan: 4,
          sortable: false,
          exportable: false 
        }),
        table.thTxt('Subsequent cases', {
          colspan: 4,
          sortable: false,
          exportable: false 
        }),
      ],
      [
        table.thTxt('Diagnosis'),
        table.thTxt('Male (0-15 years)', { value: 'Males (0-15 years New Cases)' }),
        table.thTxt('Male (>=16 years)', { value: 'Males (>=16 years New Cases)' }),
        table.thTxt('Female (0-15 years)', { value: 'Females (0-15 years New Cases)' }),
        table.thTxt('Female (>=16 years)', { value: 'Females (>=16 years New Cases)' }),

        table.thTxt('Male (0-15 years)', { value: 'Males (0-15 years Subsequent Cases)' }),
        table.thTxt('Male (>=16 years)', { value: 'Males (>=16 years Subsequent Cases)' }),
        table.thTxt('Female (0-15 years)', { value: 'Females (0-15 years Subsequent Cases)' }),
        table.thTxt('Female (>=16 years)', { value: 'Females (>=16 years Subsequent Cases)' }),
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
      return MENTAL_HEALTH_DIAGNOSIS.map( diagnosis => ([
        table.td(diagnosis, {style: {textAlign: 'left'}}),
        table.td(''),
        table.td(''),
        table.td(''),
        table.td(''),
        table.td(''),
        table.td(''),
        table.td(''),
        table.td(''),
      ]))
    },
  },
})
</script>
