import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import { AllAppRoutes } from '@/apps/his_apps';
import { alertController, loadingController, modalController, popoverController, toastController } from '@ionic/vue';

const routes: Array<RouteRecordRaw> = [
  ...AllAppRoutes(),
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: '/npid/duplicates/:npid',
    name: 'NPID Duplicates',
    component: () => import("@/views/NpidDuplicates.vue")
  },
  {
    name: 'Merge rollback',
    path: '/merge/rollback/:id',
    component: () => import('@/views/MergeRollback.vue')
  },
  {
    name: 'View Duplicates',
    path: '/view_duplicates',
    component : () => import('@/views/DuplicateIdentifiers.vue')
  },
  {
    path: "/example/desktop",
    name: "Desktop Example",
    component: () => import("@/views/DTFormExample.vue"),
  },
  {
    name: "Update site location",
    path: "/location/update/site",
    component: () => import("@/views/SiteLocation.vue"),
  },
  {
    name: "Update site code",
    path: "/location/update/code",
    component: () => import("@/views/SetSiteCode.vue"),
  },
  {
    name: "DT API host settings",
    path: '/settings/network_settings',
    component: () => import('@/views/DTNetworkSettings.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/session/date',
    name: 'Session Date',
    component: () => import('@/views/SessionDate.vue')
  },
  {
    path: '/users/usage',
    name: 'User system usage',
    component: () => import("@/views/SystemUsage.vue")
  },
  {
    path: '/print/location',
    name: 'Print Location',
    component: () => import("@/views/PrintLocation.vue")
  },
  {
    path: '/select_hc_location',
    name: 'HC Location',
    component: () => import('../views/HClocation.vue')
  },
  {
    path: '/patient/dashboard/:id',
    name: 'Patient Dashboard',
    component: () => import('../views/PatientDashboard.vue')
  },
  {
    path: '/patient/registration',
    name: 'Patient Registration',
    component: () => import('../views/PatientRegistration.vue')
  },
  {
    path: '/guardian/registration/:patient_id',
    name: 'Guardian Registration',
    component: () => import('../views/GuardianRegistration.vue')
  },
  {
    path: '/example',
    name: 'Example',
    component: () => import('../views/Example.vue')
  },
  {
    path: '/patients/search/id',
    name: 'ID Search',
    component: () => import('../views/FindByID.vue')
  },
  {
    path: '/patients/confirm',
    name: 'Patient confirmation',
    component: () => import('../views/Confirmation.vue')
  },
  {
    path: '/patients/merge',
    name: 'Patient Merging',
    component: () => import("@/views/PatientMerging.vue")
  },
  {
    path: '/patient/programs/:patient_id',
    name: 'Program(s)',
    component: () => import("@/views/ProgramManagement.vue")
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: () => import('@/views/Configuration.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import("@/views/NewUser.vue")
  },
  {
    path: '/settings/host',
    name: 'API host settings',
    component: () => import('@/views/HostConfig.vue')
  },
  {
    path: '/settings/printer',
    name: 'Printer settings',
    component: () => import('@/views/PrinterSettings.vue')
  },
  {
    path: '/lab/results/:patient_id',
    name: 'Lab Results',
    component: () => import('@/views/LabResults.vue')
  },
  {
    path: '/portal/config',
    name: 'Portal settings',
    component: () => import('@/views/PortalSettings.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  loadingController.getTop().then(v => v ? loadingController.dismiss() : null)
  modalController.getTop().then(v => v ? modalController.dismiss() : null)
  alertController.getTop().then(v => v ? alertController.dismiss() : null)
  toastController.getTop().then(v => v ? toastController.dismiss() : null)
  popoverController.getTop().then(v => v ? popoverController.dismiss() : null)
  const isSession = sessionStorage.getItem('apiKey') || false

  // EMC dashboard redirection hack
  const isPocSite = sessionStorage.getItem('isPocSite') || ''
  if (to.fullPath === '/home' && /true|false/i.test(isPocSite) 
  && isPocSite === 'false' && isSession) {
    document.location = '/emc/dashboard'
    return
  }
  const whitelistedUri = ['/login', '/settings/host', '/settings/network_settings']
  if (!isSession && !whitelistedUri.includes(to.path)) {
    next('/login')
  }
  next()
})
export default router
