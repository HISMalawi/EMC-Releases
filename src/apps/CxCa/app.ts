import { AppInterface } from "../interfaces/AppInterface";
import homeOverviewComponent from "@/apps/CxCa/Components/CxCaHomeOverviewComponent.vue";
import {PRIMARY_ACTIVITIES} from "@/apps/CxCa/config/CxCaProgramActivities"
import Routes from "@/apps/CxCa/config/CxCaRoutes"
import { WorkflowService } from "@/services/workflow_service";
import { REPORTS } from "@/apps/CxCa/config/CxCaProgramReports"
import { 
    onRegisterPatient,
} from "@/apps/CxCa/config/CxCaAppScripts"
import { toDate } from "@/utils/Strs";
const CXCA: AppInterface = {
    programID: 24,
    applicationName: 'CxCa',
    applicationIcon: 'ccm.png',
    applicationDescription: "Cervical cancer screening module",
    appRoutes: Routes,
    primaryPatientActivites: PRIMARY_ACTIVITIES,
    secondaryPatientActivites: [],
    globalPropertySettings: [],
    onRegisterPatient,
    homeOverviewComponent,
    confirmationSummary: (patient: any, program: any) => ({
        'PATIENT IDENTIFIERS': () => {
            return [
                {
                  label: "NPID",
                  value: patient.getNationalID(),
                }
            ]
        },
        'OUTCOME': () => {
            return [
                { 
                    label: 'Current Outcome', 
                    value: program.outcome || 'N/A'
                }
            ]
        },
        'PROGRAM INFORMATION': async () => {
            const patientID = patient.getID()
            const data: any = []
            const params = await WorkflowService.getNextTaskParams(patientID)
            return [
                {
                    label: "Next Task",
                    value: params.name ? `${params.name}` : 'NONE',
                },
                {
                    label: "Next Appointment",
                    value: toDate((await patient.nextAppointment())),
                }
            ]
            return data
        },
    }),
    programReports: REPORTS
}
export default CXCA
