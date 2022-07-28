import { AppEncounterService } from "@/services/app_encounter_service"

export class RadiologyExaminationService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 121, providerID) 
    }

    static getListOfRadiologyTests(id: string | number) {
        return super.getJson('radiology_set', { id })
    }
}
