<template>
<ion-loading
    :is-open="isLoading"
    message="Please wait..."
    >
    </ion-loading>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-thumbnail slot="start"> 
                    <ion-img :src="logo"/>
                </ion-thumbnail>
                <ion-label> 
                <ul class="header-text-list" style="list-style-type:none;"> 
                    <li><b>{{ titleHack }}</b></li>
                    <li><b>{{ periodHack }}</b></li>
                </ul>
        </ion-label>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <report-body :key="componentKey" @onClickIndicator="onDrillDown" :indicators="indicators"/>
        </ion-content>
        <ion-footer>
            <ion-toolbar> 
            <ion-chip color="primary">Date Created: <b>{{ date }}</b></ion-chip>
            <ion-chip color="primary">His-Core Version: <b>{{ coreVersion }}</b></ion-chip>
            <ion-chip color="primary">API Version: <b>{{ apiVersion }}</b></ion-chip>
      </ion-toolbar>
        </ion-footer>
        <his-footer :btns="btns"></his-footer>
    </ion-page>
    <div id='print'> </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HisFooter from "@/components/HisDynamicNavFooter.vue";
import { IonPage, IonContent, IonLoading, modalController, IonToolbar, IonHeader } from "@ionic/vue"
import { Service } from "@/services/service"
import HisDate from "@/utils/Date"
import { Field } from '@/components/Forms/FieldInterface'
import ReportMixinVue from "@/apps/ART/views/reports/ReportMixin.vue";
import { MohCohortReportService } from "@/apps/ART/services/reports/moh_cohort_service"
import MonthlyCECAP_TX_ReportBody from "@/apps/CxCa/views/reports/clinic/MonthlyCECAP_TX_ReportBody.vue"
import { MultiStepPopupForm } from "@/utils/PopupKeyboard";
import { FieldType } from "@/components/Forms/BaseFormElements";
import { CxCaReportService } from '@/apps/CxCa/services/reports/cxca_report_service'

export default defineComponent({
    mixins: [ReportMixinVue],
    components: { ReportBody: MonthlyCECAP_TX_ReportBody, IonPage, IonContent, IonLoading, HisFooter, IonToolbar, IonHeader },
    data: () => ({
        formData: {} as any,
        componentKey: 0 as number,
        indicators: {} as any,
        logo: "/assets/images/login-logos/Malawi-Coat_of_arms_of_arms.png" as string,
        clinicName: MohCohortReportService.getLocationName(),
        btns: [] as Array<any>,
        reportReady: false as boolean,
        fields: [] as Array<Field>,
        date: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
        apiVersion: Service.getApiVersion(),
        coreVersion: Service.getCoreVersion(), 
        titleHack: "Monthly CECAP TX Report",
        periodHack: "",
        isLoading: false as boolean,
        reportService: {} as any,
        reportID: -1 as any,
        startDate: '' as string,
        endDate: '' as string
    }),
    created() {
        this.btns = this.getBtns()
        MultiStepPopupForm([
            {
                id: "start_date",
                helpText: "Start date",
                type: FieldType.TT_FULL_DATE
            },
            {
                id: "end_date",
                helpText: "End date",
                type: FieldType.TT_FULL_DATE
            }
        ], {
            skipSummary: true,
            onFinish: (f: any, c: any) => {
                this.onPeriod(f.start_date.value, f.end_date.value )
                console.log(f)
                modalController.dismiss()
            }
        })
    }, 
    methods: {
        async onPeriod(start_date: any, end_date: any) {
            this.startDate = start_date
            this.endDate = end_date
            this.periodHack = this.startDate + "-" + this.endDate
            this.reportService = new CxCaReportService()
            this.reportService.setStartDate(start_date)
            this.reportService.setEndDate(end_date)
            const data = await this.reportService.getClinicReport('MONTHLY CECAP TX');

            this.isLoading = true

            return null
        },
        async onDrillDown(indicatorName: string) {
           return null 
        },
        regenerate() {
            //this.onPeriod(this.formData, this.computedFormData, true)
        },
        exportToCsv() {
            return null
        },
        printSpec() {
            return null
        },
        getBtns() {
            return  [
                {
                name: "CSV",
                size: "large",
                slot: "start",
                color: "primary",
                visible: true,
                onClick: () => this.exportToCsv()
                },
                {
                name: "PDF",
                size: "large",
                slot: "start",
                color: "primary",
                visible: true,
                onClick: () => this.printSpec()
                },
                {
                name: "Refresh",
                size: "large",
                slot: "end",
                color: "danger",
                visible: true,
                onClick: async () => this.regenerate()
                },
                {
                name: "Finish",
                size: "large",
                slot: "end",
                color: "success",
                visible: true,
                onClick: () => this.$router.push({ path:'/' })
                }
            ]   
        }
        
    },
    props: {
        title: {
        type: String,
        required: true,
        },
        period: {
        type: String,
        default: '',
        }
    }
})
</script>