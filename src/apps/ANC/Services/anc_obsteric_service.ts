import { AppEncounterService } from "@/services/app_encounter_service";

export class AncObstericService extends AppEncounterService {
    constructor(patientID: number, providerID: number){
        super(patientID, 82, providerID)
    }
}
