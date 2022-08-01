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
        name: 'clinic_defaulters',
        path: 'defaulters',
        component: () => import('@/apps/EMC/views/reports/clinic/DefaultersList.vue'),
      },
      {
        name: 'missed_appointments',
        path: 'missed_appointments',
        component: () => import('@/apps/EMC/views/reports/clinic/MissedAppointments.vue'),
      },
      {
        name: 'regimen_dispensation',
        path: 'regimen_dispensation',
        component: () => import('@/apps/EMC/views/reports/clinic/RegimenDispensation.vue'),
      },
      {
        name: 'regimen_switch',
        path: 'regimen_switch',
        component: () => import('@/apps/EMC/views/reports/clinic/RegimenSwitch.vue'),
      },
      {
        name: 'pregnant_patients',
        path: 'pregnant_patients',
        component: () => import('@/apps/EMC/views/reports/clinic/PregnantPatients.vue'),
      },
      {
        name: 'incomplete_visits',
        path: 'incomplete_visits',
        component: () => import('@/apps/EMC/views/reports/clinic/IncompleteVisits.vue'),
      },
      {
        name: 'clients_due_for_vl',
        path: 'clients_due_for_vl',
        component: () => import('@/apps/EMC/views/reports/clinic/ClientsDueForVL.vue'),
      }
    ]
  },
];
