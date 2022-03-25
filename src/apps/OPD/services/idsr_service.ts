import { find } from "lodash";
import { OpdReportService } from "./opd_report_service";
import moment from "dayjs"

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
        console.log({start})
        console.log({end})        
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
}
