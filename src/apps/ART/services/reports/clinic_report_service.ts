import { ArtReportService } from "./art_report_service";

export class ClinicReportService extends ArtReportService {
    constructor() {
        super()
    }
    
    getTtpOutcomes() {
        return this.getReport(`programs/${this.programID}/reports/tpt_outcome`)
    }
}
