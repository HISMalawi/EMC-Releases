import { AppEncounterService } from "@/services/app_encounter_service";
import { PatientProgramService } from "@/services/patient_program_service"

export class AncCurrentPregnancyService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 81, providerID)
    }

    async enrollPatient() {
        const program = new PatientProgramService(this.patientID)
        /**
         * TODO: Check if patient is already enrolled first
        */
        await program.enrollProgram()
        program.setStateDate(this.date)
        program.setStateId(118) //Currently on treatment state... Please remove this ID hack if you can
        await program.updateState()
    }
}
