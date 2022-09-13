import { Field } from "@/components/Forms/FieldInterface"
import { generateDateFields } from "@/utils/HisFormHelpers/MultiFieldDateHelper"
import { modalController } from "@ionic/vue"
import { computed, reactive } from "vue"
import DrilldownTable from "@/apps/ART/views/reports/BasicReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { Patientservice } from "@/services/patient_service"
import { useRouter } from 'vue-router'

export default function AncReport(reportTitle: string) {
    const data: any = reactive({
        title: reportTitle,
        rows: [],
        columns: [],
        fields: [] as Field[],
        period: '' as string,
        drill: []
    })
    const rows = computed(() => data.rows)
    const period = computed(() => data.period)
    const fields = computed(() => data.fields)
    const columns = computed(() => data.columns)
    const title = computed(() => data.title)

    function drill(patientIds: number[], params={} as any) {
        if (patientIds.length) {
            return table.tdLink(patientIds.length, async () => {
                (await modalController.create({
                    component: DrilldownTable,
                    cssClass: 'large-modal',
                    componentProps: {
                        title: params.title || 'Drilldown',
                        columns: [
                            [
                                table.thTxt('First name'),
                                table.thTxt('Last name'),
                                table.thTxt('Birthdate'),
                                table.thTxt('Action')
                            ]
                        ],
                        rows: patientIds,
                        rowParser: async (patientIds: number[]) => {
                            const row = []
                            for(const id of patientIds) {
                                if (data.drill[id]) {
                                    row.push(data.drill[id])
                                    continue
                                }
                                const patient = new Patientservice((await Patientservice.findByID(id))) 
                                data.drill[id] = [
                                    table.td(patient.getGivenName()),
                                    table.td(patient.getFamilyName()),
                                    table.tdDate(`${patient.getBirthdate()}`),
                                    table.tdBtn('Show', () => {
                                        modalController.dismiss({})
                                        useRouter().push({ path: `/patient/dashboard/${id}`})
                                    })
                                ]
                                row.push(data.drill[id])
                            }
                            return row
                        },
                        showFilters: true,
                        footerColor: 'light',
                        showReportStamp: false,
                        paginated: true,
                        rowsPerPage: 20,
                        onFinish: () => modalController.dismiss()
                    }
                })).present()
            })
        }
        return table.td(0)
    }
    
    function buildReportParamFields(params={} as any) {
        return [
            ...generateDateFields({
                id: 'start_date',
                helpText: 'Start',
                required: true,
                minDate: () => params?.minDate || null,
                maxDate: () => params?.maxDate || null,
                estimation: {
                    allowUnknown: false
                },
                computeValue: (date: string) => date 
            }),
            ...generateDateFields({
                id: 'end_date',
                helpText: 'End',
                required: true,
                minDate: (_: any, c: any) => c.start_date,
                maxDate: () => params?.maxDate || null,
                estimation: {
                    allowUnknown: false
                },
                computeValue: (date: string) => date
            })
        ]
    }
    data.fields = buildReportParamFields()
    return {
        title,
        rows,
        data,
        fields,
        drill,
        period,
        columns,
        buildReportParamFields
    }
}
