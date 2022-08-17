import { Patientservice } from "@/services/patient_service";
import { isEmpty } from "lodash";
import { ref } from "vue";
import { PatientProgramService } from "@/services/patient_program_service";
import { UserService } from "@/services/user_service";

const states = ref({} as any)
const storeDefs: any = {
    'ACTIVE_PATIENT': {
        canUseCache: (params: any, state: any) => {
            return typeof params.patientID === 'number' && 
                typeof state?.getID === 'function' && 
                state.getID() === params.patientID
        },
        dataRequest: async (params: any) => {
            const res = await Patientservice.findByID(params.patientID)
            return res ? new Patientservice(res) : {}    
        } 
    },
    'PATIENT_PROGRAM': { 
        canUseCache: (params: any, state: any) => {
            return state?.programID === PatientProgramService.getProgramID() 
                && state.patientID === params.patientID
        },
        dataRequest: async (params: any) => {
            return new PatientProgramService(params.patientID).getProgram()
        }
    },
    'PROVIDERS': {
        dataRequest: () => UserService.getUsers()
    }
}

export default {
    async get(name: string, params={} as any) {
        if (name in storeDefs) {
            const s = states.value[name] || {}
            const p = params || {}
            if (isEmpty(s) || !(typeof storeDefs[name]?.canUseCache === 'function' 
                && storeDefs[name]?.canUseCache(p, s))) {
                states.value[name] = await storeDefs[name]?.dataRequest(p)
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
