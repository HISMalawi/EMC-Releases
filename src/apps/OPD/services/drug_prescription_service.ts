import { ConceptName } from "@/interfaces/conceptName";
import { DrugInterface } from "@/interfaces/Drug";
import { AppEncounterService } from "@/services/app_encounter_service"
import { DrugOrderService } from "@/services/drug_order_service";
import { OrderService } from "@/services/order_service";
import { isEmpty } from "lodash";

export const DRUG_FREQUENCIES: Array<{label: string; code: string; value: number; [x: string]: any}> = [
  { label : "ONCE A DAY (OD)", code : "OD", value : 1 },
  { label : "TWICE A DAY (BD)", code : "BD", value : 2 },
  { label : "THREE TIMES A DAY (TDS)", code : "TDS", value : 3 },
  { label : "FOUR TIMES A DAY (QID)", code : "QID", value : 4 },
  { label : "FIVE TIMES A DAY (5X/D)", code : "5X/D", value : 5 },
  { label : "SIX TIMES A DAY (Q4HRS)", code : "Q4HRS", value : 6 },
  { label : "IN THE MORNING (QAM)", code : "QAM", value : 1 },
  { label : "ONCE A DAY AT NOON (QNOON)", code : "QNOON", value : 1 },
  { label : "IN THE EVENING (QPM)", code : "QPM", value : 1 },
  { label : "ONCE A DAY AT NIGHT (QHS)", code : "QHS", value : 1 },
  { label : "EVERY OTHER DAY (QOD)", code : "QOD", value : 0.5 },
  { label : "ONCE A WEEK (QWK)", code : "QWK", value : 0.14 },
  { label : "ONCE A MONTH", code : "ONCE A MONTH", value : 0.03 },
  { label : "TWICE A MONTH", code : "TWICE A MONTH", value : 0.071 }
]

export const ANTI_MALARIA_DRUGS = [
  {
    'drug_id': 236,
    'duration': 3,
    'tabs': 6,
    'name': "Lumefantrine + Arthemether 1 x 6",
    'dose_strength': 1.0,
    'units': "tabs",
    'frequency': 2
  },
  {
    'drug_id': 237,
    'duration': 3,
    'tabs': 12,
    'name': "Lumefantrine + Arthemether 2 x 6",
    'dose_strength': 2.0,
    'units': "tabs",
    'frequency': 2
  },
  {
    'drug_id': 238,
    'duration': 3,
    'tabs': 18,
    'name': "Lumefantrine + Arthemether 3 x 6",
    'dose_strength': 3.0,
    'units': "tabs",
    'frequency': 2
  },
  {
    'drug_id': 239,
    'duration': 3,
    'tabs': 24,
    'name': "Lumefantrine + Arthemether 4 x 6",
    'dose_strength': 4.0,
    'units': "tabs",
    'frequency': 2
  }
];

export class DrugPrescriptionService extends AppEncounterService {
  drugs: ConceptName[] = [];
  constructor(patientID: number, providerID: number) {
    super(patientID, 25, providerID) 
  }
  async loadDrugs(filter = '') {
    this.drugs = await DrugPrescriptionService.getJson('drugs', {
      'page_size': 1000000,
      name: filter
    })
  }
  getDrugOptions() {
    if(isEmpty(this.drugs)) return []
    return this.drugs.map(drug => ({
      label: drug.name, value: drug.name, other: drug
    }))
  }
  async hasMalaria() {
    const malariaTestResult = await OrderService.getLatestMalariaTestResult(this.patientID)
    if(malariaTestResult === "No") {
      const primaryDiagnosis = await AppEncounterService.getAllValueCoded(this.patientID, 'Primary diagnosis')
      if(primaryDiagnosis.includes('Malaria')) return true
      const secondaryDiagnosis = await AppEncounterService.getAllValueCoded(this.patientID, 'Secondary diagnosis')
      if(secondaryDiagnosis.includes('Malaria')) return true
      return false
    }
    return malariaTestResult === "Positive"
  }

  createDrugOrder(drugOrders: Array<DrugInterface>){
    return DrugOrderService.create({
      'encounter_id': this.encounterID,
      'drug_orders': drugOrders
    })
  }
}