import { LabOrderService } from "@/apps/ART/services/lab_order_service";
import { AppEncounterService } from "@/services/app_encounter_service"
import { ConceptService } from '@/services/concept_service';
import { OrderService } from "@/services/order_service";

export class PatientDiagnosisService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 8, providerID) 
    }

    static async getDiagnosis() {
        const conceptSetId = ConceptService.getConceptID('Qech outpatient diagnosis list')
        return AppEncounterService.getJson('concept_set', {
            id: conceptSetId
        })
    }
}
