import { AppEncounterService } from "@/services/app_encounter_service";
import { Service } from "@/services/service";

export class AncLabResultService extends AppEncounterService {
    hivStatus: string;
    artStatus: string;
    arvNumber: string;
    arvStartDate: string;
    isSubsequentVisit: boolean;
    isPregnancyTestDone: boolean;
    constructor(patientID: number, providerID: number){
        super(patientID, 32, providerID)
        this.hivStatus = ''
        this.artStatus = ''
        this.arvNumber = ''
        this.arvStartDate = ''
        this.isPregnancyTestDone = false
        this.isSubsequentVisit = false
    }

    getHivStatus() {
        return this.hivStatus
    }

    getArtStatus() {
        return this.artStatus
    }

    getArvNumber() {
        return this.arvNumber
    } 

    getArvStartDate() {
        return this.arvStartDate
    }

    isHivPositive() {
        return this.hivStatus.match(/positive/i) ? true : false
    }

    async isAtRiskOfPreEclampsia() {
        const sys = await AppEncounterService.getFirstValueNumber(this.patientID, 'Systolic blood pressure')
        const ds = await AppEncounterService.getFirstValueNumber(this.patientID, 'Diastolic blood pressure')
        return sys && ds && sys >= 140 && ds >= 90
    }

    async loadSubsequentVisit() {
        const res: any = await Service.getJson(`programs/${this.programID}/patients/${this.patientID}/subsequent_visit`)
        if (res) {
            this.hivStatus = res['hiv_status'] || this.hivStatus
            this.isSubsequentVisit = res['subsequent_visit']
            this.isPregnancyTestDone = res['pregnancy_test']
        }
    }

    async loadArtStatus() {
        const res = await Service.getJson(`programs/${this.programID}/patients/${this.patientID}/art_hiv_status`)
        if (res) {
            this.hivStatus = res['hiv_status'] || this.hivStatus
            this.artStatus = res['art_status'] || ''
            this.arvNumber = res['arv_number'] || ''
            this.arvStartDate = res['arv_start_date'] || ''
        }
    }
}
