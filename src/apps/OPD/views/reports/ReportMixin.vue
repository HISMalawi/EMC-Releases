<script lang="ts">
import { defineComponent } from 'vue'
import { Field } from '@/components/Forms/FieldInterface'
import { Patientservice } from "@/services/patient_service"
import HisDate from "@/utils/Date"
import { modalController } from "@ionic/vue";
import DrilldownTable from "@/apps/ART/views/reports/BasicReportTemplate.vue"
import { OpdReportService } from "@/apps/OPD/services/opd_report_service"
import { FieldType } from "@/components/Forms/BaseFormElements"
import { Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import table from "@/components/DataViews/tables/ReportDataTable"
import moment from "dayjs"

export default defineComponent({
    data: () => ({
        fields: [] as Array<Field>,
        report: {} as any,
        reportReady: false as boolean,
        period: '' as string,
        startDate: '' as string,
        endDate: '' as string,
        customFileName: '' as string,
        drillDownCache: {} as Record<number, Array<any>>
    }),
    methods: {
        toDate(date: string) {
            return HisDate.toStandardHisDisplayFormat(date)
        },
        confirmPatient(patient: number) {
            return this.$router.push(`/patients/confirm?person_id=${patient}`)
        },
        async drilldownAsyncRows(title: string, columns: Array<any>, asyncRows: Function) {
            const modal = await modalController.create({
                component: DrilldownTable,
                cssClass: 'large-modal',
                componentProps: { 
                    title, 
                    columns, 
                    asyncRows,
                    showFilters: true,
                    rowsPerPage: 50,
                    paginated: true,
                    showReportStamp: false,
                    footerColor: 'light',
                    onFinish: () => modalController.dismiss()
                }
            })
            modal.present()
        },
        async drilldownData(title: string, columns: Array<any>, rows: Array<any>, rowParser: any) {
            const modal = await modalController.create({
                component: DrilldownTable,
                cssClass: 'large-modal',
                componentProps: { 
                    title, 
                    columns, 
                    rows,
                    rowParser,
                    rowsPerPage: 50,
                    showFilters: true,
                    paginated: true,
                    showReportStamp: false,
                    footerColor: 'light',
                    onFinish: () => modalController.dismiss()
                }
            })
            modal.present()
        },
        getDefaultDrillDownTable() {
            const columns = [
                [
                    table.thTxt('ARV number'), 
                    table.thTxt('Gender'),
                    table.thTxt('Birth Date'), 
                    table.thTxt('Actions')
                ]
            ]
            const rowParser = (tableRows: Array<any[]>) => {
                return tableRows.map(async (defaultRow: Array<any>) => {
                    const [index, id ] = defaultRow
                    if (id in this.drillDownCache) {
                        //const [oldIndex, ...rest] = this.drillDownCache[id]
                        return [index] // Assign new index number and maintain patient record
                    } 
    
                    const data = await Patientservice.findByID(id)
                    const patient = new Patientservice(data)
                    const row = [
                        index,
                        table.td(patient.getArvNumber()), 
                        table.td(patient.getGender()), 
                        table.tdDate(patient.getBirthdate().toString()),
                        table.tdBtn('Show', async () => {
                            await modalController.dismiss({})
                            this.$router.push({ path: `/patient/dashboard/${id}`})
                        })
                    ]
                    this.drillDownCache[id] = row
                    return row
                })
            }
            return { rowParser, columns }
        },
        runTableDrill(data: any, title='Drilldown patients') {
            const { columns, rowParser } = this.getDefaultDrillDownTable()
            this.drilldownData(title, columns, data, rowParser)
        },
        drill(values: Array<number>, title='Drill table') {
            if (values && values.length > 0) {
                return table.tdLink(
                    values.length, 
                    () => this.runTableDrill(values, title)
                )
            }
            return table.td(0)
        },
        getDateDurationFields(): Array<Field> {
            return [
                {
                    id: 'epiweek',
                    helpText: 'Select EPI week',
                    type: FieldType.TT_SELECT,
                    validation: (val: Option) => Validation.required(val),
                    options: async () => {
                        const epiWeeks = await OpdReportService.getReportEpiWeeks()
                        const items: Array<Option> = epiWeeks.map((q: any) => ({
                            label: q.name +' - ('+ moment(q.start).format('DD/MMM/YYYY') +' - '+ moment(q.end).format('DD/MMM/YYYY')+')',
                            value: q.start,
                            other: q
                        }))
                        return items
                    }
                },
            ]
        }
    }
})
</script>
