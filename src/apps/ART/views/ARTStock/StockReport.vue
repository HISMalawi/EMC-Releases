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
                table.thTxt('Batch Number'),
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
        const stock = await this.report.loadAllTrail()
        this.createStock(stock);

    },
    methods: {
        createStock(stock: any) {
            const vals: any = {};
            stock.forEach((element: any) => {
                if (!vals[element.batch_number]) {
                    vals[element.batch_number] = {
                        'drug_name': element.drug_name,
                        'drug_id': element.drug_id,
                        'Closing balance': 0,
                        'Losses': 0,
                        'Positive adjustment': 0,
                        'Negative adjustment': 0,
                        'Quantity used': 0,
                        'Quantity receieved': 0
                    }
                }
                const stockValue = element.amount_committed_to_stock;
                vals[element.batch_number]['Closing balance'] += stockValue;
                vals[element.batch_number]['Losses'] += ["Expired", "Damaged", "Phased out", "Banned", "Missing",
                    "For trainings"].includes(element.transaction_reason) ? stockValue : 0;
                vals[element.batch_number]['Positive adjustment'] += ['Drugs delivered'].includes(element.transaction_reason) ? stockValue : 0;
                vals[element.batch_number]['Negative adjustment'] += ["Transfer to another facility/relocation"].includes(element.transaction_reason) ? stockValue : 0;
                vals[element.batch_number]['Quantity used'] += ['Drug dispensed'].includes(element.transaction_reason) ? stockValue : 0;
                vals[element.batch_number]['Quantity receieved'] += ['Drugs delivered'].includes(element.transaction_reason) ? stockValue : 0;
            });
            Object.keys(vals).forEach((s: any) => {
                this.rows.push([
                    table.td(s),
                    table.td(vals[s]['drug_name']),
                    table.td('Tins'),
                    table.tdNum(vals[s]['Closing balance']),
                    table.tdNum(vals[s]['Losses']),
                    table.tdNum(vals[s]['Positive adjustment']),
                    table.tdNum(vals[s]['Negative adjustment']),
                    table.tdNum(vals[s]['Quantity used']),
                    table.tdNum(vals[s]['Quantity receieved']),
                ])
            })
        }
    }
})
</script>
