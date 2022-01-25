import { AppInterface } from "../interfaces/AppInterface";
import AncRoutes from "./Config/AncRoutes";
import HomePageStats from "@/apps/ANC/Components/HomeStats.vue"
import { PRIMARY_ACTIVITIES } from "./Config/AncProgramActivites";

const ANC: AppInterface = {
    programID: 12,
    applicationName: 'ANC',
    applicationIcon: 'anc.png',
    applicationDescription: 'Antenatal Program',
    appRoutes: AncRoutes,
    primaryPatientActivites: PRIMARY_ACTIVITIES,
    secondaryPatientActivites: [],
    homeOverviewComponent: HomePageStats,
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
