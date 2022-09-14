<template>
    <report-template :title="title" :rows="rows" :columns="columns">
    </report-template>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { StockReportService } from "@/apps/ART/services/reports/stock_report_service"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/BasicReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'Stock report',
        rows: [] as Array<any>,
        stock: [] as Array<any>,
        columns: [
            [
                table.thTxt('Product Code'),
                table.thTxt('Medication'),
                table.thTxt('Units'),
                table.thTxt('Closing Balance'),
                table.thTxt('Losses'),
                table.thTxt('(+ve Adjustment)'),
                table.thTxt('(-ve Adjustment)'),
                table.thTxt('Quantity Used'),
                table.thTxt('Quantity Received'),
            ]
        ]
    }),
    async created() {
        this.report = new StockReportService()
        const stocks: any[] = await this.report.getStockReport()
        stocks.forEach(s => {
            this.rows.push([
                table.td(s.product_code || ''),
                table.td(s.drug_name),
                table.td(s.units),
                table.td(s.closing_balance),
                table.td(s.losses),
                table.td(s.positive_adjustment),
                table.td(s.negative_adjustment),
                table.td(s.quantity_used),
                table.td(s.quantity_received),
            ])
        })

    },
})
</script>
