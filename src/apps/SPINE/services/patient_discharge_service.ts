import { AppEncounterService } from "@/services/app_encounter_service"

export class PatientDischargeService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 106, providerID) 
  }
}
