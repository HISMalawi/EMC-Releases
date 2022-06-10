import { AncReportService } from "./anc_report_service";

export class AncCohortReportService extends AncReportService {
    generate() {
        return AncReportService.getJson(`programs/${this.programID}/reports/cohort`,{
            'name': 'q1', 
            'start_date': this.startDate
        })
    }
}