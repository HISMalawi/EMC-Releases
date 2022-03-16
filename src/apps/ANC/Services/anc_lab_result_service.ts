import { AppEncounterService } from "@/services/app_encounter_service";
import { Service } from "@/services/service";

export class AncLabResultService extends AppEncounterService {
    hivStatus: string;
    artStatus: string;
    arvNumber: string;
    arvStartDate: string;

    constructor(patientID: number, providerID: number){
        super(patientID, 32, providerID)
        this.hivStatus = ''
        this.artStatus = ''
        this.arvNumber = ''
        this.arvStartDate = ''
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

    async loadHivStatus() {
        const res = await this.requestHivStatus()
        if (res) {
            this.hivStatus = res['hiv_status']
            this.artStatus = res['art_status']
            this.arvNumber = res['arv_number']
            this.arvStartDate = res['arv_start_date']
        }
    }

    requestHivStatus() {
        return Service.getJson(`programs/${this.programID}/patients/${this.patientID}/art_hiv_status`)
    }

}
