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
import { AncPepfarReportService } from '@/apps/ANC/Services/anc_pepfar_report_service'
import table from "@/components/DataViews/tables/ReportDataTable"
import AncReport from "@/apps/ANC/composables/AncReport"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import HisDate from "@/utils/Date"
export default defineComponent({
    components: { ReportTemplate },
    setup() {
        const r =  AncReport('PMTCT STAT')
        const { data, drill } = r
        data.columns = [
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
        const d = (date: string) => HisDate.toStandardHisDisplayFormat(date)

        const onPeriod = async (_: any, config: any) => {
            data.rows = []
            const report = new AncPepfarReportService()
            report.setStartDate(config.start_date)
            report.setEndDate(config.end_date)
            data.period = `${d(config.start_date)} to ${d(config.end_date)}`
            const stats = await report.generatePmtctStatArt()
            stats.forEach((d: any) => {
                data.rows.push([
                    table.td(d.age_group),
                    table.td('Female'),
                    drill(d.known_positive, { title: `Known positive ${d.age_group}`}),
                    drill(d.newly_tested_positives, { title: `Newly Tested Positives ${d.age_group}`}),
                    drill(d.new_negatives, { title: `New Negatives ${d.age_group}`}),
                    drill(d.recent_negatives, { title: `Recent negative ${d.age_group}`}),
                    drill(d.not_done, { title: `Not Done ${d.age_group}`}),
                    drill(d.new_on_art, { title: `New on ART ${d.age_group}`}),
                    drill(d.already_on_art, { title: `Already on ART ${d.age_group}` })
                ])
            })
        }
        return {
            ...r,
            onPeriod
        }
    }
})
</script>
