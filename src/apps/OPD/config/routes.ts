import BaseReport from '@/views/reports/BaseReport.vue'

export default [
  {
    name: "patient registration",
    path: "/opd/encounters/registration/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/Registration.vue')
  },
  {
    name: "hiv status",
    path: "/opd/encounters/hiv-status/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/HIVStatus.vue')
  },
  {
    name: "vitals",
    path: "/opd/encounters/vitals/:patient_id",
    component: () => import('@/apps/ART/views/encounters/Vitals.vue')
  },
  {
    name: "outpatient diagnosis",
    path: "/opd/encounters/diagnosis/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/Diagnosis.vue')
  },
  {
    name: "outcome status",
    path: "/opd/encounters/outcome-status/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/OutcomeStatus.vue')
  },
  {
    name: "OPD social history",
    path: "/opd/encounters/social/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/SocialHistory.vue')
  },
  {
    name: "presenting complaints",
    path: "/opd/encounters/complaints/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/Complaints.vue')
  },
  {
    name: "prescription",
    path: "/opd/encounters/prescription/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/Prescription.vue')
  },
  {
    name: "dispensation",
    path: "/opd/encounters/dispensing/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/Dispensing.vue')
  },
  {
    name: "radiology examination",
    path: "/opd/encounters/radiology/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/radiology.vue')
  },
  {
    path: '/opd/reports/clinic',
    component: BaseReport,
    children: [
      {
        name: 'clinic_with_nids',
        path: "clinic_with_nids",
        component: () => import('@/apps/OPD/views/reports/clinic/ClinicWithNIDsReport.vue')
      },
      {
        name: 'clinic_drugs_given',
        path: "clinic_drugs_given",
        component: () => import('@/apps/OPD/views/reports/clinic/DrugsGiven.vue')
      },
      {
        name: 'clinic_drugs',
        path: "clinic_drugs",
        component: () => import('@/apps/OPD/views/reports/clinic/DrugsGivenWithPrescription.vue')
      },
      {
        name: 'clinic_registration',
        path: "cclinic_registration",
        component: () => import('@/apps/OPD/views/reports/clinic/ClinicRegistrationReport.vue')
      },
      {
        name: 'clinic_la',
        path: 'clinic_la',
        component: () => import('@/apps/OPD/views/reports/clinic/LaReport.vue')
      },
      {
        name: 'clinic_cases_seen',
        path: 'clinic_cases_seen',
        component: () => import('@/apps/OPD/views/reports/clinic/ClinicCasesSeen.vue')
      },
      {
        name: 'clinic_mental_health',
        path: 'clinic_mental_health',
        component: () => import('@/apps/OPD/views/reports/clinic/MentalHealth.vue')
      },
      {
        name: 'clinic_diagnosis',
        path: 'clinic_diagnosis',
        component: () => import('@/apps/OPD/views/reports/clinic/Diagnosis.vue')
      },
      {
        name: 'clinic_diagnosis_by_address',
        path: 'clinic_diagnosis_by_address',
        component: () => import('@/apps/OPD/views/reports/clinic/DiagnosisByAddress.vue')
      }
    ]
  },
  {
    path: '/opd/reports/moh',
    component: BaseReport,
    children: [
      {
        name: 'idsr_weekly',
        path: 'idsr_weekly',
        component: () => import('@/apps/OPD/views/reports/moh/IDSR/IDSRWeekly.vue')
      },
      {
        name: 'idsr_monthly',
        path: 'idsr_monthly',
        component: () => import('@/apps/OPD/views/reports/moh/IDSR/IDSRMonthly.vue')
      },
      {
        name: 'hmis_15',
        path: 'hmis_15',
        component: () => import('@/apps/OPD/views/reports/moh/HMIS/HMIS15.vue')
      },
      {
        name: 'hmis_17',
        path: 'hmis_17',
        component: () => import('@/apps/OPD/views/reports/moh/HMIS/HMIS17.vue')
      }
    ]
  },
]

