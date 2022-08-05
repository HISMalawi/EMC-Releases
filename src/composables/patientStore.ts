import HisApp from "@/apps/app_lib"
import { PatientProgramService } from "@/services/patient_program_service"
import { Patientservice } from "@/services/patient_service"
import { isEmpty } from "lodash"
import { ref, unref } from "vue"

const patient = ref({} as any)
const patientProgram = ref({} as any)

export async function setPatientStore(patientID: number) {
    const res = await Patientservice.findByID(patientID)
    patient.value = res ? new Patientservice(res) : {}
    return unref(patient)
}

export async function getStorePatient(patientID: number) {
    if (isEmpty(patient.value) || (!isEmpty(patient.value) && patientID != patient.value.getID())) {
        return setPatientStore(patientID)
    }
    return unref(patient)
}

export async function getPatientProgramStore(patientID: number) {
    const app = HisApp.getActiveApp()
    if (app) {
        try {
            let res = {}
            if (!(patientProgram.value.programID === app.programID && 
                patientProgram.value.patientID === patientID)) {
                res = await new PatientProgramService(patientID).getProgram()
                patientProgram.value = res || {}
            }
        } catch (e) {
            console.warn(e)
        }
    }
    return unref(patientProgram)
}

export function invalidatePatientProgramCache() {
    patientProgram.value = {}
}

export function invalidatePatientCache() {
    patient.value = {}
}

export function setPatientProgramStore(program: any) {
    patientProgram.value = program
}

export async function setPatientStoreService(patientObj: any) {
    patient.value = patientObj
}
