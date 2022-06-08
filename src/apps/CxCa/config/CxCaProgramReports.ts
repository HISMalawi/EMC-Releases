import { FolderInterface } from "@/apps/interfaces/AppInterface"

export const REPORTS: FolderInterface[] = [
    {
        name: 'MoH',
        icon: 'login-logos/Malawi-Coat_of_arms_of_arms.png',
        defaultFilesIcon: 'reports.png',
        files: [
            {
                name: 'MoH report',
                pathName: 'screened_for_cxca'
            }
        ]
    },
    {
        name: 'Clinic',
        icon: 'reports.png',
        defaultFilesIcon: 'reports.png',
        files: [
            {
                name: 'Active clients with adverse outcomes',
                pathName: 'clinic_archiving_candidates'
            }
        ]
    },
    {
        name: 'PEPFAR',
        icon: 'login-logos/PEPFAR.png',
        defaultFilesIcon: 'reports.png',
        files: [
            {
                name: 'CC All Questions',
                pathName: 'cc_all_questions'
            },
            {
                name: 'CC Basic Results',
                pathName: 'cc_basic_results'
            },
            {
                name: 'CC Type of Screen',
                pathName: 'cc_type_of_screen'
            }
        ]
    },
]