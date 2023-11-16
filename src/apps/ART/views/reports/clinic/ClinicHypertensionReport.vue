<template>
    <ion-page>
        <ion-loading :is-open="isLoading" message="Please wait..."/>
        <v2Datatable
            title="Hypertension Report"
            :icon-url="logo"
            :subtitle="period"
            :columns="columns"
            :columnData="reportData"
            :rowsPerPage="30" 
            :onConfigure="configure"
            :onRefresh="() => generate()"
            report-prefix="Clinic"
        />
    </ion-page>
</template>

<script lang='ts'>
import { IonPage, IonLoading, modalController } from "@ionic/vue"
import { defineComponent, onMounted, ref } from 'vue'
import  v2Datatable from "@/components/DataViews/tables/v2PocDatatable/TableView.vue"
import { v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { DateSelection } from '@/utils/ReportDateSelectionPrompt';
import { toastDanger, toastWarning } from '@/utils/Alerts';
import { ClinicReportService } from "@/apps/ART/services/reports/clinic_report_service";
import HypertensionDrilldown from "@/apps/ART/Components/HypertensionDrilldown.vue";
import Img from "@/utils/Img";

export default defineComponent({
    components: { 
        IonPage,
        IonLoading,
        v2Datatable
    },
    setup() {
        const logo = Img('reports.png')
        const reportData = ref([])
        const period = ref('')
        const isLoading = ref(false)
        const report = new ClinicReportService()
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
                    label: "Screened for HP",
                    ref: "screened",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Normal <140/<90",
                    ref: "normal_reading",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Mild 140-159/90-99",
                    ref: "mild_reading",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Moderate 160-180/100-110",
                    ref: "moderate_reading",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Severe >180/>110",
                    ref: "severe_reading",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Hydrochlorothiazide 25mg",
                    ref: "hydrochlorothiazide_25mg",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Amlodipine 5mg",
                    ref: "amlodipine_5mg",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Amlodipine 10 mg",
                    ref: "amlodipine_10mg",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Enalapril 5 mg",
                    ref: "enalapril_5mg",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Enalapril 10mg",
                    ref: "enalapril_10mg",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Atenolol 50mg ",
                    ref: "atenolol_50mg",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Atenolol 100mg ",
                    ref: "atenolol_100mg",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                },
                {
                    label: "Total (regimen)",
                    ref: "total_regimen",
                    toValue: (data: any) => data.length,
                    tdClick: ({ column, refData }) => drilldown(`${column.label}`, refData)
                }
            ]
        ]

        const drilldown = async (title: string, patients: Array<any>) => {
            if(patients.length) {
                (await modalController.create({
                    component: HypertensionDrilldown,
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
                const res = await report.getHypertensionReport()
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
