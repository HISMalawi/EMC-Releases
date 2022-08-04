import { AppInterface, GeneralDataInterface } from '@/apps/interfaces/AppInterface';
import HomeOverview from "@/apps/Registration/components/HomeOverview.vue";
import { PRIMARY_ACTIVITIES} from '@/apps/Registration/config/programActivities';
import { REPORTS } from '@/apps/Registration/config/programReports';
import opdRoutes from '@/apps/Registration/config/routes';
import { PatientProgramService } from '@/services/patient_program_service';
import { RelationshipService } from '@/services/relationship_service';
import Validation from '@/components/Forms/validations/StandardValidations';
import { Patientservice } from '@/services/patient_service';
import router from '@/router/index';
import { AppEncounterService } from '@/services/app_encounter_service';

declare global {
  interface Navigator {
     msSaveBlob: (blob: Blob,fileName: string) => boolean;
    }
}

async function onRegisterPatient(patientId: number) {
  const program = new PatientProgramService(patientId)
  await program.enrollProgram()
  const encounter = new AppEncounterService(patientId, 5)

  // Create registration encounter
  await encounter.createEncounter()
  await encounter.saveValueCodedObs(
    'Type of patient', 'New Patient'
  )

  router.push('/registration/encounters/outpatient_reception/' + patientId);
  return true
}

async function formatPatientProgramSummary(_: any, patientId: number) {
  const p = await Patientservice.findByID(patientId)
  const patient = new Patientservice(p)
  return [
    { label: 'Malawi National ID', value: patient.getMWNationalID() }
  ]
}

function confirmationSummary(patient: any, program: any) {
  return {
    'PATIENT IDENTIFIERS': () => ([
      {
        label: "NPID",
        value: patient.getNationalID(),
      }
    ]),
    
  }
}

const Registration: AppInterface = {
  programID: 29,
  applicationName: 'Registration',
  applicationIcon: 'active-files.png',
  applicationDescription: 'Patient Registration Program',
  appRoutes: opdRoutes,
  programReports: REPORTS,
  primaryPatientActivites: PRIMARY_ACTIVITIES,
  secondaryPatientActivites: PRIMARY_ACTIVITIES,
  homeOverviewComponent: HomeOverview,
  onRegisterPatient,
  formatPatientProgramSummary,
  confirmationSummary,
  programPatientIdentifiers: {
    'National ID': {
      id: 28,
      name: 'National ID',
      isPrimary: true,
      useForSearch: true,
      prefix: () => '',
      validation: (value) => Validation.isMWNationalID(value)
    },
  }
}

export default Registration