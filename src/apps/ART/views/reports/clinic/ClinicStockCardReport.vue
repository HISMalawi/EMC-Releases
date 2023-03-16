<template>
    <ion-page>
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :fields="fields"
            :columns="columns"
            reportPrefix="Clinic"
            :onReportConfiguration="onPeriod"
            > 
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { StockReportService } from "@/apps/ART/services/reports/stock_report_service"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { toNumString } from '@/utils/Strs'

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'HIV Stock report',
        rows: [] as Array<any>,
        stock: [] as Array<any>,
        columns: [
            [
                table.thTxt('Medication'),
                table.thTxt('Quantity Dispensed (Tins/Pallets)'),
                table.thTxt('Stock on hand(Tins/Pallets)')
            ]
        ]
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.report = new StockReportService();
            this.rows = [];
            this.report.setStartDate(config.start_date);
            this.report.setEndDate(config.end_date);
            this.period = this.report.getDateIntervalPeriod();
            await this.report.loadStock();
            this.report.groupStock().forEach((s: any) => {
                this.rows.push([
                    table.td(s.drugName),
                    table.td(s.quantintyDispensed),
                    table.td(
                        (s.quantityIsTabs 
                        ? `${toNumString(s.currentQuantity)} (tabs)`
                        : toNumString(s.currentQuantity)), 
                        { sortValue: parseInt(s.currentQuantity)})
                ])
            })
        }
    }
})
</script>
