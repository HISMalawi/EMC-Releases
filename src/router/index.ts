import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from '../views/Login/Login.vue'

import Home from '../views/Home.vue';
import Confirmation from '../views/Confirmation.vue';
import HClocation from '../views/HClocation.vue';
import SearchPatient from "@/views/SearchPatient.vue";
import SearchClient from '../views/SearchClient.vue'
import PatientRegistration from '../views/PatientRegistration.vue'
import SearchResults from '../views/SearchResults.vue'
import Example from '../views/Example.vue'
import FindByARVNumber from '../views/FindByARVNumber.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('apiKey')) {
          next('/login');
      }
      next();
    }, 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/search_patient',
    name: 'Search Patient',
    component: SearchPatient
  },
  {
    path: '/select_hc_location',
    name: 'HC Location',
    component: HClocation
  },
  {
    path: '/search_client',
    name: 'Search client',
    component: SearchClient
  },
  {
    path: '/patient/registration',
    name: 'Patient Registration',
    component: PatientRegistration
  },
  {
    path: '/example',
    name: 'Example',
    component: Example
  },
  {
    path: '/patient/search_results',
    name: 'Patient Search results',
    component: SearchResults
  },
  {
    path: '/patients/search/by_arv',
    name: 'find patient by ARV number',
    component: FindByARVNumber
  },
  {
    path: '/patients/confirm/:person_id',
    name: 'Patient confirmation',
    component: Confirmation
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
