<template>
  <Layout>
    <ion-grid>
      <ion-row>
        <ion-col class="ion-margin-bottom">
          <h1>New Patient Registration</h1>
        </ion-col>
      </ion-row>
      <keep-alive>
        <PatientRegistrationForm
          :patientDetails="patient"
          :guardianDetails="guardian"
          @updatePatient="updatePatient"
          @updateGuardian="updateGuardian"
        />
      </keep-alive>
      <ion-row class="ion-margin-top">
        <ion-col class="ion-margin-top">
          <ion-button class="searchBtn" @click="goNext">Next step</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol, IonInput, IonSelect, IonSelectOption, IonCheckbox } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import { toastWarning } from "@/utils/Alerts";
import PatientRegistrationForm from "../Components/PatientRegistrationForm.vue";

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    PatientRegistrationForm
},
  setup() {
    const patient = reactive<Record<string, any>>({
      givenName: {
        required: true,
        disabled: false,
        value: ''
      },
      familyName: {
        required: true,
        disabled: false,
        value: ''
      },
      middleName: {
        required: false,
        disabled: false,
        value: '',
      },
      gender: {
        required: true,
        disabled: false,
        value: ''
      },
      birthdate: {
        required: true,
        day: '',
        month: '',
        year: ''
      },
      cellphone: {
        required: true,
        value: ''
      },
      homeVillage: {
        required: true,
        value: ''
      },
      landmark: {
        required: true,
        value: ''
      },
    })

    const guardian = reactive<Record<string, any>>({
      givenName: {
        required: true,
        value: ''
      },
      familyName: {
        required: true,
        value: ''
      },
      cellphone: {
        required: true,
        value: ''
      },
    })

    const updateGuardian = (newGauardian: Record<string, any>) => {
      Object.assign(guardian, newGauardian)
    }
    
    const updatePatient = (newPatient: Record<string, any>) => {
      Object.assign(patient, newPatient)
    }

    const goNext = () => {
      console.log(patient)
    }

    return {
      patient,
      guardian,
      updatePatient,
      updateGuardian,
      goNext,
    };
  },
});
</script>

<style scoped>
.searchBtn {
  height: 50px !important;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: .5rem;
}
</style>
