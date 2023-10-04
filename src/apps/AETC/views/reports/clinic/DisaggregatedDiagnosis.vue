<template>
  <ion-page>
        <ion-loading :is-open="isLoading" message="Please wait..."/>
        <v2Datatable
            title="Disaggregated Diagnosis Report"
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
            const report = new AETCReportService()
            report.startDate = startDate.value
            report.endDate = endDate.value
            try {
                const rawReport = (await report.getClinicReport("DISAGGREGATED_DIAGNOSIS"))
                reportData.value = transformObject(rawReport)
                //console.log("HERE is the report", reportData.value)
            }catch (e){
                console.log(e)
            }
         }

         //table headers and data mapping
         const columns: Array<v2ColumnInterface[]> = [
            [
                {
                    label: "Diagnosis",
                    ref: "",
                    span: {
                        thRowspan: 2,
                    }
                },
                {
                    label: "<6 Months>",
                    ref: "",
                    span: {
                        thColspan: 2,
                    }
                },
                {
                    label: "6 Months to < 5",
                    ref: "",
                    span: {
                        thColspan: 2,
                    }
                },
                {
                    label: "5 to 14",
                    ref: "",
                    span: {
                        thColspan: 2,
                    }
                },
                {
                    label: ">14",
                    ref: "",
                    span: {
                        thColspan: 2,
                    }
                },
                {
                    label: "Total by gender",
                    ref: "",
                    span: {
                        thColspan: 2,
                    }
                },
                {
                    label: "Total",
                    ref: "",
                    span: {
                        thRowspan: 2,
                    }
                },
            ],
            [
                {
                    label: "M",
                    ref: ""
                },
                {
                    label: "F",
                    ref: ""
                },
                {
                    label: "M",
                    ref: ""
                },
                {
                    label: "F",
                    ref: ""
                },
                {
                    label: "M",
                    ref: ""
                },
                {
                    label: "F",
                    ref: ""
                },
                {
                    label: "M",
                    ref: ""
                },
                {
                    label: "F",
                    ref: ""
                },
                {
                    label: "M",
                    ref: ""
                },
                {
                    label: "F",
                    ref: ""
                },
            ],
            [
            {
                    label: "Diagnosis",
                    ref: "data.diagnosis",
                    value: (data: any) => data.address
                },
                {
                    label: "< 6 months M",
                    ref: "data.< 6 months.M.length",
                    secondaryLabel: "< 6 months Male diagnosed with",
                    value: (data: any) => data.patient_ids.length,
                    tdClick: ({ column, data }: v2ColumnDataInterface) => drilldown(
                        `${column.secondaryLabel} ${data.address} `, data.patient_ids
                    )
                },
                {
                    label: "<6 months F",
                    ref: "data.<6 months.F.length",
                    secondaryLabel: "<6 months Female diagnosed with",
                    value: (data: any) => data.patient_ids.length,
                    tdClick: ({ column, data }: v2ColumnDataInterface) => drilldown(
                        `${column.secondaryLabel} ${data.address} `, data.patient_ids
                    )
                },
            ]
        ]

        const transformObject = (arr: { [key: string]: any }[]): { [key: string]: any }[] => {
            const formatedArray = []
            for(const item of arr){
                const replaced = replaceSpacesWithUnderscoresAndAddI(item)
                formatedArray.push(replaced)
                console.log("Here is the point >>>>><<<>>>>>>>>>>>", replaced.i6_months_to_ls_5)
            }
            return formatedArray
        };


        const replaceSpacesWithUnderscoresAndAddI = (obj: any) => {
            const newObj: any = {};

            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    let newKey = key.replace(/ /g, '_');
                    const value = obj[key];

                    // Check if the newKey starts with a number and if so, add 'i' at the beginning
                    if (/^\d/.test(newKey)) {
                        newKey = 'i' + newKey;
                    }

                    // Replace symbols within the newKey
                    newKey = newKey.replace(/[<>&]/g, (match) => {
                        switch (match) {
                            case '<':
                                return 'ls';
                            case '>':
                                return 'gt';
                            case '&':
                                return 'amp';
                            // Add more cases for other symbols as needed
                            default:
                                return match;
                        }
                    });

                    newObj[newKey] = typeof value === 'object' && !Array.isArray(value)
                        ? replaceSpacesWithUnderscoresAndAddI(value)
                        : value;
                }
            }

            return newObj;
        };

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
         * Loads a dialogue to allow users to configure start and end date
         */
         const configure = () => MultiStepPopupForm([
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
        ], 
        (f: any, c: any) => {
            startDate.value = c.start_date
            endDate.value = c.end_date
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
