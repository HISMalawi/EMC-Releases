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
    }
]