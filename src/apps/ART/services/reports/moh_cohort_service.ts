import { find } from "lodash";
import { ArtReportService } from "./art_report_service";

export enum CohortVar {
    MOH_CACHE = 'mohCache'
}

export interface CohortValidationInterface {
    param: number | string;
    error: (indicator: number, param: number) => string;
    check: (indicator: number, param: number) => boolean;
}

export class MohCohortReportService extends ArtReportService {
    regenerate: boolean;
    constructor() {
        super()
        this.regenerate = false
    }

    private cohortUrl() {
        return `programs/${this.programID}/reports/cohort`
    }

    setRegenerate(regenerate: boolean) {
        this.regenerate = regenerate
    }

    getCohortDrillDown(resourceId: string) {
        return ArtReportService.getJson('cohort_report_drill_down', {
            id: resourceId,
            date: this.date,
            'program_id': this.programID
        })
    }

    requestCohort(params: any) {
        return ArtReportService.ajxGet(
            this.cohortUrl(), params
        )
    }

    qaurterRequestParams() {
        return { 
            name: this.quarter, 
            regenerate: this.regenerate 
        }
    }

    datePeriodRequestParams() {
        return {
            name: `Cohort-${this.startDate}-${this.endDate}`,
            'start_date': this.startDate,
            'end_date': this.endDate,
            regenerate: this.regenerate
        }
    }

    getCachedCohortValues() {
        const cache = sessionStorage.getItem(CohortVar.MOH_CACHE)
        if (cache) {
            const conf = JSON.parse(cache)
            if (conf.start_date === this.startDate 
                && conf.end_date === this.endDate
                || conf.quarter === this.quarter) {
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
                'quarter': this.quarter,
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
