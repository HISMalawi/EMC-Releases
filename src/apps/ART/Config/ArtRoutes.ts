import { ART_GLOBAL_PROP } from "../art_global_props"
const Prescription = () => import("@/apps/ART/views/encounters/Prescription.vue")
const Registration = () => import("@/apps/ART/views/encounters/Registration.vue")
const Appointments = () => import("@/apps/ART/views/encounters/Appointment.vue")
const Adherence = () => import("@/apps/ART/views/encounters/Adherence.vue")
const Consultation = () => import("@/apps/ART/views/encounters/Consultation.vue")
const Dispensing = () => import("@/apps/ART/views/encounters/Dispensing.vue")
const Reception = () => import("@/apps/ART/views/encounters/Reception.vue")
const Staging = () => import("@/apps/ART/views/encounters/Staging.vue")
const Vitals = () => import("@/apps/ART/views/encounters/Vitals.vue")
const PatientType = () => import("@/apps/ART/views/encounters/PatientType.vue")
const FastTrack = () => import("@/apps/ART/views/encounters/FastTrack.vue")
const BPManagment = () => import("@/apps/ART/views/encounters/BPManagement.vue")
const LabActivities = () => import("@/apps/ART/views/encounters/LabActivities.vue")
const Mastercard = () => import("@/apps/ART/views/Mastercard.vue")
const PepFarDiaggregatedReport = () => import("@/apps/ART/views/reports/pepfar/disaggregated.vue")
const PepFarDefaultersReport = () => import("@/apps/ART/views/reports/pepfar/defaulters.vue")
const PepFarRegimenReport = () => import("@/apps/ART/views/reports/pepfar/regimen.vue")
const PepFarRegimenSwitchReport = () => import("@/apps/ART/views/reports/pepfar/RegimenSwitch.vue")
const PepFarVlCoverage = () => import("@/apps/ART/views/reports/pepfar/ViralLoadCoverage.vue")
const TBPrevReport = () => import("@/apps/ART/views/reports/pepfar/TBPrev.vue")
const TXCurrMMD = () => import("@/apps/ART/views/reports/pepfar/TxCurrMMD.vue")
const TXCurrMl = () => import("@/apps/ART/views/reports/pepfar/TxCurrMl.vue")
const TXRtt = () => import("@/apps/ART/views/reports/pepfar/TxRtt.vue")
const ClinicMissedAppointmentsReport = () => import("@/apps/ART/views/reports/clinic/ClinicMissedAppointments.vue")
const ClinicDefaultersReport = () => import("@/apps/ART/views/reports/clinic/ClinicDefaulters.vue")
const ClinicRegimenReport = () => import("@/apps/ART/views/reports/clinic/ClinicRegimenReport.vue")
const ClinicRegimenSwitchReport = () => import("@/apps/ART/views/reports/clinic/ClinicRegimenSwitchReport.vue")
const ClinicPregnantPatientsReport = () => import("@/apps/ART/views/reports/clinic/ClinicPregnantPatientsReport.vue")
const ClinicClientsDueForViralLoad = () => import("@/apps/ART/views/reports/clinic/ClinicDueForViralLoad.vue")
const ClinicRetentionReport = () => import("@/apps/ART/views/reports/clinic/ClinicRetentionReport.vue")
const ClinicExternalConsultationReport = () => import("@/apps/ART/views/reports/clinic/ClinicExternalConsultation.vue")
const ClinicViralLoadReport = () => import("@/apps/ART/views/reports/clinic/ClinicViralLoadReport.vue")
const ClinicOtherOutcomeReport = () => import("@/apps/ART/views/reports/clinic/ClinicOtherOutcomeReport.vue")
const ClinicRegimenFormulationReport = () => import("@/apps/ART/views/reports/clinic/ClinicRegimenFormulationReport.vue")
const ClinicLabResultsReport = () => import("@/apps/ART/views/reports/clinic/ClinicLabResultsReport.vue")
const ClinicArchivingCandidates = () => import("@/apps/ART/views/reports/clinic/ClinicArchivingCandidates.vue")
const MohDisaggregatedReport = () => import("@/apps/ART/views/reports/moh/MohDisaggregatedReport.vue")
const MohSurvivalAnalysisReport = () => import("@/apps/ART/views/reports/moh/MohSurvivalAnalysisReport.vue")
const MohTptInitiationsReport = () => import("@/apps/ART/views/reports/moh/MohTptInitiationsReport.vue")
const MohTxCurrMMD = () => import("@/apps/ART/views/reports/moh/MohTxCurrMMD.vue")
const MohRegimenWeightDistribution = () => import("@/apps/ART/views/reports/moh/MohRegimenWeightDistribution.vue")
const MohCohort = () => import("@/apps/ART/views/reports/moh/CohortReport/MohCohort.vue")
const ReportTemplate = () => import("@/apps/ART/views/reports/pepfar/PepfarIndex.vue")
const StockCardReport = () => import("@/apps/ART/views/reports/clinic/ClinicStockCardReport.vue")
const ClinicAppointments = () => import("@/apps/ART/views/reports/clinic/ClinicAppointments.vue")
const DataCleaning = () => import("@/apps/ART/views/reports/inconsistencies/DataCleaning.vue")
const HyperTensionDiagnosis = () => import("@/apps/ART/views/encounters/hypertension_diagnosis.vue")
const BPPrescription = () => import("@/apps/ART/views/encounters/BPDrug_management.vue")
const SocialHistory = () => import("@/apps/ART/views/encounters/SocialHistory.vue")
const BPAdherence = () => import("@/apps/ART/views/encounters/BPAdherence.vue")
const SCARV = () => import("@/apps/ART/views/reports/pepfar/SCARVReport.vue")

