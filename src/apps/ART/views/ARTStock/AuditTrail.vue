<template>
    <ion-page>
        <report-template
            :title="title"
            :rows="rows"
            :paginated="true"
            :period="period"
            :fields="fields"
            :columns="columns"
            :onReportConfiguration="onPeriod"
            > 
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { StockReportService } from "@/apps/ART/services/reports/stock_report_service"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { toastDanger } from '@/utils/Alerts'
import { FieldType } from '@/components/Forms/BaseFormElements'
import { Field, Option } from "@/components/Forms/FieldInterface";
import Validation from "@/components/Forms/validations/StandardValidations";
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'Audit Trail',
        rows: [] as Array<any>,
        columns: [
            [
                table.thTxt('Medication'), 
                table.thTxt('Transaction type'),
                table.thTxt('Transaction date'), 
                table.thTxt('Net Quantity'),
            ]
        ],
        fields: [
            {
                id: "start_date",
                helpText: "Start Date",
                type: FieldType.TT_FULL_DATE,
                validation: (val: Option) => Validation.required(val),
                computedValue: (v: Option) => v.value
            },
            {
                id: "end_date",
                helpText: "End Date",
                type: FieldType.TT_FULL_DATE,
                validation: (val: Option) => Validation.required(val),
                computedValue: (v: Option) => v.value
            },
        ] as Field[]
    }),
    methods: {
        async onPeriod(_: any, c: any) {
            this.rows = []
            this.report = new StockReportService()
            this.report.setStartDate(c.start_date)
            this.report.setEndDate(c.end_date)
            this.period = this.report.getDateIntervalPeriod()
            this.report.loadTrail()
                .then((stock: any) => {
                    stock.forEach((s: any) => {
                        this.rows.push([
                            table.td(s.drug_name),
                            table.td(s.transaction_type),
                            table.tdDate(s.transaction_date),
                            table.tdNum(s.amount_committed_to_stock),
                        ])
                    })
                }).catch((e: any) => {
                    toastDanger(e)
                })
        }
    }
})
</script>
