import { AETC_GLOBAL_PROP } from "../aetc_global_props"

export default [
    {
        name: "patient registration",
        path: "/opd/encounters/registration/:patient_id",
        component: () => import('@/apps/AETC/views/encounters/Registration.vue')
    },
    {
        name: AETC_GLOBAL_PROP.SET_TOP_10_DIAGNOSIS,
        path: "/aetc/preferences/top_ten_diagnosis",
        component: () => import("@/apps/AETC/views/preferences/DefaultPreferences.vue")
    },
    {
        name: AETC_GLOBAL_PROP.SET_TOP_10_DRUGS,
        path: "/aetc/preferences/top_ten_drugs",
        component: () => import("@/apps/AETC/views/preferences/DefaultPreferences.vue")
    },
    {
        name: 'aetc_diagnosis',
        path: '/aetc/reports/clinic/diagnosis',
        component: () => import('@/apps/AETC/views/reports/clinic/Diagnosis.vue')
    },
    {
        name: 'aetc_diagnosis_specific',
        path: '/aetc/reports/clinic/diagnosisSpecific',
        component: () => import('@/apps/AETC/views/reports/clinic/DiagnosisSpecific.vue')
    },
    {
        name: 'aetc_disaggregated_diagnosis',
        path: '/aetc/reports/clinic/disaggregatedDiagnosis',
        component: () => import('@/apps/AETC/views/reports/clinic/DisaggregatedDiagnosis.vue')
    },
    {
        name: 'aetc_opd_general_report',
        path: '/aetc/reports/clinic/opdGeneral',
        component: () => import('@/apps/AETC/views/reports/clinic/OPDGeneral.vue')
    }
]
