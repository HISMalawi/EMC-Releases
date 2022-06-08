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
import ReportTemplate from "@/views/reports/BaseTableReport.vue"
import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"
import ReportMixin from '@/apps/ART/views/reports/ReportMixin.vue'
import { border } from '@/apps/OPD/utils/table'
import { IonPage } from "@ionic/vue";
import { CxCaReportService } from '@/apps/CxCa/services/reports/cxca_report_service'
export default defineComponent({

  components: { ReportTemplate, IonPage },
  mixins: [ReportMixin],
  data: () => ({
    title: 'CC Screen Result',
    rows: [] as RowInterface[], 
    reportService: {} as any,
    columns: [
      [
        table.thTxt('Fine Age'),
        table.thTxt('CXCA_SCRN_Negative'),
        table.thTxt('CXCA_SCRN_Positive'),
        table.thTxt('CXCA_SCRN_Suspected Cancer'),
      ]
    ] as ColumnInterface[][],
  }),
  created(){
    this.fields = this.getDateDurationFields()
  },
  methods: {
    async init(_: any, config: any){
      this.reportService = new CxCaReportService()
      this.reportService.setStartDate(config.start_date)
      this.reportService.setEndDate(config.end_date)
      const data = await this.reportService.getPepfarReport('CC Screen Result');
      console.log(data);
      this.rows = this.buildRows(data)
      
    },
 drilldown(patients: Array<any>, context: string) {
            const columns = [
                [
                    table.thTxt('ARV #'),
                    table.thTxt('DOB'),
                    // table.thTxt('Dispensed date')
                ]
            ]
            const asyncRows = () => this.sortByArvNumber(patients).map(
                (p: any) => ([
                   table.td(p.arv_number),
                   table.tdDate(p.birthdate),
                  //  table.tdDate(p.prescription_date)
               ])
            )
            if (patients.length <= 0) return table.td(0)

            return table.tdLink(patients.length, () => this.drilldownAsyncRows(context, columns, asyncRows))
        },
    buildRows(data: any): RowInterface[] {
      return data.map((d: any) => ([
        table.td(d.age_group),
        this.drilldown(d['result_negative'], 'result negative'),
        this.drilldown(d['result_positive'], 'result positive'),
        this.drilldown(d['result_suspected_cancer'], 'suspected cancer'),
      ]))
    },
  },
})
</script>
