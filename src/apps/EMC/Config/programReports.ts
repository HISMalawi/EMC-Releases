import { FolderInterface } from "@/apps/interfaces/AppInterface";

export const REPORTS: FolderInterface[] = [
  {
    name: 'MoH Reports',
    icon: 'login-logos/Malawi-Coat_of_arms_of_arms.png',
    defaultFilesIcon: 'reports.png',
    condition: () => true,
    files: [
      {
        name: 'Cohort',
        pathName: 'emc_cohort',
        icon: 'reports/cohort.png'
      },
      {
        name: 'Cohort Disagreggated',
        pathName: 'emc_moh_disaggregated',
        icon: 'reports/split.png'
      },
      {
        name: 'Survival analysis',
        pathName: 'emc_survival_analysis',
        icon: 'reports/refill.png'
      },
      {
        name: 'Viral load',
        pathName: 'emc_viral_load',
        icon: 'reports/vl.png'
      },
      {
        name: 'Regimen distribution, Weight',
        pathName: 'emc_regimen_distribution_weight',
        icon: 'reports/electronics.png'
      },
      {
        name: 'TX CURR MMD',
        pathName: 'emc_moh_tx_curr_mmd',
        icon: 'reports/px.png'
      },
      {
        name: 'TPT new initiation',
        pathName: 'emc_moh_tpt',
        icon: 'reports/new_initiation.png'
      }
    ]
  },
  {
    name: 'Clinic Reports',
    icon: 'reports/clinic.png',
    defaultFilesIcon: 'reports.png',
    files: [
      {
        name: 'Diagnosis by address',
        pathName: 'clinic_diagnosis_by_address'
      },
      {
        name: 'Diagnosis',
        pathName: 'clinic_diagnosis'
      },
      {
        name: 'Registration report',
        pathName: 'clinic_registration'
      },
      {
        name: 'LA report',
        pathName: 'clinic_la'
      },
      {
        name: 'Cases seen report',
        pathName: 'clinic_cases_seen'
      },
      {
        name: 'Mental health report',
        pathName: 'clinic_mental_health'
      },
      {
        name: 'Drugs (dispensed without prescription)',
        pathName: 'clinic_drugs_given'
      },
      {
        name: 'Drugs (prescribed and dispensed)',
        pathName: 'clinic_drugs'
      },
      {
        name: 'With NIDs',
        pathName: 'clinic_with_nids'
      },
    ]
  },
  {
    name: 'PEPFAR Reports',
    icon: 'login-logos/PEPFAR.png',
    defaultFilesIcon: 'reports.png',
    files: [
      {
        name: 'Diagnosis by address',
        pathName: 'clinic_diagnosis_by_address'
      },
      {
        name: 'Diagnosis',
        pathName: 'clinic_diagnosis'
      },
      {
        name: 'Registration report',
        pathName: 'clinic_registration'
      },
      {
        name: 'LA report',
        pathName: 'clinic_la'
      },
      {
        name: 'Cases seen report',
        pathName: 'clinic_cases_seen'
      },
      {
        name: 'Mental health report',
        pathName: 'clinic_mental_health'
      },
      {
        name: 'Drugs (dispensed without prescription)',
        pathName: 'clinic_drugs_given'
      },
      {
        name: 'Drugs (prescribed and dispensed)',
        pathName: 'clinic_drugs'
      },
      {
        name: 'With NIDs',
        pathName: 'clinic_with_nids'
      },
    ]
  }
]