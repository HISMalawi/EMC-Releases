import { FolderInterface } from "@/apps/interfaces/AppInterface"

export const REPORTS: FolderInterface[] = [
    {
        name: 'MoH',
        icon: 'login-logos/Malawi-Coat_of_arms_of_arms.png',
        defaultFilesIcon: 'reports.png',
        files: [
           {
                name: 'Cohort',
                pathName: 'anc_cohort_report'
           },
           {
               name: 'Monthly',
               pathName: 'anc_moh_monthly_report'
           }
        ]
    },
    {
        name: 'Clinic',
        icon: 'reports.png',
        defaultFilesIcon: 'reports.png',
        files: [
            
        ]
    },
    {
        name: 'PEPFAR',
        icon: 'login-logos/PEPFAR.png',
        defaultFilesIcon: 'reports.png',
        files: [
           
        ]
    }
]