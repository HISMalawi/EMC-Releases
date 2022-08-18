import { Patient } from '@/interfaces/patient';
import { ObservationService } from './observation_service';
import { Service } from "@/services/service"
import HisDate from "@/utils/Date"
import { Observation } from "@/interfaces/observation"
import { Patientservice } from '@/services/patient_service';
import { DrugOrderService } from './drug_order_service';
import { isEmpty } from 'lodash';

export class PatientObservationService extends Patientservice {
  constructor(patient: Patient) {
    super(patient)
  }

  async isPregnant() {
    const obs = await ObservationService.getFirstObs(this.getID(), 'Is patient pregnant')
    return obs && (obs.value_coded.match(/Yes/i) ? true : false)
      && ObservationService.obsInValidPeriod(obs)
  }

  async hasPregnancyObsToday() {
    const date = await ObservationService.getFirstObsDatetime(this.getID(), 'Is patient pregnant')
    return date && HisDate.toStandardHisFormat(date) === Service.getSessionDate() && this.isFemale()
  }

  async hasPregnancyAtARTInitiation() {
    const obs = await ObservationService.getLastValueCoded(this.getID(), "Is patient pregnant")
    return obs && await ObservationService.getConceptName(obs)
  }

  async breastFeedingAtARTInitiation() {
    const obs = await ObservationService.getLastValueCoded(this.getID(), "Is patient breast feeding")
    return obs && await ObservationService.getConceptName(obs)
  }

  async getInitialWeight() {
    return ObservationService.getLastValueNumber(this.getID(), "weight")
  }

  async getRecentWeight() {
    return ObservationService.getFirstValueNumber(this.getID(), "weight") || -1
  }

  async getInitialHeight() {
    return ObservationService.getLastValueNumber(this.getID(), "Height")
  }

  async getInitialTBStatus() {
    const obs = await ObservationService.getLastValueCoded(this.getID(), "Initial TB status")
    if (obs) return ObservationService.getConceptName(obs)
  }

  async getRecentHeight() {
    return ObservationService.getFirstValueNumber(this.getID(), "Height") || -1
  }

  async getWeightHistory() {
    try {
      const weights = await ObservationService.getAll(this.getID(), 'weight')
      return weights.map((obs: Observation) => ({
        weight: obs.value_numeric, date: obs.obs_datetime
      }))
    } catch (e) {
      console.warn(e)
      return []
    }
  }
  async getCompleteTBTherapyHistory() {
    const data = await ObservationService.getAll(this.getID(), 'TB treatment history')
    return data.filter((data: any) => {
      return data.value_text.match(/Complete/i);
    });
  }

  async getInitialBMI() {
    return ObservationService.getLastValueNumber(this.getID(), "BMI")
  }

  async everReceivedART() {
    return ObservationService.getFirstValueCoded(this.getID(), "Ever received ART")
  }

  async agreesToFollowUp() {
    return ObservationService.getFirstValueCoded(this.getID(), "Agrees to followup")
  }

  async getReasonForStartingART() {
    return ObservationService.getFirstValueCoded(this.getID(), "Reason for ART eligibility")
  }

  async getHIVTestDate() {
    const obs = await ObservationService.getFirstObs(this.getID(), "Confirmatory HIV test date")
    if (obs && obs.value_datetime) return obs.value_datetime
    if (obs && obs.value_text) return obs.value_text
    return null
  }

  async getARTStartDate() {
    const obs = await ObservationService.getFirstObs(this.getID(), "Date ART started")
    if (obs && obs.value_datetime) return obs.value_datetime
    if (obs && obs.value_text) return obs.value_text
    const orders = await DrugOrderService.getAllDrugOrders(this.getID(), Number.MAX_SAFE_INTEGER);
    if(!isEmpty(orders)){
      return orders[0].order['start_date']
    }
    return null
  }

  async getHIVTestLocation() {
    return ObservationService.getFirstValueText(
      this.getID(),
      "Confirmatory HIV test location"
    )
  }

  async getStagingCondition() {
    return ObservationService.getFirstValueCoded(this.getID(), "Who stages criteria present")
  }
    
}