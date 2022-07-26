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
    path: "/emc/reports",
    name: "EMC Reports",
    component: () => import("@/apps/EMC/views/reports/Reports.vue")
  }
];
