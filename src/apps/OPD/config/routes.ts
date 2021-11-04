export default [
  {
    name: "patient registration",
    path: "/opd/encounters/registration/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/Registration.vue')
  },
  {
    name: "vitals",
    path: "/opd/encounters/vitals/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/Vitals.vue')
  },
  {
    name: "outpatient diagnosis",
    path: "/opd/encounters/diagnosis/:patient_id",
    component: () => import('@/apps/OPD/views/encounters/Diagnosis.vue')
  },
]
