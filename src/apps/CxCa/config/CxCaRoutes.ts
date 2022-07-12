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
        name: 'cc_basic_results',
        path: '/cxca/report/pepfar/cc_basic_results',
        component: () => import('@/apps/CxCa/views/reports/pepfar/CCBasicResult.vue')
    },
    {
        name: 'cc_all_questions',
        path: '/cxca/report/pepfar/cc_all_questions',
        component: () => import('@/apps/CxCa/views/reports/pepfar/CCAllQuestions.vue')
    },
    {
        name: 'cc_type_of_screen',
        path: '/cxca/report/pepfar/cc_type_of_screen',
        component: () => import('@/apps/CxCa/views/reports/pepfar/CCTypeOfScreen.vue')
    },
    {
        name: 'cc_screen_result',
        path: '/cxca/report/pepfar/cc_screen_result',
        component: () => import('@/apps/CxCa/views/reports/pepfar/CCScreenResult.vue')
    },
    {
        name: 'cc_type_of_treatment',
        path: '/cxca/report/pepfar/cc_type_of_treatment',
        component: () => import('@/apps/CxCa/views/reports/pepfar/CCTypeOfTreatment.vue')
    },
    {
        name: 'cc_visit_reasons',
        path: '/cxca/report/clinic/cc_visit_reasons',
        component: () => import('@/apps/CxCa/views/reports/clinic/VisitReason.vue')
    },
    {
        name: 'cc_booked_clients',
        path: '/cxca/report/clinic/cc_booked_clients',
        component: () => import('@/apps/CxCa/views/reports/clinic/BookedClients.vue')
    }
]
