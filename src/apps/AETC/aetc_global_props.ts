import { GlobalPropertyService } from "@/services/global_property_service"

export enum AETC_GLOBAL_PROP {
    MALARIA_FEATURE = 'aetc.malaria_feature',
    LIFE_THREATENING_QUESTIONS = 'aetc.life_threatening_questions',
    COMPLAINTS_BEFORE_DIAGNOSIS = 'aetc.complaints_before_diagnosis',
    COMPLAINTS_UNDER_VITALS = 'aetc.complaints_under_vitals',
    SOCIAL_DETERMINATES_QUESTIONS = 'aetc.social_determinates_questions',
    SOCIAL_HISTORY_QUESTIONS = 'aetc.history_questions',
    TRIAGE_CATEGORY_QUESTIONS = 'aetc.category_questions',
    VITALS_BEFORE_DIAGNOSIS = 'aetc.before_diagnosis',
    CONFIRM_PATIENT_CREATION = 'aetc.confirm_patient_creation',
    MANAGE_ROLES = 'aetc.manage_roles',
    POINT_OF_CARE_SYSTEM = 'aetc.point_of_care_system',
    SHARE_DATABASE_WITH_BART2 = 'aetc.share_database_with_bart2',
    SHOW_LAB_RESULTS = 'aetc.show_lab_results',
    SHOW_TASKS_BUTTON_ON_PATIENT_DASHBOARD = 'aetc.show_tasks_button_on_patient_dashboard',
    SHOW_COLUMN_PRESCRIPTION_INTERFACE = 'aetc.show_column_prescription_interface',
}

function malariaFeatureEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.MALARIA_FEATURE}=true`)
}
function lifeThreateningQuestionEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.LIFE_THREATENING_QUESTIONS}=true`)
}
function complaintsBeforeDiagnosisEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.COMPLAINTS_BEFORE_DIAGNOSIS}=true`)
}
function complaintsUnderVitalsEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.COMPLAINTS_BEFORE_DIAGNOSIS}=true`)
}
function socialDeterminatesQuestionEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.SOCIAL_DETERMINATES_QUESTIONS}=true`)
}
function socialHistoryQuestionEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.SOCIAL_HISTORY_QUESTIONS}=true`)
}
function triageCategoryQuestionEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.TRIAGE_CATEGORY_QUESTIONS}=true`)
}
function vitalsBeforeQuestionEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.VITALS_BEFORE_DIAGNOSIS}=true`)
}
function pointOfCareSystemEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.POINT_OF_CARE_SYSTEM}=true`)
}
function sharesDatabaseWithBartEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.SHARE_DATABASE_WITH_BART2}=true`)
}
function showLabResultsEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.SHOW_LAB_RESULTS}=true`)
}
function showTaskButtonOnPatientDashboardEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.SHOW_TASKS_BUTTON_ON_PATIENT_DASHBOARD}=true`)
}
function showColumnPrescriptionInterfaceEnabled(){
    return GlobalPropertyService.isProp(`${AETC_GLOBAL_PROP.SHOW_COLUMN_PRESCRIPTION_INTERFACE}=true`)
}

export default {
    malariaFeatureEnabled,
    lifeThreateningQuestionEnabled,
    complaintsBeforeDiagnosisEnabled,
    complaintsUnderVitalsEnabled,
    socialDeterminatesQuestionEnabled,
    socialHistoryQuestionEnabled,
    triageCategoryQuestionEnabled,
    vitalsBeforeQuestionEnabled,
    pointOfCareSystemEnabled,
    sharesDatabaseWithBartEnabled,
    showLabResultsEnabled,
    showTaskButtonOnPatientDashboardEnabled,
    showColumnPrescriptionInterfaceEnabled
}