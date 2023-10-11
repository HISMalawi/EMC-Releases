import { Service } from "@/services/service";
import HisDate from "@/utils/Date"
import { PrintoutService } from '@/services/printout_service';
import Url from "@/utils/Url";

export interface QuarterInterface {
    name: string;
    start: string;
    end: string;
}

export class AETCReportService extends Service {
    programID: number;
    startDate: string;
    endDate: string;
    date: string;
    epiweek: string;
    ageGroup: string;
    multipleDiagnosis: string;
    reportType: string;
    startAge: string;
    endAge: string;

    constructor() {
        super()
        this.endDate = ''
        this.startDate = ''
        this.epiweek = ''
        this.ageGroup = ''
        this.multipleDiagnosis = ''
        this.reportType = ''
        this.startAge = ''
        this.endAge = ''
        this.date = Service.getSessionDate()
        this.programID = Service.getProgramID()
    }

    getClinicReport(reportName: string) {
        return this.getReport(`programs/${this.programID}/reports/${reportName}`)
    }

    getMOHReport(reportName: string) {
        return this.getReport('moh_aetc', {'report_name': reportName})
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
        if (this.ageGroup) {
            payload['age_group'] = this.ageGroup
        }
        if (this.multipleDiagnosis) {
            payload['diagnosis'] = this.multipleDiagnosis
        }
        if (this.startAge) {
            payload['start_age'] = this.startAge
        }
        if (this.endAge) {
            payload['end_age'] = this.endAge
        }
        if (this.reportType) {
            payload['report_type'] = this.reportType
        }
        return { ...payload, ...config }
    }
}