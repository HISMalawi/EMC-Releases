<template>
    <ion-page>
        <ion-loading :is-open="isLoading" message="Please wait..."/>
        <v2Datatable
            title="MONTHLY MOH Report"
            :subtitle="period"
            :columns="columns"
            :columnData="reportData"
            :rowsPerPage="25"
            :onConfigure="configure"
            :csvQuarter="csvQuarter"
            :onRefresh="() => generate()"
            :order="order"
            :headers="csvheaders"
            :csv-spacing="spacing"
            :csv-sub-header="subHeaders"
        />
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonLoading, modalController } from "@ionic/vue"
import  v2Datatable from "@/apps/CxCa/views/reports/moh/TableView.vue"
import { v2ColumnDataInterface, v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { CxCaReportService } from "@/apps/CxCa/services/reports/cxca_report_service"
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
        const totals = ref<any[]>([])

        /**
         * Ordering rows
         */
         const orderingRows = [
            'screened_disaggregated_by_age',
            'screened_disaggregated_by_hiv_status',
            'screened_disaggregated_by_reason_for_visit',
            'screened_disaggregated_by_screening_method',
            'screening_results_hiv_positive',
            'screening_results_hiv_negative',
            'suspects_disaggregated_by_age',
            'total_treated',
            'total_treated_disaggregated_by_tx_option',
            'referral_reasons',
            'referral_feedback',
            'family_planning'
        ];

        const processData = (data: any) => {
            const result: any = [];
            const keys = Object.keys(data);

            let previouskey: any;

            keys.forEach((key) => {
                const values = Object.entries(data[key]);
                values.forEach(([subKey, subValues]) => {
                    if(previouskey != key){
                        console.log("Title Comes here --> ", key)
                    }
                    if (Array.isArray(subValues)) {
                        result.push([key, subKey, subValues]);
                    } else {
                        result.push([key, subKey, []]);
                    }
                });
                //keep the previous key/title
                previouskey = key
            });

            return result;
        };

        const sortedData = ref<Record<string, any>>({});
        const sortObjectData = (data: any) => {
            const sortedDataObject: any = {}

            orderingRows.forEach((key) => {
                if(key in data){
                    sortedDataObject[key] = data[key];
                }
            });
            sortedData.value = sortedDataObject;
            return sortedData;
        }

        const sortData = (data: Record<string, any>) => {
            const sortedData: Record<string, any> = {};
            orderingRows.forEach((key) => {
                if (data[key]) {
                sortedData[key] = data[key];
                }
            });
            return sortedData;
        };

        // Define the flattened object array type
        interface FlattenedObject {
        category: string;
        value: number;
        }
        // Flatten the object into an array
        const flattenedArray: FlattenedObject[] = [];
        const flattenObject = (obj: Record<string, any>, category: any) => {
            for (const key in obj) {
                const value = obj[key];

                if (typeof value === 'object' && !Array.isArray(value)) {
                flattenObject(value, category ? `${category} - ${key}` : key);
                } else {
                flattenedArray.push({ category, value });
                }
            }
        };

        const convertToArray = (data: any, totals: any) => {
            const convertedData = [
                convertGroupToArray(data.first_time_screened),
                convertGroupToArray(data.rescreened_after_prev_visit),
                convertGroupToArray(data.post_treatment_followup),
            ];

            convertedData.push(extractTotals(totals))

            return convertedData
        }
        const convertGroupToArray = (group: any) =>  {
            return group.map((item: { [x: string]: any; age_group: any }) => {
                const { age_group, ...procedures } = item;
                return { ...procedures, age_group };
            });
        }

        const extractTotals = (data: any) => {
            const extractedTotals: { [key: string]: any }[] = [];
            for (const key in data) {
                const obj: { [key: string]: any } = {};
                obj[key] = data[key];
                extractedTotals.push(obj);
            }
            return extractedTotals;
        }

        const drilldown = async (title: string, patientIdentifiers: number[]) => {
            (await modalController.create({
                component: DrillPatientIds,
                backdropDismiss: false,
                cssClass: 'large-modal',
                componentProps: {
                    title,
                    subtitle: period,
                    patientIdentifiers,
                    onFinish: () => modalController.getTop().then(v => v && modalController.dismiss())
                }
            })).present()
        }
        
        /**
         * ordering of columns
         */
        const order = [
            'age_group',
            'cryotherapy',
            'thermocoagulation',
            'leep',
            'via_deffered',
            'via_reffered',
            'suspected_reffered'
        ];

        //csv headers
        const csvheaders = [
            'Age Disaggregate', 
            'Cryotherapy', 
            'Thermocoagulation', 
            'Leep', 
            'VIA + Defferred Tx', 
            'VIA + Referred', 
            'CxCa Suspect Referred'
        ];

        //sub headers for report sections
        const subHeaders = [
                    ["","","",'1st time screened',"","",""],
                    ["","","",'Rescreened after previous negative',"","",""],
                    ["","","",'Post-treatment follow-up',"","",""],
                    ["","","",'Month Summary',"","",""]
            ];

        //blank spacing for csv spacing
        const spacing = 5;


        /**
         * Table column definition and value mapping
         */
        const columns: Array<v2ColumnInterface[]> = [
            [
                {
                    label: "indicator #",
                    ref: ""
                },
                {
                    label: "Name of indicator",
                    ref: ""
                },
                {
                    label: "value",
                    ref: ""
                },
                {
                    label: "indicator #",
                    ref: ""
                },
                {
                    label: "Name of indicator",
                    ref: ""
                },
                {
                    label: "value",
                    ref: ""
                },
            ],
            [
                
            ],
            [
                {
                    label: "Indicator #",
                    ref: "data.age_group",
                    value: (data: any) => data.age_group
                },    
            ],
        ]
        /**
         * Generates report by start date and end date
         */
         const generate = async () => {
            if (!(startDate.value && endDate.value))  {
                return toastWarning('Start date and end date required!')
            }
            isLoading.value = true
            reportData.value = []
            const report = new CxCaReportService()
            report.startDate = startDate.value
            report.endDate = endDate.value
            try {
                const rawReport = (await report.getClinicReport('SCREENED FOR CXCA'))
                //sorting the data basing on the template order
                const sortedDataObject = sortData(rawReport)
                //formating to array
                reportData.value = processData(sortedDataObject)
               
                console.log("the data flattened ", reportData.value)

                

                // reportData.value = rawReport
            } catch (e) {
                toastDanger("Unable to generate report!")
                console.error(e)
            }
            isLoading.value = false
        }
        /**
         * Loads a dialogue to allow users to configure start and end date
         */
         const configure = () => MultiStepPopupForm([
            {
                id: 'year',
                helpText: 'Select Year',
                type: FieldType.TT_NUMBER,
                computedValue: (v: Option) => v.value,
                validation: (v: Option) => {
                    const year = isPlainObject(v) ? v.value : -1
                    return Validation.validateSeries([
                        () => Validation.required(v),
                        () => {
                            if (isNaN(parseInt(`${year}`))) {
                                return ['Invalid year']
                            }
                            return null
                        },
                        () => Validation.rangeOf(v, 2000, HisDate.getYear(Service.getSessionDate()))
                    ])
                }
            },
            {
                id: 'month',
                helpText: 'Select Month',
                type: FieldType.TT_SELECT,
                validation: (v: Option) => Validation.required(v),
                computedValue: (v: Option) => v.value,
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
            }
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
            configure,
            order,
            csvheaders,
            spacing,
            subHeaders
        }
    }
})

</script>