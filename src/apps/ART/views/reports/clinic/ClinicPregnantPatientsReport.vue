<template>
    <report-template
        :title="title"
        :period="period"
        :rows="rows" 
        :fields="fields"
        :columns="columns"
        :reportReady="reportReady"
        :isLoading="isLoading"
        :encryptPDF="true"
        :onReportConfiguration="onPeriod"
        report-prefix="Clinic"
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
        title: 'Clinic Pregnant patients report',
        totalClients: [],
        rows: [] as Array<any>,
        reportReady: false as boolean,
        isLoading: false as boolean,
        columns: [
            [
                table.thTxt('ARV#'),
                table.thTxt('First name', { csvExportable : false, pdfExportable: true }),
                table.thTxt('Last name' , { csvExportable: false, pdfExportable: true }),
                table.thTxt('Birthdate')
            ]
        ]
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.rows = []
            this.report = new PatientReportService()
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.report.setOccupation(config.occupation)
            this.period = this.report.getDateIntervalPeriod()
            this.setRows((await this.report.getPregnantWomen()))
        },
        async setRows(data: Array<any>) {
            this.sortByArvNumber(data).forEach((d: any) => {
               this.rows.push([
                    table.td(d.arv_number),
                    table.td(d.given_name),
                    table.td(d.family_name),
                    table.tdDate(d.birthdate)
               ])
            })
        }
    }
})
</script>
