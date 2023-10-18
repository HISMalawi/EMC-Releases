export default [
  {
    name: "patient registration",
    path: "/SPINE/encounters/registration/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/Registration.vue')
  },
  {
    name: "admit patient",
    path: "/SPINE/encounters/admit-patient/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/AdmitPatient.vue')
  },
  {
    name: "hiv status",
    path: "/SPINE/encounters/hiv-status/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/HIVStatus.vue')
  },
  {
    name: "outpatient diagnosis",
    path: "/SPINE/encounters/diagnosis/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/Diagnosis.vue')
  },
  {
    name: "outcome status",
    path: "/SPINE/encounters/outcome-status/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/OutcomeStatus.vue')
  },
  {
    name: "SPINE social history",
    path: "/SPINE/encounters/social/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/SocialHistory.vue')
  },
  {
    name: "prescription",
    path: "/SPINE/encounters/prescription/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/Prescription.vue')
  },
  {
    name: "dispensation",
    path: "/SPINE/encounters/dispensing/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/Dispensing.vue')
  },
  {
    name: "radiology examination",
    path: "/SPINE/encounters/radiology/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/radiology.vue')
  }
]

