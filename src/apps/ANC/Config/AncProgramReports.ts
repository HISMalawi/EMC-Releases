import { FolderInterface } from "@/apps/interfaces/AppInterface"
import {
    AncCleaningIndicator
} from "@/apps/ANC/Services/anc_datacleaning_service";
export const REPORTS: FolderInterface[] = [
    {
        name: 'MoH',
        icon: 'login-logos/Malawi-Coat_of_arms_of_arms.png',
        defaultFilesIcon: 'reports.png',
        files: [
           {
                name: 'Cohort',
                pathUrl: '/anc/moh_report/CohortTemplate'
           },
           {
               name: 'Monthly',
               pathUrl: '/anc/moh_report/MonthlyTemplate'
           }
        ]
    },
    {
        name: 'Clinic',
        icon: 'reports.png',
        defaultFilesIcon: 'reports.png',
        files: [
            {
                name: "Appointments",
                pathName: 'anc_clinic_appointment'
            },
            {
                name: 'Incomplete visits',
                pathUrl: `/anc/datacleaning?cleaning_tool=${AncCleaningIndicator.INCOMPLETE_VISITS}`
            }
        ]
    },
    {
        name: 'PEPFAR',
        icon: 'login-logos/PEPFAR.png',
        defaultFilesIcon: 'reports.png',
        files: [
           {
               name: "Disaggregated",
               pathName: 'anc_pepfar_disaggregated'
           }
        ]
    }
]