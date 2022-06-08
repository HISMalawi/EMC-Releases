
import ReportTemplate from "@/apps/ART/views/reports/pepfar/PepfarIndex.vue"
export default [
    {
        name: "cxca test",
        path: "/cxca/encounters/clinical_assessment/:patient_id",
        component: () => import('@/apps/CxCa/views/encounters/CxCaTest.vue')
    },
    {
        name: "cxca treatment",
        path: "/cxca/encounters/cancer_treatment/:patient_id",
        component: () => import('@/apps/CxCa/views/encounters/CxCaTreatment.vue')
    },
    {
        name: "cxca reception",
        path: "/cxca/encounters/cancer_reception/:patient_id",
        component: () => import('@/apps/CxCa/views/encounters/CxCaReception.vue')
    },
    {
        name: "cxca referral feedback",
        path: "/cxca/encounters/cancer_feedback/:patient_id",
        component: () => import('@/apps/CxCa/views/encounters/CxCaOutcome.vue')
    },
    {
        name: "cxca screening result",
        path: "/cxca/encounters/cancer_screening_result/:patient_id",
        component: () => import('@/apps/CxCa/views/encounters/CxCaScreeningResult.vue')
    },
    {
        name: "cxca result",
        path: "/cxca/encounters/cancer_result/:patient_id",
        component: () => import('@/apps/CxCa/views/encounters/CxCaResult.vue')
    },
    {
        path: '/cxca/report/pepfar',
        component: ReportTemplate,
        children: [
            {
                name: 'cc_basic_results',
                path: 'cc_basic_results',
                component: () => import('@/apps/CxCa/views/reports/pepfar/CCBasicResult.vue')
            },
            {
                name: 'cc_all_questions',
                path: 'cc_all_questions',
                component: () => import('@/apps/CxCa/views/reports/pepfar/CCAllQuestions.vue')
            },
            {
                name: 'cc_type_of_screen',
                path: 'cc_type_of_screen',
                component: () => import('@/apps/CxCa/views/reports/pepfar/CCTypeOfScreen.vue')
            }
        ]
    }
]
