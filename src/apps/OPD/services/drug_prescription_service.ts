import { ConceptName } from "@/interfaces/conceptName";
import { DrugInterface } from "@/interfaces/Drug";
import { AppEncounterService } from "@/services/app_encounter_service"
import { DrugOrderService } from "@/services/drug_order_service";
import { isEmpty } from "lodash";

export const DRUG_FREQUENCIES: Array<{label: string; value: string; frequency: number; [x: string]: any}> = [
  { label : "ONCE A DAY (OD)", value : "OD", frequency : 1 },
  { label : "TWICE A DAY (BD)", value : "BD", frequency : 2 },
  { label : "THREE A DAY (TDS)", value : "TDS", frequency : 3 },
  { label : "FOUR TIMES A DAY (QID)", value : "QID", frequency : 4 },
  { label : "FIVE TIMES A DAY (5X/D)", value : "5X/D", frequency : 5 },
  { label : "SIX TIMES A DAY (Q4HRS)", value : "Q4HRS", frequency : 6 },
  { label : "IN THE MORNING (QAM)", value : "QAM", frequency : 1 },
  { label : "ONCE A DAY AT NOON (QNOON)", value : "QNOON", frequency : 1 },
  { label : "IN THE EVENING (QPM)", value : "QPM", frequency : 1 },
  { label : "ONCE A DAY AT NIGHT (QHS)", value : "QHS", frequency : 1 },
  { label : "EVERY OTHER DAY (QOD)", value : "QOD", frequency : 0.5 },
  { label : "ONCE A WEEK (QWK)", value : "QWK", frequency : 0.14 },
  { label : "ONCE A MONTH", value : "ONCE A MONTH", frequency : 0.03 },
  { label : "TWICE A MONTH", value : "TWICE A MONTH", frequency : 0.071 }
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
    const malariaTestResult = await this.getMalariaTestResult()
    if(malariaTestResult) return true
    const malariaDiagnosis = await this.getMalariaDiagnosis()
    if(malariaDiagnosis) return true
    return false
  }
  async getMalariaTestResult() {
    let malariaTestResult = await AppEncounterService.getFirstValueCoded(this.patientID, 'Malaria Test Result')   
    if(malariaTestResult) return malariaTestResult
    malariaTestResult = await AppEncounterService.getFirstValueText(this.patientID, 'Malaria Test Result')
    if(malariaTestResult) return malariaTestResult
    return null
  }
  async getMalariaDiagnosis() {
    return AppEncounterService.getFirstValueCoded(this.patientID, 'Malaria')
  }
  createDrugOrder(drugOrders: Array<DrugInterface>){
    return DrugOrderService.create({
      'encounter_id': this.encounterID,
      'drug_orders': drugOrders
    })
  }
}