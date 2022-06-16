import { AppEncounterService } from "@/services/app_encounter_service";
import { AncCurrentPregnancyService } from "@/apps/ANC/Services/anc_current_pregnancy";

export const FUNDAL_CM_TO_WEEKS: Record<string, number> = {
  '12' : 13,
  '13' : 14,
  '14' : 16,
  '15' : 17,
  '16' : 18,
  '17' : 19,
  '18' : 20,
  '19' : 21,
  '20' : 22,
  '21' : 24,
  '22' : 25,
  '23' : 25, // Not in the actual CM to Weeks chart reference documentation in clinics..
  '24' : 27,
  '25' : 28,
  '26' : 29,
  '27' : 30,
  '28' : 32,
  '29' : 33,
  '30' : 34,
  '31' : 35,
  '32' : 36,
  '33' : 37,
  '34' : 38,
  '35' : 39,
  '36' : 40,
  '37' : 42
}

export class AncExaminationService extends AppEncounterService {
  gestationWeeks: number;
  constructor(patientID: number, providerID: number){
    super(patientID, 98, providerID)
    this.gestationWeeks = 0
  }

  expectedFundalHeightForGestationWeeks() {
    return this.getEquivalentFundalHeight(this.gestationWeeks)
  }

  async loadPregnancyStatus() {
    const res = await AppEncounterService.getJson(`programs/${this.programID}/patients/${this.patientID}`)
    if (res) {
      const p = new AncCurrentPregnancyService(this.patientID, this.providerID)
      this.gestationWeeks = parseInt(p.calculateWeekOfFirstVisit(res['date_of_lnmp']))
    }
  }

  getEquivalentFundalWeeks(fundalHeight: number): number {
    if (fundalHeight < 12) {
      return FUNDAL_CM_TO_WEEKS['12']
    }
    if (fundalHeight > 37) {
      return FUNDAL_CM_TO_WEEKS['37']
    }
    return FUNDAL_CM_TO_WEEKS[fundalHeight]
  }

  getEquivalentFundalHeight(gestationWeeks: number) {
    for (const cm in FUNDAL_CM_TO_WEEKS) {
      const weeks = FUNDAL_CM_TO_WEEKS[cm]
      if (gestationWeeks <= weeks) { 
        return parseInt(cm)
      }
    }
    return gestationWeeks > 42 ? 37 : gestationWeeks < 13 ? 12 : 0
  }
}
