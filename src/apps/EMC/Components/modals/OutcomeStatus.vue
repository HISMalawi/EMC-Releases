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
          <ion-label class=" ion-padding-bottom">Date of Enrollment: </ion-label>
          <ion-input type="date" class="box-input ion-margin-top" v-model="enrollDate"/>
        </ion-col>
        <ion-col>
          <ion-button color="warning" @click="() => enrollDate = ''">Reset</ion-button>
          <ion-button color="success" @click="enrollProgram">Enroll</ion-button>
        </ion-col>
      </ion-row>
      <template v-else>
        <ion-row class="his-card" style="margin-bottom: .4rem;">
          <ion-col size="12">
            <p>Add New Outcome</p>
          </ion-col>  
          <ion-col size="6">
            <ion-label class=" ion-padding-bottom">Select Outcome: </ion-label>
            <searchable-select-input
              class="box-input ion-margin-top"
              placeholder="Select Outcome"
              :options="outcomes"
              :value="outcome.label || ''"
              @onSelect="updateOutcome"
            />
          </ion-col>
          <ion-col size="6">
            <ion-label class=" ion-padding-bottom">Outcome Date: </ion-label>
            <ion-input type="date" class="box-input ion-margin-top" />
          </ion-col>
          <ion-col size="12" v-if="isTransferredOut">
            <ion-label class=" ion-padding-bottom">Transfer-In Facility : </ion-label>
            <ion-input type="number" :min="1" class="box-input ion-margin-top" />
          </ion-col>
          <ion-col size="12">
            <ion-button color="warning" @click="resetResults">Reset</ion-button>
            <ion-button color="success" @click="saveResults">Save</ion-button>
          </ion-col>
        </ion-row>    
        <ion-row class="his-card" style="padding: 0 !important;" :style="{ minHeight: rows.length ? '0' : '30vh'}" >
          <ion-col size="12" class="ion-no-padding">
            <p class="ion-padding-horizontal">Previous Outcomes</p>
            <report-table
              :rows="rows"
              :columns="columns"
              :config="tableConfig"
            />
          </ion-col>
        </ion-row>
      </template>
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="closeModal" slot="end">Close</ion-button>
      <ion-button color="danger" @click="voidProgram" v-if="isEnrolled" slot="end">Void Program</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import { 
  IonCol, 
  IonGrid, 
  IonRow, 
  modalController, 
  IonContent, 
  IonFooter, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonInput, 
  IonLabel, 
  IonBadge,
} from "@ionic/vue";
import { alertConfirmation, toastSuccess, toastWarning } from "@/utils/Alerts";
import table, { ColumnInterface, RowInterface } from '@/components/DataViews/tables/ReportDataTable';
import { PatientProgramService } from "@/services/patient_program_service";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { Option } from "@/components/Forms/FieldInterface";
import SearchableSelectInput from "../inputs/SearchableSelectInput.vue";

export default defineComponent({
  components: {
    IonContent,
    IonFooter,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    ReportTable,
    IonBadge,
    SearchableSelectInput,
  },
  props: {
    patientId: {
      type: Number,
      required: true
    },
  },
  setup(props) {
    const { toStandardHisDisplayFormat } = HisDate
    const patient = new PatientProgramService(props.patientId);
    const program = ref<Record<string, any>>();
    const isEnrolled = computed(() => !isEmpty(program.value));
    const enrollDate = ref('');
    const outcomes = ref<Option[]>([]);
    const outcome = reactive<Option>({} as Option);
    const isTransferredOut = computed(() => outcome.label === 'Patient transferred out');
    const enrollmentStatus = computed(() => isEnrolled.value && enrollDate.value 
      ? `Patient enrolled in this porgram on ${ toStandardHisDisplayFormat(enrollDate.value) }`
      : 'Patient is not enrolled in this program'
    );

    const columns = ref<ColumnInterface[][]>([[
      table.thTxt("Outcome"),
      table.thTxt("Start Date"),
      table.thTxt("End Date"),
      table.thTxt("Void"),
    ]]);

    const rows = computed<RowInterface[][]>(() => program.value?.patient_states.map((state: any, index: number) => [
      table.td(state.name),
      table.td(toStandardHisDisplayFormat(state.start_date)),
      table.td(toStandardHisDisplayFormat(state.end_date)),
      table.tdBtn('x', async () => {
        const confirm = await alertConfirmation(`Are you sure you want to void this outcome?`);
        if(confirm) {
          patient.setStateId(state.patient_state_id);
          await patient.voidState('duplicate / system error');
          toastSuccess('Outcome voided successfully');
          program.value?.patient_states.splice(index, 1);
        }
      }, {}, 'danger')
    ]) || []);

    const tableConfig = reactive({
      showIndex: false,
      tableCssTheme: "emc-datatable-theme"
    })

    const closeModal = (data?: any) => {
      modalController.dismiss(data);
    };

    const saveResults = async () => {
      toastWarning('Please fill in all fields');
    }

    const updateOutcome = (o: Option) => {
      Object.assign(outcome, o);
    }

    const enrollProgram = async () => {
      if(enrollDate.value) {
        patient.setProgramDate(enrollDate.value);
        await patient.enrollProgram();
        toastSuccess('Patient enrolled in program successfully', 1000);
        return closeModal({ data: "ok" });
      } 
      toastWarning('Please select date of enrollment');
    }

    const voidProgram = async () => {
      patient.setPatientProgramId(program.value?.patient_program_id ||  -1);
      await patient.voidProgram('duplicate / system error');
      toastSuccess('Patient voided from program successfully', 1000);
      return closeModal({ data: "ok" });
    }

    const resetResults = () => {
      console.log('reset');
    }

    onMounted (async () => {
      const programs = await patient.getPrograms();
      program.value = programs.find((l: any) => l.program.name === "HIV PROGRAM");
      if(program.value) {
        enrollDate.value = program.value.date_enrolled;
        const states= await patient.getProgramOutcomes();
        outcomes.value = states.map((state: any) => ({
          label: state.name,
          value: state.program_workflow_state_id,
          other: state
        }));
      }
    });

    return {
      isEnrolled,
      enrollDate,
      enrollmentStatus,
      isTransferredOut,
      outcomes,
      outcome,
      columns,
      rows,
      tableConfig,
      toStandardHisDisplayFormat,
      closeModal,
      resetResults,
      saveResults,
      enrollProgram,
      voidProgram,
      updateOutcome,
    };
  },
})
</script>