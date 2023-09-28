<template>
    <ion-page> 
        <report-template
            report-prefix="Clinic"
            title="Active clients with adverse outcomes"
            :rows="rows"
            :columns="columns"
            :showtitleOnly="true"
            :config="{
                showIndex: false
            }"
            :on-report-configuration="loadData"
        /> 
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { PatientReportService } from '@/apps/ART/services/reports/patient_report_service'
import { IonPage} from "@ionic/vue"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate, IonPage },
    data: () => ({
        rows: [] as Array<any>,
        columns: [
            [
                table.thTxt('Filing#'),
                table.thTxt('Outcome'),
                table.thTxt('Outcome date')
            ]
        ]
    }),
    methods: {
        async loadData () {
            const report = new PatientReportService()
            const data = await report.getArchivingCandidates()
            this.rows = [];
            data.forEach((data: any) => {
                this.rows.push([
                    table.td(data.filing_number),
                    table.td(data.outcome),
                    table.tdDate(data.outcome_date)
                ])
            })
        },
    },
    created(){
        return this.loadData();
    }
})
</script>
