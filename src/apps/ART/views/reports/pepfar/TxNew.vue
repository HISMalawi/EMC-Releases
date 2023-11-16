<template>
    <ion-page>
        <ion-loading :is-open="isLoading" message="Please wait..."/>
        <v2Datatable
            title="Pepfar Tx New"
            report-prefix="Pepfar"
            :icon-url="logo"
            :subtitle="period"
            :columns="columns"
            :columnData="reportData"
            :rowsPerPage="100" 
            :onConfigure="configure"
            :onRefresh="() => generate()"
        />
    </ion-page>
</template>

<script lang='ts'>
import { IonPage, IonLoading, modalController } from "@ionic/vue"
import { defineComponent, onMounted, ref } from 'vue'
import { v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { DateSelection } from '@/utils/ReportDateSelectionPrompt';
import { toastDanger, toastWarning } from '@/utils/Alerts';
import { TxReportService } from "@/apps/ART/services/reports/tx_report_service";
import v2Datatable from "@/components/DataViews/tables/v2PocDatatable/TableView.vue"
import ArtDrilldown from "@/apps/ART/Components/ArtDrilldown.vue";
import Img from "@/utils/Img";

export default defineComponent({
    components: { 
        IonPage,
        IonLoading,
        v2Datatable
    },
    setup() {
        const logo = Img('login-logos/PEPFAR.png')
        const reportData = ref([])
        const period = ref('')
        const isLoading = ref(false)
        const report = new TxReportService()
        const columns: Array<v2ColumnInterface[]> = [
            [
                {
                    label: "#",
                    ref: "index"
                },
                {
                    label: "Age group",
                    ref: 'age_group'
                },
                {
                    label: "Gender",
                    ref: 'gender'
                },
                {
                    label: "Tx new CD4<200",
                    ref: "cd4_less_than_200",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Tx new CD4=>200",
                    ref: "cd4_greater_than_equal_to_200",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Tx new CD4 Unknown / not done",
                    ref: "cd4_unknown_or_not_done",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Transfer-ins",
                    ref: "transfer_in",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                }
            ]
        ]

        const drilldown = async (title: string, patients: Array<any>) => {
            if(patients.length) {
                (await modalController.create({
                    component: ArtDrilldown,
                    backdropDismiss: false,
                    cssClass: 'large-modal',
                    componentProps: {
                        title,
                        subtitle: period,
                        patients,
                        onFinish: () => modalController.getTop().then(v => v && modalController.dismiss())
                    }
                })).present();
            }
        }
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
                const res = await report.getTxNewReport()
                const data = Object.keys(res).reduce((a: any, k) => {
                    a.M.push({
                        age_group: k,
                        gender: 'Male',
                        ...res[k]['M']
                    })
                    a.F.push({
                        age_group: k,
                        gender: 'Female',
                        ...res[k]['F']
                    })
                    return a
                },
                {
                    F: [],
                    M: []
                })
                reportData.value = data.F.concat(data.M).map((d: any, i: any) => ({index: i+1, ...d}))
            } catch (e) {
                toastDanger("Unable to generate report!")
                console.error(e)
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
            logo,
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
