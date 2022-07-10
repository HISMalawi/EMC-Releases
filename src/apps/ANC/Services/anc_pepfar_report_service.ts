import { AncReportService } from "./anc_report_service";

export class AncPepfarReportService extends AncReportService {
    generateDisaggregated(date: string) {
        return AncReportService.getJson('anc_cohort_disaggregated', {
            'date': this.date,
            'start_date': date,
            'rebuild_outcome': false,
            'program_id': AncReportService.getProgramID()
        })
    }
}
