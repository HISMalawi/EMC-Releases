import { UserService } from "@/services/user_service";
import { search, pieChart, people, speedometer, settings, archive } from "ionicons/icons";
import { MenuItem } from '../interfaces/menu';

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    id: "dashboard",
    url: "/emc/home",
    icon: speedometer,
  },
  {
    title: "Search/ Create client",
    id: "search",
    url: "/emc/search",
    icon: search,
  },
  {
    title: "Reports",
    id: "reports",
    icon: pieChart,
    children: [
      {
        title: "MoH Reports",
        id: "moh_reports",
        img: 'login-logos/Malawi-Coat_of_arms_of_arms.png',
        children: [
          {
            title: 'Cohort',
            id: 'emc_cohort',
            img: 'reports/cohort.png'
          },
          {
            title: 'Cohort Disagreggated',
            id: 'cohort_disaggregated',
            img: 'reports/split.png',
            url: '/emc/report/moh/cohort_disaggregated'
          },
          {
            title: 'Survival analysis',
            id: 'emc_survival_analysis',
            img: 'reports/refill.png',
            url: '/emc/report/moh/survival_analysis'
          },
          {
            title: 'Viral load',
            id: 'viral_load',
            img: 'reports/vl.png',
            url: '/emc/report/moh/viral_load'
          },
          {
            title: 'Regimen distribution by Weight',
            id: 'regimen_distribution_weight',
            img: 'reports/electronics.png',
            url: '/emc/report/moh/regimen_distribution_weight'
          },
          {
            title: 'TX CURR MMD',
            id: 'emc_moh_tx_curr_mmd',
            img: 'reports/px.png',
            url: '/emc/report/moh/tx_curr_mmd'
          },
          {
            title: 'TPT new initiation',
            id: 'tpt_initiation',
            img: 'reports/new_initiation.png',
            url: '/emc/report/moh/tpt_initiation'
          }
        ]
      },
      {
        title: "PEPFAR Reports",
        id: "pepfar_reports",
        img: 'login-logos/PEPFAR.png',
        children: [
          {
            title: 'PEPFAR Disagreggated Report',
            id: 'pepfar_disaggregated',
            img: 'reports/split.png'
          },
          {
            title: 'Defaulter List',
            id: 'pepfar_defaulter_list',
            img: 'reports/defaulter-list.png',
            url: '/emc/report/pepfar/defaulters'
          },
          {
            title: 'TX CURR MMD',
            id: 'tx_curr_mmd',
            img: 'reports/px.png',
            url: '/emc/report/pepfar/tx_curr_mmd'
          },
          {
            title: 'TX ML',
            id: 'tx_ml',
            img: 'reports/tx-ml.png',
            url: '/emc/report/pepfar/tx_ml'
          },
          {
            title: 'TX RTT',
            id: 'tx_rtt',
            img: 'reports/restart.png',
            url: '/emc/report/pepfar/tx_rtt'
          },
          {
            title: 'TB Prev',
            id: 'tb_prev',
            img: 'reports/previous.png',
            url: '/emc/report/pepfar/tb_prev'
          },
          {
            title: 'VL coverage',
            id: 'vl_coverage',
            img: 'reports/viral_load.png',
            url: '/emc/report/pepfar/vl_coverage'
          },
          {
            title: 'SC ARVDISP',
            id: 'sc_arvdisp',
            img: 'reports/previous.png',
            url: '/emc/report/pepfar/sc_arvdisp'
          }
        ]
      },
      {
        title: "Clinic Reports",
        id: "clinic_reports",
        img: 'reports/clinic.png',
        children: [
          {
            title: 'Clinic appointments',
            id: 'clinic_appointments',
            img: 'reports/appointments.png',
            url: '/emc/report/clinic/appointments'
          },
          {
            title: 'Defaulter list',
            id: 'clinic_defaulters',
            img: 'reports/defaulter-list.png',            
            url: '/emc/report/clinic/defaulters'
          },
          {
            title: 'Missed appointments',
            id: 'missed_appointments',
            img: 'reports/appointment-missed.png',
            url: '/emc/report/clinic/missed_appointments'
          },
          {
            title: 'Regimen dispensation',
            id: 'regimen_dispensation',
            img: 'reports/regimen-give.png',
            url: '/emc/report/clinic/regimen_dispensation'
          },
          {
            title: 'Regimen switch',
            id: 'regimen_switch',
            img: 'reports/regimen-switch.png',
            url: '/emc/report/clinic/regimen_switch'
          },
          {
            title: 'Regimens and formulation - patient level',
            id: 'regimen_formulation',
            img: 'reports/medical.png',
            url: '/emc/report/clinic/regimen_formulation'
          },
          {
            title: 'Pregnant Patients',
            id: 'preganant_patients',
            img: 'reports/pregnant.png',
            url: '/emc/report/clinic/pregnant_patients'
          },
          {
            title: 'Incomplete visits',
            id: 'incomplete_visits',
            img: 'reports/refill.png',
            url: '/emc/report/clinic/incomplete_visits'
          },
          {
            title: 'Clients due for VL',
            id: 'clients_due_for_vl',
            img: 'reports/viral_load.png',
            url: '/emc/report/clinic/clients_due_for_vl',
          }
        ]
      }
    ]
  },
  {
    title: "Data Management",
    id: "data_management",
    icon: archive,
    children: [
      {
        title: "Data Cleaning",
        id: "data_cleaning",
        img: 'clean.jpg',
        url: '/emc/tools/data_cleaning',
      },
      {
        title: "Patient Merging",
        id: "patient_merging",
        img: 'merge.png',
        url: '/emc/tools/patient_merging'
      },
      {
        title: "Patient Visit Stats",
        id: "patient_visit_stats",
        img: 'reports/line-chart.png',
        url: '/emc/tools/patient_visit_stats'
      },
      {
        title: "Data Cleaning Verificaton",
        id: "cleaning_verification",
        img: 'Checkmark.svg',
        url: '/emc/tools/cleaning_verification'
      }
    ]
  },
  {
    title: "Users",
    id: "users",
    url: "/emc/users",
    icon: people,
    condition() {
      return UserService.isAdmin();
    },
  },
  {
    title: "Settings",
    id: "settings",
    icon: settings,
    condition: () => UserService.isAdmin(),
    children: [
      {
        title: "Site Settings",
        id: "site_settings",
        img: 'location.png',
        url: '/emc/settings/site_settings'
      },
      {
        title: "Network Settings",
        id: "network_settings",
        img: 'portal.png',
        url: '/settings/network_settings'
      }
    ]
  },
];