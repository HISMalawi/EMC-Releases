import { ArtReportService } from "./art_report_service";

export const OTHER_AGE_GROUPS = [
    '<1 year', '1-4 years',
    '5-9 years', '10-14 years',
    '15-19 years', '20-24 years',
    '25-29 years', '30-34 years',
    '35-39 years', '40-44 years',
    '45-49 years', '50 plus years'
]

export class PatientReportService extends ArtReportService {
    constructor() {
        super()
    }

    getClientsDueForVl() {
        return this.getReport('clients_due_vl')
    }

    getClientRentention() {
        return this.getReport(`/programs/${this.programID}/reports/retention`)
    }

    getExternalConsultationClients() {
        return this.getReport('external_consultation_clients')
    }

    getMissedAppointments() {
        return this.getReport('missed_appointments')
    }

    getPregnantWomen() {
        return this.getReport(`/programs/${this.programID}/reports/pregnant_patients`)
    }
}
