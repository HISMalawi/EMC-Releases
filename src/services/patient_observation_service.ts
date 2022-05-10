import { Patient } from '@/interfaces/patient';
import { ObservationService } from './observation_service';
import { Service } from "@/services/service"
import HisDate from "@/utils/Date"
import { Observation } from "@/interfaces/observation"
import { Patientservice } from '@/services/patient_service';

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
    const obs = await ObservationService.getLastValueCoded(this.getID(), "TB status")
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
}