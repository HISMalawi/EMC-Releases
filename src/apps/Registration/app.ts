import { AppInterface, GeneralDataInterface } from '@/apps/interfaces/AppInterface';
import HomeOverview from "@/apps/Registration/components/HomeOverview.vue";
import { PRIMARY_ACTIVITIES} from '@/apps/Registration/config/programActivities';
import { REPORTS } from '@/apps/Registration/config/programReports';
import opdRoutes from '@/apps/Registration/config/routes';
import { PatientProgramService } from '@/services/patient_program_service';
import { AppEncounterService } from "@/services/app_encounter_service"
import { RelationshipService } from '@/services/relationship_service';
import Validation from '@/components/Forms/validations/StandardValidations';
import { Patientservice } from '@/services/patient_service';

declare global {
  interface Navigator {
     msSaveBlob: (blob: Blob,fileName: string) => boolean;
    }
}

async function onRegisterPatient(patientId: number) {
  const program = new PatientProgramService(patientId)
  await program.enrollProgram()

  // Create registration encounter
  //kept incase we may need to start saving this going forward
  // const encounter = new AppEncounterService(patientId, 5)

  // await encounter.createEncounter()
  // await encounter.saveValueCodedObs(
  //   'Type of patient', 'New Patient'
  // )
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
   
    'OUTCOME': () => ([
      {
        label: 'Current Outcome',
        value: program.outcome || 'N/A'
      }
    ]),
    'GUARDIAN': async () => {
      const req = await RelationshipService
        .getGuardianDetails(
          patient.getID()
        )
      if (req) {
        return req.map((r: any) => ({
          label: r.name,
          value: r.relationshipType,
        }))
      }
      return []
    }
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