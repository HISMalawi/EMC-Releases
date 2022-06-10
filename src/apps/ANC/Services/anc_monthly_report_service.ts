import { AncReportService } from "./anc_report_service";

export class AncMohMonthlyReportService extends AncReportService {
    generate() {
        return AncReportService.getJson(`programs/${this.programID}/reports/monthly`,{
            'name': 'q1', 
            'start_date': this.startDate
        })
    }
}