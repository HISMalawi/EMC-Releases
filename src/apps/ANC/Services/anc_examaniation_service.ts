import { AppEncounterService } from "@/services/app_encounter_service";


export class AncExaminationService extends AppEncounterService {
    constructor(patientID: number, providerID: number){
        super(patientID, 98, providerID)
    }
}
