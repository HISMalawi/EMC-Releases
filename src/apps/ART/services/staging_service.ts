import { AppEncounterService } from "@/services/app_encounter_service"
import { LocationService } from "@/services/location_service"
import {
    RECOMMENDED_ADULT_STAGING_CONDITIONS,
    CHILD_ART_ELIGIBILITY,
    ADULT_ART_ELIGIBILITY,
    ADULT_WHO_STAGE_CRITERIA,
    CHILD_WHO_STAGE_CRITERIA,
    CONTRADICTING_STAGE_DEFINITIONS_ALERTS,
    RECOMMENDED_CHILD_STAGING_CONDITIONS,
    CD4_AS_START_REASON_CUTOFF_DATE
} from "@/apps/ART/guidelines/staging_guidelines"

/**
 * Enable for filtering staging categories in ConceptName Dictionary
 */
enum StagingCategory {
    ADULT_STAGE_4 = 'stage_4_conditions_adults',
    ADULT_STAGE_3 = 'stage_3_conditions_adults',
    ADULT_STAGE_2 = 'stage_2_conditions_adults',
    ADULT_STAGE_1 = 'stage_1_conditions_adults',
    PEDAID_STAGE_4 = 'stage_4_conditions_pedaids',
    PEDAID_STAGE_3 = 'stage_3_conditions_pedaids',
    PEDAID_STAGE_2 = 'stage_2_conditions_pedaids',
    PEDAID_STAGE_1 = 'stage_1_conditions_pedaids'
}

export class StagingService extends AppEncounterService {
    age: number
    confirmatoryTest: string | null;
    constructor(patientID: number, age: number, providerID: number) {
        super(patientID, 52, providerID) //TODO: Use encounter type reference name
        this.age = age
        this.confirmatoryTest = null
    }

    isAdult() { return this.age >= 15 }

    isPedaid() { return this.age <= 14 }

    setAge(age: number) {
        this.age = age
    }

    getFacilities (filter='') { return LocationService.getFacilities({name: filter}) }
    
    getConfirmatoryTestType() { return this.confirmatoryTest }

    cd4CountIsValid(value: string) {
        try {
            return value.match(/^(=|<|>)([0-9]*)$/m) ? true : false
        }catch(e) {
            return false
        }
    }

    getAlertGuidelines() {
        return CONTRADICTING_STAGE_DEFINITIONS_ALERTS
    }

    getWhoStageGuidelines() {
        return this.isAdult() ? ADULT_WHO_STAGE_CRITERIA : CHILD_WHO_STAGE_CRITERIA
    }

    getProgramEligibilityGuidelines() {
        return this.isAdult() ? ADULT_ART_ELIGIBILITY: CHILD_ART_ELIGIBILITY
    }

    getRecommendedConditionGuidelines() {
        return this.isAdult() ? RECOMMENDED_ADULT_STAGING_CONDITIONS: RECOMMENDED_CHILD_STAGING_CONDITIONS
    }

    getStagingConditions(stage: number) {
        const category = this.getStagingCategoryByNum(stage)
        return AppEncounterService.getConceptsByCategory(category)
    }

    getAllWhoStages() {
        return AppEncounterService.getConceptsByCategory('whole_staging_numbers')
    }

    getAllReasonsForART(registrationDate = this.date) {
        const reasons = AppEncounterService.getConceptsByCategory('reason_for_art')
        if(new Date(registrationDate) < new Date(CD4_AS_START_REASON_CUTOFF_DATE)) return reasons
        return reasons.filter(reason => !reason.name.match(/cd4/i))
    }

    buildWhoStageObs(stage: string) {
        return this.buildValueCoded('Who stage', stage)
    }
    
    buildWhoCriteriaObs(condition: string) {
        return this.buildValueCoded('Who stages criteria present', condition)
    }

    buildReasonForArtObs(reason: string) {
        return this.buildValueCoded('Reason for ART eligibility', reason)
    }

    private getStagingCategoryByNum(stageNumber: number) {
        switch(stageNumber) {
            case 1:
                return this.isAdult() ? StagingCategory.ADULT_STAGE_1 : StagingCategory.PEDAID_STAGE_1
            case 2:
                return this.isAdult() ? StagingCategory.ADULT_STAGE_2 : StagingCategory.PEDAID_STAGE_2
            case 3:
                return this.isAdult() ? StagingCategory.ADULT_STAGE_3 : StagingCategory.PEDAID_STAGE_3
            case 4:
                return this.isAdult() ? StagingCategory.ADULT_STAGE_4 : StagingCategory.PEDAID_STAGE_4
            default: 
                return ''
        }
    }

    async loadHivConfirmatoryTestType() {
        const test = await AppEncounterService.getFirstValueCoded(
            this.patientID, 'Confirmatory hiv test type'
        )
        if (test) this.confirmatoryTest = test
    }
}
