import { PatientProgramService } from "@/services/patient_program_service";
import { UserService } from "@/services/user_service";
import { Patientservice } from "@/services/patient_service";
import { AuthService } from "@/services/auth_service";
import { isEmpty } from "lodash";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop"
import { LocationService } from "@/services/location_service";
import { OrderService } from "@/services/order_service";

export interface CacheReloadParams  {
    params: any;
    state: any;
}

export interface StoreDef {
    // Define logic for retrieving data to cache.
    get: (params: any) => any;
    // Define condition for whether to retrieve data from cache or not
    canReloadCache: (params: CacheReloadParams) => boolean;
}

// caching can be an optional feature, use this detect if its enabled
export function isCacheEnabled() {
    return new AuthService().getAppConf('dataCaching')
}

/**
 * Defined cachable items here.
*/
const DEFS: Record<string, StoreDef> = {
    'CURRENT_LOCATION' : {
        get: async () => LocationService.getLocation((await GLOBAL_PROP.healthCenterID())),
        canReloadCache: data => !isCacheEnabled() || isEmpty(data.state)
    },
    'ACTIVE_HOME_TAB': {
        get: () => 1,
        canReloadCache: data => typeof data.state != 'number'
    },
    'ACTIVE_HOME_SUB_TAB_NAME': {
        get: () => '',
        canReloadCache: data => typeof data.state != 'string' || data.state === ''
    },
    'ACTIVE_PATIENT': {
        get: async (params: any) => {
            const res = await Patientservice.findByID(params.patientID)
            return res ? new Patientservice(res) : {}    
        },
        canReloadCache: ({state, params}) => {
            return !isCacheEnabled() || !(!isEmpty(state) && 
                typeof params.patientID === 'number' && 
                typeof state?.getID === 'function' && 
                state.getID() === params.patientID)
        }
    },
    'PATIENT_PROGRAM': {
        get: async (params: any) => new PatientProgramService(params.patientID).getProgram(),
        canReloadCache: ({state, params}) => {
            return !isCacheEnabled() || !(!isEmpty(state) && 
                state?.programID === PatientProgramService.getProgramID() && 
                state.patientID === params.patientID)
        }
    },
    'PROVIDERS': {
        get: () => UserService.getUsers(),
        canReloadCache: data => !isCacheEnabled() || isEmpty(data.state)
    },
    'SITE_PREFIX': {
        get: () => GLOBAL_PROP.sitePrefix(),
        canReloadCache: data => !isCacheEnabled() || typeof data.state !== 'string' 
    },
    'IS_MILITARY_SITE': {
        get: () => GLOBAL_PROP.militarySiteEnabled(),
        canReloadCache: data => !isCacheEnabled() || typeof data.state != 'boolean'
    },
    'IS_DDE_ENABLED': { 
        get: () => GLOBAL_PROP.ddeEnabled(),
        canReloadCache: data => !isCacheEnabled() || typeof data.state != 'boolean'
    },
    'PATIENT_LAB_ORDERS': {
        get: (params: any) => {
            if (typeof params.patientID === 'number') {
                return OrderService.getOrders(params.patientID)
            }
            return []
        },
        canReloadCache: ({params, state}) => {
            return !isCacheEnabled() || !(params.patientID && Array.isArray(state) && state.length
                && state[0].patient_id === params.patientID)
        }
    }
}
export default DEFS
