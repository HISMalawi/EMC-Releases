import { AppInterface } from "../interfaces/AppInterface";
import { GlobalPropertyService } from "@/services/global_property_service"
import EmcRoutes from "./Config/EmcRoutes";

const EMC: AppInterface = {
    programID: 1,
    isPocApp: false,
    appLandingPage: '/emc/home',
    applicationName: 'EMC',
    applicationIcon: 'aids.png',
    applicationDescription: "HIV Electronic Master card App",
    appRoutes: EmcRoutes,
    homeOverviewComponent: {},
    primaryPatientActivites: [],
    secondaryPatientActivites: [],
    globalPropertySettings: [],
    programReports: [],
    programPatientIdentifiers: {
        'ARV Number': {
            id: 4,
            name: 'ARV Number',
            isPrimary: true,
            useForSearch: true,
            prefix: async () => {
                const prefix = await GlobalPropertyService.getSitePrefix()
                return `${prefix}-ARV-`
            }
        }
    }
}
export default EMC
