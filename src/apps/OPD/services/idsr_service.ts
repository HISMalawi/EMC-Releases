import { OpdReportService } from "./opd_report_service";
import moment from "dayjs"
import { Service } from "@/services/service";

export enum CohortVar {
    MOH_CACHE = 'mohCache'
}

export interface CohortValidationInterface {
    param: number | string;
    error: (indicator: number, param: number) => string;
    check: (indicator: number, param: number) => boolean;
}

export interface CommonInterface {
    name: string;
    start: string;
    end: string;
}

export class IDSRReportService extends OpdReportService {
    regenerate: boolean;
    constructor() {
        super()
        this.regenerate = false
    }

    private IDSRWeeklyUrl() {
        return `generate_weekly_idsr_report`
    }

    private IDSRMonthlyUrl() {
        return `generate_monthly_idsr_report`
    }

    private OPDVistisUrl() {
        return `registration`
    }

    setRegenerate(regenerate: boolean) {
        this.regenerate = regenerate
    }

    requestIDSR(params: any) {
        return OpdReportService.ajxGet(
            this.IDSRWeeklyUrl(), params
        )
    }

    requestIDSRMonthly(params: any) {
        return OpdReportService.ajxGet(
            this.IDSRMonthlyUrl(), params
        )
    }

    epiWeeksRequestParams() {
        const { start, end} = this.getStartEndDates()        
        return { 
            'start_date': start,
            'end_date': end,
            request: 'true'
        }
    }

    registrationRequestParams() {
        const { start, end} = this.getStartEndDates()
        return { 
            'start_date': start,
            'end_date': end,
            'date': Service.getApiDate,
            'program_id': Service.getProgramID()
        }
    }

    getStartEndDates() {
        const txt = this.epiweek.split(" ")
        let start = txt[2].split("(")[1]
        let end = txt[4].split(")")[0]
        start = moment(start).toISOString().slice(0,10)
        end = moment(end).toISOString().slice(0,10)
        return { start, end}
    }

    async getPatientsDetails(patientIds: Array<[]>) {
        const patients = []
        for(const patientID of patientIds) {
            const res = await Service.getJson(`patients/${patientID}`)
            if(res) {
              const person = res.person
              const addressesObj = person.addresses[0]
              const personObj = {
                'givenName': '',
                'familyName': '',
                'gender': '',
                'address': '',
                'phone': '',
                'personId': ''
              }
              personObj.givenName = person.names[0].given_name
              personObj.familyName = person.names[0].family_name
              personObj.gender = person.gender
              personObj.phone = person.person_attributes[1].value
              personObj.personId = person.person_id
              personObj.address = addressesObj.state_province +", "+ addressesObj.city_village +", "+ addressesObj.address1
              patients.push(personObj)
              }
            }
        return patients
    }

    renderResults(params: any) {
        const all = []
        let count = 1
        for (const [key, value] of Object.entries(params)) {
            const temp: any = []
            const condition: any = value
            const item = {
                id: 0,
                name: '',
                lessThanFiveYears: '',
                lessThanFiveYearsPatientIds: '',
                greaterThanEqualFiveYears: '',
                greaterThanEqualFiveYearsPatientIds: '',
                total: 0,
                totalPatientIds: ''
            }
            item.name = key
            let total = 0
            item.id = count
            count += 1 
            for (const [key1, value1] of Object.entries(condition)) {
                const conditionDetails: any = value1
                if (conditionDetails != null) {
                    total +=conditionDetails.length;
                    item.total = total
                    if(conditionDetails.length) {
                        temp.push(...conditionDetails)
                        item.totalPatientIds = temp
                    }
                    if (key1 == '<5yrs') {
                    item.lessThanFiveYears = conditionDetails.length
                    item.lessThanFiveYearsPatientIds = conditionDetails
                    }
                if (key1 == '>=5yrs') {
                item.greaterThanEqualFiveYears = conditionDetails.length
                item.greaterThanEqualFiveYearsPatientIds = conditionDetails
                }
            }
          }
          all.push(item)
        }
        return all
    }
    getIdsArrayObj(patientIds: string) {
        patientIds = patientIds + ''
        return patientIds.split(',') as []
    }

    Span(startDate: string, endDate: string) {
        const separator = "  -  "
        return (moment(startDate).format('DD/MMM/YYYY') 
        +separator+ 
        moment(endDate).format('DD/MMM/YYYY'))
    }

    async getOPDVisits(params: any) {
        return OpdReportService.ajxGet(
            this.OPDVistisUrl(), params
        )
    }

    getCSVString(IDSRConditionsObj: any) {
        let CSVString = `Diseases/Events/Conditions, <5 yrs, >=5 yrs, Total,\n`
        for(const condition of IDSRConditionsObj) {
          const row = `${condition.name},${condition.lessThanFiveYears},${condition.greaterThanEqualFiveYears},${condition.total},\n`
          CSVString+=row
        }
        return {CSVString}
    }

    static async getReportEpiWeeks() {
        const epiWeeks: Array<CommonInterface> = []
        const epiWeeksObj = await Service.getJson('get_weeks')
        epiWeeksObj.reverse().forEach( (item: any) => { 
            const dates = item[1].split(" ")
            const startDate = dates[0]
            const endDate = dates[2]
            const txt = item[0].split('W')
            const name = txt[0] +"/W"+ txt[1]
            epiWeeks.push({ name: name, start: startDate, end: endDate })
        })
        return epiWeeks
    }

    static async getReportMonths() {
        const months: Array<CommonInterface> = []
        const epiWeeksObj = await Service.getJson('get_months')
        epiWeeksObj.forEach( (item: any) => {
            const _payload = item[1];
            const monthandyear = _payload[0]
            const startandendmonths = _payload[1];
            const dates = startandendmonths.split("to");
            months.push({ name: monthandyear, start: dates[0], end: dates[1].trim() })
        })
        return months
    }
}
