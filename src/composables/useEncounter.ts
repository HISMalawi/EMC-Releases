import { Patientservice } from "@/services/patient_service";
import { onMounted, reactive, ref } from "vue";
import Store from '@/composables/ApiStore';
import { ProgramService } from "@/services/program_service";
import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";
import find from "lodash/find";
import { useRoute, useRouter } from "vue-router";
import { ENCOUNTER_GUIDELINES, FlowState } from "@/guidelines/encounter_guidelines";
import { matchToGuidelines } from "@/utils/GuidelineEngine";
import { nextTask } from '@/utils/WorkflowTaskHelper';

export interface EncounterFacts {
  sessionDate: string;
  apiDate: string;
  encounterName: string;
  isBdeMode: boolean;
  birthDate: Date;
  outcome: string;
  providers: Array<string>;
  outcomeStartDate: string;
}

export type OnReadyHandler = (patientId: number, providerId: number) => void;

export default function useEncounter(onReadyHandler?: OnReadyHandler) {
  const route = useRoute();
  const patient = ref({} as Patientservice);
  const facts = reactive({} as EncounterFacts);
  const provider = ref(-1);
  const providers = ref<Array<any>>([]);
  const router = useRouter();
  const patientDashboardUrl = ref('');

  const goToNextTask = () => nextTask(patient.value?.getID(), router);
  const goToPatientDashboard = () => router.push(patientDashboardUrl.value);

  const getProvidersNames = () => {
    return sortBy(providers.value, ({ username }) => username)
      .map((p: any) => {
        let name = `${p.username}`
        if (!isEmpty(p?.person?.names)) {
          const [latestName] = p.person?.names || []
          name += ` (${latestName.given_name} ${latestName.family_name})`
        }
        return name
      });
  }

  const setEncounterFacts = async (encounterName = "N/A") => {
    const program = await Store.get('PATIENT_PROGRAM', { patientID: patient.value?.getID() })
    facts.outcome = program.outcome
    facts.outcomeStartDate = program.startDate
    facts.sessionDate = ProgramService.getSessionDate();
    facts.apiDate = ProgramService.getCachedApiDate() as string;
    facts.isBdeMode = ProgramService.isBDE() as boolean;
    facts.birthDate = patient.value?.getBirthdate();
    facts.encounterName = encounterName.toUpperCase();
    if (ProgramService.isBDE()) {
      providers.value = await Store.get('PROVIDERS');
      facts.providers = getProvidersNames();
    }
  }

  const runflowState = (state: FlowState, params = null) => {
    const states: any = {}
    states[FlowState.SET_PROVIDER] = (selection: any) => {
      const [username] = selection.split(' ');
      provider.value = find(providers.value, { username })?.person_id ?? -1;
      return FlowState.CONTINUE
    }
    states[FlowState.CHANGE_SESSION_DATE] = () => {
      router.push(`/session/date?patient_dashboard_redirection_id=${patient.value.getID()}`)
      return FlowState.EXIT
    }
    states[FlowState.CHANGE_PATIENT_OUTCOME] = () => {
      router.push(`/patient/programs/${patient.value.getID()}`)
      return FlowState.EXIT
    }
    states[FlowState.GO_TO_PATIENT_DASHBOARD] = () => {
      goToPatientDashboard();
      return FlowState.EXIT
    }
    if (state in states) {
      return states[state](params)
    }
  }

  const checkEncounterGuidelines = async (facts: EncounterFacts) => {
    const findings = matchToGuidelines(facts, ENCOUNTER_GUIDELINES)
    for (const index in findings) {
      const finding = findings[index]
      if (finding?.actions?.alert) {
        const status = runflowState((await finding?.actions?.alert(facts)))
        if (status === FlowState.EXIT) return
      }
      if (finding?.actions?.selection) {
        const selection = await finding?.actions?.selection(facts)
        runflowState(selection.flowState, selection.value)
      }
    }
  }

  onMounted(async () => {
    try {
      const patientID = route.params.patient_id as string;
      patientDashboardUrl.value = `/patient/dashboard/${ patientID }`;
      patient.value = await Store.get('ACTIVE_PATIENT', { patientID });
      await setEncounterFacts(route.name as string);
      await checkEncounterGuidelines(facts);
      if(typeof onReadyHandler === "function") onReadyHandler(parseInt(patientID), provider.value);
    } catch (error) {
      console.error('Error in useEncounter hook:', error);
    }
  });

  return {
    patient,
    provider,
    providers,
    facts,
    patientDashboardUrl,
    goToPatientDashboard,
    goToNextTask,
  };
}