<template>
    <ion-page>
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :fields="fields"
            :columns="columns"
            :headerInfoList="headerList"
            reportPrefix="MoH"
            :validationErrors="errors"
            :showValidationStatus="canValidate"
            :hasServerSideCaching="true"
            :enabledPDFHorizontalPageBreak="true"
            :onReportConfiguration="onPeriod"
            :onDefaultConfiguration="onLoadDefault"
            :onFinishBtnAction="onFinishBtnAction"
            >
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import { DisaggregatedReportService, TEMP_OUTCOME_TABLE } from "@/apps/ART/services/reports/disaggregated_service"
import { REGIMENS } from "@/apps/ART/services/reports/regimen_report_service"
import { toastWarning } from '@/utils/Alerts'
import { isEmpty } from "lodash"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { IonPage } from "@ionic/vue"
import { MohCohortReportService } from "@/apps/ART/services/reports/moh_cohort_service"
import { Option } from '@/components/Forms/FieldInterface'
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate, IonPage },
    data: () => ({
        title: 'Disaggregated report',
        columns: [
            [
                table.thTxt('Age group'),
                table.thTxt('Gender'),
                table.thNum('Tx new (new on ART)'),
                table.thNum('Tx curr (receiving ART)'),
                table.thNum('TX curr (received IPT)'),
                table.thNum('TX curr (screened for TB)'),
                table.thNum('0A'),
                table.thNum('2A'),
                table.thNum('4A'),
                table.thNum('5A'),
                table.thNum('6A'),
                table.thNum('7A'),
                table.thNum('8A'),
                table.thNum('9A'),
                table.thNum('10A'),
                table.thNum('11A'),
                table.thNum('12A'),
                table.thNum('13A'),
                table.thNum('14A'),
                table.thNum('15A'),
                table.thNum('16A'),
                table.thNum('17A'),
                table.thNum('0P'),
                table.thNum('2P'),
                table.thNum('4P'),
                table.thNum('9P'),
                table.thNum('11P'),
                table.thNum('14P'),
                table.thNum('14PP'),
                table.thNum('15P'),
                table.thNum('15PP'),
                table.thNum('16P'),
                table.thNum('17P'),
                table.thNum('Unknown'),
                table.thNum('Total (regimen)')
            ]
        ],
        errors: [] as string[],
        showStatus: false as boolean,
        rowDataRefs: [
            'txNew', 
            'txCurr', 
            'txGivenIpt', 
            'txScreenTB', 
            ...REGIMENS,
            'N/A', 
            'regimenTotals'
        ],
        dataRefLabels: {
           'txNew': 'Tx new (new on ART)',
           'txCurr': 'Tx curr (receiving ART)',
           'txGivenIpt': 'TX curr (received IPT)',
           'txScreenTB': 'TX curr (screened for TB)',
           'N/A': 'Unknown',
           'regimenTotals': 'Regimen Totals'
        } as any,
        aggregations: [] as any,
        mohCohort: {} as any,
        ageGroupCohort: {} as any,
        headerList: [] as Array<Option>,
        canValidate: false as boolean,
        onLoadDefault: null as any,
        onFinishBtnAction: null as any,
        sortIndexes: {} as Record<string | number, Array<any>>
    }),
    async created() {
        const { query }  = this.$route
        /** Check for default url params for this report */
        if (query.start_date && query.end_date && query.quarter) {
            this.onFinishBtnAction = () => this.$router.back()
            this.onLoadDefault = () =>
                this.onPeriod({
                    quarter: {
                        label: query.quarter,
                        other: {
                            start: query.start_date,
                            end: query.end_date
                        }
                    }
                },{})
        }
        this.fields = this.getDateDurationFields(true, false, 21)
    },
    watch: {
        async canValidate(doIt: boolean) {
            if (doIt) await this.validateReport()
        }
    },
    computed: {
        rows(): any {
            return Object.keys(this.sortIndexes)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .reduce((r: any, i: any) => r.concat(this.sortIndexes[i]), [])
        }
    },
    methods: {
        async onPeriod(form: any, config: any, rebuildCache=false) {
            this.canValidate = false
            this.aggregations = []
            this.sortIndexes = {}
            this.errors = []
            this.report = new DisaggregatedReportService()
            this.mohCohort = new MohCohortReportService()
            this.report.setOutcomeTable(TEMP_OUTCOME_TABLE.PATIENT_OUTCOME_TEMP)
            if (form.quarter) {
                this.mohCohort.setQuarter(form.quarter.label)
                this.mohCohort.setStartDate(form.quarter.other.start)
                this.mohCohort.setEndDate(form.quarter.other.end)
                this.report.setQuarter(form.quarter.label)
                this.report.setStartDate(form.quarter.other.start)
                this.report.setEndDate(form.quarter.other.end)
                this.period = form.quarter.label
            } else {
                this.mohCohort.setStartDate(config.start_date)
                this.mohCohort.setEndDate(config.end_date)
                this.report.setStartDate(config.start_date)
                this.report.setEndDate(config.end_date)
                this.period = this.report.getDateIntervalPeriod()
            }
            this.report.setRebuildOutcome(rebuildCache)
            const isInit = await this.report.init()
            if (!isInit) {
                return toastWarning('Unable to initialise report')
            }
            await this.setTableRows()
            this.canValidate = true
        },
        async setTableRows() {
            await this.setFemaleRows(1)
            await this.setMaleRows(2)
            await this.setTotalMalesRow(3)
            await this.setFemalePregnantRows(4)
            await this.setFemaleBreastFeedingRows(6)
            await this.setFemaleNotPregnantRows(5)
        },
        getColumnLabel(col: string) {
            return col in this.dataRefLabels ? this.dataRefLabels[col] : col
        },
        getTotals(compareFunction: Function){
            return this.aggregations
                .filter((i: any) => compareFunction(i))
                .reduce((accum: any, cur: any) => accum.concat(cur.data), [])
        },
        addAggregation(col: string, group: string, category: string, data: any) {
            this.aggregations.push({ col, group, category, data: data || [] })
        },
        async getRegimenRows(category: string, group: string) {
            let totals: any = []
            const row: any = []
            const distribution = await this.report.getRegimenDistribution()
            const refs = [...REGIMENS, 'N/A']
            refs.forEach((i: any) => {
                if (distribution[i]) { 
                    totals = totals.concat(distribution[i]) 
                } 
                row.push(this.drill(distribution[i], `Regimen ${i} | ${category} | ${group}`))
                this.addAggregation(i, group, category, distribution[i])
            })
            row.push(this.drill(totals, `Regimen Totals | ${category} | ${group}`))
            this.addAggregation('regimenTotals', group, category, totals)
            return row
        },
        async getValue(prop: string, gender: string, data: any) {
            let res: any = []
            switch(prop) {
                case 'tx_given_ipt':
                    res = await this.report.getTxIpt()
                    break
                case 'tx_screened_for_tb':
                    res = await this.report.getTxCurrTB()
                    break
                default:
                    res = gender in data ? data[gender][prop] : []
                    break
            }
            return res
        },
        async setTotalMalesRow(sortIndex: number) {
            const totals = this.aggregations
                .filter((a: any) => a.category === 'M')
                .reduce((accum: any, cur: any) => {
                    if (!accum[cur.col]) {
                        accum[cur.col] = []
                    } 
                    accum[cur.col] = accum[cur.col].concat(cur.data)
                    return accum
                },{})
            const rows: any = this.rowDataRefs.map(r => this.drill(totals[r], `${this.getColumnLabel(r)} | All Male`))
            this.sortIndexes[sortIndex] = [
                [table.td('All'), table.td('Male'), ...rows]
            ]
        },
        async setFemaleNotPregnantRows(sortIndex: number) {
            const isPregnant = (patientID: number) => this.aggregations
                .filter((a: any) => ['Pregnant', 'Breastfeeding'].includes(a.group))
                .reduce((accum: any, cur: any) => accum.concat(cur.data || []), [])
                .includes(patientID)

            const totals = this.aggregations
                .filter((a: any) => a.category === 'F' && !['Pregnant', 'Breastfeeding'].includes(a.group))
                .reduce((accum: any, cur: any) => {
                    if (!accum[cur.col]) accum[cur.col] = []
                    accum[cur.col] = accum[cur.col].concat( cur.data.filter((i: any) => !isPregnant(i)))
                    return accum
                }, {})
            const rows: any = this.rowDataRefs.map(r => this.drill(totals[r], `${this.getColumnLabel(r)} | FNP`))
            this.sortIndexes[sortIndex] = [
                [ table.td('All'), table.td('FNP'), ...rows ]
            ]
        },
        setFemaleRows(sortIndex: number) {
            this.report.setGender('female')
            return this.setRows('F', AGE_GROUPS, (group: string, otherColumns: any) =>
                [ table.td(group), table.td('Female'), ...otherColumns ], sortIndex
            )
        },
        setMaleRows(sortIndex: number) {
            this.report.setGender('male')
            return this.setRows('M', AGE_GROUPS, (group: string, otherColumns: any) =>
                [ table.td(group), table.td('Male'), ...otherColumns ], sortIndex
            )
        },
        setFemalePregnantRows(sortIndex: number) {
            this.report.setGender('pregnant')
            return this.setRows('F', ['Pregnant'], (_: string, otherColumns: any) =>
                [ table.td('All'), table.td('FP'), ...otherColumns], sortIndex
            )
        },
        setFemaleBreastFeedingRows(sortIndex: number) {
            this.report.setGender('breastfeeding')
            return this.setRows('F', ['Breastfeeding'], (_: string, otherColumns: any) =>
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
                    const value = async (prop: string) => this.getValue(
                        prop, category, this.ageGroupCohort[group]
                    )
                    txNew = await value('tx_new')
                    txCurr= await value('tx_curr')
                    txGivenIpt = await value('tx_given_ipt')
                    txScreenTB = await value('tx_screened_for_tb')
                }

                this.addAggregation('txNew', group, category, txNew)
                this.addAggregation('txCurr', group, category, txCurr)
                this.addAggregation('txGivenIpt', group, category, txGivenIpt)    
                this.addAggregation('txScreenTB', group, category, txScreenTB)

                if (!this.sortIndexes[sortIndex]) this.sortIndexes[sortIndex] = []

                switch(this.report.getGender()) {
                    case 'breastfeeding':
                        this.report.setAgeGroup('All')
                        this.report.setGender('Fbf')
                        break
                    case 'pregnant':
                        this.report.setAgeGroup('All')
                        this.report.setGender('FP')
                        break
                }

                const regimens: any = await this.getRegimenRows(category, group)

                this.sortIndexes[sortIndex].push(onRow(group, [
                    this.drill(txNew, `Tx new (new on ART) | ${group} | ${category}`),
                    this.drill(txCurr, `Tx curr (receiving ART) | ${group} | ${category}`),
                    this.drill(txGivenIpt, `TX curr (received IPT) | ${group} | ${category}`),
                    this.drill(txScreenTB, `TX curr (screened for TB) | ${group} | ${category}`),
                    ...regimens
                ]))
            }
        },
        setHeaderInfoList(totalAlive: Array<any>) {
            this.headerList = [
                { 
                    label: 'Total Alive and on ART', 
                    value: totalAlive.length,
                    other: {
                        onclick: () => this.runTableDrill(totalAlive, 'Total Alive on ART')
                    }
                }
            ]
        },
        async validateReport() {
            const totalAlive = this.getTotals((i: any) => i.col === 'txCurr' && !['Pregnant', 'Breastfeeding'].includes(i.group))
            this.setHeaderInfoList(totalAlive)
            const validations: any = {
                'total_alive_and_on_art' : {
                    param: totalAlive.length,
                    check: (i: number, p: number) => i != p,
                    error: (i: number, p: number) => `
                        Total alive of <b>${p}</b>
                        Does not match total alive of <b>${i}</b> on MOH report
                    `
                }
            }
            const s = this.mohCohort.validateIndicators(validations, (errors: string[]) => this.errors = errors)
            if (s === -1) this.errors = ['Report not validated. Run the MoH cohort report for similar reporting period and then run this report']
        }
    }
})
</script>
