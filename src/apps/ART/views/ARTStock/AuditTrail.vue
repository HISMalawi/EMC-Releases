<template>
    <report-template
        :title="title"
        :rows="rows"
        :paginated="true"
        :customBtns="[
            {
                name: 'DATE',
                size: 'large',
                slot: 'end',
                color: 'warning',
                visible: true,
                onClick: setReport
            }
        ]"
        :columns="columns"> 
    </report-template>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { StockReportService } from "@/apps/ART/services/reports/stock_report_service"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/BasicReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { MultiStepPopupForm } from "@/utils/PopupKeyboard"
import { toastDanger } from '@/utils/Alerts'
import { loadingController, modalController } from '@ionic/core'

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'Audit trail',
        rows: [] as Array<any>,
        columns: [
            [
                table.thTxt('Product Code'),
                table.thTxt('Medication'), 
                table.thTxt('Transaction date'), 
                table.thTxt('Transaction type'),
                table.thTxt('Quantity'),
                table.thTxt('Username'),
                table.thTxt('reason')
            ]
        ]
    }),
    mounted() {
        this.setReport()
    },
    methods: {
        setReport() {
            this.rows = []
            MultiStepPopupForm(this.getDateDurationFields(),
            async (_: any, c: any) => {
                await modalController.dismiss();
                (await loadingController.create({
                    message: 'Please wait',
                    backdropDismiss: false
                })).present()
                this.report = new StockReportService()
                this.report.setStartDate(c.start_date)
                this.report.setEndDate(c.end_date)
                this.title = `Audit trail ${this.report.getDateIntervalPeriod()}`
                this.report.loadTrail()
                    .then((stock: any) => {
                        stock.forEach((s: any) => {
                            this.rows.push([
                                table.td(s.product_code || ''),
                                table.td(s.drug_name),
                                table.tdDate(s.transaction_date),
                                table.td(s.transaction_type),
                                table.tdNum(s.amount_committed_to_stock),
                                table.td(s.username),
                                table.td(s.transaction_reason),
                            ])
                        })
                        loadingController.dismiss()
                    }).catch((e: any) => {
                        loadingController.dismiss()
                        toastDanger(e)
                    })
            })
        }
    }
})
</script>
