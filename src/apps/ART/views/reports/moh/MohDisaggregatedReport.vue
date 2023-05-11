<template>
    <ion-page>
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :columns="columns"
            :headerInfoList="headerList"
            reportPrefix="MoH"
            :config="{
                showIndex: true
            }"
            :validationErrors="errors"
            :showValidationStatus="canValidate"
            :hasServerSideCaching="true"
            :enabledPDFHorizontalPageBreak="true"
            :onReportConfiguration="onPeriod"
            :onDefaultConfiguration="onLoadDefault"
            >
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import { DisaggregatedReportService } from "@/apps/ART/services/reports/disaggregated_service"
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
                table.thNum('TX curr (receiving ART)'),
                table.thNum('TX curr (received IPT)'),
                table.thNum('TX curr (screened for TB)'),
                ...(REGIMENS.map(r => table.thNum(r))),
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
        maleFemaleAgeGroupData: {} as any,
        headerList: [] as Array<Option>,
        canValidate: false as boolean,
        onLoadDefault: null as any,
        sortIndexes: {} as Record<string | number, Array<any>>
    }),
    async created() {
        const { query }  = this.$route
        /** Check for default url params for this report */
        if (query.start_date && query.end_date && query.quarter) {
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
            this.maleFemaleAgeGroupData = {}
            this.aggregations = []
            this.sortIndexes = {}
            this.errors = []
            this.report = new DisaggregatedReportService()
            this.mohCohort = new MohCohortReportService()
            if (form.quarter) {
                this.mohCohort.setQuarter(form.quarter.label)
                this.mohCohort.setStartDate(form.quarter.other.start)
                this.mohCohort.setEndDate(form.quarter.other.end)
                this.report.setQuarter(form.quarter.label)
                this.report.setStartDate(form.quarter.other.start)
                this.report.setEndDate(form.quarter.other.end)
                this.period = form.quarter.label === 'Custom'
                    ? this.report.getDateIntervalPeriod()
                    : form.quarter.label
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
        getTotals(compareFunction: (value: any) => boolean){
            return this.aggregations
                .filter((i: any) => compareFunction(i))
                .reduce((accum: any, cur: any) => accum.concat(cur.data), [])
        },
        addAggregation(col: string, gender: string, data = []) {
            this.aggregations.push({ col, gender, data })
        },
        async getRegimenRows(group: string, gender: string) {
            let totals: any = []
            const row: any = []
            const distribution = await this.report.getRegimenDistribution()
            const refs = [...REGIMENS, 'N/A']
            refs.forEach((i: any) => {
                if (distribution[i]) totals = totals.concat(distribution[i])
                row.push(this.drill(distribution[i], `Regimen ${i} | ${group} | ${gender}`))
                this.addAggregation(i, gender, distribution[i])
            })
            row.push(this.drill(totals, `Regimen Totals | ${group} | ${gender}`))
            this.addAggregation('regimenTotals', gender, totals)
            return row
        },
        getValue(prop: string, gender: string, data: any) {
            switch(prop) {
                case 'tx_given_ipt':
                    return this.report.getTxIpt()
                case 'tx_screened_for_tb':
                    return this.report.getTxCurrTB()
                default:
                    return gender in data ? data[gender][prop] : []
            }
        },
        setTotalMalesRow(sortIndex: number) {
            const maleTD = (column: string, columnDescription: string) => {
                const data = this.aggregations.filter((a: any) => a.gender === 'Male' && a.col === column)
                    .reduce((accum: any, cur: any) => accum.concat(cur.data), []) 
                return this.drill(data, columnDescription)
            }
            const rows: any = this.rowDataRefs.map(columnName => 
                maleTD(columnName, `${this.getColumnLabel(columnName)} | All Male`)
            )
            this.sortIndexes[sortIndex] = [[table.td('All'), table.td('Male'), ...rows]]
        },
        setFemaleNotPregnantRows(sortIndex: number) {
            // Gets all pregnant females from a particular column and checks if given patient ID 
            // Is in the list
            const isPregnant = (patientID: number, column: string) => this.aggregations
                .filter((a: any) => a.gender.match(/fp|fbf/i) && a.col === column)
                .reduce((accum: any, cur: any) => accum.concat(cur.data || []), [])
                .includes(patientID)
            // Get total sum of all females by a particular column
            const fnpTD = (column: string, columnDescription: string) => {
                const data = this.aggregations.filter((a: any) => a.gender === 'Female' && a.col === column)
                    .reduce((accum: any, cur: any) => accum.concat(cur.data.filter((i: any) => !isPregnant(i, column))), [])
                return this.drill(data, columnDescription)
            }
            const rows: any = this.rowDataRefs.map(column => 
                fnpTD(column, `${this.getColumnLabel(column)} | FNP`)
            )
            this.sortIndexes[sortIndex] = [[table.td('All'), table.td('FNP'), ...rows]]
        },
        setFemaleRows(sortIndex: number) {
            this.report.setGender('female')
            return this.setRows(sortIndex, 'F', AGE_GROUPS, 'Female')
        },
        setMaleRows(sortIndex: number) {
            this.report.setGender('male')
            return this.setRows(sortIndex, 'M', AGE_GROUPS, 'Male')
        },
        setFemalePregnantRows(sortIndex: number) {
            this.report.setGender('pregnant')
            return this.setRows(sortIndex, 'F', ['All'], 'FP', 'Pregnant')
        },
        setFemaleBreastFeedingRows(sortIndex: number) {
            this.report.setGender('breastfeeding')
            return this.setRows(sortIndex, 'F', ['All'], 'FBf', 'Breastfeeding')
        },
        async setRows(sortIndex: number, category: string, ageGroups: string[], gender: string, otherAgeGroup='') {
            for(const i in ageGroups) {
                let txNew = []
                let txCurr= []
                let txGivenIpt = []
                let txScreenTB = []
                const group = otherAgeGroup || ageGroups[i]
                this.report.setAgeGroup(group)

                if (!(group in this.maleFemaleAgeGroupData)) {
                    const cohort = await this.report.getCohort()
                    this.report.setRebuildOutcome(false)
                    this.maleFemaleAgeGroupData[group] = !isEmpty(cohort) ? cohort[group] : {}
                }

                if (!isEmpty(this.maleFemaleAgeGroupData[group])) {
                    const value = async (prop: string) => this.getValue(
                        prop, category, this.maleFemaleAgeGroupData[group]
                    )
                    txNew = await value('tx_new')
                    txCurr= await value('tx_curr')
                    txGivenIpt = await value('tx_given_ipt')
                    txScreenTB = await value('tx_screened_for_tb')
                    this.addAggregation('txNew', gender, txNew)
                    this.addAggregation('txCurr', gender, txCurr)
                    this.addAggregation('txGivenIpt', gender, txGivenIpt)    
                    this.addAggregation('txScreenTB', gender, txScreenTB)
                }

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

                if (!this.sortIndexes[sortIndex]) this.sortIndexes[sortIndex] = []

                this.sortIndexes[sortIndex].push([
                    table.td(ageGroups[i]),
                    table.td(this.formatGender(gender)),
                    this.drill(txNew, `Tx new (new on ART) | ${group} | ${gender}`),
                    this.drill(txCurr, `Tx curr (receiving ART) | ${group} | ${gender}`),
                    this.drill(txGivenIpt, `TX curr (received IPT) | ${group} | ${gender}`),
                    this.drill(txScreenTB, `TX curr (screened for TB) | ${group} | ${gender}`),
                    ...(await this.getRegimenRows(group, gender))
                ])
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
            const totalAlive = this.getTotals((i: any) => i.col === 'txCurr' && i.gender.match(/male|female/i))
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
