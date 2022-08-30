import { AppInterface } from "../interfaces/AppInterface";
import HomeStats from "@/apps/RADIOLOGY/components/RadiologyHomeStats.vue";

const RADIOLOGY: AppInterface = {
    programID: 28,
    applicationName: 'RADIOLOGY',
    applicationIcon: 'radiology_types.png',
    applicationDescription: "Radiology service",
    homeOverviewComponent: HomeStats,
    configDefaultPatientDashboardCards: {
        alertsEnabled: false,
        medicationsEnabled: false,
        labEnabled: false
    },
    appRoutes: [
        {
            name: 'Examination',
            path: '/radiology/examination/:patient_id',
            component: () => import('@/apps/RADIOLOGY/views/encounters/RadiologyExaminations.vue')
        },
        {
            name: 'Radiology Appointment',
            path: '/radiology/appointment',
            component: () => import('@/apps/RADIOLOGY/views/encounters/RadiologyAppointment.vue')
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
        },
        {
            name: 'radiology activities',
            path: '/radiology/activities/:patient_id',
            component: () => import('@/apps/RADIOLOGY/views/RadiologyActivities.vue')
        }
    ],
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
            id: "Examination",
            name: "Examination",
            icon: "radiology_types.png"
        },
        {
            id: "Radiology Appointment",
            name: "Radiology Appointment",
            icon: "appointment.png"
        }
    ],
    secondaryPatientActivites: [
        {
            id: 'radiology activities',
            name: 'Radiology Activities',
            icon: 'radiology_types.png'
        }
    ]
}
export default RADIOLOGY