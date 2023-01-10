<template>
    <ion-page>
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :fields="fields"
            :columns="columns"
            reportPrefix="PEPFAR"
            :config="{
                showIndex: true
            }"
            :validationErrors="errors"
            :showValidationStatus="canValidate"
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
import { REGIMENS } from "@/apps/ART/services/reports/regimen_report_service"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate, IonPage },
    data: () => ({
        title: 'PEPFAR Disaggregated Report',
        headerList: [] as Option[],
        errors: [] as string[],
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
        aggregations: [] as Array<any>,
        mohCohort: {} as any,
        maleFemaleAgeGroupData: {} as any,
        canValidate: false as boolean,
        sortIndexes: {} as Record<string | number, Array<any>>,
        initiated: false as boolean
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
            this.errors = []
            this.maleFemaleAgeGroupData = {}
            this.sortIndexes = {}
            this.aggregations = []
            this.canValidate = false
            this.report = new DisaggregatedReportService()
            this.mohCohort = new MohCohortReportService()
            this.report.setQuarter('pepfar')
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.mohCohort.setStartDate(config.start_date)
            this.mohCohort.setEndDate(config.end_date)
            this.period = this.report.getDateIntervalPeriod()
            this.report.setRebuildOutcome(!this.initiated || rebuildCache)
            const isInit = await this.report.init()
            if (!isInit) {
                return toastWarning('Unable to initialise report')
            }
            await this.setTableRows()
            this.setHeaderInfoList()
            this.canValidate = true
            this.initiated = true
        },
        getTotals(compareFunction: Function){
            return this.aggregations
                .filter(i => compareFunction(i))
                .reduce((items, item) => items.concat(item.data), [])
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
        setHeaderInfoList() {
            const totalAlive = this.getTotals((i: any) => i.col === 'txCurr' && i.gender.match(/male|female/i))
            this.headerList = [
                { 
                    label: 'Total Alive and on ART', 
                    value: totalAlive.length,
                    other: {
                        onclick: () => this.runTableDrill(totalAlive, 'Total Alive and on ART')
                    }
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
        getColumnLabel(col: string) {
            return col in this.dataRefLabels ? this.dataRefLabels[col] : col
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
                    const value = (prop: string) => this.getValue(
                        prop, category, this.maleFemaleAgeGroupData[group]
                    )
                    txNew = await value('tx_new')
                    txCurr= await value('tx_curr')
                    txGivenIpt = await value('tx_given_ipt')
                    txScreenTB = await value('tx_screened_for_tb')
                    this.addAggregation('txNew', gender, txNew)
                    this.addAggregation('txCurr',gender, txCurr)
                    this.addAggregation('txGivenIpt',gender, txGivenIpt)
                    this.addAggregation('txScreenTB',gender, txScreenTB)
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
        validateReport() {
            const validations: any = {
                'initiated_on_art_first_time': {
                    param: this.getTotals((i: any) => i.col === 'txNew' && i.gender.match(/male|female/i)).length,
                    check: (i: number, p: number) => i != p,
                    error: (i: number, p: number) => `
                        MOH cohort initiated on ART first time <b>(${i})</b> is not matching Tx New <b>(${p})</b>
                    `
                },
                'initial_pregnant_females_all_ages': {
                    param: this.getTotals((i: any) => i.col === 'txNew' && i.gender === 'FP').length,
                    check: (i: number, p: number) => i != p,
                    error: (i: number, p: number) => `
                        MOH cohort initial pregnant females all ages 
                        <b>(${i})</b> is not matching with TX new Pregnant women <b>${p}</b>
                    `
                },
                'males_initiated_on_art_first_time': {
                    param: this.getTotals((i: any) => i.col === 'txNew' && i.gender === 'Male').length,
                    check: (i: number, p: number) => i != p,
                    error: (i: number, p: number) => `
                        MoH Cohort males initiated on ART first time <b>(${i})</b>
                        is not matching with TX new All male <b>(${p})</b>
                    `
                }
            }
            const s = this.mohCohort.validateIndicators(validations, (errors: string[]) => this.errors = errors)
            if (s === -1) this.errors = ['Report not validated. Run the MoH cohort report for similar reporting period and then run this report']
        }
    }
})
</script>
