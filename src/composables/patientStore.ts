import { Patientservice } from "@/services/patient_service"
import { isEmpty } from "lodash"
import { ref, unref } from "vue"

const patient = ref({} as any)

export async function setPatientStore(patientID: number) {
    const res = await Patientservice.findByID(patientID)
    if (res) patient.value = new Patientservice(res)
    return unref(patient)
}

export async function getStorePatient(patientID: number) {
    if (isEmpty(patient.value) || (!isEmpty(patient.value) && patientID != patient.value.getID())) {
        return setPatientStore(patientID)
    }
    return unref(patient)
}


export async function setPatientStoreService(patientObj: any) {
    patient.value = patientObj
}
