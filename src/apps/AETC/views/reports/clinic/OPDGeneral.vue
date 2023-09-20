<template>
  <ion-page>
        <ion-loading :is-open="isLoading" message="Please wait..."/>
        <v2Datatable
            title="OPD General Report"
            :subtitle="period"
            :columns="columns"
            :columnData="reportData"
            :rowsPerPage="25"
            :onConfigure="configure"
            :csvQuarter="csvQuarter"
            :onRefresh="() => generate()"
        />
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonLoading, modalController } from "@ionic/vue"
import  v2Datatable from "@/apps/AETC/views/reports/clinic/TableView.vue"
import { v2ColumnDataInterface, v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { AETCReportService } from "@/apps/AETC/services/aetc_report_service"
import { toastDanger, toastWarning } from '@/utils/Alerts';
import DrillPatientIds from '../../../../../components/DrillPatientIds.vue';
import { toDate } from '@/utils/Strs';
import { MultiStepPopupForm } from "@/utils/PopupKeyboard";
import { FieldType } from "@/components/Forms/BaseFormElements";
import { Option } from '@/components/Forms/FieldInterface'
import { isPlainObject } from "lodash";
import Validation from "@/components/Forms/validations/StandardValidations"
import { Service } from "@/services/service"
import HisDate from "@/utils/Date"
import dayjs from "dayjs";

const reportData = ref<any>([])
const startDate = ref('')
const endDate = ref('')
const period = ref('')
const isLoading = ref(false)
const csvQuarter = ref('')

export default defineComponent({ 
    components: { 
        IonPage,
        IonLoading,
        v2Datatable,
    },

    setup() {
        /**
         * Generates report by start date and end date
         */
         const generate = async () => {
            return null
         }
         const generateYears = () => {
            let years: string[] = [];
            const currentYear = new Date().getFullYear();
            for (let year = 2008; year <= currentYear; year++) {
                years.push(year + "");
            }
            return years.reverse()
         }

         const generateQuarters = () => {
            let quarters: string[] = [];
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns 0-based months
            const quartersToAdd = currentMonth <= 3 ? 1 : currentMonth <= 6 ? 2 : currentMonth <= 9 ? 3 : 4;

            for (let year = 2008; year <= currentYear; year++) {
                for (let quarter = 1; quarter <= 4; quarter++) {
                    if (year < currentYear || (year === currentYear && quarter <= quartersToAdd)) {
                        quarters.push(`Q${quarter} ${year}`);
                    }
                }
            }

            return quarters.reverse();
        }

         const mapOptions = (options: Array<string>) => {
            return options.map((option) => {
                return { label: option, value: option }
            });
         }

         //table headers and data mapping
         const columns: Array<v2ColumnInterface[]> = [
            [
                {
                    label: "No",
                    ref: ""
                },
                {
                    label: "Data Element",
                    ref: ""
                },
                {
                    label: "Normal Range",
                    ref: ""
                },
                {
                    label: "Value",
                    ref: ""
                },
                {
                    label: "Comment",
                    ref: ""
                },
            ]
        ]

        /**
         * Loads a dialogue to allow users to configure start and end date
         */
         const configure = () => MultiStepPopupForm([
            {
                id: 'start_age',
                helpText: 'Start Age',
                type: FieldType.TT_NUMBER,
                computedValue: (v: Option) => v.value,
                validation: (v: Option) => Validation.required(v)
            },
            {
                id: 'end_age',
                helpText: 'End Age',
                type: FieldType.TT_NUMBER,
                computedValue: (v: Option) => v.value,
                validation: (v: Option) => Validation.required(v)
            },
            {
                id: 'report_type',
                helpText: 'Report type',
                type: FieldType.TT_SELECT,
                options: () => [
                    {
                        label: 'General Outpatient',
                        value: 'General Outpatient',
                    },
                    {
                        label: 'Pediatrics',
                        value: 'Pediatrics',
                    },
                    {
                        label: 'General Diagnoses',
                        value: 'General Diagnoses',
                    },
                    {
                        label: 'Pediatrics Diagnosis',
                        value: 'Pediatrics Diagnosis',
                    },
                    {
                        label: 'Adults Diagnosis',
                        value: 'Adults Diagnosis',
                    }
                ]
            },
            {
                id: 'report_range',
                helpText: 'Select Range',
                type: FieldType.TT_SELECT,
                computedValue: (v: Option) => v.value,
                options: () => [
                    {
                        label: 'Week',
                        value: 'Week',
                    },
                    {
                        label: 'Month',
                        value: 'Month',
                    },
                    {
                        label: 'Quarter',
                        value: 'Quarter',
                    },
                    {
                        label: 'Year',
                        value: 'Year',
                    },
                    {
                        label: 'Select Range',
                        value: 'Select-Range',
                    }
                ]
            },
            {
                id: 'report_range_year',
                helpText: 'Select Year',
                type: FieldType.TT_SELECT,
                condition: (f: any) => f.report_range.value === 'Year' || f.report_range.value === 'Month' || f.report_range.value === 'Week',
                options: () => {
                    const years: string[] = generateYears();
                    return[
                        ...mapOptions(years)
                    ]
                }
            },
            {
                id: 'report_range_quaters',
                helpText: 'Select Quater',
                type: FieldType.TT_SELECT,
                condition: (f: any) => f.report_range.value === 'Quarter',
                options: () => {
                    const quaters: string[] = generateQuarters();
                    return[
                        ...mapOptions(quaters)
                    ]
                }
            },
            {
                id: "start_date",
                helpText: "Start Date",
                type: FieldType.TT_FULL_DATE,
                validation: (val: Option) => Validation.required(val),
                computedValue: (v: Option) => v.value,
                condition: (f: any) => f.report_range.value === 'Select-Range',

            },
            {
                id: 'report_range_month',
                helpText: 'Select Month',
                type: FieldType.TT_SELECT,
                validation: (v: Option) => Validation.required(v),
                computedValue: (v: Option) => v.value,
                condition: (f: any) => f.report_range.value === 'Month',
                options: () => {
                    return [
                        {label: 'January', value: '01'},
                        {label: 'February', value: '02'},
                        {label: 'March', value: '03'},
                        {label: 'April', value: '04'},
                        {label: 'May', value: '05'},
                        {label: 'June', value: '06'},
                        {label: 'July', value: '07'},
                        {label: 'August', value: '08'},
                        {label: 'September', value: '09'},
                        {label: 'October', value: '10'},
                        {label: 'November', value: '11'},
                        {label: 'December', value: '12'}
                    ]
                }
            },
            {
                id: 'report_range_week',
                helpText: 'Select Week',
                type: FieldType.TT_SELECT,
                condition: (f: any) => {
                    const currentYear = new Date().getFullYear() + "";
                    return f.report_range.value === 'Week' && f.report_range_year.value === currentYear
                },
                options: () => [
                    {
                        label: 'This Week',
                        value: 'This Week',
                    },
                    {
                        label: 'Last Week',
                        value: 'Last Week',
                    },
                    {
                        label: 'This Month',
                        value: 'This Month',
                    },
                    {
                        label: 'Last Month',
                        value: 'Last Month',
                    },
                    {
                        label: 'All Dates',
                        value: 'All Dates',
                    }
                ]
            },
        ], 
        (f: any) => {
            startDate.value = `${f.year.value}-${f.month.value}-01`
            endDate.value = dayjs(new Date(startDate.value).toISOString()).endOf("month").format("YYYY-MM-DD")
            period.value = `Period (${toDate(startDate.value)} to ${toDate(endDate.value)})`
            modalController.dismiss()
            csvQuarter.value = `${toDate(startDate.value)} to ${toDate(endDate.value)}`
            generate()
        })

        /**
         * Initialization code when the report is empty!
         */
         onMounted(() => !reportData.value.length && configure())



         return  {
            columns,
            isLoading,
            reportData,
            period,
            csvQuarter,
            generate,
            configure
         }
    }
})

</script>
