import { FolderInterface } from "@/apps/interfaces/AppInterface"

export const REPORTS: FolderInterface[] = [
    {
        name: 'MoH',
        icon: 'login-logos/Malawi-Coat_of_arms_of_arms.png',
        defaultFilesIcon: 'reports.png',
        condition: () => true,
        files: [
            {
                name: 'LA report',
                pathName: 'moh_la',
                condition: () => false
            },
            {
                name: 'Drug report',
                pathName: 'moh_drug',
                condition: () => false
            },
            {
                name: 'Malaria report',
                pathName: 'moh_malaria',
                condition: () => true 
            },
            {
                name: 'IPT',
                pathName: 'moh_ipt',
                condition: () => false
            },
            {
                name: 'IDSR Weekley Report',
                pathName: 'idsr_weekly',
            },
            {
                name: 'IDSR Monthly Report',
                pathName: 'idsr_monthly',
            },

        ]
    },
    {
        name: 'Clinic',
        icon: 'reports.png',
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