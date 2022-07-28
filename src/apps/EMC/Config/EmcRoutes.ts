export default [
  {
    path: "/emc/home",
    redirect: "/emc/dashboard"
  },
  {
    name: "EMC Dashboard",
    path: "/emc/dashboard",
    component: () => import("@/apps/EMC/views/Dashboard.vue"),
  },
  {
    name: "Search/ Create client",
    path: "/emc/search",
    component: () => import("@/apps/EMC/views/SearchPatient.vue"),
  },
  {
    name: "Patient Regstration",
    path: "/emc/patient/registration",
    component: () => import("@/apps/EMC/views/PatientRegistration.vue"),
  },
  {
    name: "EMC Mastercard",
    path: "/emc/patient/:patientId",
    component: () => import("@/apps/EMC/views/Mastercard.vue"),
  },
  {
    path: "/emc/registration/:id/:new",
    name: "new registration",
    component: () => import("@/apps/EMC/views/ClinicRegistration.vue")
  },
  {
    path: "/emc/staging/:id",
    name: "HIV staging",
    component: () => import("@/apps/EMC/views/Staging.vue")
  },
  {
    path: '/emc/report/clinic',
    component: () => import('@/apps/EMC/views/reports/BaseReport.vue'),
    children: [
      {
        name: 'clinic_appointments',
        path: 'appointments',
        component: () => import('@/apps/EMC/views/reports/clinic/ClinicAppointments.vue'),
      },
      {
        name: 'clinic_archiving_candidates',
        path: 'clinic_archiving_candidates',
        component: () => import('@/apps/EMC/views/reports/clinic/ArchivedCandidates.vue'),
      },
    ]
  },
];
