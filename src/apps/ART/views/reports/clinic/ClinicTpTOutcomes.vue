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
import { ClinicReportService } from '@/apps/ART/services/reports/clinic_report_service'
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { uniq } from 'lodash'

const REPORT_INDICATORS = [    
    { indicator: "started_tpt_new", label: (context: string) => `Started (New on ART) ${context}`},
    { indicator: "started_tpt_prev", label: (context: string) => `Started (Previous on ART) ${context}`},
    { indicator: "completed_tpt_new", label : (context: string) => `Completed (New on ART) ${context}`},
    { indicator: "completed_tpt_prev", label : (context: string) => `Completed (Previous on ART) ${context}`},
    { indicator: "not_completed_tpt",  label : (context: string) => `Not completed ${context}`},
    { indicator: "died", label :(context: string) => `Died on ${context}`},
    { indicator: "defaulted", label :(context: string) => `Defaulted ${context}`},
    { indicator: "stopped", label :(context: string) => `Stopped ${context}`},
    { indicator: "transfer_out", label :(context: string) => `Transfer out with ${context}`},
    { indicator: "confirmed_tb", label :(context: string) => `Confirmed TB on ${context}`},
    { indicator: "pregnant",  label :(context: string) => `Pregnant on ${context}`},
    { indicator: "breast_feeding", label:(context: string) => `Breastfeeding ${context}`},
    { indicator: "skin_rash", label :(context: string) => `Skin rash ${context}`},
    { indicator: "peripheral_neuropathy", label :(context: string) => `Peripheral neuropathy ${context}`},
    { indicator: "yellow_eyes", label: (context: string) => `Yellow eyes ${context}`},
    { indicator: "nausea", label: (context: string) => `Nausea ${context}`},
    { indicator: "dizziness", label: (context: string) => `Dizziness ${context}`}
]

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'TPT Outcome',
        cohort: {} as any,
        rows: [] as Array<any>,
        columns: [
            [       
                table.thTxt('Age group'),
                table.thTxt('TPT Type'),
                table.thTxt('Started TPT (New on ART)'),
                table.thTxt('Started TPT (Previous on ART)'),
                table.thTxt('Completed TPT (New on ART)'),
                table.thTxt('Completed TPT (Previous on ART)'),
                table.thTxt('Not completed TPT'),
                table.thTxt('Died'),
                table.thTxt('Defaulted'),
                table.thTxt('Stopped ART'),
                table.thTxt('TO'),
                table.thTxt('Confirmed TB '),
                table.thTxt('Pregnant'),
                table.thTxt('Breastfeeding'),
                table.thTxt('Skin rash'),
                table.thTxt('Peripheral neuropathy'),
                table.thTxt('Yellow eyes'),
                table.thTxt('Nausea'),
                table.thTxt('Dizziness')
            ]
        ]
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.rows = []
            this.report = new ClinicReportService()
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.report.setOccupation(config.occupation)
            this.period = this.report.getDateIntervalPeriod()
            this.cohort = (await this.report.getTtpOutcomes() || [])
            this.setRows()
            this.setMaleTotalsRow()
            await this.setFemaleAggregations()
        },
        setMaleTotalsRow() {
            const aggregations = this.cohort.reduce((totals: any, data: any) => {
                REPORT_INDICATORS.forEach((meta: any) => {
                    if (!totals[meta.indicator]) {
                        totals[meta.indicator] = []
                    }
                    if (data[meta.indicator]) {
                        totals[meta.indicator] = totals[meta.indicator].concat(
                            data[meta.indicator].filter((p: any) => p.gender === 'M').map((p: any) => p.patient_id)
                        )
                    }
                })
                return totals
            }, {})
            this.rows.push([
                table.td("All"),
                table.td("Male"),
                ...REPORT_INDICATORS.map((meta: any) => {
                    return this.drill(aggregations[meta.indicator], meta.label("All"))
                })
            ])
        },
        async setFemaleAggregations() {
            const allFemale = this.cohort.reduce((totals: any, data: any) => {
                REPORT_INDICATORS.forEach((meta: any) => {
                    if (!totals[meta.indicator]) {
                        totals[meta.indicator] = []
                    }
                    if (data[meta.indicator]) {
                        totals[meta.indicator] = totals[meta.indicator].concat(
                            data[meta.indicator].filter((p: any) => p.gender === 'F').map((p: any) => p.patient_id)
                        )
                        totals.all = totals.all.concat(totals[meta.indicator])
                    }
                })
                return totals
            }, 
            {
                all: []
            })
            const fp = this.cohort.reduce((a: any, c: any) => uniq(a.concat(c.pregnant||[])), [])
            const fbf = this.cohort.reduce((a: any, c: any) => uniq(a.concat(c.breast_feeding||[])), [])
            const allFp = fp.concat(fbf)
            this.rows.push([
                table.td('All'),
                table.td('FP'),
                ...REPORT_INDICATORS.map((meta: any) => {
                    return this.drill(
                        allFemale[meta.indicator].filter((p: any) => fp.includes(p)),
                        meta.label('All FP')
                    )
                })
            ])
            this.rows.push([
                table.td('All'),
                table.td('FNP'),
                ...REPORT_INDICATORS.map((meta: any) => {
                    return this.drill(
                        allFemale[meta.indicator].filter((p: any) => !allFp.includes(p)),
                        meta.label('All FNP')
                    )
                })
            ])
            this.rows.push([
                table.td('All'),
                table.td('FBF'),
                ...REPORT_INDICATORS.map((meta: any) => {
                    return this.drill(
                        allFemale[meta.indicator].filter((p: any) => fbf.includes(p)),
                        meta.label('All FBF')
                    )
                })
            ])
        },
        setRows() {
            const sixH: any = []
            const threeHP: any = []
            this.cohort.forEach((data: any) => {
                const row = [
                    table.td(data.age_group),
                    table.td(data.tpt_type),
                    ...REPORT_INDICATORS.map((meta: any) => {
                        return this.drill(
                            (data[meta.indicator]||[]).map((p: any) => p.patient_id), 
                            meta.label(data.tpt_type)
                        )
                    })
                ]
                data.tpt_type === '3HP' ? threeHP.push(row) : sixH.push(row)
            })
            this.rows = threeHP.concat(sixH)
        }
    }
})
</script>
