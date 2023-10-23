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
    name: "patient diagnosis",
    path: "/SPINE/encounters/diagnosis/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/Diagnosis.vue')
  },
  {
    name: "discharge patient",
    path: "/SPINE/encounters/outcome-status/:patient_id",
    component: () => import('@/apps/SPINE/views/encounters/DischargePatient.vue')
  },
  {
    name: "social history",
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
    name: "influenza data",
    path: "/SPINE/encounters/influenza/:patient_id",
    component: () => import("@/apps/SPINE/views/encounters/InfluenzaData.vue")
  },
  {
    name: "chronic conditions",
    path: "/SPINE/encounters/chronic-conditions/:patient_id",
    component: () => import("@/apps/SPINE/views/encounters/ChronicConditions.vue")
  }
]

