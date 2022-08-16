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
    component: () => import("@/apps/EMC/views/ClinicRegistration.vue")
  },
  {
    path: "/emc/staging/:id",
    name: "HIV staging",
    component: () => import("@/apps/EMC/views/Staging.vue")
  },
  {
    path: '/emc/report/clinic',
    component: () => import('@/apps/EMC/views/reports/BaseReport.vue'),
    children: [
      {
        name: 'clinic_appointments',
        path: 'appointments',
        component: () => import('@/apps/EMC/views/reports/clinic/ClinicAppointments.vue'),
      },
      {
        name: 'clinic_defaulters',
        path: 'defaulters',
        component: () => import('@/apps/EMC/views/reports/clinic/DefaultersList.vue'),
      },
      {
        name: 'missed_appointments',
        path: 'missed_appointments',
        component: () => import('@/apps/EMC/views/reports/clinic/MissedAppointments.vue'),
      },
      {
        name: 'regimen_dispensation',
        path: 'regimen_dispensation',
        component: () => import('@/apps/EMC/views/reports/clinic/RegimenDispensation.vue'),
      },
      {
        name: 'regimen_switch',
        path: 'regimen_switch',
        component: () => import('@/apps/EMC/views/reports/clinic/RegimenSwitch.vue'),
      },
      {
        name: 'pregnant_patients',
        path: 'pregnant_patients',
        component: () => import('@/apps/EMC/views/reports/clinic/PregnantPatients.vue'),
      },
      {
        name: 'incomplete_visits',
        path: 'incomplete_visits',
        component: () => import('@/apps/EMC/views/reports/clinic/IncompleteVisits.vue'),
      },
      {
        name: 'clients_due_for_vl',
        path: 'clients_due_for_vl',
        component: () => import('@/apps/EMC/views/reports/clinic/ClientsDueForVL.vue'),
      },
      {
        name: 'regimen_formulation',
        path: 'regimen_formulation',
        component: () => import('@/apps/EMC/views/reports/clinic/RegimenFormulation.vue'),
      }
    ]
  },
  {
    path: '/emc/report/pepfar',
    component: () => import('@/apps/EMC/views/reports/BaseReport.vue'),
    children: [
      {
        name: 'sc_arvdisp',
        path: 'sc_arvdisp',
        component: () => import('@/apps/EMC/views/reports/pepfar/SCARVDISP.vue'),
      },
      {
        name: 'vl_coverage',
        path: 'vl_coverage',
        component: () => import('@/apps/EMC/views/reports/pepfar/VLCoverage.vue'),
      },
      {
        name: 'tb_prev',
        path: 'tb_prev',
        component: () => import('@/apps/EMC/views/reports/pepfar/TBPrev.vue'),
      },
      {
        name: 'defaulters',
        path: 'defaulters',
        component: () => import('@/apps/EMC/views/reports/pepfar/DefaultersList.vue'),
      },
      {
        name: "tx_rtt",
        path: "tx_rtt",
        component: () => import("@/apps/EMC/views/reports/pepfar/TXRTT.vue"),
      },
      {
        name: "tx_ml",
        path: "tx_ml",
        component: () => import("@/apps/EMC/views/reports/pepfar/TXML.vue"),
      },
      {
        name: "tx_curr_mmd",
        path: "tx_curr_mmd",
        component: () => import("@/apps/EMC/views/reports/pepfar/TxCurrMMD.vue")
      }
    ]
  },
  {
    path: '/emc/report/moh',
    component: () => import('@/apps/EMC/views/reports/BaseReport.vue'),
    children: [
      {
        name: "tx_curr_mmd",
        path: "tx_curr_mmd",
        component: () => import("@/apps/EMC/views/reports/moh/TxCurrMMD.vue")
      },
      {
        name: "tpt_initiation",
        path: "tpt_initiation",
        component: () => import("@/apps/EMC/views/reports/moh/TptInitiation.vue")
      },
      {
        name: "regimen_distribution_weight",
        path: "regimen_distribution_weight",
        component: () => import("@/apps/EMC/views/reports/moh/RegimenDistribution.vue")
      },
      {
        name: "survival_analysis",
        path: "survival_analysis",
        component: () => import("@/apps/EMC/views/reports/moh/SurvivalAnalysis.vue")
      },
      {
        name: "viral_load",
        path: "viral_load",
        component: () => import("@/apps/EMC/views/reports/moh/ViralLoad.vue")
      }
    ]
  },
  {
    path: '/emc/tools',
    component: () => import('@/apps/EMC/views/reports/BaseReport.vue'),
    children: [
      {
        name: "data_cleaning",
        path: "data_cleaning",
        component: () => import("@/apps/EMC/views/tools/DataCleaning.vue")
      },
      {
        name: "cleaning_verification",
        path: "cleaning_verification",
        component: () => import("@/apps/EMC/views/tools/DataVerification.vue")
      },
      {
        name: "patient_visit_stats",
        path: "patient_visit_stats",
        component: () => import("@/apps/EMC/views/tools/PatientVisitStats.vue")
      },
      {
        name: "patient_merging",
        path: "patient_merging",
        component: () => import("@/apps/EMC/views/tools/PatientMerging.vue")
      }
    ]
  }
];
