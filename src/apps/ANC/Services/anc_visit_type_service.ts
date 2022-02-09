import { AppEncounterService } from "@/services/app_encounter_service";

export class AncVisitTypeService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 107, providerID)
    }

    saveVisitNumber(visitNumber: number) {
        return this.saveValueNumericObs('Type of visit', visitNumber)
    }
}
