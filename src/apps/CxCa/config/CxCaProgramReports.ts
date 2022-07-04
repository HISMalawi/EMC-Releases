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
                name: 'Visit reason',
                pathName: 'cc_visit_reasons'
            },
            {
                name: 'Booked clients',
                pathName: 'cc_booked_clients'
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
            },
            {
                name: 'CC Screen Result',
                pathName: 'cc_screen_result'
            },
            {
                name: 'CC Type of Treatment',
                pathName: 'cc_type_of_treatment'
            }
        ]
    },
]