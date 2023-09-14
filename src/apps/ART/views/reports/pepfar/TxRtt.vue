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
            reportPrefix="PEPFAR"
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
        aggregations: [] as any
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.rows = []
            this.aggregations = []
            this.report = new TxReportService()
            this.report.setOccupation(config.occupation)
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.period = this.report.getDateIntervalPeriod()
            this.cohort = await this.report.getTxRttReport()
            this.setRows('F')
            this.setRows('M')
            this.setTotalMaleRow()
            this.setMaternalRows()
        },
        aggregate(gender: 'M' | 'F', indicator: string) {
            return this.aggregations.reduce((totals: any, cur: any) => {
                return cur.gender === gender && cur[indicator] ? [...totals, ...cur[indicator]] : totals
            }, [])
        },
        setTotalMaleRow() {
            const drill = (indicator: string) => this.drill(
                this.aggregate('M', indicator as any), `All male ${indicator}`
            )
            this.rows.push([
                table.td('All'),
                table.td('Male'),
                drill('<3 months'),
                drill('3-5 months'),
                drill('6+ months')
            ])
        },
        async setMaternalRows() {
            const indicators = [
                '<3 months',
                '3-5 months',
                '6+ months'
            ].reduce((aggregated: any, indicator: string) => [
                ...aggregated, { indicator, data: this.aggregate('F', indicator)}
            ], [])
            const maternalStatus = await this.report.getMaternalStatus(
                uniq(indicators.reduce((totals: any, cur: any) => [...totals, ...cur.data], []).map((id: number) => id))
            )

            const groupBy = (indicator: string) => indicators.reduce(
                (all: any, i: any) => i.indicator === indicator ? [...all, ...i.data] : all, []
            )

            const fP = (s: 'FP' | 'FBf', indicator: string) => {
                return this.drill(
                    groupBy(indicator).filter((patient: any) => maternalStatus[s].includes(patient)), `All returned ${indicator} (${s})`
                )
            }

            const allPregnant = maternalStatus.FBf.concat(maternalStatus.FP)

            const fnP = (indicator: string) => {
                return this.drill(groupBy(indicator).filter(
                    (patient: any) => !allPregnant.includes(patient)), `All returned ${indicator} FNP`
                )
            }

            this.rows.push([
                table.td('All'),
                table.td('FP'),
                fP('FP', '<3 months'),
                fP('FP', '3-5 months'),
                fP('FP', '6+ months')
            ])
            this.rows.push([
                table.td('All'),
                table.td('FNP'),
                fnP('<3 months'),
                fnP('3-5 months'),
                fnP('6+ months')
            ])
            this.rows.push([
                table.td('All'),
                table.td('FBF'),
                fP('FBf', '<3 months'),
                fP('FBf', '3-5 months'),
                fP('FBf', '6+ months')
            ])
        },
        setRows(gender: string) {
            type Comparator = (months: number) => boolean; 
            const sortData = (ls: Array<any>, comparator: Comparator) => {
                return ls.filter(i => comparator(i.months))
                    .map(i => i.patient_id)
            }
            for(const i in AGE_GROUPS) {
                const group = AGE_GROUPS[i]
                const fullGender = this.formatGender(gender);
                if (group in this.cohort) {
                    const cohortData = this.cohort[group][gender]
                    const s = (comparator: Comparator) => sortData(cohortData, comparator)
                    const lessThanThreeMonths = s((months: number) => months < 3)
                    const threeToFiveMonths = s((months: number) => months >= 3 && months <= 5)
                    const sixPlusMonths = s((months: number) => months >= 6)
                    this.rows.push([
                        table.td(group),
                        table.td(fullGender),
                        this.drill(lessThanThreeMonths, `${group} (${fullGender}s) Returned <3 mo`),
                        this.drill(threeToFiveMonths, `${group} (${fullGender}s) Returned 3-5 mo`),
                        this.drill(sixPlusMonths, `${group} (${fullGender}s) Returned 6+ mo`),
                    ])
                    this.aggregations.push({
                        gender,
                        '<3 months': lessThanThreeMonths,
                        '3-5 months': threeToFiveMonths,
                        '6+ months': sixPlusMonths
                    })
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
