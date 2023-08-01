<template>
    <ion-page>
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :fields="fields"
            :columns="columns"
            :config="{
                showIndex: true
            }"
            reportPrefix="Pepfar"
            :onReportConfiguration="onPeriod">
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import {
    IonPage
} from "@ionic/vue"
import { defineComponent } from 'vue'
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";
import { TBReportService } from '@/apps/ART/services/reports/tb_report_service'
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { uniq } from "lodash";

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate, IonPage },
    data: () => ({
        title: 'Tx TB Report',
        cohort: {} as any,
        rows: [] as Array<any>,
        aggregations: [] as any,
        columns: [
            [       
                table.thTxt('Age group'),
                table.thTxt('Gender'),
                table.thTxt('TX_CURR'),
                table.thTxt('Screen Pos_New on ART'),
                table.thTxt('Screen Neg_New on ART'),
                table.thTxt('Screen Pos_Prev on ART'),
                table.thTxt('Screen Neg_Prev on ART'),
                table.thTxt('Started TB RX_New on ART'),
                table.thTxt('Started TB RX_Prev on ART')
            ]
        ]
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.rows = []
            this.aggregations = []
            this.report = new TBReportService()
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.period = this.report.getDateIntervalPeriod()
            this.cohort = (await this.report.getTxTbReport()) || {}
            this.setRows('F')
            this.setRows('M')
            this.setAggregatedRows()
        },
        aggregate(compareFunction: any){
            return this.aggregations
                .filter((i: any) => compareFunction(i))
                .reduce((total: any[], row: any) => uniq(total.concat(row.data)), [])
        },
        async setAggregatedRows() {
            const fStatus = await this.report.getMaternalStatus(this.aggregate((i: any) => i.gender === 'F'))

            const allFp = fStatus.FBf.concat(fStatus.FP)

            const male = (column: string, description: string) => {
                return this.drill(
                    this.aggregate((a: any) => a.gender === 'M' && a.col === column), 
                    `All male ${description}`
                )
            }

            const fp = (col: string, status: 'FBf' | 'FP', description: string) => {
                const data = this.aggregate((i: any) => i.col === col && i.gender === 'F')
                return this.drill(
                    data.filter((id: number) => fStatus[status].includes(id)),
                    `${description} (All ${status})`
                )
            }

            const fnp = (col: string, description: string) => {
                const data = this.aggregate((i: any) => i.col === col && i.gender === 'F')
                return this.drill(
                    data.filter((id: number) => !allFp.includes(id)),
                    `${description} (All FnP)`
                )
            }

            this.rows.push([
                table.td('All'),
                table.td('Male'),
                male('tx_curr', 'TX Curr'),
                male('sceen_pos_new', 'Screen pos new'),
                male('sceen_neg_new', 'Screen neg new'),
                male('sceen_pos_prev', 'Screen positive prev'),
                male('sceen_neg_prev', 'Screen negative prev'),
                male('started_tb_new', 'Started TB New'),
                male('started_tb_prev', 'Started TB Prev')
            ])

            this.rows.push([
                table.td('All'),
                table.td('FP'),
                fp('tx_curr', 'FP','TX Curr'),
                fp('sceen_pos_new', 'FP', 'Screen pos new'),
                fp('sceen_neg_new', 'FP', 'Screen neg new'),
                fp('sceen_pos_prev', 'FP', 'Screen positive prev'),
                fp('sceen_neg_prev', 'FP', 'Screen negative prev'),
                fp('started_tb_new', 'FP', 'Started TB New'),
                fp('started_tb_prev', 'FP', 'Started TB Prev')
            ])

            this.rows.push([
                table.td('All'),
                table.td('FNP'),
                fnp('tx_curr', 'TX Curr'),
                fnp('sceen_pos_new', 'Screen pos new'),
                fnp('sceen_neg_new', 'Screen neg new'),
                fnp('sceen_pos_prev', 'Screen positive prev'),
                fnp('sceen_neg_prev', 'Screen negative prev'),
                fnp('started_tb_new', 'Started TB New'),
                fnp('started_tb_prev', 'Started TB Prev')
            ])
        
            this.rows.push([
                table.td('All'),
                table.td('FBF'),
                fp('tx_curr', 'FBf','TX Curr'),
                fp('sceen_pos_new', 'FBf', 'Screen pos new'),
                fp('sceen_neg_new', 'FBf', 'Screen neg new'),
                fp('sceen_pos_prev', 'FBf', 'Screen positive prev'),
                fp('sceen_neg_prev', 'FBf', 'Screen negative prev'),
                fp('started_tb_new', 'FBf', 'Started TB New'),
                fp('started_tb_prev', 'FBf', 'Started TB Prev')
            ])
        },
        setRows(gender: 'M' | 'F') {
            const strGender = this.formatGender(gender)
            const drill = (col: string, ageGroup: string, description: string) => {
                const data = this.cohort[ageGroup][gender][col]
                this.aggregations.push({ gender, col, data })
                return this.drill(data, `${description} (${ageGroup} ${strGender})`)
            }
            AGE_GROUPS.forEach((ageGroup: string) => {
                this.rows.push([
                    table.td(ageGroup),
                    table.td(strGender),
                    drill('tx_curr', ageGroup, 'Tx curr'),
                    drill('sceen_pos_new', ageGroup, 'Screen pos new'),
                    drill('sceen_neg_new', ageGroup, 'Screen neg new'),
                    drill('sceen_pos_prev', ageGroup, 'Screen pos prev'),
                    drill('sceen_neg_prev', ageGroup, 'Screen neg prev'),
                    drill('started_tb_new', ageGroup, 'Started TB New'),
                    drill('started_tb_prev', ageGroup, 'Started TB prev'),
                ])
            })
        }
    }
})
</script>
