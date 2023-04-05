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
            },
            {
                name: 'MoH monthly report',
                pathName: 'cc_monthly_report'
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
            },
            {
                name: 'Monthly CECAP TX',
                pathName: 'cc_monthly_cecap_tx' 
            },
            {
                name: 'Monthly Screen',
                pathName: 'cc_monthly_screen'
            }
        ]
    },
    {
        name: 'PEPFAR',
        icon: 'login-logos/PEPFAR.png',
        defaultFilesIcon: 'reports.png',
        files: [
            {
                name: 'CxCa All Questions',
                pathName: 'cc_all_questions'
            },
            {
                name: 'CxCa Basic Results',
                pathName: 'cc_basic_results'
            },
            {
                name: 'CxCa Type of Screen',
                pathName: 'cc_type_of_screen'
            },
            {
                name: 'CxCa Screen Result',
                pathName: 'cc_screen_result'
            },
            {
                name: 'CxCa Type of Treatment',
                pathName: 'cc_type_of_treatment'
            },
            {
                name: 'CxCa Tx',
                pathName: 'cc_cxca_tx'
            },
            {
                name: 'CxCa SCRN',
                pathName: 'cc_cxca_scrn'
            }
        ]
    },
]