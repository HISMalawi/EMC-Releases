export default [
  {
    path: "/emc/home",
    redirect: "/emc/dashboard"
  },
  {
    name: "EMC Dashboard",
    path: "/emc/dashboard",
    component: () => import("@/apps/EMC/views/Dashboard.vue"),
  },
  {
    name: "Search/ Create client",
    path: "/emc/search",
    component: () => import("@/apps/EMC/views/SearchPatient.vue"),
  },
  {
    name: "Users",
    path: "/emc/users",
    component: () => import("@/apps/EMC/views/Users.vue"),
  },
  {
    name: "User Profile",
    path: "/emc/profile",
    component: () => import("@/apps/EMC/views/UserProfile.vue"),
  },
  {
    name: "Patient Regstration",
    path: "/emc/patient/registration",
    component: () => import("@/apps/EMC/views/PatientRegistration.vue"),
  },
  {
    name: "EMC Mastercard",
    path: "/emc/patient/:patientId",
    component: () => import("@/apps/EMC/views/Mastercard.vue"),
  },
  {
    path: "/emc/registration/:id/:new",
    name: "new registration",
    component: () => import("@/apps/EMC/views/HIVReception.vue")
  },
  {
    name: "emc_data_cleaning",
    path: "/emc_data_cleaning",
    component: () => import("@/apps/EMC/views/tools/DataCleaning.vue")
  },
  {
    name: "emc_cleaning_verification",
    path: "/emc_cleaning_verification",
    component: () => import("@/apps/EMC/views/tools/DataVerification.vue")
  },
  {
    name: "emc_patient_visit_stats",
    path: "/emc_patient_visit_stats",
    component: () => import("@/apps/EMC/views/tools/PatientVisitStats.vue")
  },
  {
    name: "emc_patient_merging",
    path: "/emc_patient_merging",
    component: () => import("@/apps/EMC/views/tools/PatientMerging.vue")
  },
  {
    path: '/emc/settings/site_settings',
    component: () => import('@/apps/EMC/views/settings/SiteSettings.vue'),
  },
  /** Clinic Reports */
  {
    name: 'emc_clinic_appointments',
    path: '/emc_clinic_appointments',
    component: () => import('@/apps/EMC/views/reports/clinic/ClinicAppointments.vue'),
  },
  {
    name: 'emc_clinic_defaulters',
    path: '/emc_clinic_defaulters',
    component: () => import('@/apps/EMC/views/reports/clinic/DefaultersList.vue'),
  },
  {
    name: 'emc_clinic_missed_appointments',
    path: '/emc_clinic_missed_appointments',
    component: () => import('@/apps/EMC/views/reports/clinic/MissedAppointments.vue'),
  },
  {
    name: 'emc_clinic_regimen_dispensation',
    path: '/emc_clinic_regimen_dispensation',
    component: () => import('@/apps/EMC/views/reports/clinic/RegimenDispensation.vue'),
  },
  {
    name: 'emc_clinic_regimen_switch',
    path: '/emc_clinic_regimen_switch',
    component: () => import('@/apps/EMC/views/reports/clinic/RegimenSwitch.vue'),
  },
  {
    name: 'emc_clinic_emc_pregnant_patients',
    path: '/emc_clinic_pregnant_patients',
    component: () => import('@/apps/EMC/views/reports/clinic/PregnantPatients.vue'),
  },
  {
    name: 'emc_clinic_incomplete_visits',
    path: '/emc_clinic_incomplete_visits',
    component: () => import('@/apps/EMC/views/reports/clinic/IncompleteVisits.vue'),
  },
  {
    name: 'emc_clinic_clients_due_for_vl',
    path: '/emc_clinic_clients_due_for_vl',
    component: () => import('@/apps/EMC/views/reports/clinic/ClientsDueForVL.vue'),
  },
  {
    name: 'emc_clinic_regimen_formulation',
    path: '/emc_clinic_regimen_formulation',
    component: () => import('@/apps/EMC/views/reports/clinic/RegimenFormulation.vue'),
  },
  {
    name: 'emc_clinic_tpt_outcomes',
    path: '/emc_clinic_tpt_outcomes',
    component: () => import('@/apps/EMC/views/reports/clinic/TptOutcomes.vue')
  },
  {
    name: "emc_clinic_tx_rtt",
    path: "/emc_clinic_tx_rtt",
    component: () => import("@/apps/EMC/views/reports/clinic/TXRTT.vue"),
  },
  /** Pepfar Reports */
  {
    name: 'emc_pepfar_sc_arvdisp',
    path: '/emc_pepfar_sc_arvdisp',
    component: () => import('@/apps/EMC/views/reports/pepfar/SCARVDISP.vue'),
  },
  {
    name: 'emc_pepfar_vl_coverage',
    path: '/emc_pepfar_vl_coverage',
    component: () => import('@/apps/EMC/views/reports/pepfar/VLCoverage.vue'),
  },
  {
    name: 'emc_pepfar_tb_prev',
    path: '/emc_pepfar_tb_prev',
    component: () => import('@/apps/EMC/views/reports/pepfar/TBPrev.vue'),
  },
  {
    name: 'emc_pepfar_defaulters',
    path: '/emc_pepfar_defaulters',
    component: () => import('@/apps/EMC/views/reports/pepfar/DefaultersList.vue'),
  },
  {
    name: "emc_pepfar_tx_rtt",
    path: "/emc_pepfar_tx_rtt",
    component: () => import("@/apps/EMC/views/reports/pepfar/TXRTT.vue"),
  },
  {
    name: "emc_pepfar_tx_ml",
    path: "/emc_pepfar_tx_ml",
    component: () => import("@/apps/EMC/views/reports/pepfar/TXML.vue"),
  },
  {
    name: "emc_pepfar_tx_curr_mmd",
    path: "/emc_pepfar_tx_curr_mmd",
    component: () => import("@/apps/EMC/views/reports/pepfar/TxCurrMMD.vue")
  },
  {
    name: "emc_pepfar_disaggregated",
    path: "/emc_pepfar_disaggregated",
    component: () => import("@/apps/EMC/views/reports/pepfar/PepfarDisaggregated.vue")
  },
  /** Moh Reports */
  {
    name: "emc_moh_tx_curr_mmd",
    path: "/emc_moh_tx_curr_mmd",
    component: () => import("@/apps/EMC/views/reports/moh/TxCurrMMD.vue")
  },
  {
    name: "emc_moh_tpt_initiation",
    path: "/emc_moh_tpt_initiation",
    component: () => import("@/apps/EMC/views/reports/moh/TptInitiation.vue")
  },
  {
    name: "emc_moh_regimen_distribution_weight",
    path: "/emc_moh_regimen_distribution_weight",
    component: () => import("@/apps/EMC/views/reports/moh/RegimenDistribution.vue")
  },
  {
    name: "emc_moh_survival_analysis",
    path: "/emc_moh_survival_analysis",
    component: () => import("@/apps/EMC/views/reports/moh/SurvivalAnalysis.vue")
  },
  {
    name: "emc_moh_viral_load",
    path: "/emc_moh_viral_load",
    component: () => import("@/apps/EMC/views/reports/moh/ViralLoad.vue")
  },
  {
    name: "emc_moh_cohort_disaggregated",
    path: "/emc_moh_cohort_disaggregated",
    component: () => import("@/apps/EMC/views/reports/moh/CohortDisaggregated.vue")
  },
  {
    name: "emc_moh_cohort",
    path: "/emc_moh_cohort",
    component: () => import("@/apps/EMC/views/reports/moh/Cohort.vue")
  },
];
