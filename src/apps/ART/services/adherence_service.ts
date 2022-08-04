import { AppEncounterService } from "@/services/app_encounter_service"
import { DrugInterface } from "@/interfaces/Drug"
import HisDate from "@/utils/Date"
import { isEmpty } from "lodash"
import { BPManagementService } from "./htn_service"
import dayjs from "dayjs"

export class AdherenceService extends AppEncounterService {
    lastDrugs: Array<DrugInterface>
    lastReceiptDate: string
    constructor(patientID: number, providerID: number) {
        super(patientID, 68, providerID) //TODO: Use encounter type reference name
        this.lastDrugs = []
        this.lastReceiptDate = ''
    }

    async loadPreviousDrugs() {
        const date = new Date(this.date)
        date.setDate(date.getDate() - 1) // we don't want current date to count
        const d = (date: string | Date) => HisDate.toStandardHisFormat(date)
        const drugs = await AppEncounterService.getJson(
            `patients/${this.patientID}/drugs_received`, { date: d(date) }
        )      
        if (drugs) {
            this.lastReceiptDate = drugs.reduce((receiptDate: string | null,  drug: any) => {
                return !receiptDate || (new Date(d(drug.order.start_date)) > new Date(receiptDate))
                    ?  d(drug.order.start_date)
                    : receiptDate
            }, null)
            const htnDrugs = BPManagementService.htnDrugReferences().map((d: any) => d.drug_id)
            this.lastDrugs = drugs.filter((drug: DrugInterface) => 
               !htnDrugs.includes(drug.drug['drug_id']) && d(drug.order.start_date) === this.lastReceiptDate
            )
        }
    }

    getReceiptDate() { return this.lastReceiptDate }

    getLastDrugs() { return this.lastDrugs }

    receivedDrugsBefore() { return !isEmpty(this.lastDrugs) }

    buildPillCountObs(orderId: number, pillCount: number) {
        return this.buildValueNumber('Number of tablets brought to clinic', pillCount, null, orderId)
    }

    async buildAdherenceObs(orderId: number, drugId: number, adherence: number) {
        const concept = await AppEncounterService.getConceptID('Drug adherence', true)
        return {
            'concept_id': concept,
            'value_numeric': adherence,
            'value_drug': drugId,
            'value_modifier': '%',
            'order_id': orderId,
            'person_id': this.patientID,
            'obs_datetime': AppEncounterService.getSessionDate()
        }
    }

    isAdherenceGood(adherence: number) {
        return adherence >= 95 && adherence <= 105
    }

    calculateAdherence(given: number, pills: number, expected: number) {
        return Math.round(100 * (given - pills) / (given - expected));
    }

    calculateExpected(
        given: number, 
        equivalentDailyDose: number, 
        startDate: string, 
        frequency: 'QOD' | 'QW'
    ) {
        const timeUnit = frequency === 'QW' ? 'week' : 'day'
        const daysGone = this.calcTimeElapsed(startDate, timeUnit);
        return (given - (daysGone * parseFloat(equivalentDailyDose.toString())));
    }

    calcTimeElapsed(date1: string, timeUnit: 'week' | 'day') {
        return dayjs(this.date).diff(date1, timeUnit)
    }

    calculateUnaccountedOrMissed(expected: string, actual: string) {
        const exp = (parseFloat(expected) - parseFloat(actual));
        return (exp < 0 ? ((exp * -1) + ' missed') : (exp + ' unacc'));
    }
}
