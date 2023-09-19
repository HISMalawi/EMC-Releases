<template>
  <ion-page>
        <ion-loading :is-open="isLoading" message="Please wait..."/>
        <v2Datatable
            title="AETC Total Registered Report"
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
import { generateDateFields } from "@/utils/HisFormHelpers/MultiFieldDateHelper"

const reportData = ref<any>([])
const startDate = ref('')
const endDate = ref('')
const period = ref('')
const isLoading = ref(false)
const csvQuarter = ref('')
let tempEndDate = ""

export default defineComponent({ 
    components: { 
        IonPage,
        IonLoading,
        v2Datatable,
    },

    setup() {
        const minDate = '2001-01-01'
        const maxDate = Service.getSessionDate()
        /**
         * Generates report by start date and end date
         */
         const generate = async () => {
            return null
         }

         //table headers and data mapping
         const columns: Array<v2ColumnInterface[]> = [
            [
                {
                    label: "Name",
                    ref: ""
                },
                {
                    label: "Birthdate",
                    ref: ""
                },
                {
                    label: "Gender",
                    ref: ""
                },
                {
                    label: "Date Registered",
                    ref: ""
                },
                {
                    label: "Address",
                    ref: ""
                },
                {
                    label: "T.A",
                    ref: ""
                },
            ]
        ]

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
            {
                id: "multiple_select",
                helpText: "Select Age Group(s)",
                type: FieldType.TT_MULTIPLE_SELECT,
                config: {
                    showKeyboard: false
                },
                validation(value: any): null | Array<string> {
                    return !value ? ["Value is required"] : null;
                },
                options:()=> ([
                    {
                        label: "< 6 months",
                        value: "< 6 months"
                    },
                    {
                        label: "6 months to < 1 yr",
                        value: "6 months to < 1 yr"
                    },
                    {
                        label: "1 to < 5",
                        value: "1 to < 5"
                    },
                    {
                        label: "5 to 14",
                        value: "5 to 14",
                    },
                    {
                        label: "> 14 to < 20",
                        value: "> 14 to < 20",
                    },
                    {
                        label: "20 to 30",
                        value: "20 to 30",
                    },
                    {
                        label: ">30 to <40",
                        value: ">30 to <40",
                    },
                    {
                        label: "40 to <50",
                        value: "40 to <50",
                    },
                    {
                        label: "ALL",
                        value: "all",
                    },
                ]),
            },    
        ], 
        (f: any, c: any)  => {
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
