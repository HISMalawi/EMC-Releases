<template>
    <ion-page>
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :fields="fields"
            :columns="columns"
            :showtitleOnly="true"
            :config="{
                showIndex: false
            }"
            :onReportConfiguration="onPeriod">
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { AncClinicReportService } from "@/apps/ANC/Services/anc_clinic_report_service"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import { FieldType } from '@/components/Forms/BaseFormElements'
import Validation from "@/components/Forms/validations/StandardValidations"
import HisDate from "@/utils/Date"
import table from "@/components/DataViews/tables/ReportDataTable"
import { IonPage } from "@ionic/vue"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate, IonPage },
    data: () => ({
        title: 'Booked clients',
        date: '' as string,
        rows: [] as Array<any>,
        appointments: {} as Record<string, any>,
        columns: [
            [
                table.thTxt('Identifier'),
                table.thTxt('First name', { exportable: false }),
                table.thTxt('Last name', { exportable: false }) ,
                table.thTxt('Gender'),
                table.thTxt('birthdate'),
                table.thTxt('Actions')
            ]
        ]
    }),
    created() {
        this.report = new AncClinicReportService()
        this.fields = [
            {
                id: 'date',
                helpText: 'Select date',
                type: FieldType.TT_DATE_PICKER,
                defaultValue: () => AncClinicReportService.getSessionDate(),
                validation: (val: any) => Validation.required(val),
                onValue: async (date: string) => {
                    this.report.setStartDate(date)
                    if (!this.appointments[date]) {
                        this.appointments[date] = (await this.report.generateBookedAppointments()) || []
                    }
                    return true
                },
                config: {
                    infoItems: (date: string) => {
                        return [{
                            label: 'Appointments',
                            value: this.appointments[date]?.length || 0
                        }]
                   } 
                }
            }
        ]
    },
    methods: {
        onPeriod(form: any) {
            this.rows = []
            this.period = HisDate.toStandardHisDisplayFormat(form.date)
            this.rows = this.appointments[form.date].map((p: any) => ([
                table.td(p.npid),
                table.td(p.given_name),
                table.td(p.family_name),
                table.td(p.gender),
                table.tdDate(p.birthdate),
                table.tdBtn('Select', () => this.confirmPatient(p.person_id))
            ]))
        }
    }
})
</script>
