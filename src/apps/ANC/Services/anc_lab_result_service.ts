import { AppEncounterService } from "@/services/app_encounter_service";

export class AncLabResultService extends AppEncounterService {
    constructor(patientID: number, providerID: number){
        super(patientID, 32, providerID)
    }
}
