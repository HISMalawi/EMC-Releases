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
                <ul class="header-text-list"  style="list-style-type:none;"> 
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
import MOHCXCAMonthlyReportBody from "@/apps/CxCa/views/reports/moh/MOHCXCAMonthlyReportBody.vue"
import { MultiStepPopupForm } from "@/utils/PopupKeyboard";
import { FieldType } from "@/components/Forms/BaseFormElements";
import { MohCxCaMonthlyService } from '@/apps/CxCa/services/reports/MOHCXCAMonthly_service'
import { CxCaReportService } from '@/apps/CxCa/services/reports/cxca_report_service'
import { toCsv, toPDFfromHTML } from "@/utils/Export"
import dayjs from "dayjs";
import { find } from "lodash";

export default defineComponent({
    mixins: [ReportMixinVue],
    components: { ReportBody: MOHCXCAMonthlyReportBody, IonPage, IonContent, IonLoading, HisFooter, IonToolbar, IonHeader },
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
        titleHack: "Malawi Cervical Cancer Control Program Monthly Report",
        periodHack: "",
        cohort: {} as any,
        isLoading: false as boolean,
        sectionOneRawJson: [],
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
        ], 
        (f: any) => {
                this.onPeriod(f.start_date.value, f.end_date.value )
                console.log(f)
                modalController.dismiss()
            }
        )
    }, 
    methods: {
        async onPeriod(start_date: any, end_date: any) {
            this.startDate = start_date
            this.endDate = end_date
            this.periodHack = this.startDate + "   " + this.endDate
            this.isLoading = false
            
            //Section One
            Service.getJson('screened_for_cxca',{
                'report_name': 'SCREENED FOR CXCA',
                'program_id': Service.getProgramID(),
                'start_date': start_date,
                'end_date': end_date,
                'date': Service.getSessionDate()
            }).then(response => {
                //load data and perform calculations based by age                    
                const age_groups = this.loadSectionOne(response)
                //assigning
                this.indicators.num_clients_lessthan_25 = age_groups[0][1]
                this.indicators.num_clients_25_to_29 = age_groups[1][1]
                this.indicators.num_clients_30_to_44 = age_groups[2][1]
                this.indicators.num_clients_45_to_49 = age_groups[3][1]
                this.indicators.num_clients_lessthan_49 = age_groups[4][1]
                //this.isLoading = true
            })

            //Section Two
            Service.getJson('screened_for_cxca',{
                'report_name': 'SCREENED FOR CXCA DISAGGREGATED BY HIV STATUS',
                'program_id': Service.getProgramID(),
                'start_date': start_date,
                'end_date': end_date,
                'date': Service.getSessionDate()
            }).then(response => {                  
                    const hiv_status = this.loadSectionTwo(response)
                    //assigning
                    this.indicators.num_clients_positive_art = hiv_status[0][1]
                    this.indicators.num_clients_positive_not_on_art = hiv_status[1][1]
                    this.indicators.num_clients_negative_tested_less_than_1_year = hiv_status[2][1]
                    this.indicators.hiv_1_year_ago = hiv_status[3][1]
            })

            //Section Five
            Service.getJson('screened_for_cxca',{
                'report_name': 'CXCA SCREENING RESULTS',
                'program_id': Service.getProgramID(),
                'start_date': start_date,
                'end_date': end_date,
                'date': Service.getSessionDate()
            }).then(response => {                  
                    const screening_results = this.loadSectionFive(response)
                    console.log('Here is the result >>>> ',  screening_results)
                    //assigning
                    this.indicators.num_clients_via_negative_cxca_screening_hiv_positive = screening_results[0][2]
                    this.indicators.num_clients_via_positive_cxca_screening_hiv_positive = screening_results[1][2]
                    this.indicators.num_clients_with_suspect_ca_screening_hiv_positive = screening_results[2][2]
                    this.indicators.num_clients_pap_smear_normal_cxca_screening_hiv_positive = screening_results[3][2]
                    this.indicators.num_clients_pap_smear_abnormal_cxca_screening_hiv_positive = screening_results[4][2]
                    this.indicators.num_clients_hpv_negative_cxca_screening_hiv_positive = screening_results[5][2]
                    this.indicators.num_clients_visible_lesion_cxca_screening_hiv_positive = screening_results[6][2]
                    this.indicators.num_clients_no_visible_lesion_cxca_screening_hiv_positive = screening_results[7][2]
                    this.indicators.num_clients_other_gynae_cxca_screening_hiv_positive = screening_results[8][2]
            })

            //Section Six
            Service.getJson('screened_for_cxca',{
                'report_name': 'CXCA SCREENING RESULTS',
                'program_id': Service.getProgramID(),
                'start_date': start_date,
                'end_date': end_date,
                'date': Service.getSessionDate()
            }).then(response => {                  
                    const screening_results = this.loadSectionSix(response)
                    //assigning
                    this.indicators.num_clients_via_negative = screening_results[0][2]
                    this.indicators.num_clients_via_positive = screening_results[1][2]
                    this.indicators.num_clients_with_suspect_ca = screening_results[2][2]
                    this.indicators.num_clients_pap_smear_normal = screening_results[3][2]
                    this.indicators.num_clients_pap_smear_abnormal = screening_results[3][2]
                    this.indicators.num_clients_hpv_negative = screening_results[3][2]
                    this.indicators.num_clients_visible_lesion = screening_results[3][2]
                    this.indicators.num_clients_no_visible_lesion = screening_results[3][2]
                    this.indicators.num_clients_other_gynae = screening_results[3][2]
            })

            //Section Seven
            Service.getJson('screened_for_cxca',{
                'report_name': 'CANCER SUSPECTS',
                'program_id': Service.getProgramID(),
                'start_date': start_date,
                'end_date': end_date,
                'date': Service.getSessionDate()
            }).then(response => {                  
                    const age_groups = this.loadSectionSeven(response)
                    //assigning
                    this.indicators.num_clients_cxca_suspects_lessthan_25 = age_groups[0][1]
                    this.indicators.num_clients_cxca_suspects_unknown_25_29 = age_groups[1][1]
                    this.indicators.num_clients_cxca_suspects_30_44 = age_groups[2][1]
                    this.indicators.num_clients_cxca_suspects_45_49 = age_groups[3][1]
                    this.indicators.num_clients_cxca_suspects_greaterthan_49 = age_groups[4][1]
            })

            //Section Eight
            Service.getJson('screened_for_cxca',{
                'report_name': 'CLIENTS TREATED',
                'program_id': Service.getProgramID(),
                'start_date': start_date,
                'end_date': end_date,
                'date': Service.getSessionDate()
            }).then(response => {                  
                    const clients_treated = this.loadSectionEight(response)
                    //assigning
                    this.indicators.same_day_treatment = clients_treated[0][2]
                    this.indicators.postponed_treatment = clients_treated[1][2]
                    this.indicators.postponed_treatment_performed = clients_treated[2][2]
                    this.indicators.referral = clients_treated[3][2]
            })

            //Section Nine
            Service.getJson('screened_for_cxca',{
                'report_name': 'TREATMENT OPTIONS',
                'program_id': Service.getProgramID(),
                'start_date': start_date,
                'end_date': end_date,
                'date': Service.getSessionDate()
            }).then(response => {                  
                    const clients_treated = this.loadSectionNine(response)
                    //assigning
                    this.indicators.cryotherapy = clients_treated[0][2]
                    this.indicators.thermal_coagulation = clients_treated[1][2]
                    this.indicators.leep = clients_treated[2][2]
                    this.indicators.other = clients_treated[3][2]
            })

            //Section 10
            Service.getJson('screened_for_cxca',{
                'report_name': 'REFERRAL REASONS',
                'program_id': Service.getProgramID(),
                'start_date': start_date,
                'end_date': end_date,
                'date': Service.getSessionDate()
            }).then(response => {                  
                    const referral_reasons = this.loadSectionTen(response)
                    //assigning
                    this.indicators.large_lesion = referral_reasons[0][2]
                    this.indicators.further_investigation_management = referral_reasons[1][2]
                    this.indicators.no_treatment = referral_reasons[3][2]
                    this.indicators.other_gynae = referral_reasons[4][2]
            })

            //Section 3
            Service.getJson('screened_for_cxca',{
                'report_name': 'CXCA REASON FOR VISIT',
                'program_id': Service.getProgramID(),
                'start_date': start_date,
                'end_date': end_date,
                'date': Service.getSessionDate()
            }).then(response => {         
                    const reason_for_visit = this.loadSectionThree(response)
                    console.log(" - TEST RESULT SET FORMATED  ",reason_for_visit)
                    this.indicators.initial_screening = reason_for_visit[0][1]
                    this.indicators.postponed_treatment = reason_for_visit[2][1]
                    this.indicators.one_year_check_up_after_treatment = reason_for_visit[3][1]
                    this.indicators.subsequent_screening = reason_for_visit[4][1]
                    this.indicators.section_three_referral = reason_for_visit[1][1]
                    this.indicators.problem_visit_after_treatment = reason_for_visit[5][1]

            })
        },
        buildUrl(startDate:any, endDate:any, reportName: string): string{
            let url = "http" + "://" + "localhost" + ":" + "3000" + "/api/v1";
            url += "/screened_for_cxca?date=" + sessionStorage.sessionDate;
            url += `&program_id=24`;
            url += "&report_name="+ reportName;
            url += `&start_date=${startDate}&end_date=${endDate}`; 
            return url
        },
        loadSectionTen(data: any): any {
            let formatted_data = [];
            let results = {} as any;
            let concepts = [
                'Large Lesion (>75%)',
                'Further Investigation & Management',
                'Suspect cancer',
                'Unable to treat client', 
                'Treatment not available',
                'Other'
            ];

            let count = 1;

            for(const concept of concepts) {
                if(results[concept] == undefined)
                results[concept] = [];

                for (const record of data) {
                let result = record.reason;
                let patient_id = record.patient_id;
                if(result != concept)
                    continue;

                results[result].push(patient_id);
                } 
            }
            
            for(const result in results){
                formatted_data.push([count++, result, results[result].length]);
            }
            return formatted_data;
        },
        loadSectionNine(data: any): any {
            let formatted_data = [];
            let results = {} as any;
            let concepts = [
                'Cryotherapy','Thermocoagulation',
                'Leep', 'Other'
            ];

            let count = 1;

            for(const concept of concepts) {
                if(results[concept] == undefined)
                results[concept] = [];

                for (const record of data) {
                let result = record.treatment;
                let patient_id = record.patient_id;
                if(result != concept)
                    continue;

                results[result].push(patient_id);
                } 
            }
            
            for(const result in results){
                formatted_data.push([count++, result, results[result].length]);
            }
            return formatted_data;
        },
        loadSectionEight(data: any): any {
            let formatted_data = [];
            let results = {} as any;
            let concepts = [
                'Same day treatment',
                'Postponed treatment',
                'Postponed treatment performed',
                'Referral'
            ];

            let count = 1;

            for(const concept of concepts) {
                if(results[concept] == undefined)
                results[concept] = [];

                for (const record of data) {
                let result = record.dot;
                let patient_id = record.patient_id;
                if(result != concept)
                    continue;

                results[result].push(patient_id);
                } 
            }
            
            for(const result in results){
                formatted_data.push([count++, result, results[result].length]);
            }
            return formatted_data;
        },
        loadSectionSeven(data: any): any {
        const formatted_data = [];
            const age_groups = [
            ['<25 years', 0],
            ['25-29 years',0],
            ['30-44 years',0],
            ['45-49 years',0],
            ['>49 years', 0],
            ['Unknown', 0]
            ];
        
            let count = 1;
            for (const group_cont of age_groups){
            for (const record of data) {
                const age_in_years = record.age_in_years;
                //const patient_id = record.patient_id;
                if(group_cont[0] == this.calculatedAgeGroupSectionOne(age_in_years)){
                    //cast to number
                    let tempTotal: number = group_cont[1] as number
                    tempTotal += 1
                    //assign to group_cont[1]
                    group_cont[1] = tempTotal
                }
            } 
            formatted_data.push([count++, group_cont[0], group_cont[1]]);
            }
            //return array
            return age_groups
        },
        loadSectionSix(data: any): any {
            let formatted_data = [];
            let results = {} as any;
            let concepts = [
                'VIA negative',
                'VIA positive',
                'Suspect',
                'PAP Smear normal',
                'PAP Smear abnormal',
                'HPV positive',
                'HPV negative',
                'Visible Lesion',
                'No visible Lesion',
                'Other'
            ];

            let count = 1;

            for(const concept of concepts) {
                if(results[concept] == undefined)
                results[concept] = [];

                for (const record of data) {
                let result = record.result;
                let patient_id = record.patient_id;
                if(result != concept)
                    continue;

                results[result].push(patient_id);
                } 
            }
            
            for(const result in results){
                formatted_data.push([count++, result, results[result].length]);
            }
            return formatted_data;
        },
        loadSectionFive(data: any): any {
            let formatted_data = [];
            let results = {} as any;
            let concepts = [
                'VIA negative',
                'VIA positive',
                'Suspect',
                'PAP Smear normal',
                'PAP Smear abnormal',
                'HPV positive',
                'HPV negative',
                'Visible Lesion',
                'No visible Lesion',
                'Other'
            ];

            let count = 1;

            for(const concept of concepts) {
                if(results[concept] == undefined)
                results[concept] = [];

                for (const record of data) {
                let result = record.result;
                let patient_id = record.patient_id;
                if(result != concept)
                    continue;

                results[result].push(patient_id);
                } 
            }
            
            for(const result in results){
                formatted_data.push([count++, result, results[result].length]);
            }
            return formatted_data;
        },
        loadSectionThree(data: any): any {
            // Create an array of visits with their respective integer counts
            const visitsArray = Object.entries(data).map(([visit, integers]) => [visit, (integers as number[]).length]);
            // return the array
            return visitsArray;
        },
        loadSectionTwo(data: any): any {
        let formatted_data = [];
        let age_groups = [
            ['Positive on ART', 0],
            ['Positive NOT on ART', 0],
            ['Negative',0],
            ['Unknown', 0]
        ];

        let count = 1;
            for (const group_cont of age_groups){
            for (const record of data) {
                const age_in_years = record.age_in_years;
                //const patient_id = record.patient_id;
                if(group_cont[0] == this.calculatedAgeGroupSectionOne(age_in_years)){
                    //cast to number
                    let tempTotal: number = group_cont[1] as number
                    tempTotal += 1
                    //assign to group_cont[1]
                    group_cont[1] = tempTotal
                }
            } 
            formatted_data.push([count++, group_cont[0], group_cont[1]]);
            }
            //return array
            return age_groups
        },
        loadSectionOne(data: any): any {
        const formatted_data = [];
            const age_groups = [
            ['<25 years', 0],
            ['25-29 years',0],
            ['30-44 years',0],
            ['45-49 years',0],
            ['>49 years', 0],
            ['Unknown', 0]
            ];
        
            let count = 1;
            for (const group_cont of age_groups){
            for (const record of data) {
                const age_in_years = record.age_in_years;
                //const patient_id = record.patient_id;
                if(group_cont[0] == this.calculatedAgeGroupSectionOne(age_in_years)){
                    //cast to number
                    let tempTotal: number = group_cont[1] as number
                    tempTotal += 1
                    //assign to group_cont[1]
                    group_cont[1] = tempTotal
                }
            } 
            formatted_data.push([count++, group_cont[0], group_cont[1]]);
            }
            //return array
            return age_groups
        },
        calculatedAgeGroupSectionOne(age: any){
            if(age < 25){
            return '<25 years';
            }else if(age <= 29){
            return '25-29 years';
            }else if(age <= 44){
            return '30-44 years'
            }else if(age <= 49){
            return '45-49 years'
            }else if(age > 49){
            return '>49 years'
            }else{
            return 'Unknown'
            }
        },
        requestCompleted(request: any) {
            //check if request object url contains the word 'report'
            if(request.ok){
                //processing the data retrieved from the api
                this.processData(request)
            }
        },
        async processData(request: any) {
            const data = await request.json()
            this.cohort = data.values
            this.indicators = this.toIndicators(data.values)
        },
        /**
         * Transform indicators from array to a simple key value pair object
        */ 
        toIndicators(params: any) {
            return params.reduce((data: Record<string, number>, indicator: any) => {
                data[indicator.name] = parseInt(indicator.contents)
                return data
            }, {})
        },
        async onDrillDown(indicatorName: string) {
            const indicator = find(this.cohort, {name: indicatorName}) 
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
        sectionOne(){
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
// function getReportSectionOne(startDate: any, endDate:any, ij: any){
//     console.log("We are in here ========= >>>>  ")
//     ij = 400
//     const authKey: string = sessionStorage.getItem("apiKey") as string
//     //prep end point
//     let url = "http" + "://" + "localhost" + ":" + "3000" + "/api/v1";
//     url += "/screened_for_cxca?date=" + sessionStorage.sessionDate;
//     url += `&program_id=24`;
//     url += `&report_name=CANCER SUSPECTS`;
//     url += `&start_date=${startDate}&end_date=${endDate}`; 

//     console.log("HERE IN XHTTP CLASS 0 " + url)
//     console.log("HERE IN XHTTP CLASS 0 AUTH " + authKey)

//     const xhttp = new XMLHttpRequest();
    
//     xhttp.open("GET", url, true);
//     xhttp.setRequestHeader('Authorization', authKey);
//     xhttp.setRequestHeader('Content-type', "application/json");
//     xhttp.send();

//     xhttp.onload = function() {
//         if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
//             const obj = JSON.parse(this.responseText);
//             /*usin a static method here for this to work 
//             *I will be assigning the values manually for now 
//             */
//             loadClientsSectionOne(obj)
//             //assigning
            
//         }
//     }
//     console.log("HERE IN XHTTP CLASS SENT ")
// }

// function loadClientsSectionOne(data: any): any {
//     const formatted_data = [];
//     const age_groups = [
//     ['<25 years', 0],
//     ['25-29 years',0],
//     ['30-44 years',0],
//     ['45-49 years',0],
//     ['>49 years', 0],
//     ['Unknown', 0]
//     ];

//     let count = 1;
//     for (const group_cont of age_groups){
//     for (const record of data) {
//         const age_in_years = record.age_in_years;
//         //const patient_id = record.patient_id;
//         if(group_cont[0] == calculatedAgeGroupSectionOne(age_in_years)){
//             //cast to number
//             let tempTotal: number = group_cont[1] as number
//             tempTotal += 1
//             //assign to group_cont[1]
//             group_cont[1] = tempTotal
//         }
//     } 
//     formatted_data.push([count++, group_cont[0], group_cont[1]]);
//     }
//     //return array
//     return age_groups
// }

// function calculatedAgeGroupSectionOne(age: any){
//     if(age < 25){
//     return '<25 years';
//     }else if(age <= 29){
//     return '25-29 years';
//     }else if(age <= 44){
//     return '30-44 years'
//     }else if(age <= 49){
//     return '45-49 years'
//     }else if(age > 49){
//     return '>49 years'
//     }else{
//     return 'Unknown'
//     }
// }
</script>