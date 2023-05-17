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
                    <li><b>{{ reportTitle }}</b></li>
                    <li><b>{{ reportPeriod }}</b></li>
                </ul>
        </ion-label>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="report-content">
                <report-body :key="componentKey" @onClickIndicator="onDrillDown" :indicators="indicators"/>
            </div>        
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
import MonthlyScreenBody from "@/apps/CxCa/views/reports/clinic/MonthlyScreenBody.vue"
import { MultiStepPopupForm } from "@/utils/PopupKeyboard";
import { FieldType } from "@/components/Forms/BaseFormElements";
import dayjs from "dayjs";
import { isPlainObject } from "lodash";
import { toDate } from "@/utils/Strs";
import { Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import DrilldownTable from "@/apps/ART/views/reports/BasicReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { Patientservice } from "@/services/patient_service";
import { useRouter } from "vue-router"
import { toCsv, toPDFfromHTML } from "@/utils/Export"

export default defineComponent({
    mixins: [ReportMixinVue],
    components: { ReportBody: MonthlyScreenBody, IonPage, IonContent, IonLoading, HisFooter, IonToolbar, IonHeader },
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
        reportTitle: "Monthly Screen Report",
        reportPeriod: "",
        isLoading: false as boolean,
        reportService: {} as any,
        reportID: -1 as any,
        reportCohort: [] as Array<[string, Array<number>]>,
        startDate: '' as string,
        endDate: '' as string
    }),
    created() {
        this.btns = this.getBtns()
        MultiStepPopupForm([
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
        ], 
        (f: any) => {
            this.startDate = `${f.year.value}-${f.month.value}-01`
            this.endDate = dayjs(new Date(this.startDate).toISOString()).endOf("month").format("YYYY-MM-DD")
            this.onPeriod()
            modalController.dismiss()
        })
    }, 
    methods: {
        async onPeriod() {
            this.reportPeriod = toDate(this.startDate) + " - " + toDate(this.endDate)
            this.isLoading = true
            //the MONTHLY SCREEN
            Service.getJson('screened_for_cxca',{
                'report_name': 'MONTHLY SCREEN',
                'program_id': Service.getProgramID(),
                'start_date': this.startDate,
                'end_date': this.endDate,
                'date': Service.getSessionDate()
            }).then(response => {
                //load data and perform calculations based by age                    
                const age_groups = this.sortData(response)
                /*assigning values to table via indicators
                *raw 1*/
                this.indicators.mnth_scrn_1st_negative_15_19 = age_groups[0].first_time_screened_negative.length
                this.indicators.mnth_scrn_1st_Positive_15_19 = age_groups[0].first_time_screened_positive.length
                this.indicators.mnth_scrn_1st_for_same_day_tx_15_19 = age_groups[0].first_time_screened_suspected.length
                this.indicators.mnth_scrn_1st_suspect_cx_15_19 = age_groups[0].first_time_screened_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_1st_negative_15_19", age_groups[0].first_time_screened_negative])
                this.reportCohort.push(["mnth_scrn_1st_Positive_15_19", age_groups[0].first_time_screened_positive])
                this.reportCohort.push(["mnth_scrn_1st_for_same_day_tx_15_19", age_groups[0].first_time_screened_suspected])
                this.reportCohort.push(["mnth_scrn_1st_suspect_cx_15_19", age_groups[0].first_time_screened_for_same_day_tx])
                //raw 2
                this.indicators.mnth_scrn_1st_negative_20_24 = age_groups[1].first_time_screened_negative.length
                this.indicators.mnth_scrn_1st_Positive_20_24 = age_groups[1].first_time_screened_positive.length
                this.indicators.mnth_scrn_1st_for_same_day_tx_20_24 = age_groups[1].first_time_screened_suspected.length
                this.indicators.mnth_scrn_1st_suspect_cx_20_24 = age_groups[1].first_time_screened_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_1st_negative_20_24", age_groups[1].first_time_screened_negative])
                this.reportCohort.push(["mnth_scrn_1st_Positive_20_24", age_groups[1].first_time_screened_positive])
                this.reportCohort.push(["mnth_scrn_1st_for_same_day_tx_20_24", age_groups[1].first_time_screened_suspected])
                this.reportCohort.push(["mnth_scrn_1st_suspect_cx_20_24", age_groups[1].first_time_screened_for_same_day_tx])
                //raw 3
                this.indicators.mnth_scrn_1st_negative_25_29 = age_groups[2].first_time_screened_negative.length
                this.indicators.mnth_scrn_1st_Positive_25_29 = age_groups[2].first_time_screened_positive.length
                this.indicators.mnth_scrn_1st_for_same_day_tx_20_24 = age_groups[2].first_time_screened_suspected.length
                this.indicators.mnth_scrn_1st_suspect_cx_25_29 = age_groups[2].first_time_screened_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_1st_negative_20_24", age_groups[2].first_time_screened_negative])
                this.reportCohort.push(["mnth_scrn_1st_Positive_20_24", age_groups[2].first_time_screened_positive])
                this.reportCohort.push(["mnth_scrn_1st_for_same_day_tx_25_29", age_groups[2].first_time_screened_suspected])
                this.reportCohort.push(["mnth_scrn_1st_suspect_cx_20_24", age_groups[2].first_time_screened_for_same_day_tx])
                //raw 4
                this.indicators.mnth_scrn_1st_negative_30_34 = age_groups[3].first_time_screened_negative.length
                this.indicators.mnth_scrn_1st_Positive_30_34 = age_groups[3].first_time_screened_positive.length
                this.indicators.mnth_scrn_1st_for_same_day_tx_30_34 = age_groups[3].first_time_screened_suspected.length
                this.indicators.mnth_scrn_1st_suspect_cx_30_34 = age_groups[3].first_time_screened_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_1st_negative_30_34", age_groups[3].first_time_screened_negative])
                this.reportCohort.push(["mnth_scrn_1st_Positive_30_34", age_groups[3].first_time_screened_positive])
                this.reportCohort.push(["mnth_scrn_1st_for_same_day_tx_30_34", age_groups[3].first_time_screened_suspected])
                this.reportCohort.push(["mnth_scrn_1st_suspect_cx_30_34", age_groups[3].first_time_screened_for_same_day_tx])
                //raw 5
                this.indicators.mnth_scrn_1st_negative_35_39 = age_groups[4].first_time_screened_negative.length
                this.indicators.mnth_scrn_1st_Positive_35_39 = age_groups[4].first_time_screened_positive.length
                this.indicators.mnth_scrn_1st_for_same_day_tx_35_39 = age_groups[4].first_time_screened_suspected.length
                this.indicators.mnth_scrn_1st_suspect_cx_35_39 = age_groups[4].first_time_screened_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_1st_negative_35_39", age_groups[4].first_time_screened_negative])
                this.reportCohort.push(["mnth_scrn_1st_Positive_35_39", age_groups[4].first_time_screened_positive])
                this.reportCohort.push(["mnth_scrn_1st_for_same_day_tx_35_39", age_groups[4].first_time_screened_suspected])
                this.reportCohort.push(["mnth_scrn_1st_suspect_cx_35_39", age_groups[4].first_time_screened_for_same_day_tx])
                //raw 6
                this.indicators.mnth_scrn_1st_negative_40_44 = age_groups[5].first_time_screened_negative.length
                this.indicators.mnth_scrn_1st_Positive_40_44 = age_groups[5].first_time_screened_positive.length
                this.indicators.mnth_scrn_1st_for_same_day_tx_40_44 = age_groups[5].first_time_screened_suspected.length
                this.indicators.mnth_scrn_1st_suspect_cx_40_44 = age_groups[5].first_time_screened_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_1st_negative_40_44", age_groups[5].first_time_screened_negative])
                this.reportCohort.push(["mnth_scrn_1st_Positive_40_44", age_groups[5].first_time_screened_positive])
                this.reportCohort.push(["mnth_scrn_1st_for_same_day_tx_40_44", age_groups[5].first_time_screened_suspected])
                this.reportCohort.push(["mnth_scrn_1st_suspect_cx_40_44", age_groups[5].first_time_screened_for_same_day_tx])
                //raw 7
                this.indicators.mnth_scrn_1st_negative_45_49 = age_groups[6].first_time_screened_negative.length
                this.indicators.mnth_scrn_1st_Positive_45_49 = age_groups[6].first_time_screened_positive.length
                this.indicators.mnth_scrn_1st_for_same_day_tx_45_49 = age_groups[6].first_time_screened_suspected.length
                this.indicators.mnth_scrn_1st_suspect_cx_45_49 = age_groups[6].first_time_screened_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_1st_negative_45_49", age_groups[6].first_time_screened_negative])
                this.reportCohort.push(["mnth_scrn_1st_Positive_45_49", age_groups[6].first_time_screened_positive])
                this.reportCohort.push(["mnth_scrn_1st_for_same_day_tx_45_49", age_groups[6].first_time_screened_suspected])
                this.reportCohort.push(["mnth_scrn_1st_suspect_cx_45_49", age_groups[6].first_time_screened_for_same_day_tx])
                //raw 8
                this.indicators.mnth_scrn_1st_negative_50 = age_groups[7].first_time_screened_negative.length
                this.indicators.mnth_scrn_1st_Positive_50 = age_groups[7].first_time_screened_positive.length
                this.indicators.mnth_scrn_1st_for_same_day_tx_50 = age_groups[7].first_time_screened_suspected.length
                this.indicators.mnth_scrn_1st_suspect_cx_50 = age_groups[7].first_time_screened_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_1st_negative_50", age_groups[7].first_time_screened_negative])
                this.reportCohort.push(["mnth_scrn_1st_Positive_50", age_groups[7].first_time_screened_positive])
                this.reportCohort.push(["mnth_scrn_1st_for_same_day_tx_50", age_groups[7].first_time_screened_suspected])
                this.reportCohort.push(["mnth_scrn_1st_suspect_cx_50", age_groups[7].first_time_screened_for_same_day_tx])
                //raw 9
                this.indicators.mnth_scrn_1st_negative_unkn = [].length
                this.indicators.mnth_scrn_1st_Positive_unkn = [].length
                this.indicators.mnth_scrn_1st_for_same_day_tx_unkn = [].length
                this.indicators.mnth_scrn_1st_suspect_cx_unkn = [].length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_1st_negative_unkn", []])
                this.reportCohort.push(["mnth_scrn_1st_Positive_unkn", []])
                this.reportCohort.push(["mnth_scrn_1st_for_same_day_tx_unkn", []])
                this.reportCohort.push(["mnth_scrn_1st_suspect_cx_unkn", []])

                //raw 11 skipped title raw 10
                this.indicators.mnth_scrn_rscrnapn_negative_15_19 = age_groups[8].rescreened_after_prev_visit_negative.length
                this.indicators.mnth_scrn_rscrnapn_Positive_15_19 = age_groups[8].rescreened_after_prev_visit_positive.length
                this.indicators.mnth_scrn_rscrnapn_for_same_day_tx_15_19 = age_groups[8].rescreened_after_prev_visit_suspected.length
                this.indicators.mnth_scrn_rscrnapn_suspect_cx_15_19 = age_groups[8].rescreened_after_prev_visit_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_rscrnapn_negative_15_19", age_groups[8].rescreened_after_prev_visit_negative])
                this.reportCohort.push(["mnth_scrn_rscrnapn_Positive_15_19", age_groups[8].rescreened_after_prev_visit_positive])
                this.reportCohort.push(["mnth_scrn_rscrnapn_for_same_day_tx_15_19", age_groups[8].rescreened_after_prev_visit_suspected])
                this.reportCohort.push(["mnth_scrn_rscrnapn_suspect_cx_15_19", age_groups[8].rescreened_after_prev_visit_for_same_day_tx])
                //raw 12
                this.indicators.mnth_scrn_rscrnapn_negative_20_24 = age_groups[9].rescreened_after_prev_visit_negative.length
                this.indicators.mnth_scrn_rscrnapn_Positive_20_24 = age_groups[9].rescreened_after_prev_visit_positive.length
                this.indicators.mnth_scrn_rscrnapn_for_same_day_tx_20_24 = age_groups[9].rescreened_after_prev_visit_suspected.length
                this.indicators.mnth_scrn_rscrnapn_suspect_cx_20_24 = age_groups[9].rescreened_after_prev_visit_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_rscrnapn_negative_20_24", age_groups[9].rescreened_after_prev_visit_negative])
                this.reportCohort.push(["mnth_scrn_rscrnapn_Positive_20_24", age_groups[9].rescreened_after_prev_visit_positive])
                this.reportCohort.push(["mnth_scrn_rscrnapn_for_same_day_tx_20_24", age_groups[9].rescreened_after_prev_visit_suspected])
                this.reportCohort.push(["mnth_scrn_rscrnapn_suspect_cx_20_24", age_groups[9].rescreened_after_prev_visit_for_same_day_tx])
                //raw 13
                this.indicators.mnth_scrn_rscrnapn_negative_25_29 = age_groups[10].rescreened_after_prev_visit_negative.length
                this.indicators.mnth_scrn_rscrnapn_Positive_25_29 = age_groups[10].rescreened_after_prev_visit_positive.length
                this.indicators.mnth_scrn_rscrnapn_for_same_day_tx_25_29 = age_groups[10].rescreened_after_prev_visit_suspected.length
                this.indicators.mnth_scrn_rscrnapn_suspect_cx_25_29 = age_groups[10].rescreened_after_prev_visit_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_rscrnapn_negative_25_29", age_groups[10].rescreened_after_prev_visit_negative])
                this.reportCohort.push(["mnth_scrn_rscrnapn_Positive_25_29", age_groups[10].rescreened_after_prev_visit_positive])
                this.reportCohort.push(["mnth_scrn_rscrnapn_for_same_day_tx_25_29", age_groups[10].rescreened_after_prev_visit_suspected])
                this.reportCohort.push(["mnth_scrn_rscrnapn_suspect_cx_25_29", age_groups[10].rescreened_after_prev_visit_for_same_day_tx])
                //raw 14
                this.indicators.mnth_scrn_rscrnapn_negative_30_34 = age_groups[11].rescreened_after_prev_visit_negative.length
                this.indicators.mnth_scrn_rscrnapn_Positive_30_34 = age_groups[11].rescreened_after_prev_visit_positive.length
                this.indicators.mnth_scrn_rscrnapn_for_same_day_tx_30_34 = age_groups[11].rescreened_after_prev_visit_suspected.length
                this.indicators.mnth_scrn_rscrnapn_suspect_cx_30_34 = age_groups[11].rescreened_after_prev_visit_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_rscrnapn_negative_30_34", age_groups[11].rescreened_after_prev_visit_negative])
                this.reportCohort.push(["mnth_scrn_rscrnapn_Positive_30_34", age_groups[11].rescreened_after_prev_visit_positive])
                this.reportCohort.push(["mnth_scrn_rscrnapn_for_same_day_tx_30_34", age_groups[11].rescreened_after_prev_visit_suspected])
                this.reportCohort.push(["mnth_scrn_rscrnapn_suspect_cx_30_34", age_groups[11].rescreened_after_prev_visit_for_same_day_tx])
                //raw 15
                this.indicators.mnth_scrn_rscrnapn_negative_35_39 = age_groups[12].rescreened_after_prev_visit_negative.length
                this.indicators.mnth_scrn_rscrnapn_Positive_35_39 = age_groups[12].rescreened_after_prev_visit_positive.length
                this.indicators.mnth_scrn_rscrnapn_for_same_day_tx_35_39 = age_groups[12].rescreened_after_prev_visit_suspected.length
                this.indicators.mnth_scrn_rscrnapn_suspect_cx_35_39 = age_groups[12].rescreened_after_prev_visit_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_rscrnapn_negative_35_39", age_groups[12].rescreened_after_prev_visit_negative])
                this.reportCohort.push(["mnth_scrn_rscrnapn_Positive_35_39", age_groups[12].rescreened_after_prev_visit_positive])
                this.reportCohort.push(["mnth_scrn_rscrnapn_for_same_day_tx_35_39", age_groups[12].rescreened_after_prev_visit_suspected])
                this.reportCohort.push(["mnth_scrn_rscrnapn_suspect_cx_35_39", age_groups[12].rescreened_after_prev_visit_for_same_day_tx])
                //raw 16
                this.indicators.mnth_scrn_rscrnapn_negative_40_44 = age_groups[13].rescreened_after_prev_visit_negative.length
                this.indicators.mnth_scrn_rscrnapn_Positive_40_44 = age_groups[13].rescreened_after_prev_visit_positive.length
                this.indicators.mnth_scrn_rscrnapn_for_same_day_tx_40_44 = age_groups[13].rescreened_after_prev_visit_suspected.length
                this.indicators.mnth_scrn_rscrnapn_suspect_cx_40_44 = age_groups[13].rescreened_after_prev_visit_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_rscrnapn_negative_40_44", age_groups[13].rescreened_after_prev_visit_negative])
                this.reportCohort.push(["mnth_scrn_rscrnapn_Positive_40_44", age_groups[13].rescreened_after_prev_visit_positive])
                this.reportCohort.push(["mnth_scrn_rscrnapn_for_same_day_tx_40_44", age_groups[13].rescreened_after_prev_visit_suspected])
                this.reportCohort.push(["mnth_scrn_rscrnapn_suspect_cx_40_44", age_groups[13].rescreened_after_prev_visit_for_same_day_tx])
                //raw 17
                this.indicators.mnth_scrn_rscrnapn_negative_45_49 = age_groups[14].rescreened_after_prev_visit_negative.length
                this.indicators.mnth_scrn_rscrnapn_Positive_45_49 = age_groups[14].rescreened_after_prev_visit_positive.length
                this.indicators.mnth_scrn_rscrnapn_for_same_day_tx_45_49 = age_groups[14].rescreened_after_prev_visit_suspected.length
                this.indicators.mnth_scrn_rscrnapn_suspect_cx_45_49 = age_groups[14].rescreened_after_prev_visit_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_rscrnapn_negative_45_49", age_groups[14].rescreened_after_prev_visit_negative])
                this.reportCohort.push(["mnth_scrn_rscrnapn_Positive_45_49", age_groups[14].rescreened_after_prev_visit_positive])
                this.reportCohort.push(["mnth_scrn_rscrnapn_for_same_day_tx_45_49", age_groups[14].rescreened_after_prev_visit_suspected])
                this.reportCohort.push(["mnth_scrn_rscrnapn_suspect_cx_45_49", age_groups[14].rescreened_after_prev_visit_for_same_day_tx])
                //raw 18
                this.indicators.mnth_scrn_rscrnapn_negative_50 = age_groups[15].rescreened_after_prev_visit_negative.length
                this.indicators.mnth_scrn_rscrnapn_Positive_50 = age_groups[15].rescreened_after_prev_visit_positive.length
                this.indicators.mnth_scrn_rscrnapn_for_same_day_tx_50 = age_groups[15].rescreened_after_prev_visit_suspected.length
                this.indicators.mnth_scrn_rscrnapn_suspect_cx_50 = age_groups[15].rescreened_after_prev_visit_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_rscrnapn_negative_50", age_groups[15].rescreened_after_prev_visit_negative])
                this.reportCohort.push(["mnth_scrn_rscrnapn_Positive_50", age_groups[15].rescreened_after_prev_visit_positive])
                this.reportCohort.push(["mnth_scrn_rscrnapn_for_same_day_tx_50", age_groups[15].rescreened_after_prev_visit_suspected])
                this.reportCohort.push(["mnth_scrn_rscrnapn_suspect_cx_50", age_groups[15].rescreened_after_prev_visit_for_same_day_tx])
                //raw 19
                this.indicators.mnth_scrn_rscrnapn_negative_unkn = [].length
                this.indicators.mnth_scrn_rscrnapn_Positive_unkn = [].length
                this.indicators.mnth_scrn_rscrnapn_for_same_day_tx_unkn = [].length
                this.indicators.mnth_scrn_rscrnapn_suspect_cx_unkn = [].length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_rscrnapn_negative_unkn", []])
                this.reportCohort.push(["mnth_scrn_rscrnapn_Positive_unkn", []])
                this.reportCohort.push(["mnth_scrn_rscrnapn_for_same_day_tx_unkn", []])
                this.reportCohort.push(["mnth_scrn_rscrnapn_suspect_cx_unkn", []])

                //raw 21 skipped title raw 20
                this.indicators.mnth_scrn_ptfu_negative_15_19 = age_groups[16].post_treatment_followup_negative.length
                this.indicators.mnth_scrn_ptfu_Positive_15_19 = age_groups[16].post_treatment_followup_positive.length
                this.indicators.mnth_scrn_ptfu_for_same_day_tx_15_19 = age_groups[16].post_treatment_followup_suspected.length
                this.indicators.mnth_scrn_ptfu_suspect_cx_15_19 = age_groups[16].post_treatment_followup_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_ptfu_negative_15_19", age_groups[16].post_treatment_followup_negative])
                this.reportCohort.push(["mnth_scrn_ptfu_Positive_15_19", age_groups[16].post_treatment_followup_positive])
                this.reportCohort.push(["mnth_scrn_ptfu_for_same_day_tx_15_19", age_groups[16].post_treatment_followup_suspected])
                this.reportCohort.push(["mnth_scrn_ptfu_suspect_cx_15_19", age_groups[16].post_treatment_followup_for_same_day_tx])
                //raw 22
                this.indicators.mnth_scrn_ptfu_negative_20_24 = age_groups[17].post_treatment_followup_negative.length
                this.indicators.mnth_scrn_ptfu_Positive_20_24 = age_groups[17].post_treatment_followup_positive.length
                this.indicators.mnth_scrn_ptfu_for_same_day_tx_20_24 = age_groups[17].post_treatment_followup_suspected.length
                this.indicators.mnth_scrn_ptfu_suspect_cx_20_24 = age_groups[17].post_treatment_followup_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_ptfu_negative_20_24", age_groups[17].post_treatment_followup_negative])
                this.reportCohort.push(["mnth_scrn_ptfu_Positive_20_24", age_groups[17].post_treatment_followup_positive])
                this.reportCohort.push(["mnth_scrn_ptfu_for_same_day_tx_20_24", age_groups[17].post_treatment_followup_suspected])
                this.reportCohort.push(["mnth_scrn_ptfu_suspect_cx_20_24", age_groups[17].post_treatment_followup_for_same_day_tx])
                //raw 23
                this.indicators.mnth_scrn_ptfu_negative_25_29 = age_groups[18].post_treatment_followup_negative.length
                this.indicators.mnth_scrn_ptfu_Positive_25_29 = age_groups[18].post_treatment_followup_positive.length
                this.indicators.mnth_scrn_ptfu_for_same_day_tx_25_29 = age_groups[18].post_treatment_followup_suspected.length
                this.indicators.mnth_scrn_ptfu_suspect_cx_25_29 = age_groups[18].post_treatment_followup_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_ptfu_negative_25_29", age_groups[18].post_treatment_followup_negative])
                this.reportCohort.push(["mnth_scrn_ptfu_Positive_25_29", age_groups[18].post_treatment_followup_positive])
                this.reportCohort.push(["mnth_scrn_ptfu_for_same_day_tx_25_29", age_groups[18].post_treatment_followup_suspected])
                this.reportCohort.push(["mnth_scrn_ptfu_suspect_cx_25_29", age_groups[18].post_treatment_followup_for_same_day_tx])
                //raw 24
                this.indicators.mnth_scrn_ptfu_negative_30_34 = age_groups[19].post_treatment_followup_negative.length
                this.indicators.mnth_scrn_ptfu_Positive_30_34 = age_groups[19].post_treatment_followup_positive.length
                this.indicators.mnth_scrn_ptfu_for_same_day_tx_30_34 = age_groups[19].post_treatment_followup_suspected.length
                this.indicators.mnth_scrn_ptfu_suspect_cx_30_34 = age_groups[19].post_treatment_followup_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_ptfu_negative_30_34", age_groups[19].post_treatment_followup_negative])
                this.reportCohort.push(["mnth_scrn_ptfu_Positive_30_34", age_groups[19].post_treatment_followup_positive])
                this.reportCohort.push(["mnth_scrn_ptfu_for_same_day_tx_30_34", age_groups[19].post_treatment_followup_suspected])
                this.reportCohort.push(["mnth_scrn_ptfu_suspect_cx_30_34", age_groups[19].post_treatment_followup_for_same_day_tx])
                //raw 25
                this.indicators.mnth_scrn_ptfu_negative_35_39 = age_groups[20].post_treatment_followup_negative.length
                this.indicators.mnth_scrn_ptfu_Positive_35_39 = age_groups[20].post_treatment_followup_positive.length
                this.indicators.mnth_scrn_ptfu_for_same_day_tx_35_39 = age_groups[20].post_treatment_followup_suspected.length
                this.indicators.mnth_scrn_ptfu_suspect_cx_35_39 = age_groups[20].post_treatment_followup_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_ptfu_negative_35_39", age_groups[20].post_treatment_followup_negative])
                this.reportCohort.push(["mnth_scrn_ptfu_Positive_35_39", age_groups[20].post_treatment_followup_positive])
                this.reportCohort.push(["mnth_scrn_ptfu_for_same_day_tx_35_39", age_groups[20].post_treatment_followup_suspected])
                this.reportCohort.push(["mnth_scrn_ptfu_suspect_cx_35_39", age_groups[20].post_treatment_followup_for_same_day_tx])
                //raw 26
                this.indicators.mnth_scrn_ptfu_negative_40_44 = age_groups[21].post_treatment_followup_negative.length
                this.indicators.mnth_scrn_ptfu_Positive_40_44 = age_groups[21].post_treatment_followup_positive.length
                this.indicators.mnth_scrn_ptfu_for_same_day_tx_40_44 = age_groups[21].post_treatment_followup_suspected.length
                this.indicators.mnth_scrn_ptfu_suspect_cx_40_44 = age_groups[21].post_treatment_followup_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_ptfu_negative_40_44", age_groups[21].post_treatment_followup_negative])
                this.reportCohort.push(["mnth_scrn_ptfu_Positive_40_44", age_groups[21].post_treatment_followup_positive])
                this.reportCohort.push(["mnth_scrn_ptfu_for_same_day_tx_40_44", age_groups[21].post_treatment_followup_suspected])
                this.reportCohort.push(["mnth_scrn_ptfu_suspect_cx_40_44", age_groups[21].post_treatment_followup_for_same_day_tx])
                //raw 27
                this.indicators.mnth_scrn_ptfu_negative_45_49 = age_groups[22].post_treatment_followup_negative.length
                this.indicators.mnth_scrn_ptfu_Positive_45_49 = age_groups[22].post_treatment_followup_positive.length
                this.indicators.mnth_scrn_ptfu_for_same_day_tx_45_49 = age_groups[22].post_treatment_followup_suspected.length
                this.indicators.mnth_scrn_ptfu_suspect_cx_45_49 = age_groups[22].post_treatment_followup_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_ptfu_negative_45_49", age_groups[22].post_treatment_followup_negative])
                this.reportCohort.push(["mnth_scrn_ptfu_Positive_45_49", age_groups[22].post_treatment_followup_positive])
                this.reportCohort.push(["mnth_scrn_ptfu_for_same_day_tx_45_49", age_groups[22].post_treatment_followup_suspected])
                this.reportCohort.push(["mnth_scrn_ptfu_suspect_cx_45_49", age_groups[22].post_treatment_followup_for_same_day_tx])
                //raw 28
                this.indicators.mnth_scrn_ptfu_negative_50 = age_groups[23].post_treatment_followup_negative.length
                this.indicators.mnth_scrn_ptfu_Positive_50 = age_groups[23].post_treatment_followup_positive.length
                this.indicators.mnth_scrn_ptfu_for_same_day_tx_50 = age_groups[23].post_treatment_followup_suspected.length
                this.indicators.mnth_scrn_ptfu_suspect_cx_50 = age_groups[23].post_treatment_followup_for_same_day_tx.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_ptfu_negative_50", age_groups[23].post_treatment_followup_negative])
                this.reportCohort.push(["mnth_scrn_ptfu_Positive_50", age_groups[23].post_treatment_followup_positive])
                this.reportCohort.push(["mnth_scrn_ptfu_for_same_day_tx_50", age_groups[23].post_treatment_followup_suspected])
                this.reportCohort.push(["mnth_scrn_ptfu_suspect_cx_50", age_groups[23].post_treatment_followup_for_same_day_tx])
                //raw 29
                this.indicators.mnth_scrn_ptfu_negative_unkn = [].length
                this.indicators.mnth_scrn_ptfu_Positive_unkn = [].length
                this.indicators.mnth_scrn_ptfu_for_same_day_tx_unkn = [].length
                this.indicators.mnth_scrn_ptfu_suspect_cx_unkn = [].length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_ptfu_negative_unkn", []])
                this.reportCohort.push(["mnth_scrn_ptfu_Positive_unkn", []])
                this.reportCohort.push(["mnth_scrn_ptfu_for_same_day_tx_unkn", []])
                this.reportCohort.push(["mnth_scrn_ptfu_suspect_cx_unkn", []])
                
                //total raws
                this.indicators.mnth_scrn_total_screened = age_groups[24].total_screened.length
                this.indicators.mnth_scrn_total_negative = age_groups[24].total_negative.length
                this.indicators.mnth_scrn_total_via_positive_eligible_same_day_tx = age_groups[24].total_via_plus_eligible_for_same_day_tx.length
                this.indicators.mnth_scrn__total_positive = age_groups[24].total_positive.length
                this.indicators.mnth_scrn_suspected_cx = age_groups[24].total_suspect_cancer.length
                //adding to report cohort
                this.reportCohort.push(["mnth_scrn_total_screened", age_groups[24].total_screened])
                this.reportCohort.push(["mnth_scrn_total_negative", age_groups[24].total_negative])
                this.reportCohort.push(["mnth_scrn_total_via_positive_eligible_same_day_tx", age_groups[24].total_via_plus_eligible_for_same_day_tx])
                this.reportCohort.push(["mnth_scrn__total_positive", age_groups[24].total_positive])
                this.reportCohort.push(["mnth_scrn_suspected_cx", age_groups[24].total_suspect_cancer])

                
                this.isLoading = false
            })
                        
        },
        sortData(data:any): any[] {
            const results = [] as any;
            //looping through each array
            for (let i = 0; i < data.data.first_time_screened.length; i++) {
                const ageGroup = data.data.first_time_screened[i].age_group;
                const ageGroupDataFirstScreen: any = {
                    age_group: ageGroup,
                    first_time_screened_negative: [],
                    first_time_screened_positive: [],
                    first_time_screened_suspected: [],
                    first_time_screened_for_same_day_tx: []
                };
                //pushing received arrays
                ageGroupDataFirstScreen.first_time_screened_negative.concat(data.data.first_time_screened[i].negative)
                ageGroupDataFirstScreen.first_time_screened_positive.concat(data.data.first_time_screened[i].positive)
                ageGroupDataFirstScreen.first_time_screened_suspected.concat(data.data.first_time_screened[i].suspected)
                ageGroupDataFirstScreen.first_time_screened_for_same_day_tx.concat(data.data.first_time_screened[i].for_same_day_tx)
                //pushing to results
                results.push(ageGroupDataFirstScreen)
            }
            //looping through each array
            for (let i = 0; i < data.data.rescreened_after_prev_visit.length; i++) {
                const ageGroup = data.data.rescreened_after_prev_visit[i].age_group;
                const ageGroupDataFirstScreen: any = {
                    age_group: ageGroup,
                    rescreened_after_prev_visit_negative: [],
                    rescreened_after_prev_visit_positive: [],
                    rescreened_after_prev_visit_suspected: [],
                    rescreened_after_prev_visit_for_same_day_tx: []
                };
                //pushing received arrays
                ageGroupDataFirstScreen.rescreened_after_prev_visit_negative.concat(data.data.rescreened_after_prev_visit[i].negative)
                ageGroupDataFirstScreen.rescreened_after_prev_visit_positive.concat(data.data.rescreened_after_prev_visit[i].positive)
                ageGroupDataFirstScreen.rescreened_after_prev_visit_suspected.concat(data.data.rescreened_after_prev_visit[i].suspected)
                ageGroupDataFirstScreen.rescreened_after_prev_visit_for_same_day_tx.concat(data.data.rescreened_after_prev_visit[i].for_same_day_tx)
                //pushing to results
                results.push(ageGroupDataFirstScreen)
            }
            //looping through each array
            for (let i = 0; i < data.data.post_treatment_followup.length; i++) {
                const ageGroup = data.data.post_treatment_followup[i].age_group;
                const ageGroupDataFirstScreen: any = {
                    age_group: ageGroup,
                    post_treatment_followup_negative: [],
                    post_treatment_followup_positive: [],
                    post_treatment_followup_suspected: [],
                    post_treatment_followup_for_same_day_tx: []
                };
                //pushing received arrays
                ageGroupDataFirstScreen.post_treatment_followup_negative.concat(data.data.post_treatment_followup[i].negative)
                ageGroupDataFirstScreen.post_treatment_followup_positive.concat(data.data.post_treatment_followup[i].positive)
                ageGroupDataFirstScreen.post_treatment_followup_suspected.concat(data.data.post_treatment_followup[i].suspected)
                ageGroupDataFirstScreen.post_treatment_followup_for_same_day_tx.concat(data.data.post_treatment_followup[i].for_same_day_tx)
                //pushing to results
                results.push(ageGroupDataFirstScreen)
            }
            //adding totals
            const totals: any = {
                total_screened: [],
                total_negative: [],
                total_via_plus_eligible_for_same_day_tx: [],
                total_positive: [],
                total_suspect_cancer: []
            };
            //assigning values
            totals.total_screened.concat(data.totals.total_screened)
            totals.total_negative.concat(data.totals.total_negative)
            totals.total_via_plus_eligible_for_same_day_tx.concat(data.totals.total_via_plus_eligible_for_same_day_tx)
            totals.total_positive.concat(data.totals.total_positive)
            totals.total_suspect_cancer.concat(data.totals.total_suspect_cancer)
            //pushing to results
            results.push(totals)

            return results;
        },
        async onDrillDown(indicatorName: string) {
           //loop through report cohort display retrieved data of all Patient ID's
           for (const [category, patientIDs] of this.reportCohort) {
                //check if values match
                if(category == indicatorName){
                    this.presentDrillDown(indicatorName, patientIDs)
                }
            }
        },
        async presentDrillDown(title: string, patientIds: number[]) {
            (await modalController.create({
                component: DrilldownTable,
                cssClass: 'large-modal',
                componentProps: {
                title: title || 'Drilldown',
                columns: [
                    [
                        table.thTxt('National ID'),
                        table.thTxt('First name'),
                        table.thTxt('Last name'),
                        table.thTxt('Birthdate'),
                        table.thTxt('Action')
                    ]
                ],
                rows: patientIds,
                rowParser: async (patientIds: number[]) => {
                const row = []
                const router = useRouter()
                for(const id of patientIds) {
                    try {
                        const patient = new Patientservice((await Patientservice.findByID(id)))
                        row.push([
                            table.td(patient.getNationalID()),
                            table.td(patient.getGivenName()),
                            table.td(patient.getFamilyName()),
                            table.tdDate(`${patient.getBirthdate()}`),
                            table.tdBtn('Show', () => {
                                router.push({ path: `/patient/dashboard/${id}`})
                                modalController.dismiss({})
                            })
                        ])
                    } catch (e) {
                        console.error(e)
                    }
                }
                return row
                },
                showFilters: true,
                footerColor: 'light',
                showReportStamp: false,
                paginated: true,
                rowsPerPage: 20,
                onFinish: () => modalController.dismiss()
                }
            })).present()
        },
        regenerate() {
            this.onPeriod()
        },
        exportToCsv() {
            const headers = ['Indicator', 'Value']
            const rows = Object.keys(this.indicators).map(k => [k, this.indicators[k]])
            const reportTitle = `${Service.getLocationName()} Monthly Screen CxCa Report ${this.period}`
            toCsv([headers], [
                ...rows,
                [`Date Created: ${dayjs().format('DD/MMM/YYYY HH:MM:ss')}`],
                [`HIS-Core Version: ${Service.getCoreVersion()}`],
                [`API Version: ${Service.getApiVersion()}`],
                [`Site: ${Service.getLocationName()}`],
                [`Site UUID: ${Service.getSiteUUID()}`]
            ], reportTitle)
        },
        printSpec() {
            const content = document.getElementById('report-content')
            if (content) {
                toPDFfromHTML(`
                <html>
                    <head>
                    <title>Print Cohort</title>
                    <style> 
                        .numbers {
                        width: 2.5%;
                        text-align: center;
                        border-width: 0px 1px 0px 0px;
                        border-style: dotted;
                        }
                        .row-title {
                        width: 17.75%;
                        text-align: left;
                        padding-left: 5px;
                        border-style: dotted;
                        }
                        .signatures {
                        width: 39.875%;
                        text-align: left;
                        padding-left: 5px;
                        border-style: dotted;
                        }
                        .row-name {
                        width: 39.875%;
                        text-align: left;
                        padding-left: 5px;
                        border-style: dotted;
                        border-left-style: solid;
                        }
                        .no-borders {
                        border-width: 0px;
                        }
                        #version-row td {
                        height: 30px;
                        }
                        #version {
                        text-align: right;
                        padding-right: 5px;
                        font-size: 10px;
                        }
                        #consistency_check div {
                        color: red;
                        padding-bottom: 10px;
                        }
                        a {
                        color: black;
                        text-decoration: none;
                        }
                        table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                        }
                        tr {
                        height: 45px;
                        }
                        .vertical-separator {
                        border-width: 0px;
                        }
                        td {
                        border-style: solid;
                        border-width: 1px;
                        padding: 1em;
                        text-align: center;
                        }
                        .section-description td {
                        border-width: 0px;
                        }
                        .horisonatl-separator td {
                        border-width: 0px;
                        }
                        .numbers {
                        width: 2.5%;
                        text-align: center;
                        border-width: 0px 1px 0px 0px;
                        border-style: dotted;
                        }
                        .sum-arrows {
                        width: 75px;
                        height: 55px;
                        }
                        .postfixes {
                        font-size: x-small;
                        font-weight: bold;
                        position: relative;
                        top: -15px;
                        left: -40px;
                        }
                        .granules {
                        width: 100%;
                        height: 32px;
                        margin: 10px;
                        display: table;
                        }
                        .granules-row {
                        display: table-row;
                        }
                        .granules-cell {
                        display: table-cell;
                        text-align: center;
                        }
                        .granules span{
                        font-size: 10px;
                        }
                        .granules-right-td {
                        border-right-style: dotted !important;
                        border-right-width: 1px;
                        }

                        @media print
                        {
                        table { page-break-after:auto }
                        tr    { page-break-inside:avoid; page-break-after:auto }
                        td    { page-break-inside:avoid; page-break-after:auto }
                        thead { display:table-header-group }
                        tfoot { display:table-footer-group }
                        }
                    </style>
                    </head>
                    <body>
                    ${content.innerHTML}
                    </body>
                </html>
                `)
            }
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