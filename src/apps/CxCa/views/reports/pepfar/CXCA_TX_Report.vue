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
    import CXCA_TX_ReportBody from "@/apps/CxCa/views/reports/pepfar/CXCA_TX_ReportBody.vue"
    import { MultiStepPopupForm } from "@/utils/PopupKeyboard";
    import { FieldType } from "@/components/Forms/BaseFormElements";
    import { CxCaReportService } from '@/apps/CxCa/services/reports/cxca_report_service'
    import { toCsv, toPDFfromHTML } from "@/utils/Export"
    import dayjs from "dayjs";
    
    export default defineComponent({
        mixins: [ReportMixinVue],
        components: { ReportBody: CXCA_TX_ReportBody, IonPage, IonContent, IonLoading, HisFooter, IonToolbar, IonHeader },
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
            titleHack: "CXCA TX Report",
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
                this.periodHack = this.startDate + "  " + this.endDate
                this.reportService = new CxCaReportService()
                this.reportService.setStartDate(start_date)
                this.reportService.setEndDate(end_date)
                const data = await this.reportService.getPepfarReport('CXCA TX');
                this.isLoading = true

                //Section One
                Service.getJson('screened_for_cxca',{
                    'report_name': 'CXCA TX',
                    'program_id': Service.getProgramID(),
                    'start_date': start_date,
                    'end_date': end_date,
                    'date': Service.getSessionDate()
                }).then(response => {

                    console.log("HERE IS THE RESULT ", response);

                    const age_groups = this.sortData(response)
                
                    console.log("HERE IS THE RESULT FORMATED ", age_groups);

                    //assigning 
                    //raw 1
                    this.indicators.tx_1st_scrn_cryotherapy_15_19 = age_groups[5].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_15_19 = age_groups[5].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_15_19 = age_groups[5].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_15_19 = age_groups[5].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_15_19 = age_groups[5].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_15_19 = age_groups[5].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_15_19 = age_groups[5].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_15_19 = age_groups[5].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_15_19 = age_groups[5].pst_tx_followup_integers_leep_count
                    //raw 2
                    this.indicators.tx_1st_scrn_cryotherapy_20_24 = age_groups[6].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_20_24 = age_groups[6].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_20_24 = age_groups[5].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_20_24 = age_groups[6].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_20_24 = age_groups[6].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_20_24 = age_groups[6].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_20_24 = age_groups[6].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_20_24 = age_groups[6].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_20_24 = age_groups[6].pst_tx_followup_integers_leep_count
                    //raw 3
                    this.indicators.tx_1st_scrn_cryotherapy_25_29 = age_groups[7].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_25_29 = age_groups[7].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_lee_25_29 = age_groups[7].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_25_29 = age_groups[7].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_25_29 = age_groups[7].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_25_29 = age_groups[7].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_25_29 = age_groups[7].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_25_29 = age_groups[7].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_25_29 = age_groups[7].pst_tx_followup_integers_leep_count
                    //raw 4
                    this.indicators.tx_1st_scrn_cryotherapy_30_34 = age_groups[8].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_30_34 = age_groups[8].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_30_34 = age_groups[8].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_30_34 = age_groups[8].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_30_34 = age_groups[8].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_30_34 = age_groups[8].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_30_34 = age_groups[8].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_30_34 = age_groups[8].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_30_34 = age_groups[8].pst_tx_followup_integers_leep_count
                    //raw 5
                    this.indicators.tx_1st_scrn_cryotherapy_35_39 = age_groups[9].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_35_39 = age_groups[9].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_35_39 = age_groups[9].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_35_39 = age_groups[9].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_35_39 = age_groups[9].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_35_39 = age_groups[9].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_35_39 = age_groups[9].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_35_39 = age_groups[9].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_35_39 = age_groups[9].pst_tx_followup_integers_leep_count
                    //raw 6
                    this.indicators.tx_1st_scrn_cryotherapy_40_44 = age_groups[10].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_40_44 = age_groups[10].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_40_44= age_groups[5].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_40_44 = age_groups[5].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_40_44 = age_groups[10].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_40_44 = age_groups[10].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_40_44 = age_groups[10].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_40_44 = age_groups[10].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_40_44 = age_groups[10].pst_tx_followup_integers_leep_count
                    //raw 7
                    this.indicators.tx_1st_scrn_cryotherapy_45_49 = age_groups[11].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_45_49 = age_groups[11].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_45_49 = age_groups[5].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_45_49 = age_groups[11].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulatio_45_49 = age_groups[11].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_45_49= age_groups[11].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_45_49 = age_groups[11].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_45_49 = age_groups[11].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_45_49 = age_groups[11].pst_tx_followup_integers_leep_count
                    //raw 8
                    this.indicators.tx_1st_scrn_cryotherapy_50_54 = age_groups[12].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_50_54 = age_groups[12].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_lee_50_54 = age_groups[12].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_50_54 = age_groups[12].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulatio_50_54 = age_groups[12].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_50_54 = age_groups[12].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_50_54 = age_groups[12].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_50_54 = age_groups[12].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_50_54 = age_groups[12].pst_tx_followup_integers_leep_count
                    //raw 9
                    this.indicators.tx_1st_scrn_cryotherapy_55_59 = age_groups[13].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_55_59= age_groups[13].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_55_59 = age_groups[13].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_55_59 = age_groups[13].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_55_59 = age_groups[13].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_55_59 = age_groups[13].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_55_59 = age_groups[13].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_55_59 = age_groups[13].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_55_59 = age_groups[13].pst_tx_followup_integers_leep_count
                    //raw 10
                    this.indicators.tx_1st_scrn_cryotherapy_60_64 = age_groups[14].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_60_64 = age_groups[14].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_60_64 = age_groups[14].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_60_64 = age_groups[14].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_60_64 = age_groups[14].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_60_64 = age_groups[14].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_60_64 = age_groups[14].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_60_64 = age_groups[14].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_60_64 = age_groups[14].pst_tx_followup_integers_leep_count
                    //raw 11
                    this.indicators.tx_1st_scrn_cryotherapy_65_69 = age_groups[15].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_65_69= age_groups[15].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_65_69 = age_groups[15].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_65_69 = age_groups[15].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_65_69 = age_groups[15].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_65_69 = age_groups[15].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_65_69 = age_groups[15].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_65_69 = age_groups[15].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_65_69 = age_groups[15].pst_tx_followup_integers_leep_count
                    //raw 12
                    this.indicators.tx_1st_scrn_cryotherapy_70_74 = age_groups[16].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_70_74 = age_groups[16].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_70_74 = age_groups[16].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_70_74 = age_groups[16].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_70_74 = age_groups[16].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_70_74 = age_groups[16].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_70_74 = age_groups[16].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_70_74 = age_groups[16].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_70_74 = age_groups[16].pst_tx_followup_integers_leep_count
                    //raw 13
                    this.indicators.tx_1st_scrn_cryotherapy_75_79 = age_groups[17].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_75_79 = age_groups[17].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_75_79 = age_groups[17].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_75_79 = age_groups[17].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_75_79 = age_groups[17].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_75_79 = age_groups[17].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_75_79 = age_groups[17].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_75_79 = age_groups[17].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_75_79 = age_groups[17].pst_tx_followup_integers_leep_count
                    //raw 14
                    this.indicators.tx_1st_scrn_cryotherapy_80_84 = age_groups[18].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_80_84 = age_groups[18].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_80_84 = age_groups[18].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_80_84 = age_groups[18].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_80_84 = age_groups[18].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_80_84 = age_groups[18].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_80_84 = age_groups[18].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_80_84 = age_groups[18].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_80_84 = age_groups[18].pst_tx_followup_integers_leep_count
                    //raw 15
                    this.indicators.tx_1st_scrn_cryotherapy_85_89 = age_groups[19].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_85_89 = age_groups[19].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_85_89 = age_groups[19].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_85_89 = age_groups[19].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_85_89 = age_groups[19].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_85_89 = age_groups[19].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_85_89 = age_groups[19].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_85_89 = age_groups[19].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_85_89 = age_groups[19].pst_tx_followup_integers_leep_count
                    //raw 16
                    this.indicators.tx_1st_scrn_cryotherapy_90_plus = age_groups[20].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_90_plus = age_groups[20].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_90_plus = age_groups[20].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_90_plus = age_groups[20].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_90_plus  = age_groups[20].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_90_plus = age_groups[20].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_90_plus = age_groups[20].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_90_plus = age_groups[20].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_90_plus = age_groups[20].pst_tx_followup_integers_leep_count
                    //raw 17
                    this.indicators.tx_1st_scrn_cryotherapy_unkn_age = age_groups[0].frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_unkn_age = age_groups[0].frst_thermal_integers_count
                    this.indicators.tx_1st_scrn_leep_unkn_age = age_groups[0].frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_unkn_age = age_groups[0].rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_unkn_age = age_groups[0].rscrn_after_prev_visit_positive_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_unkn_age = age_groups[0].rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_unkn_age = age_groups[0].pst_tx_followup_negative_integers_cryotherapy_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_unkn_age = age_groups[0].pst_tx_followup_positive_integers_thermocoagulation_count
                    this.indicators.tx_ptfu_scrn_leep_unkn_age = age_groups[0].pst_tx_followup_integers_leep_count
                    
                    //calculate totals 
                    const totals = this.getTotals(age_groups)

                    //raw 18
                    this.indicators.tx_1st_scrn_cryotherapy_all = totals[0].total_frst_cryotherapy_integers_count
                    this.indicators.tx_1st_scrn_thermocoagulation_all = totals[0].total_frst_thermocoagulation_integers_count
                    this.indicators.tx_1st_scrn_leep_all = totals[0].total_frst_leep_integers_count
                    this.indicators.tx_rscrn_scrn_cryotherapy_all = totals[0].total_rscrn_after_prev_visit_cryotherapy_integers_count
                    this.indicators.tx_rscrn_scrn_thermocoagulation_all = totals[0].total_rscrn_after_prev_visit_thermocoagulation_count
                    this.indicators.tx_rscrn_scrn_leep_all = totals[0].total_rscrn_after_prev_visit_leep_integers_count
                    this.indicators.tx_ptfu_scrn_cryotherapy_all = totals[0].total_pst_tx_followup_cryotherapy_integers_count
                    this.indicators.tx_ptfu_scrn_thermocoagulation_all = totals[0].total_pst_tx_followup_thermocoagulation_integers_count
                    this.indicators.tx_ptfu_scrn_leep_all = totals[0].total_pst_tx_followup_leep_integers_count
                    
                    this.isLoading = false
                })
            },
            getTotals(data:any) : any{
                const result: any[] = [];
                const ageGroupData: any = {
                    age_group: 'all',
                    total_frst_cryotherapy_integers_count: 0,
                    total_frst_thermocoagulation_integers_count: 0,
                    total_frst_leep_integers_count: 0,
                    total_rscrn_after_prev_visit_cryotherapy_integers_count: 0,
                    total_rscrn_after_prev_visit_thermocoagulation_count: 0,
                    total_rscrn_after_prev_visit_leep_integers_count: 0,
                    total_pst_tx_followup_cryotherapy_integers_count: 0,
                    total_pst_tx_followup_thermocoagulation_integers_count: 0,
                    total_pst_tx_followup_leep_integers_count: 0
                };

                for (const ageGroup of data) {
                    //total up
                    ageGroupData.total_frst_cryotherapy_integers_count += ageGroup.frst_cryotherapy_integers_count
                    ageGroupData.total_frst_thermocoagulation_integers_count += ageGroup.frst_thermal_integers_count
                    ageGroupData.total_frst_leep_integers_count += ageGroup.frst_leep_integers_count

                    ageGroupData.total_rscrn_after_prev_visit_cryotherapy_integers_count += ageGroup.pst_tx_followup_negative_integers_cryotherapy_count
                    ageGroupData.total_rscrn_after_prev_visit_thermocoagulation_count += ageGroup.pst_tx_followup_positive_integers_thermocoagulation_count
                    ageGroupData.total_rscrn_after_prev_visit_leep_integers_count += ageGroup.pst_tx_followup_integers_leep_count

                    ageGroupData.total_pst_tx_followup_cryotherapy_integers_count += ageGroup.rscrn_after_prev_visit_negative_cryotherapy_integers_count
                    ageGroupData.total_pst_tx_followup_thermocoagulation_integers_count += ageGroup.rscrn_after_prev_visit_positive_thermocoagulation_count
                    ageGroupData.total_pst_tx_followup_leep_integers_count += ageGroup.rscrn_after_prev_visit_leep_integers_count
                }

                result.push(ageGroupData);

                return result;
            },
            countIntegers(data: number[]): number {
                let count = 0;
                for (const num of data) {
                    if (Number.isInteger(num)) {
                        count++;
                    }
                }
                return count;
            },
            sortData(data:any): any[] {
                const result: any[] = [];

                for (const ageGroup of data) {
                const ageGroupData: any = {
                    age_group: ageGroup.age_group,
                    frst_cryotherapy_integers_count: 0,
                    frst_thermal_integers_count: 0,
                    frst_leep_integers_count: 0,
                    rscrn_after_prev_visit_negative_cryotherapy_integers_count: 0,
                    rscrn_after_prev_visit_positive_thermocoagulation_count: 0,
                    rscrn_after_prev_visit_leep_integers_count: 0,
                    pst_tx_followup_negative_integers_cryotherapy_count: 0,
                    pst_tx_followup_positive_integers_thermocoagulation_count: 0,
                    pst_tx_followup_integers_leep_count: 0
                };

                ageGroupData.frst_cryotherapy_integers_count = this.countIntegers(
                    ageGroup.first_time_screened.cryotherapy
                );
                ageGroupData.frst_thermal_integers_count = this.countIntegers(
                    ageGroup.first_time_screened.thermocoagulation
                );
                ageGroupData.frst_leep_integers_count = this.countIntegers(
                    ageGroup.first_time_screened.leep
                );

                //Rescreened
                ageGroupData.rscrn_after_prev_visit_negative_cryotherapy_integers_count = this.countIntegers(
                    ageGroup.rescreened_after_prev_visit.cryotherapy
                );
                ageGroupData.rscrn_after_prev_visit_positive_thermocoagulation_count = this.countIntegers(
                    ageGroup.rescreened_after_prev_visit.thermocoagulation
                );
                ageGroupData.rscrn_after_prev_visit_leep_integers_count = this.countIntegers(
                    ageGroup.rescreened_after_prev_visit.leep
                );

                //post treatment
                ageGroupData.pst_tx_followup_negative_integers_cryotherapy_count = this.countIntegers(
                    ageGroup.post_treatment_followup.cryotherapy
                );
                ageGroupData.pst_tx_followup_positive_integers_thermocoagulation_count = this.countIntegers(
                    ageGroup.post_treatment_followup.thermocoagulation
                );
                ageGroupData.pst_tx_followup_integers_leep_count = this.countIntegers(
                    ageGroup.post_treatment_followup.leep
                );

                result.push(ageGroupData);
                }

                return result;
            },
            async onDrillDown(indicatorName: string) {
               return null 
            },
            regenerate() {
                this.onPeriod(this.formData.start_date.value, this.formData.end_date.value)
            },
            exportToCsv() {
                const headers = ['Indicator', 'Value']
                const rows = Object.keys(this.indicators).map(k => [k, this.indicators[k]])
                const reportTitle = `${Service.getLocationName()} cohort report ${this.period}`
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