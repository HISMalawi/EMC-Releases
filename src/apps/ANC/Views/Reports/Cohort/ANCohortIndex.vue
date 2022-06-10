<template>
    <ion-loading :is-open="isLoading" message="Please wait..."/>
    <his-standard-form v-if="!isReportReady"
        :fields="fields"
        :skipSummary="true"
        @onFinish="onPeriod"
    />
    <ion-page v-if="isReportReady"> 
        <ion-content>
            <div id="report-content">
                <cohort-report 
                    :indicators="indicators"
                    :siteName="siteName"
                    :date="fd(reportDate)"
                    :reportingYear="reportingYear"
                    :reportingMonth="reportingMonth"
                    @onindicatorsSelected="onIndicatorSelected"
                />
            </div>
        </ion-content>
        <ion-footer> 
            <ion-toolbar color="dark"> 
                <ion-button @click="exportCSV" size="large"> 
                    CSV
                </ion-button>
                <ion-button @click="exportPDF" size="large"> 
                    PDF
                </ion-button>
                <ion-button @click="onBack" size="large" slot="end"> 
                    Back
                </ion-button>
                <ion-button 
                    slot="end" 
                    size="large" 
                    color="success"> 
                    Finish
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
    <div id="print"> </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import CohortReport from "@/apps/ANC/Views/Reports/Cohort/ANCohortTemplate.vue"
import { 
    IonPage, 
    IonContent, 
    IonLoading,
    IonFooter,
    IonButton,
    IonToolbar
} from "@ionic/vue"
import { Field } from '@/components/Forms/FieldInterface'
import { Service } from "@/services/service"
import { toastDanger } from '@/utils/Alerts'
import { AncCohortReportService } from "@/apps/ANC/Services/anc_cohort_report_service"
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import { toCsv } from "@/utils/Export"
import  { AncReportComposable } from '@/apps/ANC/Views/Reports/AncReportComposable'

export default defineComponent({
    components: {
        HisStandardForm,
        CohortReport,
        IonPage, 
        IonContent, 
        IonLoading,
        IonFooter,
        IonButton,
        IonToolbar
    },
    setup() {
        const { getMonthlyReportFields, showPrintWindow, fd } = AncReportComposable()
        const siteName = Service.getLocationName()
        const report = new AncCohortReportService()
        const reportData = ref({} as any)
        const reportingYear = ref(0 as number)
        const reportingMonth = ref('' as string)
        const isLoading = ref(false)
        const indicators = ref({} as Record<string, any>)
        const isReportReady = ref(false)
        const reportDate = computed(() => {
            if (reportingYear.value && reportingMonth.value) {
                return `${reportingYear.value}-${reportingMonth.value}-01`
            }
            return ''
        })
        const fields: Field[] = getMonthlyReportFields()

        function onIndicatorSelected() {
            //TODO: do somthing here
        }

        function exportPDF() {
            showPrintWindow({
                containerID: 'report-content',
                cssFile: '/assets/css/anc-cohort.css',
            })
        }

        function exportCSV() {
            const headers = ['Indicator', 'Value']
            const rows = Object.keys(reportData.value['values'])
                .map((k: string) => {
                    return [
                        reportData.value['values'][k]['table']['indicator_name'],
                        reportData.value['values'][k]['table']['contents'].length
                    ]
                })
            toCsv([headers], rows, `${siteName} cohort report ${reportDate.value}`)
        }

        function onBack() {
            isReportReady.value = false
        }

        async function onPeriod(_: any, c: Record<string, string | number>) {
            isLoading.value = true
            isReportReady.value = true
            reportingYear.value = c.year as number
            reportingMonth.value = c.month as string
            report.setStartDate(reportDate.value)
            try {
                reportData.value = await report.generate()
                indicators.value = Object.keys(reportData.value['values'])
                    .reduce((a: any, k: string) => {
                        a[k] = reportData.value['values'][k]['table']['contents'].length
                        return a
                    }, {})
            } catch (e) {
                console.error(e)
                toastDanger(`${e}`)
            }
            isLoading.value =false
        }

        return {
            fd,
            siteName,
            isLoading,
            onIndicatorSelected,
            fields,
            indicators,
            reportDate,
            reportingYear,
            reportingMonth,
            isReportReady,
            exportPDF,
            exportCSV,
            onBack,
            onPeriod
        }
    }
})
</script>
