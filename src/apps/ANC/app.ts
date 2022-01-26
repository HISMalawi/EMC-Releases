import { AppInterface } from "../interfaces/AppInterface";
import AncRoutes from "./Config/AncRoutes";
import HomePageStats from "@/apps/ANC/Components/HomeStats.vue"
import { PRIMARY_ACTIVITIES } from "./Config/AncProgramActivites";
import { AppEncounterService } from "@/services/app_encounter_service";

const ANC: AppInterface = {
    programID: 12,
    applicationName: 'ANC',
    applicationIcon: 'anc.png',
    applicationDescription: 'Antenatal Program',
    appRoutes: AncRoutes,
    primaryPatientActivites: PRIMARY_ACTIVITIES,
    secondaryPatientActivites: [],
    homeOverviewComponent: HomePageStats,
    async onRegisterPatient(patientID: number) {
        // Registration Encounter
        const registration = new AppEncounterService(patientID, 5, -1)
        await registration.createEncounter()
        await registration.saveValueCodedObs('Type of patient', 'New patient')
    },
    programPatientIdentifiers: {
        'National ID': {
            id: 28,
            name: 'National ID',
            isPrimary: true,
            useForSearch: true,
            prefix: () => ''
        }
    }
}
export default ANC
