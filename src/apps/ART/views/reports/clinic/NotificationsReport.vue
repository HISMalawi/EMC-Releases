<template>
    <ion-page>
        <v2Datatable
            title="Notification logs"
            :subtitle="subtitle"
            :columnData="data"
            :columns="columns"
            :on-finish="onFinish"
            :on-refresh="generate"
            :on-configure="configure"
            :rowsPerPage="20" 
            report-prefix="Clinic"
        />
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { IonPage, loadingController } from "@ionic/vue"
import  v2Datatable from "@/components/DataViews/tables/v2PocDatatable/TableView.vue"
import { v2ColumnDataInterface, v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { NotificationService } from "@/services/notification_service"
import router from '@/router';
import { DateSelection } from '@/utils/ReportDateSelectionPrompt';
import { toastWarning } from '@/utils/Alerts';

export default defineComponent({ 
    components: {
        IonPage,
        v2Datatable
    },
    setup() {
        const subtitle = ref('-')
        const data = ref<any[]>([])
        const startDate = ref<string>('')
        const endDate = ref<string>('')
        const columns: Array<v2ColumnInterface[]> = [
            [
                {
                    label: 'ARV Number',
                    ref: 'arv_number'
                },
                {
                    label: 'Date ordered',
                    ref: 'date_ordered'
                },
                {
                    label: 'Ordered By',
                    ref: 'ordered_by'
                },
                {
                    label: 'Date of result',
                    ref: 'result_date'
                },
                {
                    label: 'Action',
                    ref: 'patient_id',
                    exportable: false,
                    value: () => "View client",
                    tdClick: ({data}: v2ColumnDataInterface) => router.push({ path: `/patient/dashboard/${data.patient_id}` })
                }
            ]
        ]

        const generate = async () => {
            (await loadingController.create({
                backdropDismiss: false,
                message: "Please wait..."
            })).present()
            try {
                data.value = await NotificationService.getlogs(startDate.value, endDate.value)
            } catch (e) {
                console.error(e)
                toastWarning("Unable to generate report")
            }
            loadingController.getTop().then((t) => t && loadingController.dismiss())
        }

        /**
         * Loads a dialogue to allow users to configure start and end date
         */
         const configure = () => DateSelection({
            onFinish: (sDate: string, eDate: string, periodstr: string) => {
                startDate.value = sDate
                endDate.value = eDate
                subtitle.value = `Period (${periodstr})`
                generate()
            }
        })

        onMounted(() => {
            configure()
        })

        const onFinish = () => router.push('/')

        return  {
            data,
            columns,
            subtitle,
            configure,
            generate,
            onFinish
        }
    }
})
</script>