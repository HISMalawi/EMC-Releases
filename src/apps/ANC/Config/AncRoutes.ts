export default [
    {
        name: 'anc_clinic_appointment',
        path: '/anc/clinic_appointments',
        component: () => import('@/apps/ANC/Views/Reports/Clinic/AncAppointments.vue')
    },
    {
        name: 'anc_moh_report',
        path: '/anc/moh_report/:template_id',
        component: () => import('@/apps/ANC/Views/Reports/Moh/AncMohReportIndex.vue')
    },
    {
        name: 'art_followup',
        path: '/anc/pmtct/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/Pmtct.vue")
    },
    {
        name: 'anc data-cleaning tools',
        path: '/anc/datacleaning',
        component: () => import ("@/apps/ANC/Views/DataManagement/AncDataCleaningTools.vue")
    },
    {
        name: 'drugset management',
        path: '/anc/drugset',
        component: () => import("@/apps/ANC/Views/DataManagement/AncDrugsetManager.vue")
    },
    {
        name: 'add anc drugset',
        path: '/anc/drugset/add',
        component: () => import("@/apps/ANC/Views/DataManagement/AncDrugSet.vue")
    },
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
    },
    {
        name: 'anc examination',
        path: '/anc/examination/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/Examination.vue")
    },
    {
        name: 'social history',
        path: '/anc/social_history/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/SocialHistory.vue")
    },
    {
        name: 'lab results',
        path: '/anc/lab_results/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/LabResults.vue")
    },
    {
        name: 'obstetric history',
        path: '/anc/obsteric/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/Obsteric.vue")
    },
    {
        name: 'current pregnancy',
        path: '/anc/current_pregnancy/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/CurrentPregnancy.vue")
    },
    {
        name: 'anc treatment',
        path: '/anc/treatment/:patient_id',
        component: () => import("@/apps/ANC/Views/Encounters/Treatment.vue")
    }
]
