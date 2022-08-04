<template>
    <ion-page> 
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :fields="fields"
            :columns="columns"
            :headerInfoList="headerList"
            :config="{
                showIndex: true
            }"
            :onReportConfiguration="onPeriod"
        />
    </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage } from "@ionic/vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import { RadiologyReportService } from "@/apps/RADIOLOGY/services/radiology_report_service"
import { toastDanger } from '@/utils/Alerts'

export default defineComponent({
    mixins: [ReportMixin],
    components: {
        IonPage,
        ReportTemplate
    },
    data: () => ({
        title: 'Daily Examination Report',
        rows: [] as any,
        service: {} as any,
        columns: [
            [
                table.thTxt('Category'),
                table.thTxt('Exam'),
                table.thTxt('Total')
            ]
        ]
    }),
    mounted() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        onPeriod(_: any, config: any) {
            this.service = new RadiologyReportService(
                'DAILY REPORT', config.start_date, config.end_date,
            )
            const req = this.service.requestReport()
            if (typeof req === 'object' && req.then) {
                req.then((data: any) => {
                    data.forEach((d: any) => {
                        this.rows.push([
                            table.td(d.exam_name),
                            table.td(d.exam_value_name),
                            table.td(d.exam_total)
                        ])
                    })
                }).catch((e: any) => toastDanger(`${e}`))
            }
        }
    }
})
</script>
