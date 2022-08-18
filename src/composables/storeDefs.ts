import { PatientProgramService } from "@/services/patient_program_service";
import { UserService } from "@/services/user_service";
import { Patientservice } from "@/services/patient_service";
import { AuthService } from "@/services/auth_service";
import { isEmpty } from "lodash";

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
    }
}
export default DEFS