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
            :encryptPDF="true"
            reportPrefix="Clinic"
            :onReportConfiguration="onPeriod"> 
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service"
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import ReportTemplate from "@/views/reports/BaseTableReport.vue"
import { FieldType } from '@/components/Forms/BaseFormElements'
import Validation from "@/components/Forms/validations/StandardValidations"
import HisDate from "@/utils/Date"
import table from "@/components/DataViews/tables/ReportDataTable"
import { IonPage } from "@ionic/vue"
import { sort } from 'fast-sort'

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
                table.thTxt('ARV#'),
                table.thTxt('First name', { csvExportable: false, pdfExportable: true }),
                table.thTxt('Last name', { csvExportable: false, pdfExportable: true }) ,
                table.thTxt('Gender'),
                table.thTxt('birthdate'),
                table.thTxt('Current Address', { csvExportable: false, pdfExportable: true }),
                table.thTxt('Actions', {
                    csvExportable: false, pdfExportable: false
                })
            ]
        ]
    }),
    created() {
        this.report = new PatientReportService()
        this.fields = [
            {
                id: 'date',
                helpText: 'Select date',
                type: FieldType.TT_DATE_PICKER,
                defaultValue: () => PatientReportService.getSessionDate(),
                validation: (val: any) => Validation.required(val),
                onValue: async (date: string) => {
                    this.report.setStartDate(date)
                    if (!this.appointments[date]) {
                        this.appointments[date] = (await this.report.getBookedAppointments(date)) || []
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
            this.setRows(this.appointments[form.date])
        },
        setRows(data: Array<any>) {
            sort(data).asc((d: any) => d.given_name).forEach((data: any) => {
                this.rows.push([
                    this.tdARV(data.arv_number || 'N/A'),
                    table.td(data.given_name),
                    table.td(data.family_name),
                    table.td(this.formatGender(data.gender)),
                    table.tdDate(data.birthdate),
                    table.td(
                       `District: <br/> <b>${data.district}</b><br/>
                        Village: <br/> <b>${data.village}</b><br/>
                        Land-mark: <br/> <b>${data.land_mark}</b><br/>
                        Cellphone: <br/> <b>${data.cell_phone}</b>`
                    ),
                    table.tdBtn('Select', () => this.confirmPatient(data.person_id))
                ])
            })
        }
    }
})
</script>
