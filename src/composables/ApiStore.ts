import { Patientservice } from "@/services/patient_service";
import { isEmpty } from "lodash";
import { ref } from "vue";
import { PatientProgramService } from "@/services/patient_program_service";
import { UserService } from "@/services/user_service";
import { AuthService } from "@/services/auth_service";

const states = ref({} as any)

function isCacheEnabled() {
    return new AuthService().getAppConf('dataCaching')
}

const DEFS: any = {
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
        canReloadCache: () => !isCacheEnabled()
    }
}

export default {
    async get(name: string, params={} as any) {
        if (name in DEFS) {
            const s = states.value[name] || {}
            const p = params || {}
            if (typeof DEFS[name]?.canReloadCache === 'function' && 
                DEFS[name]?.canReloadCache(p, s)) {
                states.value[name] = await DEFS[name]?.get(p)
            }
            return states.value[name]
        } else {
            throw `Store ${name} not found`
        }
    },
    set(name: string, data: any) {
        states.value[name] = data
        return states.value[name]
    },
    remove(name: string) {
        try {
            delete states.value[name]
        } catch (e) {
            console.warn(`${e}`)
        }
    },
    isset(name: string) {
        return !isEmpty(states.value[name])
    },
    invalidate(name: string) { 
        states.value[name] = undefined
    },
    invalidateAll() {
        Object.keys(states.value).forEach(k => {
            states.value[k] = undefined
        })
    }
}
