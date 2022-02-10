<template>
    <ion-page>
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :fields="fields"
            :columns="columns"
            reportPrefix="PEPFAR"
            :hasServerSideCaching="true"
            :headerInfoList="headerList"
            :onReportConfiguration="onPeriod">
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { isEmpty } from "lodash"
import { Option } from '@/components/Forms/FieldInterface'
import { IonPage } from "@ionic/vue"
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service"
import { toastWarning } from '@/utils/Alerts'
import { MohCohortReportService } from "@/apps/ART/services/reports/moh_cohort_service"
import { DisaggregatedReportService } from "@/apps/ART/services/reports/disaggregated_service"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate, IonPage },
    data: () => ({
        title: 'PEPFAR Disaggregated Report',
        headerList: [] as Option[],
        columns: [
            [
                table.thTxt('Age group'),
                table.thTxt('Gender'),
                table.thNum('Tx new (new on ART)'),
                table.thNum('Tx curr (receiving ART)'),
                table.thNum('TX curr (received IPT)'),
                table.thNum('TX curr (screened for TB)')
            ]
        ],
        aggregations: [] as Array<any>,
        mohCohort: {} as any,
        ageGroupCohort: {} as any,
        canValidate: false as boolean,
        sortIndexes: {} as Record<string | number, Array<any>>
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    computed: {
        rows(): Array<any> {
            return Object.keys(this.sortIndexes)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .reduce((r: any, i: any) => r.concat(this.sortIndexes[i]), [])
        }
    },
    watch: {
        async canValidate(doIt: boolean) {
            if (doIt) await this.validateReport()
        }
    },
    methods: {
        async onPeriod(_: any, config: any, rebuildCache=true) {
            this.canValidate = false
            this.sortIndexes = {}
            this.report = new DisaggregatedReportService()
            this.mohCohort = new MohCohortReportService()
            this.report.setQuarter('pepfar')
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.mohCohort.setStartDate(config.start_date)
            this.mohCohort.setEndDate(config.end_date)
            this.period = this.report.getDateIntervalPeriod()
            this.report.setRebuildOutcome(rebuildCache)
            const isInit = await this.report.init()
            if (!isInit) {
                return toastWarning('Unable to initialise report')
            }
            await this.setTableRows()
            this.setHeaderInfoList()
            this.canValidate = true
        },
        getTotals(compareFunction: Function){
            return this.aggregations
                .filter(i => compareFunction(i))
                .reduce((counter, cur) => counter += cur.data.length, 0)
        },
        setHeaderInfoList(validationStatus='<span style="color: orange;font-weight:bold">Validating report....please wait...</span>') {
            const totalAlive = this.getTotals((i: any) => i.col === 'txCurr' && !['Pregnant', 'Breastfeeding'].includes(i.group))
            this.headerList = [
                { 
                    label: 'Total Alive and on ART', 
                    value: totalAlive,
                    other: {
                        onclick: () => this.runTableDrill(totalAlive, 'Total Alive and on ART')
                    }
                },
                {
                    label: 'Validation status',
                    value: validationStatus
                }
            ]
        },
        async setTableRows() {
            await this.setFemaleRows(1)
            await this.setMaleRows(2)
            await this.setTotalMalesRow(3)
            await this.setFemalePregnantRows(4)
            await this.setFemaleBreastFeedingRows(6)
            await this.setFemaleNotPregnantRows(5)
        },
        async getValue(prop: string, gender: string, data: any) {
            let res: any = []
            switch(prop) {
                case 'tx_given_ipt':
                    res = await this.report.getTxIpt()
                    break;
                case 'tx_screened_for_tb':
                    res = await this.report.getTxCurrTB()
                    break;
                default:
                    res = gender in data ? data[gender][prop] : []
                    break;
            }
            return res
        },
        setTotalMalesRow(sortIndex: number) {
            const totals = this.aggregations
                .filter((a: any) => a.category === 'M')
                .reduce((accum, cur) => {
                    if (!accum[cur.col]) accum[cur.col] = []
                    accum[cur.col] = accum[cur.col].concat(cur.data)
                    return accum
                },{})
            const row = [
                table.td('All'),
                table.td('Male'),
                this.drill(totals.txNew, 'Tx New (new on ART) Males'),
                this.drill(totals.txCurr, 'Total Curr (received ART) Males'),
                this.drill(totals.txGivenIpt, 'Total Curr (received IPT) Males'),
                this.drill(totals.txScreenTB, 'Total Curr (screened for TB) Males')
            ]
            this.sortIndexes[sortIndex] = [row]
        },
        setFemaleNotPregnantRows(sortIndex: number) {
            const isPregnant = (patientID: number) => this.aggregations
                .filter((a: any) => ['Pregnant', 'Breastfeeding'].includes(a.group))
                .reduce((accum, cur) => accum.concat(cur.data), [])
                .includes(patientID)
            const totals = this.aggregations
                .filter((a: any) => a.category === 'F' && !['Pregnant', 'Breastfeeding'].includes(a.group))
                .reduce((accum, cur) => {
                    if (!accum[cur.col]){
                        accum[cur.col] = []
                    } 
                    accum[cur.col] = accum[cur.col].concat(
                        cur.data.filter((i: any) => !isPregnant(i))
                    )
                    return accum
                }, {})
            const row = [ 
                table.td('All'), 
                table.td('FNP'),
                this.drill(totals.txNew, 'Tx New (new on ART) FNP'),
                this.drill(totals.txCurr, 'Tx Curr (received ART) FNP'),
                this.drill(totals.txGivenIpt, 'Tx Curr (received IPT) FNP'),
                this.drill(totals.txScreenTB, 'Tx Curr (screened for TB) FNP')
            ]
            this.sortIndexes[sortIndex] = [row]
        },
        async setFemaleRows(sortIndex: number) {
            this.report.setGender('female')
            const rows = await this.setRows('F', AGE_GROUPS, (group: string, otherColumns: any) =>
                [ table.td(group), table.td('Female'), ...otherColumns ], sortIndex
            )
            return rows
        },
        async setMaleRows(sortIndex: number) {
            this.report.setGender('male')
            const rows = await this.setRows('M', AGE_GROUPS, (group: string, otherColumns: any) =>
                [ table.td(group), table.td('Male'), ...otherColumns ], sortIndex
            )
            return rows
        },
        setFemalePregnantRows(sortIndex: number) {
            this.report.setGender('pregnant')
            return this.setRows('F', ['Pregnant'], (_: string, otherColumns: Array<any>) =>
                [ table.td('All'), table.td('FP'), ...otherColumns ], sortIndex
            )
        },
        setFemaleBreastFeedingRows(sortIndex: number) {
            this.report.setGender('breastfeeding')
            return this.setRows('F', ['Breastfeeding'],(_: string, otherColumns: Array<any>) =>
                [ table.td('All'), table.td('FBf'), ...otherColumns ], sortIndex
            )
        },
        async setRows(category: string, ageGroups: Array<string>, onRow: Function, sortIndex: number) {
            for(const i in ageGroups) {
                let txNew = []
                let txCurr= []
                let txGivenIpt = []
                let txScreenTB = []

                const group = ageGroups[i]
                this.report.setAgeGroup(group)

                if (!(group in this.ageGroupCohort)) {
                    const cohort = await this.report.getCohort()
                    this.report.setRebuildOutcome(false)
                    this.ageGroupCohort[group] = !isEmpty(cohort) ? cohort[group] : {}
                }
                if (!isEmpty(this.ageGroupCohort[group])) {
                    const value = (prop: string) => this.getValue(
                        prop, category, this.ageGroupCohort[group]
                    )
                    // Adds aggregation entry of a column
                    const addAggregation = (col: string, data: any) => 
                        this.aggregations.push({ group, category, col, data }
                    )
                    txNew = await value('tx_new')
                    txCurr= await value('tx_curr')
                    txGivenIpt = await value('tx_given_ipt')
                    txScreenTB = await value('tx_screened_for_tb')

                    addAggregation('txNew', txNew)
                    addAggregation('txCurr', txCurr)
                    addAggregation('txGivenIpt', txGivenIpt)
                    addAggregation('txScreenTB', txScreenTB)
                }
                const row = onRow(group, [
                    this.drill(txNew, `Tx new (new on ART) | ${group} | ${category}`),
                    this.drill(txCurr, `Tx curr (receiving ART) | ${group} | ${category}`),
                    this.drill(txGivenIpt, `TX curr (received IPT) | ${group} | ${category}`),
                    this.drill(txScreenTB, `TX curr (screened for TB) | ${group} | ${category}`)
                ])
                if (!this.sortIndexes[sortIndex]) {
                    this.sortIndexes[sortIndex] = []
                }
                this.sortIndexes[sortIndex].push(row)
            }
        },
        validateReport() {
            const validations: any = {
                'initiated_on_art_first_time': {
                    param: this.getTotals((i: any) => i.col === 'txNew' && !['Pregnant', 'Breastfeeding'].includes(i.group)),
                    check: (i: number, p: number) => i != p,
                    error: (i: number, p: number) => `
                        MOH cohort initiated on ART first time (${i}) is not matching Tx New (${p})
                    `
                },
                'initial_pregnant_females_all_ages': {
                    param: this.getTotals((i: any) => i.col === 'txNew' && i.group === 'Pregnant'),
                    check: (i: number, p: number) => i != p,
                    error: (i: number, p: number) => `
                        MOH cohort initial pregnant females all ages 
                        (${i}) is not matching with TX new Pregnant women ${p}
                    `
                },
                'males_initiated_on_art_first_time': {
                    param: this.getTotals((i: any) => i.col === 'txNew' && i.category === 'M'),
                    check: (i: number, p: number) => i != p,
                    error: (i: number, p: number) => `
                        MoH Cohort males initiated on ART first time (${i})
                        is not matching with TX new All male (${p})
                    `
                }
            }
            const s = this.mohCohort.validateIndicators(validations, (errors: string[]) => {
                if (!isEmpty(errors)) {
                    this.setHeaderInfoList(`<span style='color:red'>${errors.join(',')}</span>`)
                } else {
                    this.setHeaderInfoList(`<span style='color:green'>Report is consistent</span>`)
                }
            })
            if (s === -1) this.setHeaderInfoList(`<span style='color:red'>Run Cohort report for same reporting period to validate</span>`)
        }
    }
})
</script>
