export default [
    {
        name: 'anc dispensing',
        path: '/anc/ttv/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/TTV.vue")
    },
    {
        name: 'anc visit type',
        path: '/anc/visit/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/VisitType.vue")
    },
    {
        name: 'surgical history',
        path: '/anc/surgical_history/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/SurgicalHistory.vue")
    },
    {
        name: 'medical history',
        path: '/anc/medical_history/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/MedicalHistory.vue")
    }
]
