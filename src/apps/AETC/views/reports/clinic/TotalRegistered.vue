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
            ...generateDateFields({
                        id: 'start_date',
                        helpText: 'Start',
                        required: true,
                        condition: (f: any) => f.quarter && f.quarter.value === 'custom_period' || true,
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
                    condition: (f: any) => f.quarter && f.quarter.value === 'custom_period' || true,
                    unload: (d: any, s: any, f: any, c: any) => {
                        if (s === 'next') {
                            //tempEndDate = c.end_date
                            console.log(c.end_date)
                        }
                    },
                    minDate: (_: any, c: any) => c.start_date,
                    maxDate: () => maxDate,
                    estimation: {
                        allowUnknown: false
                    },
                    computeValue: (date: string) => date
                }),
                
        ], 
        (f: any, c: any)  => {
            startDate.value = c.start_date
            endDate.value = c.end_date
            period.value = `Period (${toDate(startDate.value)} to ${toDate(endDate.value)})`
            modalController.dismiss()
            // csvQuarter.value = `${toDate(startDate.value)} to ${toDate(endDate.value)}`
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
