<template>
    <ion-page>
        <ion-loading :is-open="isLoading" message="Please wait..."/>
        <v2Datatable
            title="VL Collection"
            :subtitle="period"
            :columns="columns"
            :columnData="reportData"
            :rowsPerPage="20"
            :onConfigure="configure"
            :onRefresh="() => generate()"
        />
    </ion-page>
</template>

<script lang='ts'>
import { IonPage, IonLoading } from "@ionic/vue"
import { defineComponent, onMounted, ref } from 'vue'
import  v2Datatable from "@/components/DataViews/tables/v2PocDatatable/TableView.vue"
import { ViralLoadReportService } from "@/apps/ART/services/reports/viral_load_report";
import { v2ColumnDataInterface, v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { useRouter } from 'vue-router';
import { DateSelection } from '@/utils/ReportDateSelectionPrompt';
import { toastDanger, toastWarning } from '@/utils/Alerts';
import { formatGender, toDate } from "@/utils/Strs";

export default defineComponent({
    components: { 
        IonPage,
        IonLoading,
        v2Datatable
    },
    setup() {
        const router = useRouter()
        const reportData = ref([])
        const period = ref('')
        const isLoading = ref(false)
        const report = new ViralLoadReportService()
        const columns: Array<v2ColumnInterface[]> = [
            [
                {
                    label: "ARV#",
                    ref: 'identifier',
                },
                {
                    label: "First name",
                    ref: 'given_name',
                    exportable: false
                },
                {
                    label: "Last name",
                    ref: 'family_name',
                    exportable: false
                },
                {
                    label: "Gender",
                    ref: 'gender',
                    value: (data) => formatGender(data.gender)
                },
                {
                    label: "DOB",
                    ref: 'birthdate',
                    value: (data) => toDate(data.birthdate)
                },
                {
                    label: "Date of VL Order",
                    ref: 'order_date',
                    value: (data) => toDate(data.order_date)
                },
                {
                    label: 'Action',
                    ref: 'patient_id',
                    exportable: false,
                    tdClick: ({data}: v2ColumnDataInterface) => router.push({ path: `/patient/dashboard/${data.patient_id}`}) ,
                    value: () => 'View client'
                }
            ]
        ]
        
        /**
         * Generates report by start date and end date
         */
         const generate = async () => {
            if (!(report.startDate && report.endDate))  {
                return toastWarning('Start date and end date required!')
            }
            isLoading.value = true
            reportData.value = []
            try {
                reportData.value = await report.getVlCollection()
            } catch (e) {
                toastDanger("Unable to generate report!")
            }
            isLoading.value = false
        }

        /**
         * Loads a dialogue to allow users to configure start and end date
         */
         const configure = () => DateSelection({
            onFinish: (sDate: string, eDate: string, periodstr: string) => {
                period.value = `Period (${periodstr})`
                report.startDate = sDate
                report.endDate = eDate
                generate()
            }
        })

        /**
         * Initialization code when the report is empty!
        */
        onMounted(() => !reportData.value.length && configure())

        return {
            reportData,
            isLoading,
            configure,
            generate,
            columns,
            period
        }
    }
})
</script>
