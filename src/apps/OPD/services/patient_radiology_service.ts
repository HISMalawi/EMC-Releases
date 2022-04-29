import { AppEncounterService } from "@/services/app_encounter_service"
import { ConceptService } from '@/services/concept_service';
import { PrintoutService } from "@/services/printout_service";
import OPD_GLOBAL_PROP from "@/apps/OPD/opd_global_props";
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
    const isPACsEnabled = await OPD_GLOBAL_PROP.isPACsEnabled()
    if (isPACsEnabled) {
      await this.getOrdersObj(savedObsData).then(
        async (data: any)=> {
          const accompData = {
            'encounterId': this.getEncounterID(),
            'dateCreated': this.getDate(),
            'accessionNumber': await this.getAccesionNumber()
          }
          await patient.getPatientDataObj(data, accompData).then(
            async(dat: any) => {
              await Service.delay(20000)        
              await Service.postJson(`radiology/radiology_orders`,dat)
            }
          )
        }

      )
    }
  }

  async getOrdersObj(savedObsData: any){
    const arryObj: any = []
      savedObsData.forEach(async (order: any) => {
        arryObj.push(
          {
            "main_value_text":await ConceptService.getConceptNameFromApi(order.value_coded),
            "obs_id": order.obs_id,
            "sub_value_text":await ConceptService.getConceptNameFromApi(order.children[0].value_coded)
          }
        )
      })
    return arryObj
  }

  async getAccesionNumber() {
    return (await Service.getJson(`sequences/next_accession_number`))['accession_number']
  }

  async printOrders(orders: any, patient: Patientservice, gotoPatientDashboard: Function) {
    const printService = new PrintoutService()
    const patientNationalId = patient.getNationalID()
    const patientName = patient.getFullName()
    const urls: string[] = await Promise.all(orders.map(async (order: any) => {
      return `/radiology/barcode`
        + `?accession_number=${await this.getAccesionNumber()}`
        + `&patient_national_id=${patientNationalId}`
        + `&patient_name=${patientName}`
        + `&radio_order=${await ConceptService.getConceptName(order.child.value_coded)}`
        + `&date_created=${moment(order.obs_datetime)}`
    }))
  
    await printService.batchPrintLbls(urls, true)
    gotoPatientDashboard
  }
}