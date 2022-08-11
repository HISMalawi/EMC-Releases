import { Service } from "@/services/service"
import HisDate from "@/utils/Date"

export class RegistrationReportService extends Service {
    constructor() {
        super()
    }

    requestReport() {
        return Service.getJson('dashboard_stats', {
            'program_id': Service.getProgramID(),
            'date': Service.getSessionDate(),
        })


    }
}
