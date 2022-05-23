<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Outcome Status</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-badge color="lightblue" class="ion-padding" style="width: 100%;" disabled>
      {{ enrollmentStatus }}
    </ion-badge>
    <ion-grid style="width: 100%">
      <ion-row v-if="!isEnrolled">
        <ion-col size="12">
          <ion-label class=" ion-padding-bottom">Date of Enrollment: </ion-label>
          <ion-input type="date" class="box-input ion-margin-top" v-model="enrollDate"/>
        </ion-col>
      </ion-row>
      <template v-else>
        <ion-row>
        <ion-col size="12">
          <report-table
            :asyncRows="getPatientOutcomes"
            :columns="columns"
          />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="4">
          <ion-label class=" ion-padding-bottom">Date of Enrollment: </ion-label>
          <ion-select class="box-input ion-margin-top" >
            <ion-select-option value="=">&equals;</ion-select-option>
            <ion-select-option value=">">&gt;</ion-select-option>
            <ion-select-option value="<"> &lt; </ion-select-option>
            <ion-select-option value=">=">&le;</ion-select-option>
            <ion-select-option value="<=">&ge;</ion-select-option>
          </ion-select>
        </ion-col>
        <ion-col size="12">
          <ion-label class=" ion-padding-bottom">Result: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-label class=" ion-padding-bottom">Date: </ion-label>
          <ion-input type="date" class="box-input ion-margin-top" />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class=" ion-margin-top">
          <ion-label class=" ion-padding-bottom ion-margin-top">Other Results Options: </ion-label>
          <ion-item>
            <ion-label>LDL</ion-label>
            <ion-checkbox slot="start" />
          </ion-item>
        </ion-col>
      </ion-row>
      </template>
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="closeModal" slot="end">Close</ion-button>
      <ion-button color="warning" @click="resetResults" slot="end">Reset</ion-button>
      <ion-button color="success" @click="saveResults" slot="end" v-if="isEnrolled">Save</ion-button>
      <ion-button color="success" @click="enrollProgram" slot="end" v-else>Enroll</ion-button>
      <ion-button color="danger" @click="voidProgram" v-if="isEnrolled">Void Program</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
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
  IonSelectOption,
  IonSelect,
  IonCheckbox,
  IonItem,
  IonBadge,
} from "@ionic/vue";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import table, { ColumnInterface, RowInterface } from '@/components/DataViews/tables/ReportDataTable';
import { PatientProgramService } from "@/services/patient_program_service";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";

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
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    IonItem,
    ReportTable,
    IonBadge,
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

    const enrollmentStatus = computed(() => isEnrolled.value && enrollDate.value 
      ? `Patient enrolled in this porgram on ${ toStandardHisDisplayFormat(enrollDate.value) }`
      : 'Patient is not enrolled in this program'
    );
    
    const columns = ref<ColumnInterface[][]>([[
      table.thTxt("Outcome"),
      table.thTxt("Start Date"),
      table.thTxt("End Date"),
    ]]);

    const closeModal = (data?: any) => {
      modalController.dismiss(data);
    };

    const saveResults = async () => {
      toastWarning('Please fill in all fields');
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
    };

    const getPatientOutcomes = async (): Promise<RowInterface[][]> => {
      const outcomes = await patient.getProgramStates();
      return outcomes.map((outcome: any) => {
        return [
          table.td(outcome.name),
          table.td(outcome.startDate),
          table.td(outcome.endDate),
        ];
      }); 
    };


    onMounted (async () => {
      const programs = await patient.getPrograms();
      program.value = programs.find((l: any) => l.program.name === "HIV PROGRAM");
      if(program.value) {
        enrollDate.value = program.value.date_enrolled;
      }
    });

    return {
      isEnrolled,
      enrollDate,
      enrollmentStatus,
      columns,
      toStandardHisDisplayFormat,
      closeModal,
      resetResults,
      saveResults,
      getPatientOutcomes,
      enrollProgram,
      voidProgram,
    };
  },
})
</script>