import { find } from "lodash";
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

export class IDSRReportService extends OpdReportService {
    regenerate: boolean;
    constructor() {
        super()
        this.regenerate = false
    }

    private IDSRWeeklyUrl() {
        return `generate_weekly_idsr_report`
    }

    setRegenerate(regenerate: boolean) {
        this.regenerate = regenerate
    }

    getCohortDrillDown(resourceId: string) {
        return OpdReportService.getJson('cohort_report_drill_down', {
            id: resourceId,
            date: this.date,
            'program_id': this.programID
        })
    }

    requestIDSR(params: any) {
        return OpdReportService.ajxGet(
            this.IDSRWeeklyUrl(), params
        )
    }

    qaurterRequestParams() {
        const txt = this.epiweek.split(" ")
        let start = txt[2].split("(")[1]
        let end = txt[4].split(")")[0]
        start = moment(start).toISOString().slice(0,10)
        end = moment(end).toISOString().slice(0,10)        
        return { 
            'start_date': start,
            'end_date': end,
            request: 'true'
        }
    }

    datePeriodRequestParams() {
        return {
            name: `Cohort-${this.startDate}-${this.endDate}`,
            "start_date": this.startDate,
            "end_date": this.endDate,
        }
    }

    getCachedCohortValues() {
        const cache = sessionStorage.getItem(CohortVar.MOH_CACHE)
        if (cache) {
            const conf = JSON.parse(cache)
            if (conf.start_date === this.startDate 
                && conf.end_date === this.endDate
                || conf.epiweek === this.epiweek) {
                return conf.data
            }
        }
    }

    cacheCohort(values: any) {
        sessionStorage.setItem(
            CohortVar.MOH_CACHE, 
            JSON.stringify({
                'start_date': this.startDate,
                'end_date': this.endDate,
                'epiweek': this.epiweek,
                'data': values
        }))
    }

    validateIndicators(validations: Record<string, CohortValidationInterface>, callback: Function) {
        const cachedValues = this.getCachedCohortValues()
        if (cachedValues) {
            const errors = Object.keys(validations)
                .reduce((errors: Array<any>, key: string) => {
                    const indicator: any = find(cachedValues, { name: key })
                    const validation: any = validations[key]
                    const indicatorValue: any = indicator ? indicator.contents : null
                    const param = validation.param as number
                    const condition = validation.check(parseInt(indicatorValue), param)
                    if (condition) errors.push(
                        validation.error(indicatorValue, param)
                    )
                    return errors
                }, [])
            return callback(errors)
        }
        return -1
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
                total +=conditionDetails.length;
                item.total = total
                if(conditionDetails.length) {
                    temp.push(...(this.getIdsArrayObj(conditionDetails)))
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
          all.push(item)
        }
        return all
    }
    getIdsArrayObj(patientIds: string) {
        patientIds = patientIds + ''
        return patientIds.split(',') as []
    }

}
