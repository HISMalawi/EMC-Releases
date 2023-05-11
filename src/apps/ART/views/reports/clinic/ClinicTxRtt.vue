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
            reportPrefix="Clinic"
            :onReportConfiguration="onPeriod"
            > 
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import { TxReportService } from '@/apps/ART/services/reports/tx_report_service'
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service"
import { uniq } from 'lodash'

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'TX RTT Report',
        cohort: {} as any,
        rows: [] as Array<any>,
        columns: [
            [       
                table.thTxt('Age group'),
                table.thTxt('Gender'),
                table.thTxt('Returned <3 mo'),
                table.thTxt('Returned 3-5 mo'),
                table.thTxt('Returned 6+ mo')
            ]
        ],
        aggregated: [] as any
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.rows = []
            this.aggregated = []
            this.report = new TxReportService()
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.period = this.report.getDateIntervalPeriod()
            this.cohort = await this.report.getClinicTxRtt()
            await this.setRows('F')
            await this.setRows('M')
            this.setMaleTotalsRow()
            await this.setFemaleRows()
        },
        drillData(data: Array<any>, ageGroup: string, gender: string, column: 'Returned <3 mo' | 'Returned 3-5 mo' | 'Returned 6+ mo') {
            this.aggregated.push({gender, ageGroup, column, data})
            return this.drill(data, `${ageGroup} (${gender}s) ${column}`)
        },
        setMaleTotalsRow() {
            const maleTD = (column: string) => this.drill(
                this.aggregated.filter((a: any) => a.gender === 'Male' && a.column === column)
                    .reduce((a: any, c: any) => a.concat(c.data), []), 
                    `All Male ${column}`
            )
            this.rows.push([
                table.td('All'),
                table.td('Male'),
                maleTD('Returned <3 mo'),
                maleTD('Returned 3-5 mo'),
                maleTD('Returned 6+ mo')
            ])
        },
        async setFemaleRows() {
            const all = this.aggregated.filter((d: any) => d.gender.match(/female/i))
                .reduce((a: number[], c: any) => a.concat(c.data), [] as number[])           
            const mStatus = await this.report.getMaternalStatus(uniq(all))
            const allFp = mStatus.FBf.concat(mStatus.FP)

            const getColumnData = (column: string) => this.aggregated.filter((d: any) => d.gender.match(/female/i))
                .filter((i: any) => i.column === column)
                .reduce((a: number[], c: any) => uniq(a.concat(c.data)), [] as number[])           

            const fp = (status: 'FBf' | 'FP', column: string) => {
                return this.drill(getColumnData(column).filter((id: any) => mStatus[status].includes(id)), `All ${column}`)
            }

            const fnp = (column: string) => {
               return this.drill(getColumnData(column).filter((id: any) => !allFp.includes(id)), `All ${column}`)
            }

            this.rows.push([
                table.td('All'),
                table.td('FP'),
                fp('FP', 'Returned <3 mo'),
                fp('FP', 'Returned 3-5 mo'),
                fp('FP', 'Returned 6+ mo')
            ])
            this.rows.push([
                table.td('All'),
                table.td('FNP'),
                fnp('Returned <3 mo'),
                fnp('Returned 3-5 mo'),
                fnp('Returned 6+ mo')
            ])
            this.rows.push([
                table.td('All'),
                table.td('FBF'),
                fp('FBf', 'Returned <3 mo'),
                fp('FBf', 'Returned 3-5 mo'),
                fp('FBf', 'Returned 6+ mo')
            ])
        },
        async setRows(gender: string) {
            type Comparator = (months: number) => boolean
            const sortData = (ls: Array<any>, comparator: Comparator) => {
                return ls.filter(i => comparator(i.months)).map(i => i.patient_id)
            }
            for(const i in AGE_GROUPS) {
                const group = AGE_GROUPS[i]
                const fullGender = this.formatGender(gender);
                if (group in this.cohort) {
                    const cohortData = this.cohort[group][gender]
                    const s = (comparator: Comparator) => sortData(cohortData, comparator)
                    this.rows.push([
                        table.td(group),
                        table.td(fullGender),
                        this.drillData(s((months: number) => months < 3), group, fullGender, 'Returned <3 mo'),
                        this.drillData(s((months: number) => months >= 3 && months <= 5), group, fullGender, 'Returned 3-5 mo'),
                        this.drillData(s((months: number) => months >= 6), group, fullGender, 'Returned 6+ mo')
                    ])
                } else {
                    this.rows.push([
                        table.td(group),
                        table.td(fullGender),
                        table.td(0),
                        table.td(0),
                        table.td(0)
                    ])
                }
            }
        }
    }
})
</script>
