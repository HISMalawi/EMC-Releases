<template>
  <ion-page>
    <report-template
      :title="title"
      :rows="rows"
      :fields="fields"
      :columns="columns"
      :period="period"
      :config="tableConfig"
      :onReportConfiguration="init"
    ></report-template>
  </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { OpdReportService } from "@/apps/OPD/services/opd_report_service"
import ReportTemplate from "@/views/reports/BaseTableReport.vue"
import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"
import ReportMixin from '@/apps/ART/views/reports/ReportMixin.vue'
import { isEmpty } from 'lodash'
import { border } from '@/apps/OPD/utils/table'
import { IonPage } from "@ionic/vue";
import { Patientservice } from '@/services/patient_service'

export default defineComponent({
  components: { ReportTemplate, IonPage },
  mixins: [ReportMixin],
  data: () => ({
    title: 'OPD Diagnosis',
    rows: [] as RowInterface[][],
    reportService: {} as any,
    tableConfig: {
      showIndex: false,
    },
    columns: [
      [
        table.thTxt('Age Groups', {colspan: 2, ...border}),
        table.thTxt('<6 months', {colspan: 2, ...border}),
        table.thTxt('6 months < 5 yrs', {colspan: 2, ...border}),
        table.thTxt('5 yrs < 14 yrs', {colspan: 2, ...border}),
        table.thTxt('> 14 yrs', {colspan: 2, ...border}),
        table.thTxt(''),
      ],
      [
        table.thTxt('Diagnosis', border),
        table.thTxt('F', border),
        table.thTxt('M', border),
        table.thTxt('F', border),
        table.thTxt('M', border),
        table.thTxt('F', border),
        table.thTxt('M', border),
        table.thTxt('F', border),
        table.thTxt('M', border),
        table.thTxt('Total', border),
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
      this.rows = this.buildRows((await this.reportService.getDiagnosis()))
      
    },
    totalDiagnosis(diagnosis: Record<string, number>) {
      return Object.values(diagnosis).reduce((a, b) => a + b, 0)
    },
    getDrillDownColumns() {
      return [[
        table.thTxt("Patient ID"),
        table.thTxt("First Name"),
        table.thTxt("Last Name"),
        table.thTxt("Gender"),
        table.thTxt("Phone Number"),
        table.thTxt("Address")
      ]]
    },
    buildColumn(patients: Array<string>, title='') {
      if(isEmpty(patients)) {
        return table.td(0)
      }
      return table.tdLink(patients.length, async () => this.drilldownData(
        title,
        this.getDrillDownColumns(),
        patients,
        (tableRows: any[][]) => {
          return tableRows.map( async (defaultRow: any[]) => {
            const [index, patientId] = defaultRow
            const p = await Patientservice.findByID(patientId)
            const patient = new Patientservice(p)
            return [
              index,
              table.td(patientId),
              table.td(patient.getGivenName()),
              table.td(patient.getFamilyName()),
              table.td(patient.getGender()),
              table.td(patient.getPhoneNumber()),
              table.td(`${patient.getCurrentDistrict()}, ${patient.getCurrentVillage()}, ${patient.getClosestLandmark()}`)
            ]
          })
        }
      ))
    },
    buildRows(data: Record<string, any>): RowInterface[][] {
      if(isEmpty(data)) return []
      const row: RowInterface[][] = []
      Object.keys(data).forEach(diagnosis => {
        Object.keys(data[diagnosis]).forEach(gender => {
          Object.keys(data[diagnosis][gender]).forEach(ageGroup => {
            const underSixFemales: Array<string> = (ageGroup === "0-5 months" && gender === "F") ? data[diagnosis][gender][ageGroup] : []
            const underSixMales: Array<string> = (ageGroup === "0-5 months" && gender === "M") ? data[diagnosis][gender][ageGroup] : []
            const underFiveFemales: Array<string> = (ageGroup.match(/6-11 months|12-23 months|2-4 years/) && gender === "F") ? data[diagnosis][gender][ageGroup] : []
            const underFiveMales: Array<string> = (ageGroup.match(/6-11 months|12-23 months|2-4 years/) && gender === "M") ? data[diagnosis][gender][ageGroup] : []
            const underFourteenFemales: Array<string> = (ageGroup.match(/5-9 years|10-14 years/) && gender === "F") ? data[diagnosis][gender][ageGroup] : []
            const underFourteenMales: Array<string> = (ageGroup.match(/5-9 years|10-14 years/) && gender === "M") ? data[diagnosis][gender][ageGroup] : []
            const overFourteenFemales: Array<string> = (!ageGroup.match(/Unknown/i) && gender === "F") ? data[diagnosis][gender][ageGroup] : []
            const overFourteenMales: Array<string> = (!ageGroup.match(/Unknown/i) && gender === "M") ? data[diagnosis][gender][ageGroup] : []

            row.push([
              table.td(diagnosis, {style: {textAlign: 'left'}}),
              this.buildColumn(underSixFemales, `under 6 months females diagnosed with ${diagnosis}`),
              this.buildColumn(underSixMales, `under 6 months males diagnosed with ${diagnosis}`),
              this.buildColumn(underFiveFemales, `under 5 years females diagnosed with ${diagnosis}`),
              this.buildColumn(underFiveMales, `under 5 years males diagnosed with ${diagnosis}`),
              this.buildColumn(underFourteenFemales, `under 14 years females diagnosed with ${diagnosis}`),
              this.buildColumn(underFourteenMales, `under 14 years males diagnosed with ${diagnosis}`),
              this.buildColumn(overFourteenFemales, `over 14 years females diagnosed with ${diagnosis}`),
              this.buildColumn(overFourteenMales, `over 14 years males diagnosed with ${diagnosis}`),
              this.buildColumn([
                ...underFiveFemales,
                ...underFiveMales,
                ...underSixFemales,
                ...underSixMales,
                ...underFourteenFemales,
                ...underFourteenMales,
                ...overFourteenFemales,
                ...overFourteenMales
              ], `Total diagnosed with ${diagnosis}`),
            ])
          })
        })
      })

      return row
    },
  },
})
</script>
