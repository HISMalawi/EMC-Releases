import { AppInterface } from "../interfaces/AppInterface";
import AncRoutes from "./Config/AncRoutes";
import HomePageStats from "@/apps/ANC/Components/HomeStats.vue"
import { PRIMARY_ACTIVITIES } from "./Config/AncProgramActivites";
import { AppEncounterService } from "@/services/app_encounter_service";
import { selectActivities } from '@/utils/WorkflowTaskHelper';

const ANC: AppInterface = {
    programID: 12,
    applicationName: 'ANC',
    applicationIcon: 'anc.png',
    applicationDescription: 'Antenatal Program',
    appRoutes: AncRoutes,
    primaryPatientActivites: PRIMARY_ACTIVITIES,
    secondaryPatientActivites: [],
    homeOverviewComponent: HomePageStats,
    init: async () => await selectActivities(PRIMARY_ACTIVITIES),
    formatPatientProgramSummary(data) {
        return [
            { label: "Date of last ANC visit", value: data.date_of_lnmp || 'N/A' },
            { label: "Gestation:", value: data.gestation ? `${data.gestation} week(s)` : 'N/A' },
            { label: "ANC Visits", value: data.anc_visits || 'N/A' },
            { label: "Current outcome", value: data.current_outcome || 'N/A'}
        ]
    },
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
