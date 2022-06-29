<template>
    <report-template
        :title="title"
        :period="period"
        :rows="rows" 
        :fields="fields"
        :columns="columns"
        :onReportConfiguration="onPeriod"
        :config="{
                showIndex: false
        }"
        > 
    </report-template>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { RegimenReportService } from "@/apps/ART/services/reports/regimen_report_service"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'Clinic Regimen Report',
        rows: [] as Array<any>,
        columns: [
            [
                table.thTxt('ARV#'),
                table.thTxt('Gender'),
                table.thTxt('DOB'),
                table.thTxt('ART start date'),
                table.thTxt('Weight(Kg)'),
                table.thTxt('Curr.Reg'),
                table.thTxt('ARVs'), 
                table.thTxt('Curr.reg dispensed'),
                table.thTxt('VL result'),
                table.thTxt('Date of VL result')
            ]
        ]
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.rows = []
            this.report = new RegimenReportService()
            this.report.setReportType('moh')
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.period = this.report.getDateIntervalPeriod()
            this.setRows((await this.report.getRegimenReport()))
        },
        setRows(data: any) {
            console.log(data)
            this.sortByArvNumber(Object.values(data)).map((d: any) => {
                let lastDispenseDate = ''
                const medications = d.medication.map((m: any) => {
                    lastDispenseDate = this.toDate(m.start_date)
                    return `${m.medication} (${m.quantity})`
                })
                this.rows.push([
                    table.td(d.arv_number),
                    table.td(d.gender),
                    table.tdDate(d.birthdate),
                    table.tdDate(d.art_start_date),
                    table.td(d.current_weight),
                    table.td(d.current_regimen),
                    table.td(medications.join(', ')),
                    table.tdDate(lastDispenseDate),
                    table.td(d.vl_result),
                    table.tdDate(d.vl_result_date)
                ])
            })
        }
    }
})
</script>
