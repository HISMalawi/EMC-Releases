import { AppInterface } from "../interfaces/AppInterface";
import appRoutes from "./Config/ArtRoutes"
import homeOverviewComponent from "@/apps/ART/Components/ArtOverviewComponent.vue"
import { REPORTS } from "@/apps/ART/Config/ArtProgramReports"
import {PROPERTIES} from "@/apps/ART/Config/ArtGlobalPropertySettings"
import { PRIMARY_ACTIVITIES, SECONDARY_ACTIVITIES } from "@/apps/ART/Config/ArtProgramActivities"
import { 
    init, 
    confirmationSummary,
    onRegisterPatient,
    formatPatientProgramSummary,
    getPatientDashboardAlerts,
    getPatientDashboardLabOrderCardItems,
} from "@/apps/ART/Config/ArtAppScripts"
import { ART_GLOBAL_PROP } from "./art_global_props";
import ART_PROP from "./art_global_props";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop"

const ART: AppInterface = {
    init,
    isPocApp: true,
    programID: 1,
    applicationName: 'ART',
    applicationIcon: 'aids.png',
    applicationDescription: "HIV Client management app",
    appRoutes,
    primaryPatientActivites: PRIMARY_ACTIVITIES,
    secondaryPatientActivites: SECONDARY_ACTIVITIES,
    globalPropertySettings: PROPERTIES,
    programReports: REPORTS,
    homeOverviewComponent,
    confirmationSummary,
    formatPatientProgramSummary,
    getPatientDashboardAlerts,
    onRegisterPatient,
    getPatientDashboardLabOrderCardItems,
    programPatientIdentifiers: {
        'ARV Number': {
            id: 4,
            name: 'ARV Number',
            isPrimary: true,
            useForSearch: true,
            prefix: async () => `${(await GLOBAL_PROP.sitePrefix())}-ARV-`
        },
        'Filing number': {
            id: 17,
            name: 'Active Filing number',
            isPrimary: false,
            useForSearch: true,
            prefix: async () => {
                try {
                    const [active] = (await ART_PROP.filingNumberPrefix()).split(',')
                    return active
                } catch (e) {
                    console.warn(e)
                    return ''
                }
            },
            globalPropertySetting: `${ART_GLOBAL_PROP.FILING_NUMBERS}=true`,
        },
        'Archived filing number': {
            id: 18,
            name: 'Archived filing number',
            isPrimary: false,
            useForSearch: true,
            prefix: async () => {
                try {
                    const [_, domarnt] = (await ART_PROP.filingNumberPrefix()).split(',')
                    return domarnt
                } catch (e) {
                    console.warn(e)
                    return ''
                }
            },
            globalPropertySetting: `${ART_GLOBAL_PROP.FILING_NUMBERS}=true`,
        }
    },
}
export default ART
