import { Service } from "@/services/service";
import HisDate from "@/utils/Date"
import { PrintoutService } from '@/services/printout_service';
import Url from "@/utils/Url";

export interface QuarterInterface {
    name: string;
    start: string;
    end: string;
}

export const AGE_GROUPS = [
    '0-5 months', '6-11 months',
    '12-23 months', '2-4 years', 
    '5-9 years', '10-14 years', 
    '15-17 years', '18-19 years', 
    '20-24 years', '25-29 years', 
    '30-34 years', '35-39 years', 
    '40-44 years', '45-49 years', 
    '50 plus years'
]

export const OTHER_AGE_GROUPS = [
    '<1 year', '1-4 years',
    '5-9 years', '10-14 years',
    '15-19 years', '20-24 years',
    '25-29 years', '30-34 years',
    '35-39 years', '40-44 years',
    '45-49 years', '50 plus years'
]

export const LA_TYPES: Record<string, string> = {
    one: 'AL 1', 
    two: 'AL 2', 
    three: 'AL 3', 
    four: 'LA 4'
}

export const NCD_TYPES = [
    'Diabetes',
    'Hypertension',
    'Stroke',
    'Suspected cancer',
    'Confirmed cancer',
    'Palliative cancer',
    'Asthma',
    'Depression',
    'Acute psychosis',
    'Chronic psychosis',
    'Epilepsy'
]

export const MENTAL_HEALTH_DIAGNOSIS = [
    'Organic mental disorder (Chronic)',
    'Organic mental disorder (acute)',
    'Alcohol use mental disorder',
    'Drug use mental disorder',
    'Schizophrenia',
    'Acute and transient psychotic disorder',
    'Schizo-affective disorder',
    'Mood-affective disorder (MANIC)',
    'Mood-affective disorder (BIPOLAR)',
    'Mood-affective disorder (DEPRESSION)',
    'Anxiety disorder',
    'Stress reaction adjustment disorder',
    'Dissociative conversion disorder',
    'Somatoform disorder',
    'Puerperal mental disorder',
    'Personality/Behaviour disorder',
    'Mental retardation',
    'Psychological mental disorder',
    'Hyperkinetic conduct disorder',
    'Epilepsy'
]

export class OpdReportService extends Service {
    programID: number;
    startDate: string;
    endDate: string;
    date: string;
    epiweek: string;
    constructor() {
        super()
        this.endDate = ''
        this.startDate = ''
        this.epiweek = ''
        this.date = Service.getSessionDate()
        this.programID = Service.getProgramID()
    }

    getPatientsWithNIDs() {
        return this.getReport('with_nids')
    }

    getClinicRegistrations(){
        return this.getReport('registration');
    }

    getAttendance(){
        return this.getReport(`programs/${this.programID}/reports/attendance`)
    }

    getDrugs() {
        const url = `programs/${this.programID}/reports/drug`
        return Service.getJson(url, {
            'start_date': this.startDate,
            'end_date': this.endDate,
            'date': this.date
        })
    }

    getDiagnosis(){
        const url = `programs/${this.programID}/reports/diagnosis`
        return Service.getJson(url, {
            'start_date': this.startDate,
            'end_date': this.endDate,
            'date': this.date
        })
    }

    getDiagnosisByAddress(){
        return this.getReport('diagnosis_by_address')
    }

    getLaPrescriptions(){
        const url = `programs/${this.programID}/reports/la_prescriptions`
        return Service.getJson(url, {
            'start_date': this.startDate,
            'end_date': this.endDate,
            
        })
    }

    getMalariaReport(){
        const url = `programs/${this.programID}/reports/malaria_report`
        return Service.getJson(url, {
            'start_date': this.startDate,
            'end_date': this.endDate,
            'date': this.date
        })
    }
    
    printLaReport(data: Record<string, any>){
        const printService = new PrintoutService()
        const url = `programs/${this.programID}/barcodes/la_report`
        const params: Record<string, any> = {
            "date[start]": this.startDate,
            "date[end]": this.endDate
        }
        Object.keys(LA_TYPES).forEach((v, i) => {
            i++
            params[`${i}[prescription]`] = data[`total_la_${v}_prescribed_drugs`]
            params[`${i}[dispensed]`] = data[`total_la_${v}_dispensed_drugs`]
        })
        return printService.printLbl(`${url}?${Url.parameterizeObjToString(params)}`)
    }

    getDateIntervalPeriod() {
        return `${HisDate.toStandardHisDisplayFormat(this.startDate)} - ${HisDate.toStandardHisDisplayFormat(this.endDate)}`
    }

    setStartDate(startDate: string) {
        this.startDate = startDate
    }  

    setEndDate(endDate: string) {
        this.endDate = endDate
    }

    setEpiWeek(epiweek: string) {
        this.epiweek = epiweek
    }

    getReportPeriod() {
        return this.startDate && this.endDate
         ? `${HisDate.toStandardHisDisplayFormat(this.startDate)} - ${HisDate.toStandardHisDisplayFormat(this.endDate)}`
         : '-'
    }

    getReport(url: string, params={}) {
        return Service.getJson(url, this.buildRequest(params))
    }

    buildRequest(config: Record<string, any> = {}) {
        const payload: any = {'date': this.date, 'program_id': this.programID}
        if (this.startDate && this.endDate) {
            payload['start_date'] = this.startDate
            payload['end_date'] = this.endDate
        }
        if (this.epiweek) {
            payload['epiweek'] = this.epiweek
        }
        return { ...payload, ...config }
    }

    static getReportQuarters(minDuration= 4) {
        const quarters: Array<QuarterInterface> = []
        let year = HisDate.getCurrentYear()
        for(let i=0; i < minDuration; ++i) {
            quarters.push({ name: `Q4 ${year}`, start: `${year}-10-01`, end: `${year}-12-31` })
            quarters.push({ name: `Q3 ${year}`, start: `${year}-07-01`, end: `${year}-09-30` })
            quarters.push({ name: `Q2 ${year}`, start: `${year}-04-01`, end: `${year}-06-30` })
            quarters.push({ name: `Q1 ${year}`, start: `${year}-01-01`, end: `${year}-03-31` })
            --year
        }
        return quarters
    }

}