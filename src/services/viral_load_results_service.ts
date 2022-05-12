import { AppEncounterService } from './app_encounter_service';
import { LAB_ENCOUNTER_TYPE, LAB_ORDER_TYPE_ID } from "../constants";
import { ConceptService } from './concept_service';


export class ViralLoadResultsService extends AppEncounterService {
  patientID: number;
  conceptId: number;

  constructor(patientId: number) {
    super(patientId, 57)
    this.patientID = patientId
    this.conceptId = -1
  }

  async setConcept() {
    this.conceptId = await ConceptService.getConceptID("HIV viral load")
  }

  createOrder(date: string) {
    return ConceptService.postJson(`orders`, {
      'encounter_id': this.encounterID,
      'patient_id': this.patientID,
      'concept_id': this.conceptId,
      'order_type_id': LAB_ORDER_TYPE_ID,
      "start_date": date
    })
  }

  buildResultObs(date: string, value: number, modifier: string) {
    return {
      "concept_id": this.conceptId,
      "value_numeric": value,
      "value_text": modifier,
      "obs_datetime": date
    }
  }
}
