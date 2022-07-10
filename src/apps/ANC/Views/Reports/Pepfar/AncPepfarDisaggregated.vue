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
            :onReportConfiguration="onPeriod">
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { AncPepfarReportService } from "@/apps/ANC/Services/anc_pepfar_report_service"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { IonPage } from "@ionic/vue"
import { Field } from '@/components/Forms/FieldInterface'
import dayjs from 'dayjs'
import  { AncReportComposable } from '@/apps/ANC/Views/Reports/AncReportComposable'

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate, IonPage },
    data: () => ({
        title: 'Facility Pepfar Report',
        rows: [] as Array<any>,
        fields: [] as Field[],
        columns: [
            [
                table.thTxt('District'),
                table.thTxt('Site'),
                table.thTxt('Month'),
                table.thTxt('Year') ,
                table.thTxt('ANC Indicator'),
                table.thTxt('Age Category'),
                table.thTxt('Value')
            ]
        ],
        months: {
            0: "January", 
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        } as any,
        ageGroups: ["<10", "10-14", "15-19",
            "20-24", "25-29", "30-34", "35-39", "40-49",
            "50+", "Unknown", "All"
        ] as string[],
        indicators: [
            "Already on ART", 
            "Known at entry positive",
            "Known status", 
            "New ANC client", 
            "Newly identified negative",
            "Newly identified positive",
            "Newly on ART"
        ] as string[],
        drillPatients: null as any
    }),
    created() {
        this.report = new AncPepfarReportService()
        this.fields = this.getDateDurationFields()
        this.drillPatients = AncReportComposable()['drillPatientByIDs']
    },
    methods: {
        f(d: string) {
            return dayjs(d).format('MMM YYYY') 
        },
        async onPeriod(_: any, c: Record<string, any>) {
            this.rows = []
            this.period = `${this.f(c.start_date)} - ${this.f(c.end_date)}`
            const monthlyDates = this.generateIndicatorDates(c.start_date, c.end_date)
            await this.generateRows(monthlyDates)
        },
        generateIndicatorDates(startDate: string, endDate: string) {
            const dates = [startDate]
            let date = startDate
            while(date < dayjs(endDate).add(-1, 'months').format('YYYY-MM-DD')) {
                dates.push(date = dayjs(date).add(1, 'months').format('YYYY-MM-DD'))
            }
            return dates
        },
        async generateRows(monthlyDates: string[]) {
            for(const date of monthlyDates) {
                try {
                    const data = await this.report.generateDisaggregated(date)
                    this.indicators.forEach((indicator: string) => {
                        this.ageGroups.forEach((age: string) => {
                            const patients = data[this.f(date)][indicator][age]
                            this.rows.push([
                                table.td(''),
                                table.td(AncPepfarReportService.getLocationName() || 'N/A'),
                                table.td(this.months[dayjs(date).month()]),
                                table.td(dayjs(date).year()),
                                table.td(indicator),
                                table.td(age),
                                table.tdLink(patients.length, 
                                    () => this.drillPatients(`${date}-${indicator}-${age}`,patients)
                                )
                            ])
                        })
                    })
                } catch (e) {
                    console.warn(`${e}`)
                }
            }
        }
    }
})
</script>
