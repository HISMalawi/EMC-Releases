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
import MonthlyCECAP_TX_ReportBody from "@/apps/CxCa/views/reports/clinic/MonthlyCECAP_TX_ReportBody.vue"
import { MultiStepPopupForm } from "@/utils/PopupKeyboard";
import { FieldType } from "@/components/Forms/BaseFormElements";
import { CxCaReportService } from '@/apps/CxCa/services/reports/cxca_report_service'
import { toCsv, toPDFfromHTML } from "@/utils/Export"
import dayjs from "dayjs";
import { find, isPlainObject } from "lodash";
import { toDate } from "@/utils/Strs";
import { Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import DrilldownTable from "@/apps/ART/views/reports/BasicReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { Patientservice } from "@/services/patient_service";
import { useRouter } from "vue-router"

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
        reportTitle: "Monthly CECAP TX Report",
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
            //the MONTHLY CECAP TX and MONTHLY CECAP SCRN
            Service.getJson('screened_for_cxca',{
                'report_name': 'MONTHLY CECAP TX',
                'program_id': Service.getProgramID(),
                'start_date': this.startDate,
                'end_date': this.endDate,
                'date': Service.getSessionDate()
            }).then(response => {
                //load data and perform calculations based by age                    
                const age_groups = this.sortData(response)
                /*assigning values to table via indicators
                *raw 1*/
                this.indicators.tx_1st_cryotherapy_15_19 = age_groups[0].first_time_screened_cryotherapy.length
                this.indicators.tx_1st_thermocoagulation_15_19 = age_groups[0].first_time_screened_thermocoagulation.length
                this.indicators.tx_1st_leep_15_19 = age_groups[0].first_time_screened_leep.length
                this.indicators.tx_1st_via_positive_deferred_tx_15_19 = age_groups[0].first_time_screened_via_deffered.length
                this.indicators.tx_1st_via_positive_referred_tx_15_19 = age_groups[0].first_time_screened_via_reffered.length
                this.indicators.tx_1st_cxca_suspect_referred_15_19 = age_groups[0].first_time_screened_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_1st_cryotherapy_15_19", age_groups[0].first_time_screened_cryotherapy])
                this.reportCohort.push(["tx_1st_thermocoagulation_15_19", age_groups[0].first_time_screened_thermocoagulation])
                this.reportCohort.push(["tx_1st_leep_15_19", age_groups[0].first_time_screened_leep])
                this.reportCohort.push(["tx_1st_via_positive_deferred_tx_15_19", age_groups[0].first_time_screened_via_deffered])
                this.reportCohort.push(["tx_1st_via_positive_referred_tx_15_19", age_groups[0].first_time_screened_via_reffered])
                this.reportCohort.push(["tx_1st_cxca_suspect_referred_15_19", age_groups[0].first_time_screened_suspected_reffered])

                //raw 2
                this.indicators.tx_1st_cryotherapy_20_24 = age_groups[1].first_time_screened_cryotherapy.length
                this.indicators.tx_1st_thermocoagulation_20_24 = age_groups[1].first_time_screened_thermocoagulation.length
                this.indicators.tx_1st_leep_20_24 = age_groups[0].first_time_screened_leep.length
                this.indicators.tx_1st_via_positive_deferred_tx_20_24 = age_groups[1].first_time_screened_via_deffered.length
                this.indicators.tx_1st_via_positive_referred_tx_20_24 = age_groups[1].first_time_screened_via_reffered.length
                this.indicators.tx_1st_cxca_suspect_referred_20_24 = age_groups[1].first_time_screened_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_1st_cryotherapy_20_24", age_groups[1].first_time_screened_cryotherapy])
                this.reportCohort.push(["tx_1st_thermocoagulation_20_24", age_groups[1].first_time_screened_thermocoagulation])
                this.reportCohort.push(["tx_1st_leep_20_24", age_groups[1].first_time_screened_leep])
                this.reportCohort.push(["tx_1st_via_positive_deferred_tx_20_24", age_groups[1].first_time_screened_via_deffered])
                this.reportCohort.push(["tx_1st_via_positive_referred_tx_20_24", age_groups[1].first_time_screened_via_reffered])
                this.reportCohort.push(["tx_1st_cxca_suspect_referred_20_24", age_groups[1].first_time_screened_suspected_reffered])

                //raw 3
                this.indicators.tx_1st_cryotherapy_25_29 = age_groups[2].first_time_screened_cryotherapy.length
                this.indicators.tx_1st_thermocoagulation_25_29 = age_groups[2].first_time_screened_thermocoagulation.length
                this.indicators.tx_1st_leep_25_29 = age_groups[2].first_time_screened_leep.length
                this.indicators.tx_1st_via_positive_deferred_tx_25_29 = age_groups[2].first_time_screened_via_deffered.length
                this.indicators.tx_1st_via_positive_referred_tx_25_29 = age_groups[2].first_time_screened_via_reffered.length
                this.indicators.tx_1st_cxca_suspect_referred_25_29 = age_groups[2].first_time_screened_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_1st_cryotherapy_25_29", age_groups[2].first_time_screened_cryotherapy])
                this.reportCohort.push(["tx_1st_thermocoagulation_25_29", age_groups[2].first_time_screened_thermocoagulation])
                this.reportCohort.push(["tx_1st_leep_25_29", age_groups[2].first_time_screened_leep])
                this.reportCohort.push(["tx_1st_via_positive_deferred_tx_25_29", age_groups[2].first_time_screened_via_deffered])
                this.reportCohort.push(["tx_1st_via_positive_referred_tx_25_29", age_groups[2].first_time_screened_via_reffered])
                this.reportCohort.push(["tx_1st_cxca_suspect_referred_25_29", age_groups[2].first_time_screened_suspected_reffered])

                //raw 5
                this.indicators.tx_1st_cryotherapy_30_34 = age_groups[3].first_time_screened_cryotherapy.length
                this.indicators.tx_1st_thermocoagulation_30_34 = age_groups[3].first_time_screened_thermocoagulation.length
                this.indicators.tx_1st_leep_30_34 = age_groups[3].first_time_screened_leep.length
                this.indicators.tx_1st_via_positive_deferred_tx_30_34 = age_groups[3].first_time_screened_via_deffered.length
                this.indicators.tx_1st_via_positive_referred_tx_30_34 = age_groups[3].first_time_screened_via_reffered.length
                this.indicators.tx_1st_cxca_suspect_referred_30_34 = age_groups[3].first_time_screened_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_1st_cryotherapy_30_34", age_groups[3].first_time_screened_cryotherapy])
                this.reportCohort.push(["tx_1st_thermocoagulation_30_34", age_groups[3].first_time_screened_thermocoagulation])
                this.reportCohort.push(["tx_1st_leep_30_34", age_groups[3].first_time_screened_leep])
                this.reportCohort.push(["tx_1st_via_positive_deferred_tx_30_34", age_groups[3].first_time_screened_via_deffered])
                this.reportCohort.push(["tx_1st_via_positive_referred_tx_30_34", age_groups[3].first_time_screened_via_reffered])
                this.reportCohort.push(["tx_1st_cxca_suspect_referred_30_34", age_groups[3].first_time_screened_suspected_reffered])

                //raw 6
                this.indicators.tx_1st_cryotherapy_35_39 = age_groups[4].first_time_screened_cryotherapy.length
                this.indicators.tx_1st_thermocoagulation_35_39 = age_groups[4].first_time_screened_thermocoagulation.length
                this.indicators.tx_1st_leep_35_39 = age_groups[4].first_time_screened_leep.length
                this.indicators.tx_1st_via_positive_deferred_tx_35_39 = age_groups[4].first_time_screened_via_deffered.length
                this.indicators.tx_1st_via_positive_referred_tx_35_39 = age_groups[4].first_time_screened_via_reffered.length
                this.indicators.tx_1st_cxca_suspect_referred_35_39 = age_groups[4].first_time_screened_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_1st_cryotherapy_35_39", age_groups[5].first_time_screened_cryotherapy])
                this.reportCohort.push(["tx_1st_thermocoagulation_35_39", age_groups[5].first_time_screened_thermocoagulation])
                this.reportCohort.push(["tx_1st_leep_35_39", age_groups[5].first_time_screened_leep])
                this.reportCohort.push(["tx_1st_via_positive_deferred_tx_35_39", age_groups[5].first_time_screened_via_deffered])
                this.reportCohort.push(["tx_1st_via_positive_referred_tx_35_39", age_groups[5].first_time_screened_via_reffered])
                this.reportCohort.push(["tx_1st_cxca_suspect_referred_35_39", age_groups[5].first_time_screened_suspected_reffered])

                //raw 7
                this.indicators.tx_1st_cryotherapy_40_44 = age_groups[5].first_time_screened_cryotherapy.length
                this.indicators.tx_1st_thermocoagulation_40_44 = age_groups[5].first_time_screened_thermocoagulation.length
                this.indicators.tx_1st_leep_40_44 = age_groups[5].first_time_screened_leep.length
                this.indicators.tx_1st_via_positive_deferred_tx_40_44 = age_groups[5].first_time_screened_via_deffered.length
                this.indicators.tx_1st_via_positive_referred_tx_40_44 = age_groups[5].first_time_screened_via_reffered.length
                this.indicators.tx_1st_cxca_suspect_referred_40_44 = age_groups[5].first_time_screened_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_1st_cryotherapy_40_44", age_groups[5].first_time_screened_cryotherapy])
                this.reportCohort.push(["tx_1st_thermocoagulation_40_44", age_groups[5].first_time_screened_thermocoagulation])
                this.reportCohort.push(["tx_1st_leep_40_44", age_groups[6].first_time_screened_leep])
                this.reportCohort.push(["tx_1st_via_positive_deferred_tx_40_44", age_groups[5].first_time_screened_via_deffered])
                this.reportCohort.push(["tx_1st_via_positive_referred_tx_40_44", age_groups[5].first_time_screened_via_reffered])
                this.reportCohort.push(["tx_1st_cxca_suspect_referred_40_44", age_groups[5].first_time_screened_suspected_reffered])

                //raw 8
                this.indicators.tx_1st_cryotherapy_45_49 = age_groups[6].first_time_screened_cryotherapy.length
                this.indicators.tx_1st_thermocoagulation_45_49 = age_groups[6].first_time_screened_thermocoagulation.length
                this.indicators.tx_1st_leep_40_44 = age_groups[6].first_time_screened_leep.length
                this.indicators.tx_1st_via_positive_deferred_tx_45_49 = age_groups[6].first_time_screened_via_deffered.length
                this.indicators.tx_1st_via_positive_referred_tx_45_49 = age_groups[6].first_time_screened_via_reffered.length
                this.indicators.tx_1st_cxca_suspect_referred_45_49 = age_groups[6].first_time_screened_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_1st_cryotherapy_45_49", age_groups[6].first_time_screened_cryotherapy])
                this.reportCohort.push(["tx_1st_thermocoagulation_45_49", age_groups[6].first_time_screened_thermocoagulation])
                this.reportCohort.push(["tx_1st_leep_40_44", age_groups[6].first_time_screened_leep])
                this.reportCohort.push(["tx_1st_via_positive_deferred_tx_45_49", age_groups[6].first_time_screened_via_deffered])
                this.reportCohort.push(["tx_1st_via_positive_referred_tx_45_49", age_groups[6].first_time_screened_via_reffered])
                this.reportCohort.push(["tx_1st_cxca_suspect_referred_45_49", age_groups[6].first_time_screened_suspected_reffered])

                //raw 9
                this.indicators.tx_1st_cryotherapy_50 = age_groups[7].first_time_screened_cryotherapy.length
                this.indicators.tx_1st_thermocoagulation_50 = age_groups[7].first_time_screened_thermocoagulation.length
                this.indicators.tx_1st_leep_50 = age_groups[7].first_time_screened_leep.length
                this.indicators.tx_1st_via_positive_deferred_tx_50 = age_groups[7].first_time_screened_via_deffered.length
                this.indicators.tx_1st_via_positive_referred_tx_50 = age_groups[7].first_time_screened_via_reffered.length
                this.indicators.tx_1st_cxca_suspect_referred_50 = age_groups[7].first_time_screened_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_1st_cryotherapy_50", age_groups[7].first_time_screened_cryotherapy])
                this.reportCohort.push(["tx_1st_thermocoagulation_50", age_groups[7].first_time_screened_thermocoagulation])
                this.reportCohort.push(["tx_1st_leep_50", age_groups[7].first_time_screened_leep])
                this.reportCohort.push(["tx_1st_via_positive_deferred_tx_50", age_groups[7].first_time_screened_via_deffered])
                this.reportCohort.push(["tx_1st_via_positive_referred_tx_50", age_groups[7].first_time_screened_via_reffered])
                this.reportCohort.push(["tx_1st_cxca_suspect_referred_50", age_groups[7].first_time_screened_suspected_reffered])

                //raw 10
                this.indicators.tx_1st_cryotherapy_unkn = [].length
                this.indicators.tx_1st_thermocoagulation_unkn = [].length
                this.indicators.tx_1st_leep_unkn = [].length
                this.indicators.tx_1st_via_positive_deferred_tx_unkn = [].length
                this.indicators.tx_1st_via_positive_referred_tx_unkn = [].length
                this.indicators.tx_1st_cxca_suspect_referred_unkn = [].length
                //adding to report cohort
                this.reportCohort.push(["tx_1st_cryotherapy_unkn", []])
                this.reportCohort.push(["tx_1st_thermocoagulation_unkn", []])
                this.reportCohort.push(["tx_1st_leep_unkn", []])
                this.reportCohort.push(["tx_1st_via_positive_deferred_tx_unkn", []])
                this.reportCohort.push(["tx_1st_via_positive_referred_tx_unkn", []])
                this.reportCohort.push(["tx_1st_cxca_suspect_referred_unkn", []])

                //raw 12 skipped title raw 11 (Rescreened after previous negative)
                this.indicators.tx_rscrnapn_cryotherapy_15_19 = age_groups[8].rescreened_after_prev_visit_cryotherapy.length
                this.indicators.tx_rscrnapn_thermocoagulation_15_19 = age_groups[8].rescreened_after_prev_visit_thermocoagulation.length
                this.indicators.tx_rscrnapn_leep_15_19 = age_groups[8].rescreened_after_prev_visit_leep.length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_15_19 = age_groups[8].rescreened_after_prev_visit_via_deffered.length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_15_19 = age_groups[8].rescreened_after_prev_visit_via_reffered.length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_15_19 = age_groups[8].rescreened_after_prev_visit_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_15_19", age_groups[8].rescreened_after_prev_visit_cryotherapy])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_15_19", age_groups[8].rescreened_after_prev_visit_thermocoagulation])
                this.reportCohort.push(["tx_rscrnapn_leep_15_19", age_groups[8].rescreened_after_prev_visit_leep])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_15_19", age_groups[8].rescreened_after_prev_visit_via_deffered])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_15_19", age_groups[8].rescreened_after_prev_visit_via_reffered])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_15_19", age_groups[8].rescreened_after_prev_visit_suspected_reffered])

                //raw 13
                this.indicators.tx_rscrnapn_cryotherapy_20_24 = age_groups[9].rescreened_after_prev_visit_cryotherapy.length
                this.indicators.tx_rscrnapn_thermocoagulation_20_24 = age_groups[9].rescreened_after_prev_visit_thermocoagulation.length
                this.indicators.tx_rscrnapn_leep_20_24 = age_groups[9].rescreened_after_prev_visit_leep.length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_20_24 = age_groups[9].rescreened_after_prev_visit_via_deffered.length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_20_24 = age_groups[9].rescreened_after_prev_visit_via_reffered.length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_20_24 = age_groups[9].rescreened_after_prev_visit_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_20_24", age_groups[9].rescreened_after_prev_visit_cryotherapy])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_20_24", age_groups[9].rescreened_after_prev_visit_thermocoagulation])
                this.reportCohort.push(["tx_rscrnapn_leep_20_24", age_groups[9].rescreened_after_prev_visit_leep])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_20_24", age_groups[9].rescreened_after_prev_visit_via_deffered])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_20_24", age_groups[9].rescreened_after_prev_visit_via_reffered])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_20_24", age_groups[9].rescreened_after_prev_visit_suspected_reffered])

                //raw 14
                this.indicators.tx_rscrnapn_cryotherapy_25_29 = age_groups[10].rescreened_after_prev_visit_cryotherapy.length
                this.indicators.tx_rscrnapn_thermocoagulation_25_29 = age_groups[10].rescreened_after_prev_visit_thermocoagulation.length
                this.indicators.tx_rscrnapn_leep_25_29 = age_groups[10].rescreened_after_prev_visit_leep.length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_25_29 = age_groups[10].rescreened_after_prev_visit_via_deffered.length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_25_29 = age_groups[10].rescreened_after_prev_visit_via_reffered.length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_25_29 = age_groups[10].rescreened_after_prev_visit_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_25_29", age_groups[10].rescreened_after_prev_visit_cryotherapy])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_25_29", age_groups[10].rescreened_after_prev_visit_thermocoagulation])
                this.reportCohort.push(["tx_rscrnapn_leep_25_29", age_groups[10].rescreened_after_prev_visit_leep])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_25_29", age_groups[10].rescreened_after_prev_visit_via_deffered])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_25_29", age_groups[10].rescreened_after_prev_visit_via_reffered])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_25_29", age_groups[10].rescreened_after_prev_visit_suspected_reffered])

                //raw 15
                this.indicators.tx_rscrnapn_cryotherapy_30_34 = age_groups[11].rescreened_after_prev_visit_cryotherapy.length
                this.indicators.tx_rscrnapn_thermocoagulation_30_34 = age_groups[11].rescreened_after_prev_visit_thermocoagulation.length
                this.indicators.tx_rscrnapn_leep_30_34 = age_groups[11].rescreened_after_prev_visit_leep.length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_30_34 = age_groups[11].rescreened_after_prev_visit_via_deffered.length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_30_34 = age_groups[11].rescreened_after_prev_visit_via_reffered.length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_30_34 = age_groups[11].rescreened_after_prev_visit_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_30_34", age_groups[11].rescreened_after_prev_visit_cryotherapy])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_30_34", age_groups[11].rescreened_after_prev_visit_thermocoagulation])
                this.reportCohort.push(["tx_rscrnapn_leep_30_34", age_groups[11].rescreened_after_prev_visit_leep])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_30_34", age_groups[11].rescreened_after_prev_visit_via_deffered])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_30_34", age_groups[11].rescreened_after_prev_visit_via_reffered])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_30_34", age_groups[11].rescreened_after_prev_visit_suspected_reffered])

                //raw 15
                this.indicators.tx_rscrnapn_cryotherapy_35_39 = age_groups[12].rescreened_after_prev_visit_cryotherapy.length
                this.indicators.tx_rscrnapn_thermocoagulation_35_39 = age_groups[12].rescreened_after_prev_visit_thermocoagulation.length
                this.indicators.tx_rscrnapn_leep_35_39 = age_groups[12].rescreened_after_prev_visit_leep.length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_35_39 = age_groups[12].rescreened_after_prev_visit_via_deffered.length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_35_39 = age_groups[12].rescreened_after_prev_visit_via_reffered.length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_35_39 = age_groups[12].rescreened_after_prev_visit_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_35_39", age_groups[12].rescreened_after_prev_visit_cryotherapy])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_35_39", age_groups[12].rescreened_after_prev_visit_thermocoagulation])
                this.reportCohort.push(["tx_rscrnapn_leep_35_39", age_groups[12].rescreened_after_prev_visit_leep])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_35_39", age_groups[12].rescreened_after_prev_visit_via_deffered])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_35_39", age_groups[12].rescreened_after_prev_visit_via_reffered])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_35_39", age_groups[12].rescreened_after_prev_visit_suspected_reffered])

                //raw 16
                this.indicators.tx_rscrnapn_cryotherapy_40_44 = age_groups[13].rescreened_after_prev_visit_cryotherapy.length
                this.indicators.tx_rscrnapn_thermocoagulation_40_44 = age_groups[13].rescreened_after_prev_visit_thermocoagulation.length
                this.indicators.tx_rscrnapn_leep_40_44 = age_groups[13].rescreened_after_prev_visit_leep.length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_40_44 = age_groups[13].rescreened_after_prev_visit_via_deffered.length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_40_44 = age_groups[13].rescreened_after_prev_visit_via_reffered.length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_40_44 = age_groups[13].rescreened_after_prev_visit_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_40_44", age_groups[13].rescreened_after_prev_visit_cryotherapy])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_40_44", age_groups[13].rescreened_after_prev_visit_thermocoagulation])
                this.reportCohort.push(["tx_rscrnapn_leep_40_44", age_groups[13].rescreened_after_prev_visit_leep])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_40_44", age_groups[13].rescreened_after_prev_visit_via_deffered])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_40_44", age_groups[13].rescreened_after_prev_visit_via_reffered])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_40_44", age_groups[13].rescreened_after_prev_visit_suspected_reffered])

                //raw 17
                this.indicators.tx_rscrnapn_cryotherapy_45_49 = age_groups[14].rescreened_after_prev_visit_cryotherapy.length
                this.indicators.tx_rscrnapn_thermocoagulation_45_49 = age_groups[14].rescreened_after_prev_visit_thermocoagulation.length
                this.indicators.tx_rscrnapn_leep_45_49 = age_groups[14].rescreened_after_prev_visit_leep.length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_45_49 = age_groups[14].rescreened_after_prev_visit_via_deffered.length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_45_49 = age_groups[14].rescreened_after_prev_visit_via_reffered.length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_45_49 = age_groups[14].rescreened_after_prev_visit_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_45_49", age_groups[14].rescreened_after_prev_visit_cryotherapy])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_45_49", age_groups[14].rescreened_after_prev_visit_thermocoagulation])
                this.reportCohort.push(["tx_rscrnapn_leep_45_49", age_groups[14].rescreened_after_prev_visit_leep])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_45_49", age_groups[14].rescreened_after_prev_visit_via_deffered])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_45_49", age_groups[14].rescreened_after_prev_visit_via_reffered])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_45_49", age_groups[14].rescreened_after_prev_visit_suspected_reffered])

                //raw 18
                this.indicators.tx_rscrnapn_cryotherapy_50 = age_groups[15].rescreened_after_prev_visit_cryotherapy.length
                this.indicators.tx_rscrnapn_thermocoagulation_50 = age_groups[15].rescreened_after_prev_visit_thermocoagulation.length
                this.indicators.tx_rscrnapn_leep_50 = age_groups[15].rescreened_after_prev_visit_leep.length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_50 = age_groups[15].rescreened_after_prev_visit_via_deffered.length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_50 = age_groups[15].rescreened_after_prev_visit_via_reffered.length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_50 = age_groups[15].rescreened_after_prev_visit_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_50", age_groups[15].rescreened_after_prev_visit_cryotherapy])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_50", age_groups[15].rescreened_after_prev_visit_thermocoagulation])
                this.reportCohort.push(["tx_rscrnapn_leep_50", age_groups[15].rescreened_after_prev_visit_leep])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_50", age_groups[15].rescreened_after_prev_visit_via_deffered])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_50", age_groups[15].rescreened_after_prev_visit_via_reffered])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_50", age_groups[15].rescreened_after_prev_visit_suspected_reffered])

                //raw 19
                this.indicators.tx_rscrnapn_cryotherapy_unkn = [].length
                this.indicators.tx_rscrnapn_thermocoagulation_unkn = [].length
                this.indicators.tx_rscrnapn_leep_unkn = [].length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_unkn = [].length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_unkn = [].length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_unkn = [].length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_unkn", []])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_unkn", []])
                this.reportCohort.push(["tx_rscrnapn_leep_unkn", []])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_unkn", []])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_unkn", []])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_unkn", []])

                //raw 20 skipped title raw (Post Treatment Follow up)
                this.indicators.tx_blnk_cryotherapy_15_19 = age_groups[16].post_treatment_followup_cryotherapy.length
                this.indicators.tx_blnk_thermocoagulation_15_19 = age_groups[16].post_treatment_followup_thermocoagulation.length
                this.indicators.tx_blnk_leep_15_19 = age_groups[16].post_treatment_followup_leep.length
                this.indicators.tx_blnk_via_positive_deferred_tx_15_19 = age_groups[16].post_treatment_followup_via_deffered.length
                this.indicators.tx_blnk_via_positive_referred_tx_15_19 = age_groups[16].post_treatment_followup_via_reffered.length
                this.indicators.tx_blnk_cxca_suspect_referred_15_19 = age_groups[16].post_treatment_followup_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_blnk_cryotherapy_15_19", age_groups[16].post_treatment_followup_cryotherapy])
                this.reportCohort.push(["tx_blnk_thermocoagulation_15_19", age_groups[16].post_treatment_followup_thermocoagulation])
                this.reportCohort.push(["tx_blnk_leep_15_19", age_groups[16].post_treatment_followup_leep])
                this.reportCohort.push(["tx_blnk_via_positive_deferred_tx_15_19", age_groups[16].post_treatment_followup_via_deffered])
                this.reportCohort.push(["tx_blnk_via_positive_referred_tx_15_19", age_groups[16].post_treatment_followup_via_reffered])
                this.reportCohort.push(["tx_blnk_cxca_suspect_referred_15_19", age_groups[16].post_treatment_followup_suspected_reffered])

                //raw 21 
                this.indicators.tx_rscrnapn_cryotherapy_20_24 = age_groups[17].post_treatment_followup_cryotherapy.length
                this.indicators.tx_rscrnapn_thermocoagulation_20_24 = age_groups[17].post_treatment_followup_thermocoagulation.length
                this.indicators.tx_rscrnapn_leep_20_24 = age_groups[17].post_treatment_followup_leep.length
                this.indicators.tx_rscrnapn_via_positive_deferred_tx_20_24 = age_groups[17].post_treatment_followup_via_deffered.length
                this.indicators.tx_rscrnapn_via_positive_referred_tx_20_24 = age_groups[17].post_treatment_followup_via_reffered.length
                this.indicators.tx_rscrnapn_cxca_suspect_referred_20_24 = age_groups[17].post_treatment_followup_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_rscrnapn_cryotherapy_20_24", age_groups[17].post_treatment_followup_cryotherapy])
                this.reportCohort.push(["tx_rscrnapn_thermocoagulation_20_24", age_groups[17].post_treatment_followup_thermocoagulation])
                this.reportCohort.push(["tx_rscrnapn_leep_20_24", age_groups[17].post_treatment_followup_leep])
                this.reportCohort.push(["tx_rscrnapn_via_positive_deferred_tx_20_24", age_groups[17].post_treatment_followup_via_deffered])
                this.reportCohort.push(["tx_rscrnapn_via_positive_referred_tx_20_24", age_groups[17].post_treatment_followup_via_reffered])
                this.reportCohort.push(["tx_rscrnapn_cxca_suspect_referred_20_24", age_groups[17].post_treatment_followup_suspected_reffered])

                //raw 22 
                this.indicators.tx_blnk_cryotherapy_25_29 = age_groups[18].post_treatment_followup_cryotherapy.length
                this.indicators.tx_blnk_thermocoagulation_25_29 = age_groups[18].post_treatment_followup_thermocoagulation.length
                this.indicators.tx_blnk_leep_25_29 = age_groups[18].post_treatment_followup_leep.length
                this.indicators.tx_blnk_via_positive_deferred_tx_25_29 = age_groups[18].post_treatment_followup_via_deffered.length
                this.indicators.tx_blnk_via_positive_referred_tx_25_29 = age_groups[18].post_treatment_followup_via_reffered.length
                this.indicators.tx_blnk_cxca_suspect_referred_25_29 = age_groups[18].post_treatment_followup_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_blnk_cryotherapy_25_29", age_groups[18].post_treatment_followup_cryotherapy])
                this.reportCohort.push(["tx_blnk_thermocoagulation_25_29", age_groups[18].post_treatment_followup_thermocoagulation])
                this.reportCohort.push(["tx_blnk_leep_25_29", age_groups[18].post_treatment_followup_leep])
                this.reportCohort.push(["tx_blnk_via_positive_deferred_tx_25_29", age_groups[18].post_treatment_followup_via_deffered])
                this.reportCohort.push(["tx_blnk_via_positive_referred_tx_25_29", age_groups[18].post_treatment_followup_via_reffered])
                this.reportCohort.push(["tx_blnk_cxca_suspect_referred_25_29", age_groups[18].post_treatment_followup_suspected_reffered])

                //raw 23 
                this.indicators.tx_blnk_cryotherapy_30_34 = age_groups[19].post_treatment_followup_cryotherapy.length
                this.indicators.tx_blnk_thermocoagulation_30_34 = age_groups[19].post_treatment_followup_thermocoagulation.length
                this.indicators.tx_blnk_leep_30_34 = age_groups[19].post_treatment_followup_leep.length
                this.indicators.tx_blnk_via_positive_deferred_tx_30_34 = age_groups[19].post_treatment_followup_via_deffered.length
                this.indicators.tx_blnk_via_positive_referred_tx_30_34 = age_groups[19].post_treatment_followup_via_reffered.length
                this.indicators.tx_blnk_cxca_suspect_referred_30_34 = age_groups[19].post_treatment_followup_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_blnk_cryotherapy_30_34", age_groups[19].post_treatment_followup_cryotherapy])
                this.reportCohort.push(["tx_blnk_thermocoagulation_30_34", age_groups[19].post_treatment_followup_thermocoagulation])
                this.reportCohort.push(["tx_blnk_leep_30_34", age_groups[19].post_treatment_followup_leep])
                this.reportCohort.push(["tx_blnk_via_positive_deferred_tx_30_34", age_groups[19].post_treatment_followup_via_deffered])
                this.reportCohort.push(["tx_blnk_via_positive_referred_tx_30_34", age_groups[19].post_treatment_followup_via_reffered])
                this.reportCohort.push(["tx_blnk_cxca_suspect_referred_30_34", age_groups[19].post_treatment_followup_suspected_reffered])

                //raw 24 
                this.indicators.tx_blnk_cryotherapy_35_39 = age_groups[20].post_treatment_followup_cryotherapy.length
                this.indicators.tx_blnk_thermocoagulation_35_39 = age_groups[20].post_treatment_followup_thermocoagulation.length
                this.indicators.tx_blnk_leep_35_39 = age_groups[20].post_treatment_followup_leep.length
                this.indicators.tx_blnk_via_positive_deferred_tx_35_39 = age_groups[20].post_treatment_followup_via_deffered.length
                this.indicators.tx_blnk_via_positive_referred_tx_35_39 = age_groups[20].post_treatment_followup_via_reffered.length
                this.indicators.tx_blnk_cxca_suspect_referred_35_39 = age_groups[20].post_treatment_followup_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_blnk_cryotherapy_35_39", age_groups[20].post_treatment_followup_cryotherapy])
                this.reportCohort.push(["tx_blnk_thermocoagulation_35_39", age_groups[20].post_treatment_followup_thermocoagulation])
                this.reportCohort.push(["tx_blnk_leep_35_39", age_groups[20].post_treatment_followup_leep])
                this.reportCohort.push(["tx_blnk_via_positive_deferred_tx_35_39", age_groups[20].post_treatment_followup_via_deffered])
                this.reportCohort.push(["tx_blnk_via_positive_referred_tx_35_39", age_groups[20].post_treatment_followup_via_reffered])
                this.reportCohort.push(["tx_blnk_cxca_suspect_referred_35_39", age_groups[20].post_treatment_followup_suspected_reffered])

                //raw 24 
                this.indicators.tx_blnk_cryotherapy_40_44 = age_groups[21].post_treatment_followup_cryotherapy.length
                this.indicators.tx_blnk_thermocoagulation_40_44 = age_groups[21].post_treatment_followup_thermocoagulation.length
                this.indicators.tx_blnk_leep_40_44 = age_groups[21].post_treatment_followup_leep.length
                this.indicators.tx_blnk_via_positive_deferred_tx_40_44 = age_groups[21].post_treatment_followup_via_deffered.length
                this.indicators.tx_blnk_via_positive_referred_tx_40_44 = age_groups[21].post_treatment_followup_via_reffered.length
                this.indicators.tx_blnk_cxca_suspect_referred_40_44 = age_groups[21].post_treatment_followup_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_blnk_cryotherapy_40_44", age_groups[21].post_treatment_followup_cryotherapy])
                this.reportCohort.push(["tx_blnk_thermocoagulation_40_44", age_groups[21].post_treatment_followup_thermocoagulation])
                this.reportCohort.push(["tx_blnk_leep_40_44", age_groups[21].post_treatment_followup_leep])
                this.reportCohort.push(["tx_blnk_via_positive_deferred_tx_40_44", age_groups[21].post_treatment_followup_via_deffered])
                this.reportCohort.push(["tx_blnk_via_positive_referred_tx_40_44", age_groups[21].post_treatment_followup_via_reffered])
                this.reportCohort.push(["tx_blnk_cxca_suspect_referred_40_44", age_groups[21].post_treatment_followup_suspected_reffered])

                //raw 25 
                this.indicators.tx_blnk_cryotherapy_45_49 = age_groups[22].post_treatment_followup_cryotherapy.length
                this.indicators.tx_blnk_thermocoagulation_45_49 = age_groups[22].post_treatment_followup_thermocoagulation.length
                this.indicators.tx_blnk_leep_45_49 = age_groups[22].post_treatment_followup_leep.length
                this.indicators.tx_blnk_via_positive_deferred_tx_45_49 = age_groups[22].post_treatment_followup_via_deffered.length
                this.indicators.tx_blnk_via_positive_referred_tx_45_49 = age_groups[22].post_treatment_followup_via_reffered.length
                this.indicators.tx_blnk_cxca_suspect_referred_45_49 = age_groups[22].post_treatment_followup_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_blnk_cryotherapy_45_49", age_groups[22].post_treatment_followup_cryotherapy])
                this.reportCohort.push(["tx_blnk_thermocoagulation_45_49", age_groups[22].post_treatment_followup_thermocoagulation])
                this.reportCohort.push(["tx_blnk_leep_45_49", age_groups[22].post_treatment_followup_leep])
                this.reportCohort.push(["tx_blnk_via_positive_deferred_tx_45_49", age_groups[22].post_treatment_followup_via_deffered])
                this.reportCohort.push(["tx_blnk_via_positive_referred_tx_45_49", age_groups[22].post_treatment_followup_via_reffered])
                this.reportCohort.push(["tx_blnk_cxca_suspect_referred_45_49", age_groups[22].post_treatment_followup_suspected_reffered])

                //raw 26 
                this.indicators.tx_blnk_cryotherapy_50 = age_groups[23].post_treatment_followup_cryotherapy.length
                this.indicators.tx_blnk_thermocoagulation_50 = age_groups[23].post_treatment_followup_thermocoagulation.length
                this.indicators.tx_blnk_leep_50 = age_groups[23].post_treatment_followup_leep.length
                this.indicators.tx_blnk_via_positive_deferred_tx_50 = age_groups[23].post_treatment_followup_via_deffered.length
                this.indicators.tx_blnk_via_positive_referred_tx_50 = age_groups[23].post_treatment_followup_via_reffered.length
                this.indicators.tx_blnk_cxca_suspect_referred_50 = age_groups[23].post_treatment_followup_suspected_reffered.length
                //adding to report cohort
                this.reportCohort.push(["tx_blnk_cryotherapy_50", age_groups[23].post_treatment_followup_cryotherapy])
                this.reportCohort.push(["tx_blnk_thermocoagulation_50", age_groups[23].post_treatment_followup_thermocoagulation])
                this.reportCohort.push(["tx_blnk_leep_50", age_groups[23].post_treatment_followup_leep])
                this.reportCohort.push(["tx_blnk_via_positive_deferred_tx_50", age_groups[23].post_treatment_followup_via_deffered])
                this.reportCohort.push(["tx_blnk_via_positive_referred_tx_50", age_groups[23].post_treatment_followup_via_reffered])
                this.reportCohort.push(["tx_blnk_cxca_suspect_referred_50", age_groups[23].post_treatment_followup_suspected_reffered])

                //raw 27 
                this.indicators.tx_blnk_cryotherapy_unkn = [].length
                this.indicators.tx_blnk_thermocoagulation_unkn = [].length
                this.indicators.tx_blnk_leep_unkn = [].length
                this.indicators.tx_blnk_via_positive_deferred_tx_unkn = [].length
                this.indicators.tx_blnk_via_positive_referred_tx_unkn = [].length
                this.indicators.tx_blnk_cxca_suspect_referred_unkn = [].length
                //adding to report cohort
                this.reportCohort.push(["tx_blnk_cryotherapy_unkn", []])
                this.reportCohort.push(["tx_blnk_thermocoagulation_unkn", []])
                this.reportCohort.push(["tx_blnk_leep_unkn", []])
                this.reportCohort.push(["tx_blnk_via_positive_deferred_tx_unkn", []])
                this.reportCohort.push(["tx_blnk_via_positive_referred_tx_unkn", []])
                this.reportCohort.push(["tx_blnk_cxca_suspect_referred_unkn", []])

                //raws not columns in one raw like above
                this.indicators.total_cryotherapy = age_groups[24].total_cyrotherapy.length
                this.indicators.total_thermocoagulation = age_groups[24].total_thermocoagulation.length
                this.indicators.total_leep = age_groups[24].total_leep.length
                this.indicators.total_num_same_day_treatment = age_groups[24].total_number_same_day_tx.length
                this.indicators.total_via_positive_deferred_tx = age_groups[24].total_via_deffered.length
                this.indicators.total_via_positive_referred_tx = age_groups[24].total_via_reffered.length
                this.indicators.total_cxca_suspects_referred = age_groups[24].suspects_reffered.length
                this.indicators.total_referred = age_groups[24].total_reffered.length
                //adding to report cohort
                this.reportCohort.push(["total_cryotherapy", age_groups[24].total_cyrotherapy])
                this.reportCohort.push(["total_thermocoagulation", age_groups[24].total_thermocoagulation])
                this.reportCohort.push(["total_leep", age_groups[24].total_leep])
                this.reportCohort.push(["total_num_same_day_treatment", age_groups[24].total_number_same_day_tx])
                this.reportCohort.push(["total_via_positive_deferred_tx", age_groups[24].total_via_deffered])
                this.reportCohort.push(["total_via_positive_referred_tx", age_groups[24].total_via_reffered])
                this.reportCohort.push(["total_cxca_suspects_referred", age_groups[24].suspects_reffered])
                this.reportCohort.push(["total_referred", age_groups[24].total_reffered])

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
                    first_time_screened_cryotherapy: [],
                    first_time_screened_thermocoagulation: [],
                    first_time_screened_leep: [],
                    first_time_screened_via_deffered: [],
                    first_time_screened_via_reffered: [],
                    first_time_screened_suspected_reffered: []
                };
                //pushing received arrays
                ageGroupDataFirstScreen.first_time_screened_cryotherapy.concat(data.data.first_time_screened[i].cryotherapy)
                ageGroupDataFirstScreen.first_time_screened_thermocoagulation.concat(data.data.first_time_screened[i].thermocoagulation)
                ageGroupDataFirstScreen.first_time_screened_leep.concat(data.data.first_time_screened[i].leep)
                ageGroupDataFirstScreen.first_time_screened_via_deffered.concat(data.data.first_time_screened[i].via_deffered)
                ageGroupDataFirstScreen.first_time_screened_via_reffered.concat(data.data.first_time_screened[i].via_reffered)
                ageGroupDataFirstScreen.first_time_screened_suspected_reffered.concat(data.data.first_time_screened[i].suspected_reffered)
                //pushing to results
                results.push(ageGroupDataFirstScreen)
            }

            for (let i = 0; i < data.data.rescreened_after_prev_visit.length; i++) {
                const ageGroup = data.data.rescreened_after_prev_visit[i].age_group;
                const ageGroupDataRescreen: any = {
                    age_group: ageGroup,
                    rescreened_after_prev_visit_cryotherapy: [],
                    rescreened_after_prev_visit_thermocoagulation: [],
                    rescreened_after_prev_visit_leep: [],
                    rescreened_after_prev_visit_via_deffered: [],
                    rescreened_after_prev_visit_via_reffered: [],
                    rescreened_after_prev_visit_suspected_reffered: []
                };
                //pushing received arrays
                ageGroupDataRescreen.rescreened_after_prev_visit_cryotherapy.concat(data.data.rescreened_after_prev_visit[i].cryotherapy)
                ageGroupDataRescreen.rescreened_after_prev_visit_thermocoagulation.concat(data.data.rescreened_after_prev_visit[i].thermocoagulation)
                ageGroupDataRescreen.rescreened_after_prev_visit_leep.concat(data.data.rescreened_after_prev_visit[i].leep)
                ageGroupDataRescreen.rescreened_after_prev_visit_via_deffered.concat(data.data.rescreened_after_prev_visit[i].via_deffered)
                ageGroupDataRescreen.rescreened_after_prev_visit_via_reffered.concat(data.data.rescreened_after_prev_visit[i].via_reffered)
                ageGroupDataRescreen.rescreened_after_prev_visit_suspected_reffered.concat(data.data.rescreened_after_prev_visit[i].suspected_reffered)
                //pushing to results
                results.push(ageGroupDataRescreen)
            }

            for (let i = 0; i < data.data.post_treatment_followup.length; i++) {
                const ageGroup = data.data.post_treatment_followup[i].age_group;
                const ageGroupDataPostTxFollowup: any = {
                    age_group: ageGroup,
                    post_treatment_followup_cryotherapy: [],
                    post_treatment_followup_thermocoagulation: [],
                    post_treatment_followup_leep: [],
                    post_treatment_followup_via_deffered: [],
                    post_treatment_followup_via_reffered: [],
                    post_treatment_followup_suspected_reffered: []
                };
                //pushing received arrays
                ageGroupDataPostTxFollowup.post_treatment_followup_cryotherapy.concat(data.data.post_treatment_followup[i].cryotherapy)
                ageGroupDataPostTxFollowup.post_treatment_followup_thermocoagulation.concat(data.data.post_treatment_followup[i].thermocoagulation)
                ageGroupDataPostTxFollowup.post_treatment_followup_leep.concat(data.data.post_treatment_followup[i].leep)
                ageGroupDataPostTxFollowup.post_treatment_followup_via_deffered.concat(data.data.post_treatment_followup[i].via_deffered)
                ageGroupDataPostTxFollowup.post_treatment_followup_via_reffered.concat(data.data.post_treatment_followup[i].via_reffered)
                ageGroupDataPostTxFollowup.post_treatment_followup_suspected_reffered.concat(data.data.post_treatment_followup[i].suspected_reffered)
                //pushing to results
                results.push(ageGroupDataPostTxFollowup)
            }
            //adding totals
            const totals: any = {
                total_cyrotherapy: [],
                total_thermocoagulation: [],
                total_leep: [],
                total_number_same_day_tx: [],
                total_via_deffered: [],
                total_via_reffered: [],
                suspects_reffered: [],
                total_reffered: []
                };
            //assigning values
            totals.total_cyrotherapy.concat(data.totals.total_cyrotherapy)
            totals.total_thermocoagulation.concat(data.totals.total_thermocoagulation)
            totals.total_leep.concat(data.totals.total_leep)
            totals.total_number_same_day_tx.concat(data.totals.total_number_same_day_tx)
            totals.total_via_deffered.concat(data.totals.total_via_deffered)
            totals.total_via_reffered.concat(data.totals.total_via_reffered)
            totals.suspects_reffered.concat(data.totals.suspects_reffered)
            totals.total_reffered.concat(data.totals.total_reffered)
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
            const reportTitle = `${Service.getLocationName()} Monthly CECAP Tx Report ${this.period}`
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