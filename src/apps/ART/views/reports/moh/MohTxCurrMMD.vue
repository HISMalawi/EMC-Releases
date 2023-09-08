<template>
    <ion-page>
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :fields="fields"
            :columns="columns"
            reportPrefix="MoH"
            :config="{
                showIndex: true
            }"
            :validationErrors="errors"
            :showValidationStatus="showStatus"
            :headerInfoList="headerInfoList"
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
import { Option } from '@/components/Forms/FieldInterface'
import { IonPage } from "@ionic/vue"
import { MohCohortReportService } from "@/apps/ART/services/reports/moh_cohort_service"
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate, IonPage },
    data: () => ({
        title: 'Moh TX CURR MMD Report',
        cohort: {} as any,
        rows: [] as Array<any>,
        headerInfoList: [] as Option[],
        totals: new Set(),
        mohCohort: {} as any,
        errors: [] as string[],
        showStatus: false as boolean,
        columns:  [
            [
                table.thTxt('Age group'),
                table.thTxt('Gender'),
                table.thNum('# of clients on <3 months of ARVs'),
                table.thNum('# of clients on 3 - 5 months of ARVs'),
                table.thNum('# of clients on >= 6 months of ARVs')
            ]
        ],
        canValidate: false as boolean
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    watch: {
        async canValidate(doIt: boolean) {
            if (doIt) await this.validateReport()
        }
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.canValidate = false
            this.rows = []
            this.errors = []
            this.showStatus = false
            this.report = new TxReportService()
            this.mohCohort = new MohCohortReportService()
            this.mohCohort.setStartDate(config.start_date)
            this.mohCohort.setEndDate(config.end_date)
            this.mohCohort.setOccupation(config.occupation)
            this.report.setOrg('moh')
            this.report.setOccupation(config.occupation)
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.period = this.report.getDateIntervalPeriod()
            await this.setRows()
            this.setHeaderInfoList()
            this.canValidate = true
            this.showStatus = true
        },
        setHeaderInfoList() {
            this.headerInfoList = [
                { 
                    label: 'Total clients', 
                    value: this.totals.size,
                    other: {
                        onclick: () => this.runTableDrill(Array.from(this.totals), 'Total Clients')
                    }
                }
            ]
        },
        getValues(patients: Record<string, Array<any>>, context: string) {
            const underThreeMonths: Array<any> = []
            const betweenThreeAndFiveMonths: Array<any> = []
            const overSixMonths: Array<any> = []

            for (const patientId in patients) {
                const data: any = patients[patientId]
                const pDays = data.prescribed_days
                this.totals.add(patientId)

                if(pDays < 90) {
                    underThreeMonths.push(patientId)
                }

                if (pDays >= 90 && pDays <= 150) {
                    betweenThreeAndFiveMonths.push(patientId)
                }

                if (pDays > 150) {
                    overSixMonths.push(patientId)
                }
            }
            return [
                this.drill(underThreeMonths, `${context} < 3 months of Arvs`),
                this.drill(betweenThreeAndFiveMonths, `${context} 3-5 months of Arvs`),
                this.drill(overSixMonths, `${context} > 6 months months of Arvs`)
            ]
        },
        async setRows() {
            let minAge = 0
            let maxAge = 0
            const males = []
            const females = []

            for(const i in AGE_GROUPS) {
                const group = AGE_GROUPS[i]
                if (group === '<1 year') {
                    minAge = 0
                    maxAge = 0
                } else if (group === '90 plus years') {
                    minAge = 90
                    maxAge = 10000
                } else {
                    const [min, max] = group.split('-')
                    minAge = parseInt(min)
                    maxAge = parseInt(max)
                }
                const res = await this.report.getTxCurrMMDReport(minAge, maxAge)
                this.report.initArvRefillPeriod(false)
                if (res) {
                    females.push([
                        table.td(group),
                        table.td('Female'),
                        ...this.getValues(res['Female'], `${group} (F)`)
                    ])
                    males.push([
                        table.td(group),
                        table.td('Male'),
                        ...this.getValues(res['Male'], `${group} (M)`)
                    ])
                } else {
                    females.push([
                        table.td(group), 
                        table.td('Female'), 
                        table.td(0), 
                        table.td(0), 
                        table.td(0)
                    ])
                    males.push([
                        table.td(group), 
                        table.td('Male'), 
                        table.td(0), 
                        table.td(0), 
                        table.td(0)
                    ])
                }
                this.rows = [...females, ...males]
            }
        },
        validateReport() {
            const validations: any = {
                'total_alive_and_on_art': {
                    param: this.totals.size,
                    check: (i: number, p: number) => i != p,
                    error: (i: number, p: number) => `
                        MoH cohort Alive and on ART clients <b>(${i})</b> is not
                        matching with total TX MMD clients <b(${p}).</b>
                    `
                }
            }
            const s = this.mohCohort.validateIndicators(validations, (errors: string[]) => this.errors = errors)
            if (s === -1) this.errors= ['Report not validated. Run the MoH cohort report for similar reporting period and then run this report']
        }
    }
})
</script>