export default [
    {
        name: "Data cleaning verification",
        path: "/art/data_cleaning_verification",
        component: () => import("@/apps/ART/views/reports/inconsistencies/DataCleaningVerification.vue")
    },
    {
        name: "Edit ARV Number",
        path: "/art/arv-number/:patient_id",
        component: () => import("@/apps/ART/views/encounters/ARVNumber.vue")
    },
    {
        name: 'preferences',
        path: "/art/preferences",
        component: () => import("@/apps/ART/views/preferences/AllPreferences.vue")
    },
    {
        name: ART_GLOBAL_PROP.CLINIC_HOLIDAYS,
        path: "/art/preferences/clinic_holidays",
        component: () => import("@/apps/ART/views/preferences/DefaultPreferences.vue")
    },
    {
        name: 'bp_thresholds',
        path: "/art/preferences/bp_thresholds",
        component: () => import("@/apps/ART/views/preferences/DefaultPreferences.vue")
    },
    {
        name: 'clinic_days',
        path: "/art/preferences/clinic_days",
        component: () => import("@/apps/ART/views/preferences/DefaultPreferences.vue")
    },
    {
        name: "cervical_cancer",
        path: "/art/preferences/cervical_cancer_screening",
        component: () => import("@/apps/ART/views/preferences/DefaultPreferences.vue")
    },
    {
        name: ART_GLOBAL_PROP.HTN_SCREENING_AGE_THRESHOLD,
        path: "/art/preferences/htn_age",
        component: () => import("@/apps/ART/views/preferences/DefaultPreferences.vue")
    },
    {
        name: ART_GLOBAL_PROP.FILING_NUMBER_LIMIT,
        path: "/art/preferences/fn/limit",
        component: () => import("@/apps/ART/views/preferences/DefaultPreferences.vue")
    },
    {
        name: ART_GLOBAL_PROP.APPOINTMENT_LIMIT,
        path: "/art/preferences/appointment/limit",
        component: () => import("@/apps/ART/views/preferences/DefaultPreferences.vue")
    },
    {
        name: 'art_patient_visit_stats',
        path: '/art/patient_visits',
        component: () => import("@/apps/ART/views/reports/inconsistencies/PatientVisitStats.vue")
    },
    {
        name: "filing management",
        path: '/art/filing_numbers/:patient_id',
        component: () => import("@/apps/ART/views/FilingNumberManagement.vue")
    },
    {
        name: "Enter stock",
        path: "/art/stock/enter",
        component: () => import("@/apps/ART/views/ARTStock/enter_receipts.vue")
    },
    {
        name: "Audit trail",
        path: "/art/stock/trail",
        component: () => import("@/apps/ART/views/ARTStock/AuditTrail.vue")
    },
    {
        name: "Verify stock",
        path: "/art/stock/verify",
        component: () => import("@/apps/ART/views/ARTStock/verification.vue")
    },
    {
        name: "Move stock",
        path: "/art/stock/move",
        component: () => import("@/apps/ART/views/ARTStock/movement.vue")
    },
    {
        name: "Stock report",
        path: "/art/stock/report",
        component: () => import("@/apps/ART/views/ARTStock/StockReport.vue")
    },
    {
        name: "Print drug barcode",
        path: "/drug/print",
        component: () => import("@/views/PrintDrug.vue")
    },
    {
        name: "treatment",
        path: "/art/encounters/prescriptions/:patient_id",
        component: Prescription
    },
    {
        name: 'bp_alert',
        path: '/art/encounters/bp/alert/:patient_id',
        component: () => import ("@/apps/ART/views/encounters/BpAlert.vue")
    },
    {
        name: "art adherence",
        path: "/art/encounters/adherence/:patient_id",
        component: Adherence
    },
    {
        name: "hiv clinic consultation (clinician)",
        path: "/art/encounters/consultation/:patient_id",
        component: Consultation
    },
    {
        name: "hiv clinic consultation",
        path: "/art/encounters/consultation/:patient_id",
        component: Consultation
    },
    {
        name: "hiv clinic registration",
        path: "/art/encounters/registration/:patient_id",
        component: Registration
    },
    {
        name: "hiv reception",
        path: "/art/encounters/reception/:patient_id",
        component: Reception
    },
    {
        name: "hiv staging",
        path: "/art/encounters/staging/:patient_id",
        component: Staging
    },
    {
        name: "appointment",
        path: "/art/encounters/appointment/:patient_id",
        component: Appointments
    },
    {
        name: "dispensing",
        path: "/art/encounters/dispensation/:patient_id",
        component: Dispensing
    },
    {
        name: "vitals",
        path: "/art/encounters/vitals/:patient_id",
        component: Vitals
    },
    {
        name: "htn_vitals",
        path: "/art/encounters/vitals/:patient_id",
        component: Vitals
    },
    {
        name: "patient type",
        path: "/art/encounters/patient_type/:patient_id",
        component: PatientType
    },
    {
        name: "fast track assesment",
        path: "/art/encounters/fast_track/:patient_id",
        component: FastTrack
    },
    {
        name: "bp_management",
        path: "/art/encounters/bp_management/:patient_id",
        component: BPManagment
    },
    {
        name: "Hypertesnion diagnosis",
        path: "/art/encounters/hypertension_diagnosis/:patient_id",
        component: HyperTensionDiagnosis
    },
    {
        name: "BP prescription",
        path: "/art/encounters/bp_prescription/:patient_id",
        component: BPPrescription
    },
    {
        name: "Social history",
        path: "/art/encounters/social_history/:patient_id",
        component: SocialHistory
    },
    {
        name: "BP adherence",
        path: "/art/encounters/bp_adherence/:patient_id",
        component: BPAdherence
    },
    {
        name: "lab activities",
        path: "/art/encounters/lab/:patient_id",
        component: LabActivities
    },
    {
        name: "patient mstercard",
        path: "/art/mastercard/:patient_id",
        component: Mastercard
    },
    {
        name: "Data cleaning",
        path: "/data_cleaning",
        component: DataCleaning
    },
    {
        name: 'moh_disaggregated_report',
        path: '/art/moh_disaggregated_report',
        component: MohDisaggregatedReport
    },
    {
        name: 'moh_regimen_report',
        path: '/art/moh_regimen_report',
        component: () => import('@/apps/ART/views/reports/moh/MohRegimenReport.vue')
    },
    {
        path: '/art/report/moh',
        component: ReportTemplate,
        children: [
            {
                name: 'moh_cohort',
                path: 'moh_cohort',
                component: MohCohort
            }, 
            {
                name: 'moh_survial_analysis',
                path: 'moh_survial_analysis',
                component: MohSurvivalAnalysisReport
            }, 
            {
                name: 'moh_tpt_new_initiations',
                path: 'moh_tpt_new_initiations',
                component: MohTptInitiationsReport
            }, 
            {
                name: 'moh_tx_curr_mmd',
                path: 'moh_tx_curr_mmd',
                component: MohTxCurrMMD
            },
            {
                name: 'moh_regimen_weight_distribution',
                path: 'moh_regimen_weight_distribution',
                component: MohRegimenWeightDistribution
            }
        ]
    },
    {
        path: '/art/report/clinic',
        component: ReportTemplate,
        children: [
            {
                name: 'clinic_archiving_candidates',
                path: 'clinic_archiving_candidates',
                component: ClinicArchivingCandidates
            },
            {
                name: 'clinic_retention_report',
                path: "clinic_retention_report",
                component: ClinicRetentionReport
            },
            {
                name: 'clinic_external_consultation_report',
                path: "clinic_external_consultation_report",
                component: ClinicExternalConsultationReport
            },
            {
                name: 'clinic_due_viral_load_report',
                path: "clinic_due_viral_load_report",
                component: ClinicClientsDueForViralLoad
            },
            {
                name: "clinic_lab_results",
                path: "clinic_lab_results",
                component: ClinicLabResultsReport
            },
            {
                name: 'clinic_missed_appointments',
                path: "clinic_missed_appointments",
                component: ClinicMissedAppointmentsReport
            },
            {
                name: "clinic_defaulters_report",
                path: "clinic_defaulters",
                component: ClinicDefaultersReport
            },
            {
                name: "clinic_regimen_report",
                path: "clinic_regimen_report",
                component: ClinicRegimenReport
            },
            {
                name: "clinic_regimen_switch",
                path: "clinic_regimen_switch",
                component: ClinicRegimenSwitchReport
            },
            {
                name: "clinic_pregnant_patients",
                path: "clinic_pregnant_patients",
                component: ClinicPregnantPatientsReport
            },
            {
                name: "clinic_appointments",
                path: "clinic_appointments",
                component: ClinicAppointments
            },
            {
                name: "stock_card_report",
                path: "stock_card_report",
                component: StockCardReport
            },
            {
                name: "clinic_viral_load",
                path: "clinic_viral_load",
                component: ClinicViralLoadReport
            },
            {
                name: "clinic_other_outcome_list",
                path: "clinic_other_outcome_list",
                component: ClinicOtherOutcomeReport
            },
            {
                name: "clinic_regimen_formulation",
                path: "clinic_regimen_formulation",
                component: ClinicRegimenFormulationReport
            },
        ]
    },
    {
        path: '/art/report/pepfar',
        component: ReportTemplate,
        children: [
            {
                name: 'pepfar_disaggregated_report',
                path: "disaggregated",
                component: PepFarDiaggregatedReport
            },
            {
                name: "pepfar_defaulters_report",
                path: "defaulters",
                component: PepFarDefaultersReport
            },
            {
                name: "pepfar_regimen_report",
                path: "regimens",
                component: PepFarRegimenReport
            },
            {
                name: "pepfar_regimen_switch",
                path: "regimen_switch",
                component: PepFarRegimenSwitchReport
            },
            {
                name: "pepfar_tb_prev_report",
                path: "tb_prev",
                component: TBPrevReport
            },
            {
                name: "pepfar_tx_curr_mmd_report",
                path: "tx_cur_mmd",
                component: TXCurrMMD
            },
            {
                name: "pepfar_tx_ml_report",
                path: "tx_ml",
                component: TXCurrMl
            },
            {
                name: "pepfar_tx_rtt",
                path: "tx_rtt",
                component: TXRtt
            },
            {
                name: 'pepfar_vl_coverage',
                path: 'pepfar_vl_coverage',
                component: PepFarVlCoverage
            },
            {
                name: 'sc_arv',
                path: 'sc_arv',
                component: SCARV
            },
        ]
    }
]
