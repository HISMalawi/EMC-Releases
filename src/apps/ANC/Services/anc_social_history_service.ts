import { AppEncounterService } from "@/services/app_encounter_service";
import { PrintoutService } from "@/services/printout_service";

export class AncSocialHistoryService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 84, providerID)
    }

    printSocialHistory() {
        return new PrintoutService().printLbl(`/programs/${this.programID}/patients/${this.patientID}/labels/history`)
    }
}
