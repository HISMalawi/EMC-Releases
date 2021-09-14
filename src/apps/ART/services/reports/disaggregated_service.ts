import { ArtReportService } from "./art_report_service";

export const AGE_GROUPS = [
    '0-5 months', '6-11 months',
    '12-23 months', '2-4 years', 
    '5-9 years', '10-14 years', 
    '15-17 years', '18-19 years', 
    '20-24 years', '25-29 years', 
    '30-34 years', '35-39 years', 
    '40-44 years', '45-49 years', 
    '50 plus years'
]

export enum TEMP_OUTCOME_TABLE {
    PEPFAR_OUTCOME_TEMP = 'temp_pepfar_patient_outcomes',
    PATIENT_OUTCOME_TEMP = 'temp_patient_outcomes'
}

export class DisaggregatedReportService extends ArtReportService {
    gender: string;
    ageGroup: string;
    initialize: boolean;
    rebuildOutcome: boolean;
    outComeTable: TEMP_OUTCOME_TABLE;

    constructor() {
        super()
        this.gender = ''
        this.ageGroup = AGE_GROUPS[0]
        this.initialize = true
        this.rebuildOutcome = true
        this.outComeTable = TEMP_OUTCOME_TABLE.PEPFAR_OUTCOME_TEMP
    }

    async init() {
        this.initialize = true
        this.rebuildOutcome = true
        const req = await this.getReport('cohort_disaggregated', this.getRequestParams())
        if (req && req.temp_disaggregated === 'created') {
            this.initialize = false
            this.rebuildOutcome = false
            return true
        }
        return false
    }

    setOutcomeTable(outcome: TEMP_OUTCOME_TABLE) {
        this.outComeTable = outcome
    }

    setAgeGroup(ageGroup: string) {
        this.ageGroup = ageGroup
    }

    setInitialization(isInit: boolean) {
        this.initialize = isInit
    }

    setRebuildOutcome(isRebuild: boolean) {
        this.rebuildOutcome = isRebuild
    }

    setGender(gender: string) {
        this.gender = gender
    }

    getGender() {
        return this.gender
    }

    getRequestParams(params={}) {
        return this.buildRequest({
            'age_group': this.ageGroup,
            'rebuild_outcome': this.rebuildOutcome,
            'initialize': this.initialize,
            ...params
        })
    }

    getCohort() {
        return this.getReport('cohort_disaggregated', this.getRequestParams())
    }

    getTxIpt() {
        return this.getReport('clients_given_ipt', 
        this.getRequestParams({
            'gender': this.gender,
            'outcome_table': this.outComeTable      
        }))
    }

    getTxCurrTB() {
        return this.getReport('screened_for_tb', 
        this.getRequestParams({
            'gender': this.gender,
            'outcome_table': this.outComeTable
        }))
    }

    getRegimenDistribution() {
        return this.getReport('disaggregated_regimen_distribution', 
        this.getRequestParams({
            'gender': this.gender,
            'outcome_table': this.outComeTable
        }))
    }
}
