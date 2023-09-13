import { Service } from "@/services/service";
import HisDate from "@/utils/Date"
import { PrintoutService } from '@/services/printout_service';
import Url from "@/utils/Url";

export interface QuarterInterface {
    name: string;
    start: string;
    end: string;
}

export class OpdReportService extends Service {
    programID: number;
    startDate: string;
    endDate: string;
    date: string;
    epiweek: string;
    constructor() {
        super()
        this.endDate = ''
        this.startDate = ''
        this.epiweek = ''
        this.date = Service.getSessionDate()
        this.programID = Service.getProgramID()
    }
}