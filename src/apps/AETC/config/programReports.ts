import { FolderInterface } from "@/apps/interfaces/AppInterface"
import { Service } from "@/services/service"

const centralHospitals = [
    "Queen Elizabeth Central Hospital",
    "Kamuzu Central Hospital",
    "Mzuzu Central Hospital",
    "Zomba Central Hospital"
]

function isFacilictyCentralHospital(): boolean {
    for(const name of centralHospitals) {
        if (name == Service.getLocationName()) {
            return true
        }
    }
    return false
}

export const REPORTS: FolderInterface[] = [
    {
        name: 'MoH',
        icon: 'login-logos/Malawi-Coat_of_arms_of_arms.png',
        defaultFilesIcon: 'reports.png',
        condition: () => true,
        files: [
            {
                name: 'Malaria Report',
                pathName: 'clinic_la'
            },
        ]
    },
    {
        name: 'Clinic',
        icon: 'reports.png',
        defaultFilesIcon: 'reports.png',
        files: [
            {
                name: 'Diagnosis Report',
                pathName: 'clinic_diagnosis_by_address'
            },
            {
                name: 'Diagnosis Specific Report',
                pathName: 'clinic_diagnosis'
            },
            {
                name: 'Disaggregated Diagnosis',
                pathName: 'clinic_registration'
            },
            {
                name: 'OPD General',
                pathName: 'clinic_cases_seen'
            },
            {
                name: 'Referrals',
                pathName: 'clinic_mental_health'
            },
            {
                name: 'Total Registered',
                pathName: 'clinic_drugs_given'
            },
            {
                name: 'Update DHIS2',
                pathName: 'clinic_drugs'
            },
        ]
    }
]