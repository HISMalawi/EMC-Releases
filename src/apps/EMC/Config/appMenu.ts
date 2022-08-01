import { search, pieChart, people, speedometer, checkmarkDone } from "ionicons/icons";
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
            id: 'emc_moh_disaggregated',
            img: 'reports/split.png'
          },
          {
            title: 'Survival analysis',
            id: 'emc_survival_analysis',
            img: 'reports/refill.png'
          },
          {
            title: 'Viral load',
            id: 'emc_viral_load',
            img: 'reports/vl.png'
          },
          {
            title: 'Regimen distribution, Weight',
            id: 'emc_regimen_distribution_weight',
            img: 'reports/electronics.png'
          },
          {
            title: 'TX CURR MMD',
            id: 'emc_moh_tx_curr_mmd',
            img: 'reports/px.png'
          },
          {
            title: 'TPT new initiation',
            id: 'emc_moh_tpt',
            img: 'reports/new_initiation.png'
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
            img: 'reports/defaulter-list.png'
          },
          {
            title: 'TX CURR MMD',
            id: 'tx_curr_mmd',
            img: 'reports/px.png'
          },
          {
            title: 'TX ML',
            id: 'tx_ml',
            img: 'reports/tx-ml.png'
          },
          {
            title: 'TX RTT',
            id: 'tx_rtt',
            img: 'reports/restart.png'
          },
          {
            title: 'TB Prev',
            id: 'tb_prev',
            img: 'reports/previous.png'
          },
          {
            title: 'VL coverage',
            id: 'vl_coverage',
            img: 'reports/viral_load.png'
          },
          {
            title: 'SC ARVDISP',
            id: 'sc_arvdisp',
            img: 'reports/previous.png'
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
            img: 'reports/medical.png'
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
            img: 'reports/viral_load.png'
          }
        ]
      }
    ]
  },
  {
    title: "Data cleaning tools",
    id: "data_cleaning_tools",
    url: "/emc/cleaningtools",
    icon: checkmarkDone,
  },
  {
    title: "Users",
    id: "users",
    url: "/emc/users",
    icon: people,
  },
];