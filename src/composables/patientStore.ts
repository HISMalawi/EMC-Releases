import { Patientservice } from "@/services/patient_service"
import { isEmpty } from "lodash"
import { ref, unref } from "vue"

const patient = ref({} as any)
export async function getPatient(patientID: number) {
    if (isEmpty(patient.value) || (!isEmpty(patient.value) && 
        patientID != patient.value.getID())) {
        const res = await Patientservice.findByID(patientID)
        if (res) patient.value = new Patientservice(res)
    }
    return unref(patient)
}

export async function refreshPatient(patientID: number) {
    const res = await Patientservice.findByID(patientID)
    if (res) patient.value = new Patientservice(res)
    return unref(patient)
}

export async function setPatientService(patientObj: any) {
    patient.value = patientObj
}
