import { GlobalPropertyService } from "@/services/global_property_service"

export enum ART_GLOBAL_PROP {
    EXTENDED_LABS = 'extended_labs',
    VL_ROUTINE_CHECK = 'activate.vl.routine.check',
    PILLS_REMAINING = 'ask.pills.remaining.at.home',
    FILING_NUMBERS = 'use.filing.number',
    DRUG_MANAGEMENT = 'activate.drug.management',
    HTN_ENHANCEMENT = 'activate.htn.enhancement',
    FAST_TRACK = 'enable_fast_track',
    THREE_HP_AUTO_SELECT = 'activate_3hp_auto_select',
    APPOINTMENT_LIMIT = 'clinic.appointment.limit',
    HTN_SCREENING_AGE_THRESHOLD = 'htn.screening.age.threshold',
    HTN_SYSTOLIC_THRESHOLD = 'htn.systolic.threshold',
    HTN_DIASTOLIC_THRESHOLD = 'htn.diastolic.threshold',
    PEADS_CLINIC_DAYS = 'peads.clinic.days',
    ADULT_CLINIC_DAYS = 'clinic.days',
    FILING_NUMBER_LIMIT = 'filing.number.limit',
    FILING_NUMBER_PREFIX = 'filing.number.prefix',
    CERVICAL_CANCER_SCREENING = 'activate.cervical.cancer.screening',
    CERVICAL_CANCER_AGE_BOUNDS = 'cervical.cancer.screening.age.bounds',
    CLINIC_HOLIDAYS = 'clinic.holidays'
}

function cervicalCancerScreeningEnabled() {
    return GlobalPropertyService.isProp(`${ART_GLOBAL_PROP.CERVICAL_CANCER_SCREENING}=true`)
}

function VLEnabled() {
    return GlobalPropertyService.isProp(`${ART_GLOBAL_PROP.VL_ROUTINE_CHECK}=true`)
}

function fastTrackEnabled() {
    return GlobalPropertyService.isProp(`${ART_GLOBAL_PROP.FAST_TRACK}=true`)
}

function threeHPAutoSelectEnabled() {
    return GlobalPropertyService.isProp(`${ART_GLOBAL_PROP.THREE_HP_AUTO_SELECT}=true`)
}

function extendedLabEnabled() {
    return GlobalPropertyService.isProp(`${ART_GLOBAL_PROP.EXTENDED_LABS}=true`)
}

function filingNumbersEnabled() {
    return GlobalPropertyService.isProp(`${ART_GLOBAL_PROP.FILING_NUMBERS}=true`)
}

function drugManagementEnabled() {
    return GlobalPropertyService.isProp(`${ART_GLOBAL_PROP.DRUG_MANAGEMENT}=true`)
}

function systolicThreshold() {
    return GlobalPropertyService.get(ART_GLOBAL_PROP.HTN_SYSTOLIC_THRESHOLD)
}

function diastolicThreshold() {
    return GlobalPropertyService.get(ART_GLOBAL_PROP.HTN_DIASTOLIC_THRESHOLD)
}

function htnEnabled() {
    return GlobalPropertyService.isProp(`${ART_GLOBAL_PROP.HTN_ENHANCEMENT}=true`)
}

function askPillsRemaining() {
    return GlobalPropertyService.isProp(`${ART_GLOBAL_PROP.PILLS_REMAINING}=true`)
}

function appointmentLimit() {
    return GlobalPropertyService.get(ART_GLOBAL_PROP.APPOINTMENT_LIMIT)
}

function htnAgeThreshold() {
    return GlobalPropertyService.get(ART_GLOBAL_PROP.HTN_SCREENING_AGE_THRESHOLD)
}

async function cervicalCancerScreeningAgeBounds() {
    const age = await GlobalPropertyService.get(ART_GLOBAL_PROP.CERVICAL_CANCER_AGE_BOUNDS)
    if (age) {
        const [start, end] = age.split(':')
        return {start, end}
    }
    return {start: -1, end: -1}
}

function filingNumberLimit() {
    return GlobalPropertyService.get(ART_GLOBAL_PROP.FILING_NUMBER_LIMIT)
}

function filingNumberPrefix() {
    return GlobalPropertyService.get(ART_GLOBAL_PROP.FILING_NUMBER_PREFIX)
}

function adultClinicDays() {
    return GlobalPropertyService.get(ART_GLOBAL_PROP.ADULT_CLINIC_DAYS)
}

function peadsClinicDays() {
    return GlobalPropertyService.get(ART_GLOBAL_PROP.PEADS_CLINIC_DAYS)
}

function clinicHolidays() {
    return GlobalPropertyService.get(ART_GLOBAL_PROP.CLINIC_HOLIDAYS)
}

function setHtnAgeThreshold(threshold: string) {
    return GlobalPropertyService.set(ART_GLOBAL_PROP.HTN_SCREENING_AGE_THRESHOLD, threshold)
}

function setAppointmentLimit(limit: string) {
    return GlobalPropertyService.set(ART_GLOBAL_PROP.APPOINTMENT_LIMIT, limit)
}

function setAdultClinicDays(days: string) {
    return GlobalPropertyService.set(ART_GLOBAL_PROP.ADULT_CLINIC_DAYS, days)
}

function setPeadsClinicDays(days: string) {
    return GlobalPropertyService.set(ART_GLOBAL_PROP.PEADS_CLINIC_DAYS, days)
}

function setFilingNumberLimit(limit: string) {
    return GlobalPropertyService.set(ART_GLOBAL_PROP.FILING_NUMBER_LIMIT, limit)
}

export default {
    cervicalCancerScreeningAgeBounds,
    systolicThreshold,
    diastolicThreshold,
    htnAgeThreshold,
    setHtnAgeThreshold,
    setFilingNumberLimit,
    setAppointmentLimit,
    filingNumberLimit,
    filingNumberPrefix,
    adultClinicDays,
    peadsClinicDays,
    setAdultClinicDays,
    setPeadsClinicDays,
    filingNumbersEnabled,
    drugManagementEnabled,
    htnEnabled,
    appointmentLimit,
    askPillsRemaining,
    extendedLabEnabled,
    threeHPAutoSelectEnabled,
    VLEnabled,
    fastTrackEnabled,
    cervicalCancerScreeningEnabled,
    clinicHolidays,
}