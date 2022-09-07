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
                table.thTxt('Started TPT'),
                table.thTxt('Completed TPT'),
                table.thTxt('Not completed TPT'),
                table.thTxt('Died'),
                table.thTxt('Defaulted'),
                table.thTxt('Stopped ART'),
                table.thTxt('TO'),
                table.thTxt('Confirmed TB '),
                table.thTxt('Pregnant')
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
            this.period = this.report.getDateIntervalPeriod()
            this.cohort = (await this.report.getTtpOutcomes() || [])
            this.setRows()
        },
        setRows() {
            const sixH: any = []
            const threeHP: any = []
            this.cohort.forEach((d: any) => {
                const row = [
                    table.td(d.age_group),
                    table.td(d.tpt_type),
                    this.drill(d.started_tpt, `Started ${d.tpt_type}`),
                    this.drill(d.completed_tpt, `Completed ${d.tpt_type}`),
                    this.drill(d.not_completed_tpt, `Not completed ${d.tpt_type}`),
                    this.drill(d.died, `Died on ${d.tpt_type}`),
                    this.drill(d.defaulted, `Defaulted ${d.tpt_type}`),
                    this.drill(d.stopped, `Stopped ${d.tpt_type}`),
                    this.drill(d.transfer_out, `Transfer out with ${d.tpt_type}`),
                    this.drill(d.confirmed_tb, `Confirmed TB on ${d.tpt_type}`),
                    this.drill(d.pregnant, `Pregnant on ${d.tpt_type}`)
                ]
                d.tpt_type === '3HP' ? threeHP.push(row) : sixH.push(row)
            })
            this.rows = threeHP.concat(sixH)
        }
    }
})
</script>
