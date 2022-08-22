import { PatientProgramService } from "@/services/patient_program_service";
import { UserService } from "@/services/user_service";
import { Patientservice } from "@/services/patient_service";
import { AuthService } from "@/services/auth_service";
import { isEmpty } from "lodash";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop"
import ART_PROP from "@/apps/ART/art_global_props";

interface StoreDef {
    // Define logic for retrieving data to cache.
    get: (params: any) => any;
    // Define condition for whether to retrieve data from cache or not
    canReloadCache: (params: any, state: any) => boolean;
}

// caching can be an optional feature, use this detect if its enabled
function isCacheEnabled() {
    return new AuthService().getAppConf('dataCaching')
}

/**
 * Defined cachable items here.
*/
const DEFS: Record<string, StoreDef> = {
    'ACTIVE_HOME_TAB': {
        get: () => 1,
        canReloadCache: (_: any, s: any) => typeof s != 'number'
    },
    'ACTIVE_HOME_SUB_TAB_NAME': {
        get: () => '',
        canReloadCache: (_: any, s: any) => typeof s != 'string' || s === ''
    },
    'ACTIVE_PATIENT': {
        get: async (params: any) => {
            const res = await Patientservice.findByID(params.patientID)
            return res ? new Patientservice(res) : {}    
        },
        canReloadCache: (params: any, state: any) => {
            return !isCacheEnabled() || !(!isEmpty(state) && 
                typeof params.patientID === 'number' && 
                typeof state?.getID === 'function' && 
                state.getID() === params.patientID)
        }
    },
    'PATIENT_PROGRAM': {
        get: async (params: any) => new PatientProgramService(params.patientID).getProgram(),
        canReloadCache: (params: any, state: any) => {
            return !isCacheEnabled() || !(!isEmpty(state) && 
                state?.programID === PatientProgramService.getProgramID() && 
                state.patientID === params.patientID)
        }
    },
    'PROVIDERS': {
        get: () => UserService.getUsers(),
        canReloadCache: (_: any, s: any) => !isCacheEnabled() || isEmpty(s)
    },
    'SITE_PREFIX': {
        get: () => GLOBAL_PROP.sitePrefix(),
        canReloadCache: (_: any, s: any) => !isCacheEnabled() || typeof s !== 'string' 
    },
    'IS_MILITARY_SITE': {
        get: () => GLOBAL_PROP.militarySiteEnabled(),
        canReloadCache: (_: any, s: any) => !isCacheEnabled() || typeof s != 'boolean'
    },
    'IS_ART_DRUG_MANAGEMENT_ENABLED': {
        get: () => ART_PROP.drugManagementEnabled(),
        canReloadCache: (_: any, s: any) => !isCacheEnabled() || typeof s != 'boolean'
    },
    'IS_DDE_ENABLED': { 
        get: () => GLOBAL_PROP.ddeEnabled(),
        canReloadCache: (_: any, s: any) => !isCacheEnabled() || typeof s != 'boolean'
    },
    'IS_ART_FAST_TRACK_ENABLED': {
        get: () => ART_PROP.fastTrackEnabled(),
        canReloadCache: (_: any, s: any) => !isCacheEnabled() || typeof s != 'boolean'
    },
    'IS_ART_HTN_ENABLED' : {
        get: () => ART_PROP.htnEnabled(),
        canReloadCache: (_: any, s: any) => !isCacheEnabled() || typeof s != 'boolean'
    },
    'IS_ART_FILING_NUMBER_ENABLED': {
        get: () => ART_PROP.filingNumbersEnabled(),
        canReloadCache: (_: any, s: any) => !isCacheEnabled() || typeof s != 'boolean'
    },
    'ART_FILING_NUMBER_PREFIX': {
        get: () => ART_PROP.filingNumberPrefix(),
        canReloadCache: (_: any, s: any) => !isCacheEnabled()  || typeof s != 'string'
    }
}
export default DEFS
