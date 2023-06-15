import { Patientservice } from "@/services/patient_service";
import { reactive } from "vue";

interface StoreItem {
  patient: Patientservice;
  ttl: number
}
const patientStore = reactive({} as Record<number, StoreItem>);

export default function usePatientStore (ttl = 86400) {
  const finalTTL = ttl * 1000 // time in millisecons

  const getPatient = async (patientId: number) => {
    if(patientId in patientStore && (patientStore[patientId].ttl > (new Date()).getTime())) {
      return patientStore[patientId].patient
    }
    const p = await Patientservice.findByID(patientId)
    patientStore[patientId] = {
      patient: new Patientservice(p),
      ttl: (new Date()).getTime() + finalTTL
    }
    return patientStore[patientId].patient
  }

  return {
    getPatient,
  }
}