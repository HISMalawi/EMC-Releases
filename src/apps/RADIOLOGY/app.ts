import { AppInterface } from "../interfaces/AppInterface";
import HomeStats from "@/apps/RADIOLOGY/components/RadiologyHomeStats.vue";

const RADIOLOGY: AppInterface = {
    programID: 28,
    applicationName: 'RADIOLOGY',
    applicationIcon: 'radiology_types.png',
    applicationDescription: "Radiology service",
    homeOverviewComponent: HomeStats,
    appRoutes: [
        {
            name: 'Investigations',
            path: '/radiology/investigations/:patient_id',
            component: () => import('@/apps/RADIOLOGY/views/encounters/RadiologyExaminations.vue')
        },
        {
            name: 'daily radiology report',
            path: '/radiology/report/daily',
            component: () => import('@/apps/RADIOLOGY/views/reports/RadiologyDailyReport.vue')
        },
        {
            name: 'revenue radiology report',
            path: '/radiology/report/revenue',
            component: () => import('@/apps/RADIOLOGY/views/reports/RadiologyRevenueReport.vue')
        },
        {
            name: 'radiology referral report',
            path: '/radiology/report/referral',
            component: () => import('@/apps/RADIOLOGY/views/reports/RadiologyReferralReport.vue')
        }
    ],
    programPatientIdentifiers: {
        'Exam Number': {
            id: 20,
            name: 'Radiology Study Number',
            isPrimary: true,
            useForSearch: true,
            prefix: () => ''
        }
    },
    programReports: [
        {
            name: 'Daily Report',
            icon: 'reports.png',
            defaultFilesIcon: 'reports.png',
            files: [
                {
                    name: 'Daily Report',
                    pathUrl: '/radiology/report/daily'
                }
            ]
        },
        {
            name: 'Revenue Collection Report',
            icon: 'reports.png',
            defaultFilesIcon: 'reports.png',
            files: [
                {
                    name: 'Revenue Collection',
                    pathUrl: '/radiology/report/revenue'
                }
            ]
        },
        {
            name: 'Referral Report',
            icon: 'reports.png',
            defaultFilesIcon: 'reports.png',
            files: [
                {
                    name: 'Referral Report',
                    pathUrl: '/radiology/report/referral'
                }
            ]
        }
    ],
    primaryPatientActivites: [
        {
            id: "Investigations",
            name: "Investigations",
            icon: "radiology_types.png"
        }
    ],
    secondaryPatientActivites: [],
}
export default RADIOLOGY