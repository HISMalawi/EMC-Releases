import { AppEncounterService } from "@/services/app_encounter_service"
import { ConceptService } from '@/services/concept_service';
import { PrintoutService } from "@/services/printout_service";
import OPD_GLOBAL_PROP from "@/apps/OPD/opd_global_props";
import ApiClient from "@/services/api_client";
import { Service } from "@/services/service";
import moment from "dayjs";

export class PatientRadiologyService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 121, providerID) 
  }

  static async getRadiolyList(radiologyType: string, filter = '') {
    return ConceptService.getConceptSet(radiologyType, filter) 
  }

  async print(order: any, showLbl: boolean, accompanyingData: any) {
    const p = new PrintoutService()
    let url = `/radiology/barcode`
        url += `?accession_number=${accompanyingData.accesionNumber}`
        url += `&patient_national_id=${accompanyingData.NationalID}`
        url += `&patient_name=${accompanyingData.fullName}`
        url += `&radio_order=${await ConceptService.getConceptNameFromApi(order.child.value_coded)}`
        url += `&date_created=${moment(order.obs_datetime)}`
    await p.printLbls(url,showLbl)
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
              const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
              await delay(20000)        
              await ApiClient.post(`radiology/radiology_orders`,dat)
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
            "main_value_text": await this.getConceptName(order.value_coded),
            "obs_id": order.obs_id,
            "sub_value_text": await this.getConceptName(order.children[0].value_coded)
          }
        )
      })
    return arryObj
  }

  async getConceptName(conceptId: any) {
    const name = await ConceptService.getConceptNameFromApi(conceptId)
    return name
  }

  async getAccesionNumber() {
    return (await Service.getJson(`sequences/next_accession_number`))['accession_number']
  }

  async printOrders(orders: any, patient: any, gotoPatientDashboard: Function) {
    let count = 0
    let showLbl = true
    const accompanyingData = {
      'accesionNumber': await this.getAccesionNumber(),
      'NationalID': patient.getNationalID(),
      'fullName': patient.getFullName(),
    }
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
    const callPrint = async (order: any) => {
      count++
      await delay(3000 * count)
      this.print(order,showLbl,accompanyingData)
    }
    let ordersCount = 0
    await orders.forEach(async (order: any) => {
      if (ordersCount == 0) {
        this.print(order,showLbl,accompanyingData)
      } else {
        callPrint(order)
        showLbl = false
      }
      ordersCount++
    })
    gotoPatientDashboard
  }
}