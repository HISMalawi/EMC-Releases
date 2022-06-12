import { AppInterface } from "../interfaces/AppInterface";
import homeOverviewComponent from "@/apps/CxCa/Components/CxCaHomeOverviewComponent.vue";
import { PRIMARY_ACTIVITIES } from "@/apps/CxCa/config/CxCaProgramActivities";
import Routes from "@/apps/CxCa/config/CxCaRoutes";
import HisDate from "@/utils/Date";
import { WorkflowService } from "@/services/workflow_service";
import { ObservationService } from "@/services/observation_service";
import { REPORTS } from "@/apps/CxCa/config/CxCaProgramReports"
import { 
    onRegisterPatient,
} from "@/apps/CxCa/config/CxCaAppScripts"
const CXCA: AppInterface = {
  programID: 24,
  applicationName: "CxCa",
  applicationIcon: "ccm.png",
  applicationDescription: "Cervical cancer screening module",
  appRoutes: Routes,
  isPocApp: true,
  primaryPatientActivites: PRIMARY_ACTIVITIES,
  secondaryPatientActivites: [],
  globalPropertySettings: [],
  onRegisterPatient,
  homeOverviewComponent,
  confirmationSummary: (patient: any, program: any) => ({
    "PATIENT IDENTIFIERS": () => {
      return [
        {
          label: "NPID",
          value: patient.getNationalID(),
        },
      ]
    }
  }),
  programReports: REPORTS
}
export default CXCA
