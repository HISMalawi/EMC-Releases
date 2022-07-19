<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Patient Outcomes</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-grid style="width: 100%">
      <ion-row>
        <ion-col>
          <ion-badge color="lightblue" class="ion-padding" style="width: 100%;" disabled>
            {{ enrollmentStatus }}
          </ion-badge>
        </ion-col>
      </ion-row>
      <ion-row v-if="!isEnrolled" class="his-card" style="margin-bottom: .4rem;">
        <ion-col size="12">
          <enrollment-form :patientProgram="patientProgram" @enrollProgram="enrollProgram" />
        </ion-col>
      </ion-row>
      <template v-else>
        <ion-row class="his-card" style="margin-bottom: .4rem;">
          <outcome-form :outcomes="outcomes" @saveOutcome="saveOutcome" />
        </ion-row>    
        <ion-row class="his-card" style="padding: 0 !important;" :style="{ minHeight: totalStates ? '0' : '30vh'}" >
          <ion-col size="12" class="ion-no-padding">
            <outcomes-table :patientStates="program?.patient_states" @voidOutcome="voidOutcome" />
          </ion-col>
        </ion-row>
      </template>
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="modal.hide()" slot="end">Close</ion-button>
      <ion-button color="danger" @click="voidProgram" v-if="isEnrolled" slot="end">Void Program</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { 
  IonCol, 
  IonGrid, 
  IonRow, 
  IonContent, 
  IonFooter, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonBadge,
} from "@ionic/vue";
import { toastSuccess } from "@/utils/Alerts";
import { PatientProgramService } from "@/services/patient_program_service";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { Option } from "@/components/Forms/FieldInterface";
import OutcomesTable from "../tables/OutcomesTable.vue";
import EnrollmentForm from "../EnrollmentForm.vue";
import OutcomeForm from "../OutcomeForm.vue";
import { loader } from "@/utils/loader";
import { modal } from "@/utils/modal";

export default defineComponent({
  components: {
    IonContent,
    IonFooter,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    OutcomesTable,
    EnrollmentForm,
    OutcomeForm,
  },
  props: {
    patientId: {
      type: Number,
      required: true
    },
  },
  setup(props) {
    const { toStandardHisDisplayFormat } = HisDate
    const patientProgram = new PatientProgramService(props.patientId);
    const program = ref<Record<string, any>>();
    const isEnrolled = computed(() => !isEmpty(program.value));
    const enrollDate = ref('');
    const outcomes = ref<Option[]>([]);
    const totalStates = computed(() => program.value?.patient_states?.length ?? 0);
    const enrollmentStatus = computed(() => isEnrolled.value && enrollDate.value 
      ? `Patient enrolled in this porgram on ${ toStandardHisDisplayFormat(enrollDate.value) }`
      : 'Patient is not enrolled in this program'
    );

    const saveOutcome = async (outcome: {date: string; status: number; nextFacility?: string}) => {
      loader.show();
      patientProgram.setStateDate(outcome.date);
      patientProgram.setStateId(outcome.status);
      if(outcome.nextFacility) {
        await patientProgram.transferOutEncounter({ name: outcome.nextFacility });
      }
      await patientProgram.updateState();
      await loader.hide()
      await toastSuccess('Outcome saved successfully', 1000);
      await modal.hide();
    }

    const enrollProgram = async (date: string) => {
      await loader.show();
      patientProgram.setProgramDate(date);
      await patientProgram.enrollProgram();
      await loader.hide();
      await toastSuccess("Program enrolled successfully", 1000);
      await modal.hide();
    }

    const voidProgram = async () => {
      patientProgram.setPatientProgramId(program.value?.patient_program_id ||  -1);
      await patientProgram.voidProgram('duplicate / system error');
      await toastSuccess('Patient voided from program successfully', 1000);
      await modal.hide();
    }

    const voidOutcome = async ({stateId, index}: any) => {
      patientProgram.setStateId(stateId);
      await patientProgram.voidState('duplicate / system error');
      toastSuccess('Outcome voided successfully');
      program.value?.patient_states.splice(index, 1);
    }

    onMounted (async () => {
      const programs = await patientProgram.getPrograms();
      program.value = programs.find((l: any) => l.program.name === "HIV PROGRAM");
      if(program.value) {
        enrollDate.value = program.value.date_enrolled;
        const states= await patientProgram.getProgramOutcomes();
        outcomes.value = states.map((state: any) => ({
          label: state.name,
          value: state.program_workflow_state_id,
          other: state
        }));
      }
    });

    return {
      modal,
      patientProgram,
      isEnrolled,
      enrollDate,
      enrollmentStatus,
      outcomes,
      program,
      totalStates,
      toStandardHisDisplayFormat,
      saveOutcome,
      enrollProgram,
      voidProgram,
      voidOutcome,
    };
  },
})
</script>