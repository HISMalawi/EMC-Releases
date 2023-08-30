<template>
    <report-template
        :title="title"
        :period="period"
        :rows="rows" 
        :fields="fields"
        :columns="columns"
        :reportReady="reportReady"
        :isLoading="isLoading"
        :onReportConfiguration="onPeriod"
        :encryptPDF="true"
        > 
    </report-template>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'Clinic External consultation clients',
        totalClients: [],
        rows: [] as Array<any>,
        reportReady: false,
        isLoading: false as boolean,
        columns: [
            [
                table.thTxt('NPID'), 
                table.thTxt('Client Type'), 
                table.thTxt('First name', {csvExportable: false, pdfExportable: true}),
                table.thTxt('Last name', {csvExportable: false, pdfExportable: true}), 
                table.thTxt('Gender'),
                table.thTxt('DOB'),
                table.thTxt('Date set')
            ]
        ]
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.reportReady = true
            this.isLoading = true
            this.rows = []
            this.report = new PatientReportService()
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.report.setOccupation(config.occupation)
            this.period = this.report.getDateIntervalPeriod()
            this.setRows((await this.report.getExternalConsultationClients()))
            this.isLoading = false
        },
        async setRows(data: Array<any>) {
            data.forEach((d: any) => {
                this.rows.push([
                    table.td(d.npid),
                    table.td(d.patient_type),
                    table.td(d.given_name),
                    table.td(d.family_name),
                    table.td(this.formatGender(d.gender)),
                    table.tdDate(d.birthdate),
                    table.tdDate(d.date_set)
                ])
            })
        }
    }
})
</script>
