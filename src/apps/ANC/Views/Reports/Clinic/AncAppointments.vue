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
        appointments: [] as any,
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
                type: FieldType.TT_APPOINTMENT_PICKER,
                defaultValue: () => AncClinicReportService.getSessionDate(),
                validation: (val: any) => Validation.required(val),
                onValue: async (date: string, context: any) => {
                    this.report.setStartDate(date)
                    const data = await this.report.generateBookedAppointments()
                    if (data.length > 0) {
                        this.appointments = data
                        context.appointmentCounter = this.appointments.length
                        return true
                    }
                    return false
                }
            }
        ]
    },
    methods: {
        onPeriod(form: any) {
            this.rows = []
            this.period = HisDate.toStandardHisDisplayFormat(form.date)
            this.rows = this.appointments.map((p: any) => ([
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
