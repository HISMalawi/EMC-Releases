<template>
    <ion-loading :is-open="isLoading" message="Please wait..."/>
    <his-standard-form v-if="!isReportReady"
        :fields="fields"
        :skipSummary="true"
        @onFinish="onPeriod"
    />
    <ion-page v-if="isReportReady"> 
        <ion-content> 
            <cohort-report 
                :indicators="indicators"
                :siteName="siteName"
                :date="reportDate"
                :reportingYear="reportingYear"
                :reportingMonth="reportingMonth"
                @onindicatorsSelected="onIndicatorSelected"
            />
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
import { FieldType } from '@/components/Forms/BaseFormElements'
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from '@/components/Forms/FieldInterface'
import HisDate from "@/utils/Date"
import { Service } from "@/services/service"
import { isPlainObject } from 'lodash'
import { toastDanger } from '@/utils/Alerts'
import { AncCohortReportService } from "@/apps/ANC/Services/anc_cohort_report_service"
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";

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
        const fields: Field[] = [
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
        ]

        function onIndicatorSelected() {
            //TODO: do somthing here
        }

        function exportPDF() {
            //TODO: some cool stuff here
        }

        function exportCSV() {
            //TODO: some cool stuff here
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
                //TODO: run cohort report here and set report indicators
                reportData.value = await report.generate()
                indicators.value = Object.keys(reportData.value['values'])
                    .reduce((a: any, k: string) => {
                        const value = reportData.value['values'][k]['table']['contents']
                        a[k] = Array.isArray(value) ? value.length : value
                        return a
                    }, {})
            } catch (e) {
                console.error(e)
                toastDanger(`${e}`)
            }
            isLoading.value =false
        }

        return {
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
