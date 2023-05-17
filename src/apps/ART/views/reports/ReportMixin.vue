<script lang="ts">
import { Service } from "@/services/service"
import { defineComponent } from 'vue'
import { Field } from '@/components/Forms/FieldInterface'
import { generateDateFields } from "@/utils/HisFormHelpers/MultiFieldDateHelper"
import { Patientservice } from "@/services/patient_service"
import HisDate from "@/utils/Date"
import { modalController } from "@ionic/vue";
import DrilldownTable from "@/apps/ART/views/reports/BasicReportTemplate.vue"
import { ArtReportService } from "@/apps/ART/services/reports/art_report_service"
import { FieldType } from "@/components/Forms/BaseFormElements"
import { Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import table, { AsyncTableRowHandler } from "@/components/DataViews/tables/ReportDataTable"
import { isArray } from "lodash"

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
        formatGender(gender: string) {
            const upCaseGender = `${gender}`.toUpperCase()
            if (upCaseGender === 'M' || upCaseGender === 'MALE') {
                return 'Male'
            }
            if (upCaseGender === 'F' || upCaseGender === 'FEMALE') {
                return 'Female'
            }
            if (/fbf|fnp|fp/i.test(gender)) {
                return upCaseGender
            }
            return gender
        },
        toDate(date: string) {
            return HisDate.toStandardHisDisplayFormat(date)
        },
        sortByArvNumber(data: Array<any>, attr='arv_number') {
            try {
                return data.sort((a: any, b: any) => this.getArvInt(a[attr]) > this.getArvInt(b[attr]) ? 1 : -1)
            } catch(e) {
                console.error(e)
                return data
            }
        },
        getArvInt(arv: string) {
            if (typeof arv === 'string') {
                const arvNumStr = arv.split('-')[2]
                const arvNumInt = parseInt(arvNumStr)
                return typeof arvNumInt === 'number' ? arvNumInt : 0 
            }
            return 0
        },
        tdARV(arv: string, params={}) {
            return table.td(arv, { sortValue: this.getArvInt(arv), ...params})
        },
        confirmPatient(patient: number) {
            return this.$router.push(`/patients/confirm?person_id=${patient}`)
        },
        async drilldownAsyncRows(title: string, columns: Array<any>, asyncRows: AsyncTableRowHandler, canExport=true) {
            const modal = await modalController.create({
                component: DrilldownTable,
                cssClass: 'large-modal',
                componentProps: { 
                    title, 
                    columns, 
                    asyncRows,
                    canExport,
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
            const rowParser = async (tableRows: Array<any[]>) => {
                let ARV_NUM_INDEX = 0
                const t = tableRows.map(async (defaultRow: Array<any>) => {
                    let id: any = null
                    let index: null | number = null
                    if (isArray(defaultRow)) {
                        const [num, key ] = defaultRow
                        index = num
                        if (key in this.drillDownCache) {
                            const [oldIndex, ...rest] = this.drillDownCache[key]
                            return [index, ...rest] // Assign new index number and maintain patient record
                        }
                    } else {
                        id = defaultRow
                        if (id in this.drillDownCache) {
                            return this.drillDownCache[id]
                        }
                    }
    
                    const data = await Patientservice.findByID(id)
                    const patient = new Patientservice(data)
                    const row = []
                    if (index) {
                        ARV_NUM_INDEX = 1
                        row.push(index)
                    } 
                    row.push(this.tdARV(patient.getArvNumber()))
                    row.push(table.td(this.formatGender(patient.getGender())))
                    row.push(table.tdDate(patient.getBirthdate().toString()))
                    row.push(table.tdBtn('Show', async () => {
                        await modalController.dismiss({})
                        this.$router.push({ path: `/patient/dashboard/${id}`})
                    }))
                    this.drillDownCache[id] = row
                    return row
                })
                const rows = await Promise.all(t)
                return rows.sort((a: any, b: any) => 
                        a[ARV_NUM_INDEX].sortValue > b[ARV_NUM_INDEX].sortValue 
                        ? 1 : -1)
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
        getQuaterOptions() {
            const quarters = ArtReportService.getReportQuarters()
            return quarters.map((q: any) => ({
                label: q.name, value: q.start, other: q
            }))
        },
        getDateDurationFields(
            useQuarter=false, 
            setCustomQuarterPeriod=false, 
            maxQuarter=5, 
            maxDate=Service.getSessionDate() as string | null,
        ): Array<Field> {
            const minDate = '2000-01-01'
            return [
                {
                    id: 'quarter',
                    helpText: 'Select Quarter',
                    type: FieldType.TT_SELECT,
                    condition: () => useQuarter,
                    validation: (val: Option) => Validation.required(val),
                    options: () => {
                        const quarters = ArtReportService.getReportQuarters(maxQuarter)
                        let items: Array<Option> = quarters.map((q: any) => ({
                            label: q.name,
                            value: q.start,
                            other: q
                        }))
                        if (setCustomQuarterPeriod) {
                            items = [
                                {
                                    label: 'Set custom period',
                                    value: 'custom_period',
                                    other: {}
                                },
                                ...items
                            ]
                        }
                        return items
                    }
                },
                ...generateDateFields({
                    id: 'start_date',
                    helpText: 'Start',
                    required: true,
                    condition: (f: any) => f.quarter && f.quarter.value === 'custom_period' || !useQuarter,
                    minDate: () => minDate,
                    maxDate: () => maxDate,
                    estimation: {
                        allowUnknown: false
                    },
                    computeValue: (date: string) => date 
                }),
                ...generateDateFields({
                    id: 'end_date',
                    helpText: 'End',
                    required: true,
                    condition: (f: any) => f.quarter && f.quarter.value === 'custom_period' || !useQuarter,
                    unload: (d: any, s: any, f: any, c: any) => {
                        if (s === 'next') {
                            this.endDate = c.end_date
                        }
                    },
                    minDate: (_: any, c: any) => c.start_date,
                    maxDate: () => maxDate,
                    estimation: {
                        allowUnknown: false
                    },
                    computeValue: (date: string) => date
                })
            ]
        }
    }
})
</script>
