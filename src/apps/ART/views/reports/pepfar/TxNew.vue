<template>
    <ion-page>
        <ion-loading :is-open="isLoading" message="Please wait..."/>
        <v2Datatable
            :icon-url="Img('login-logos/PEPFAR.png')"
            title="Pepfar Tx New"
            report-prefix="Pepfar"
            :subtitle="period"
            :columns="columns"
            :columnData="reportData"
            :rowsPerPage="100" 
            :onConfigure="configure"
            :onRefresh="generate"
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
import { uniq } from "lodash";

export default defineComponent({
    components: { 
        IonPage,
        IonLoading,
        v2Datatable
    },
    setup() {
        const reportData = ref<any>([])
        const period = ref('')
        const isLoading = ref(false)
        const report = new TxReportService()
        const toDrillColumn = (label: string, ref: string) => {
            return {
                ref, label,
                toValue: (data: any) => data.length,
                tdClick: async (row: any) => {
                    if(row.refData.length) {
                        (await modalController.create({
                            component: ArtDrilldown,
                            backdropDismiss: false,
                            cssClass: 'large-modal',
                            componentProps: {
                                subtitle: period,
                                patientIdentifiers: row.refData,
                                title: `${row.data.age_group} ${row.data.gender} ${row.column.label}`,
                                onFinish: () => modalController.getTop().then(v => v && modalController.dismiss())
                            }
                        })).present();
                    }
                }
            }
        }
        const columns: Array<v2ColumnInterface[]> = [
            [
                { label: "#", ref: "index" },
                { label: "Age group", ref: 'age_group' },
                { label: "Gender", ref: 'gender' },
                toDrillColumn("Tx new CD4<200", "cd4_less_than_200"),
                toDrillColumn("Tx new CD4=>200", "cd4_greater_than_equal_to_200"),
                toDrillColumn("Tx new CD4 Unknown / not done", "cd4_unknown_or_not_done"),
                toDrillColumn("Transfer-ins", "transfer_in")
            ]
        ]

         const generate = async () => {
            if (!(report.startDate && report.endDate)) return toastWarning(
                'Start date and end date required!'
            )
            isLoading.value = true
            reportData.value = []
            try {
                const res = await report.getTxNewReport()
                const GENDER_MAP: any = { F: "Female", M: "Male" }
                const disaggregated = res.reduce((a: any, c: any) => {
                    if (c.age_group ==='Unknown') return a
                    a[c.gender].rows.push({ ...c, gender: GENDER_MAP[c.gender as any] })
                    a[c.gender].aggregate = Object.keys(c).reduce((a: any, k: any) => {
                        if(Array.isArray(c[k])) {
                            return { ...a, [k] : [...a[k]||[], ...c[k]]}
                        }
                        return a
                    }, a[c.gender].aggregate)
                    return a
                },
                { 
                    M: { rows: [], aggregate: {} },
                    F: { rows: [], aggregate: {} }
                })

                reportData.value = [
                    ...disaggregated.F.rows, 
                    ...disaggregated.M.rows,
                    { age_group: 'All', gender: 'Male', ...disaggregated.M.aggregate }
                ]
            
                const allFemale: any = Object.values(disaggregated.F.aggregate).reduce((a: any, c: any) => a.concat(c), [])
                const mStatus = await report.getMaternalStatus(uniq(allFemale))
                const allFp = mStatus.FBf.concat(mStatus.FP);

                (['FP', 'FNP', 'FBf']).forEach((gender: string) => {
                    reportData.value.push(
                        Object.keys(disaggregated.F.aggregate).reduce((a: any, k: any) => {
                            return {
                                ...a, [k]: disaggregated.F.aggregate[k].filter(
                                    (id: number) => gender === 'FNP' 
                                        ? !allFp.includes(id)
                                        : mStatus[gender].includes(id)
                                )
                            }
                        }, { age_group: "All", gender })
                    )
                })
                reportData.value = reportData.value.map((d:any, i: number) => ({index: i+1, ...d}))
            } catch (e) {
                toastDanger("Unable to generate report!")
                console.error(e)
            }
            isLoading.value = false
        }

        const configure = () => DateSelection({
            onFinish: (sDate: string, eDate: string, periodstr: string) => {
                period.value = `Period: ${periodstr}`
                report.startDate = sDate
                report.endDate = eDate
                generate()
            }
        })

        onMounted(() => configure())

        return {
            Img,
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
