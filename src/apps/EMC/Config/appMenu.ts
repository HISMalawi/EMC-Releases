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
            id: 'emc_moh_cohort',
            img: 'reports/cohort.png',
            url: '/emc_moh_cohort',
          },
          {
            title: 'Cohort Disagreggated',
            id: 'emc_moh_cohort_disaggregated',
            img: 'reports/split.png',
            url: '/emc_moh_cohort_disaggregated'
          },
          {
            title: 'Survival analysis',
            id: 'emc_moh_survival_analysis',
            img: 'reports/refill.png',
            url: '/emc_moh_survival_analysis'
          },
          {
            title: 'Viral load',
            id: 'emc_moh_viral_load',
            img: 'reports/vl.png',
            url: '/emc_moh_viral_load'
          },
          {
            title: 'Regimen distribution by Weight',
            id: 'emc_moh_regimen_distribution_weight',
            img: 'reports/electronics.png',
            url: '/emc_moh_regimen_distribution_weight'
          },
          {
            title: 'TX CURR MMD',
            id: 'emc_moh_tx_curr_mmd',
            img: 'reports/px.png',
            url: '/emc_moh_tx_curr_mmd'
          },
          {
            title: 'TPT new initiation',
            id: 'emc_moh_tpt_initiation',
            img: 'reports/new_initiation.png',
            url: '/emc_moh_tpt_initiation'
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
            id: 'emc_pepfar_disaggregated',
            img: 'reports/split.png',
            url: '/emc_pepfar_disaggregated'
          },
          {
            title: 'Defaulter List',
            id: 'emc_pepfar_defaulter',
            img: 'reports/defaulter-list.png',
            url: '/emc_pepfar_defaulters'
          },
          {
            title: 'TX CURR MMD',
            id: 'emc_pepfar_tx_curr_mmd',
            img: 'reports/px.png',
            url: '/emc_pepfar_tx_curr_mmd'
          },
          {
            title: 'TX ML',
            id: 'emc_pepfar_tx_ml',
            img: 'reports/tx-ml.png',
            url: '/emc_pepfar_tx_ml'
          },
          {
            title: 'TX RTT',
            id: 'emc_pepfar_tx_rtt',
            img: 'reports/restart.png',
            url: '/emc_pepfar_tx_rtt'
          },
          {
            title: 'TB Prev',
            id: 'emc_pepfar_tb_prev',
            img: 'reports/previous.png',
            url: '/emc_pepfar_tb_prev'
          },
          {
            title: 'VL coverage',
            id: 'emc_pepfar_vl_coverage',
            img: 'reports/viral_load.png',
            url: '/emc_pepfar_vl_coverage'
          },
          {
            title: 'SC ARVDISP',
            id: 'emc_pepfar_sc_arvdisp',
            img: 'reports/previous.png',
            url: '/emc_pepfar_sc_arvdisp'
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
            id: 'emc_clinic_appointments',
            img: 'reports/appointments.png',
            url: '/emc_clinic_appointments'
          },
          {
            title: 'Defaulter list',
            id: 'emc_clinic_defaulters',
            img: 'reports/defaulter-list.png',            
            url: '/emc_clinic_defaulters'
          },
          {
            title: 'Missed appointments',
            id: 'emc_clinic_missed_appointments',
            img: 'reports/appointment-missed.png',
            url: '/emc_clinic_missed_appointments'
          },
          {
            title: 'Regimen dispensation',
            id: 'emc_clinic_regimen_dispensation',
            img: 'reports/regimen-give.png',
            url: '/emc_clinic_regimen_dispensation'
          },
          {
            title: 'Regimen switch',
            id: 'emc_clinic_regimen_switch',
            img: 'reports/regimen-switch.png',
            url: '/emc_clinic_regimen_switch'
          },
          {
            title: 'Regimens and formulation - patient level',
            id: 'emc_clinic_regimen_formulation',
            img: 'reports/medical.png',
            url: '/emc_clinic_regimen_formulation'
          },
          {
            title: 'Pregnant Patients',
            id: 'emc_clinic_preganant_patients',
            img: 'reports/pregnant.png',
            url: '/emc_clinic_pregnant_patients'
          },
          {
            title: 'Incomplete visits',
            id: 'emc_clinic_incomplete_visits',
            img: 'reports/refill.png',
            url: '/emc_clinic_incomplete_visits'
          },
          {
            title: 'Clients due for VL',
            id: 'emc_clinic_clients_due_for_vl',
            img: 'reports/viral_load.png',
            url: '/emc_clinic_clients_due_for_vl',
          },
          {
            title: 'TPT Outcomes',
            id: 'emc_clinic_tpt_outcomes',
            img: 'reports/stats.png',
            url: '/emc_clinic_tpt_outcomes',
          },
          {
            title: 'TX RTT',
            id: 'emc_clinic_clinic_tx_rtt',
            img: 'reports/restart.png',
            url: '/emc_clinic_tx_rtt'
          },
          {
            title: 'Clinic Retention',
            id: 'emc_clinic_retention',
            img: 'reports/retention.png',
            url: '/emc_clinic_retention'
          },
          {
            title: 'Viral Load',
            id: 'emc_viral_load_report',
            img: 'reports/vl.png',
            url: '/emc_viral_load_report'
          },
          {
            title: 'Other Outcomes',
            id: 'emc_other_outcomes',
            img: 'reports/defaulter-list.png',
            url: '/emc_other_outcomes'
          },
          {
            title: 'Lab Test(s) Results',
            id: 'emc_lab_results',
            img: 'reports/lab-results.png',
            url: '/emc_lab_results'
          },
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
        id: "emc_data_cleaning",
        img: 'clean.jpg',
        url: '/emc_data_cleaning',
      },
      {
        title: "Patient Merging",
        id: "emc_patient_merging",
        img: 'merge.png',
        url: '/emc_patient_merging'
      },
      {
        title: "Patient Visit Stats",
        id: "emc_patient_visit_stats",
        img: 'reports/line-chart.png',
        url: '/emc_patient_visit_stats'
      },
      {
        title: "Data Cleaning Verificaton",
        id: "emc_cleaning_verification",
        img: 'Checkmark.svg',
        url: '/emc_cleaning_verification'
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