import { AppEncounterService } from "@/services/app_encounter_service"
import { ConceptService } from '@/services/concept_service';
import { PrintoutService } from "@/services/printout_service";
import { Service } from "@/services/service";
import moment from "dayjs";
import { Patientservice } from "@/services/patient_service";
import table from "@/components/DataViews/tables/ReportDataTable"

export class PatientRadiologyService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 121, providerID) 
  }

  static async getRadiologyList(radiologyType: string, filter = '') {
    return ConceptService.getConceptSet(radiologyType, filter) 
  }

  async getRadiologyObs(patientId: number) {
    const path = 'radiology/radiology_orders?patient_id='+patientId
    const data = await Service.getJson(path)
    return data
  }

  async showPreviousRadiolgy(patient: any): Promise<boolean> {
    if ( (await this.getRadiologyObs(patient.getID())).length > 0) {
      return true
    }
    return false
  }


  async getPreviousRadiologyExaminations(patient: any): Promise<any>{
    const data =  await this.getRadiologyObs(patient.getID())
    if(!(data.length > 0)) { 
      return false;
    }
    const columns = ['Accession#','Body Part', 'Order Type', 'Ordered', 'Result']
    const rows = [] as Array<any>
    for (const order in data) {
      const row = [
        data[order].children[0].accession_number,
        data[order].value_text,
        data[order].children[0].value_text,
        moment(data[order].obs_datetime).format('DD/MMM/YYYY'),
        table.tdBtn('Select', async () => {
          ''
        })
      ]
      rows.push(row)
    }
    return [
      {
        label: '',
        value: '',
        other: { columns, rows},
      },
    ];
  }

  async submitToPacs(savedObsData: any, patient: any) {
    let accessionNumber
    for(const order of savedObsData) {
      accessionNumber = order.children[0].accession_number
    }
    const orders = await Promise.all(savedObsData.map(async (order: any) => ({
      "main_value_text": order.value_text,
      "obs_id": order.obs_id,
      "sub_value_text": order.children[0].value_text
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
      "accession_number": accessionNumber
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

  async obsObj(data: Array<any>) {
    const lastAccessionNumber = await this.getAccesionNumber()
    const observations = [] as Array<any>
    for (const order of data) {
      observations.push(
        {
          'concept_id': order.concept_id, 
          'value_text':  await ConceptService.getConceptName(order.child.concept_id),
          child: {
            'concept_id': order.child.concept_id,
            'accession_number': lastAccessionNumber,
            'value_text': await ConceptService.getConceptName(order.child.value_coded)
          }
        }
      )
    }
    return observations
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