export default [
    {
        name: 'anc dispensing',
        path: '/anc/ttv/:patient_id',
        component: () => import("@/apps/ANC/Views/TTV.vue")
    }
]