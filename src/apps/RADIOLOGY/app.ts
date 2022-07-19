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
            name: 'examination monthly report',
            path: '/radiology/report/examination/monthly',
            component: () => import('@/apps/RADIOLOGY/views/reports/MonthlyExaminationReport.vue')
        },
        {
            name: 'Film(s) used',
            path: '/radiology/report/films/used',
            component: () => import('@/apps/RADIOLOGY/views/reports/FilmsUsedReport.vue')
        },
        {
            name: 'Radiology report',
            path: '/radiology/report',
            component: () => import('@/apps/RADIOLOGY/views/reports/RadiologyReport.vue')
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
            name: 'Examination',
            icon: 'reports.png',
            defaultFilesIcon: 'reports.png',
            files: [
                {
                    name: 'Examinations(Monthly)',
                    pathUrl: '/radiology/report/examination/monthly'
                }
            ]
        },
        {
            name: 'Film(s)',
            icon: 'reports.png',
            defaultFilesIcon: 'reports.png',
            files: [
                {
                    name: 'Film(s) Used',
                    pathUrl: '/radiology/report/films/used'
                }
            ]
        },
        {
            name: 'Radiology',
            icon: 'reports.png',
            defaultFilesIcon: 'reports.png',
            files: [
                {
                    name: 'Radiology Report',
                    pathUrl: '/radiology/report'
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