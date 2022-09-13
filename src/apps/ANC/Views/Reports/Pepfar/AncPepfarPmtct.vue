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
            reportPrefix="Pepfar"
            :onReportConfiguration="onPeriod"
            > 
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import { AncPepfarReportService } from '@/apps/ANC/Services/anc_pepfar_report_service'
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { toastDanger } from '@/utils/Alerts'
import HisDate from "@/utils/Date"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'PMTCT STAT',
        rows: [] as Array<any>,
        columns: [
            [       
                table.thTxt('Age group'),
                table.thTxt('Gender'),
                table.thTxt('Known positive'),
                table.thTxt('Newly Tested Positives'),
                table.thTxt('New Negatives'),
                table.thTxt('Recent negative'),
                table.thTxt('Not Done'),
                table.thTxt('New on ART	'),
                table.thTxt('Already on ART')
            ]
        ]
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.rows = []
            const d = (d: string) => HisDate.toStandardHisDisplayFormat(d)
            this.report = new AncPepfarReportService()
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.period = `${d(config.start_date)} - ${d(config.end_date)}`
            await this.report.generatePmtctStatArt()
                .then((data: any) => {
                    data.forEach((d: any) => {
                        this.rows.push([
                            table.td(d.age_group),
                            table.td('Female'),
                            this.drill(d.known_positive, `Known positive ${d.age_group}`),
                            this.drill(d.newly_tested_positives, `Newly Tested Positives ${d.age_group}`),
                            this.drill(d.new_negatives, `New Negatives ${d.age_group}`),
                            this.drill(d.recent_negatives, `Recent negative ${d.age_group}`),
                            this.drill(d.not_done, `Not Done ${d.age_group}`),
                            this.drill(d.new_on_art, `New on ART ${d.age_group}`),
                            this.drill(d.already_on_art, `Already on ART ${d.age_group}`)
                        ])
                    })
                }).catch((e: any) => toastDanger(`${e}`))
        }
    }
})
</script>
