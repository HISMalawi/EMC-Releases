import { AppEncounterService } from "@/services/app_encounter_service"
import { ConceptService } from '@/services/concept_service';
import { PrintoutService } from "@/services/printout_service";
import { Service } from "@/services/service";
import moment from "dayjs";
import { Patientservice } from "@/services/patient_service";

export class PatientRadiologyService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 121, providerID) 
  }

  static async getRadiolyList(radiologyType: string, filter = '') {
    return ConceptService.getConceptSet(radiologyType, filter) 
  }

  async submitToPacs(savedObsData: any, patient: any) {
    const orders = await Promise.all(savedObsData.map(async (order: any) => ({
      "main_value_text": await ConceptService.getConceptName(order.value_coded),
      "obs_id": order.obs_id,
      "sub_value_text": await ConceptService.getConceptName(order.children[0].value_coded)
    })))
    const patientData = {
      "patient_name": patient.getFullName(),
      "patientAge": patient.getAge(),
      "patientDOB": patient.getBirthdate(),
      "patientGender": patient.getGender(),
      "national_id": patient.getNationalID(),
      "person_id": patient.getID(),
      "encounter_id": this.getEncounterID(),
      "date_created": this.getDate(),
      "accession_number": await this.getAccesionNumber()
    }
    const provider = {
      "username": Service.getUserName(),
      "userID": Service.getUserID(),
      "userRoles": Service.getUserRoles(),
    }
    return Service.postJson(`radiology/radiology_orders`, {
      'patient_details': patientData,
      'physician_details': provider,
      'radiology_orders': orders
    }) 
  }

  async getAccesionNumber() {
    return (await Service.getJson(`sequences/next_accession_number`))['accession_number']
  }

  async printOrders(orders: any, patient: Patientservice) {
    const printService = new PrintoutService()
    const patientNationalId = patient.getNationalID()
    const patientName = patient.getFullName()
    const urls: string[] = [];
    for(const order of orders) {
      urls.push(`/radiology/barcode`
        + `?accession_number=${await this.getAccesionNumber()}`
        + `&patient_national_id=${patientNationalId}`
        + `&patient_name=${patientName}`
        + `&radio_order=${await ConceptService.getConceptName(order.child.value_coded)}`
        + `&date_created=${moment(order.obs_datetime)}`
      )
    }

    await printService.batchPrintLbls(urls, true)
  }
}