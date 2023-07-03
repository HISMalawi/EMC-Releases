import Url from "@/utils/Url";
import { ArtReportService } from "./art_report_service";

export class TBReportService extends ArtReportService {
    constructor() {
        super()
    }
    
    getTxTbReport() {
        return this.getReport(`programs/1/reports/tx_tb`)
    }

    getMaternalStatus(patientIds: number[]) {
        const params = Url.parameterizeObjToString({
            'start_date': this.startDate,
            'end_date': this.endDate,
            'date': this.date,
            'program_id': this.programID,
            'report_definition': 'pepfar'
        })
        return ArtReportService.postJson(`vl_maternal_status?${params}`, {
            'patient_ids': patientIds
        })
    }
}
