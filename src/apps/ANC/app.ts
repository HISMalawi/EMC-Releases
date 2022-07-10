import { AppInterface } from "../interfaces/AppInterface";
import AncRoutes from "./Config/AncRoutes";
import HomePageStats from "@/apps/ANC/Components/HomeStats.vue"
import { PRIMARY_ACTIVITIES } from "./Config/AncProgramActivites";
import { AppEncounterService } from "@/services/app_encounter_service";
import { selectActivities } from '@/utils/WorkflowTaskHelper';
import { Patientservice } from "@/services/patient_service";
import { OrderService } from "@/services/order_service";
import { ObservationService } from "@/services/observation_service";
import HisDate from "@/utils/Date";
import { WorkflowService } from "@/services/workflow_service"
import { ProgramService } from "@/services/program_service";
import { RelationshipService } from "@/services/relationship_service";
import { REPORTS } from "./Config/AncProgramReports";

const ANC: AppInterface = {
    programID: 12,
    applicationName: 'ANC',
    applicationIcon: 'anc.png',
    applicationDescription: 'Antenatal Program',
    appRoutes: AncRoutes,
    primaryPatientActivites: PRIMARY_ACTIVITIES,
    secondaryPatientActivites: [],
    programReports: REPORTS,
    homeOverviewComponent: HomePageStats,
    init: async () => await selectActivities(PRIMARY_ACTIVITIES),
    formatPatientProgramSummary(data) {
        return [
            { label: "Date of last ANC visit", value: data.date_of_lnmp || 'N/A' },
            { label: "Gestation:", value: data.gestation ? `${data.gestation} week(s)` : 'N/A' },
            { label: "ANC Visits", value: data.anc_visits || 'N/A' },
            { label: "Current outcome", value: data.current_outcome || 'N/A'}
        ]
    },
    confirmationSummary(data: Patientservice, program: any) { 
        const patientID = data.getID()
        const d = (date: string | Date) => HisDate.toStandardHisDisplayFormat(date)
        return {
            'PATIENT IDENTIFIERS': () => {
                return [
                    { label: 'NPID', value: data.getNationalID() },
                    { label: 'National ID', value: data.getMWNationalID() }
                ]
            },
            'PROGRAM INFO': async () => {
                const appointmentDate = (await ObservationService.getFirstValueDatetime(patientID, 'appointment date')) || 'N/A'; 
                const info = await ProgramService.getProgramInformation(patientID)
                return [
                    { label: 'ANC visit', value: info.anc_visits || 'N/A' },
                    { label: 'Next Appointment Date', value: d(appointmentDate) },
                    { label: 'Gestation Age', value: info.gestation ? `${info.gestation} week(s)` : 'N/A' },
                    { label: 'Date of LMP', value: d(info.date_of_lnmp) },
                    { label: 'EDOD', value: info.edod ? d(info.edod) : 'N/A'},
                    { label: 'Next task', value: (await WorkflowService.getNextTaskParams(patientID)).name.toUpperCase() || 'N/A' }
                ]
            },
            'OUTCOME': () => { 
                return [
                    { label: 'Current Outcome', value: program.outcome || 'N/A' }
                ]
            },
            'LABS': async () => {
                return (await OrderService.getOrders(patientID))
                    .map((order: any) => {
                        return { 
                            label: order.tests.map((t: any) => t.name).join(' & '),
                            value: HisDate.toStandardHisDisplayFormat(order.order_date) 
                        } 
                    })
            },
            'ALERTS': () => { 
                return [

                ]
            },
            'GUARDIANS': async () => {
                const req = await RelationshipService
                    .getGuardianDetails(patientID)
                if (req) {
                    return req.map((r: any) => ({
                        label: r.name,
                        value: r.relationshipType,
                    }))
                } 
                return []
            }
        }
    },
    async onRegisterPatient(patientID: number) {
        // Registration Encounter
        const registration = new AppEncounterService(patientID, 5, -1)
        await registration.createEncounter()
        await registration.saveValueCodedObs('Type of patient', 'New patient')
    },
    programPatientIdentifiers: {
        'National ID': {
            id: 28,
            name: 'National ID',
            isPrimary: true,
            useForSearch: true,
            prefix: () => ''
        }
    }
}
export default ANC
