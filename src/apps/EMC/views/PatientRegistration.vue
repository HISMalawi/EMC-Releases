<template>
  <Layout>
    <ion-grid>
      <ion-row>
        <ion-col class="ion-margin-bottom">
          <h1>New Patient Registration</h1>
        </ion-col>
      </ion-row>
      <ion-row class="his-card">
        <ion-col size="12">
          <ion-title class=" ion-text-center ion-margin-vertical"><b>Personal Details</b></ion-title>
          <ion-row class="ion-margin-bottom">
            <ion-col size="4">
              <ion-label style="margin-bottom: 1em">First Name (*): </ion-label>
              <ion-input placeholder="First Name" class="box ion-margin-top" />
            </ion-col>
            <ion-col size="4">
              <ion-label class="ion-padding-end">Middle Name: </ion-label>
              <ion-input class="box ion-margin-top" placeholder="Middle Name" />
            </ion-col>
            <ion-col size="4">
              <ion-label class="ion-padding-end">Family Name (*): </ion-label>
              <ion-input class="box ion-margin-top" placeholder="Family Name" />
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-bottom">
            <ion-col size="7">
              <ion-row>
                <ion-col size="12">
                  <ion-label>
                    <span v-if="estimateAge">Estimage Age (*):</span>
                    <span v-else>Date of Birth (*):</span>
                    <span class="ion-float-right ion-margin-end checkbox-label">
                      Estimate Date of Birth
                      <ion-checkbox v-model="estimateAge"></ion-checkbox>
                    </span>
                  </ion-label>
                </ion-col>
              </ion-row>
              <ion-row>
                <template v-if="estimateAge">
                  <ion-col size="12">
                    <ion-input class="box" :min="1" type="number" placeholder="Enter age estimate" />
                  </ion-col>
                </template>
                <template v-else>
                  <ion-col size="4">
                    <ion-input class="box" :min="1" type="number" placeholder="DD" />
                  </ion-col>
                  <ion-col size="4">
                    <ion-input class="box" :min="1" type="number" placeholder="MM" />
                  </ion-col>
                  <ion-col size="4">
                    <ion-input class="box" :min="1920" type="number" placeholder="YYYY" />
                  </ion-col>
                </template>
              </ion-row>
            </ion-col>
            <ion-col size="5" style="padding-top: .4rem;">
              <ion-label >Gender (*): </ion-label>
              <ion-select class="box ion-margin-top">
                <ion-select-option>Male</ion-select-option>
                <ion-select-option>Female</ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-bottom">
            <ion-col size="12">
              <ion-label>
                Cellphone Number (*):
                <span class="ion-float-right ion-margin-end checkbox-label">
                  Cellphone Number Unknown? 
                  <ion-checkbox v-model="patientPhoneUnknown"></ion-checkbox>
                </span>
              </ion-label>
              <ion-input v-model="patient.cellphone.value" :disabled="patient.cellphone.disabled" placeholder="Cellphone Number" class="box ion-margin-top" />
            </ion-col>
          </ion-row>
          <ion-title class=" ion-text-center ion-margin-vertical"><b>Physical Address</b></ion-title>
          <ion-row class="ion-margin-bottom">
            <ion-col size="6">
              <ion-label>
                Home Village (*):
                <span class="ion-float-right ion-margin-end checkbox-label">
                  Village not listed? 
                  <ion-checkbox v-model="addCustomVillage"></ion-checkbox>
                </span>
              </ion-label>
              <ion-input v-if="addCustomVillage" placeholder="enter village" class="box ion-margin-top" />
              <ion-select class="box ion-margin-top" placeholder="Select Village" v-else>
                <ion-select-option>Test Village</ion-select-option>
                <ion-select-option>Test Village</ion-select-option>
              </ion-select>
            </ion-col>
            <ion-col size="6">
              <ion-label>
                Closest Landmark or Plot Number (*):
                <span class="ion-float-right ion-margin-end checkbox-label">
                  Landark not listed? 
                  <ion-checkbox v-model="addCustomLandmark"></ion-checkbox>
                </span> 
              </ion-label>
              <ion-input v-if="addCustomLandmark" placeholder="enter closest landmark or plot number" class="box ion-margin-top" />
              <ion-select class="box ion-margin-top" placeholder="Select Landmark" v-else>
                <ion-select-option>Church</ion-select-option>
                <ion-select-option>Primary School</ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>
          <ion-title class=" ion-text-center ion-margin-vertical">
            <b>Guardian details</b>
            <span class="ion-margin-start checkbox-label">
              Guardian Details Unknown? 
              <ion-checkbox v-model="guardianNotAvailable"></ion-checkbox>
            </span>
          </ion-title>
          <ion-row class="ion-margin-bottom">
            <ion-col size="4">
              <ion-label>First Name (*): </ion-label>
              <ion-input v-model="guardian.givenName.value" :disabled="guardian.givenName.disabled" placeholder="First Name" class="box ion-margin-top" />
            </ion-col>
            <ion-col size="4">
              <ion-label>Family Name (*): </ion-label>
              <ion-input v-model="guardian.familyName.value" :disabled="guardian.familyName.disabled" class="box ion-margin-top" placeholder="Family Name" />
            </ion-col>
            <ion-col size="4">
              <ion-label>
                Cellphone Number (*):
                <span class="ion-float-right ion-margin-end checkbox-label">
                  Cellphone Number Unknown? 
                  <ion-checkbox v-model="guardianPhoneUnknown"></ion-checkbox>
                </span>
              </ion-label>
              <ion-input v-model="guardian.cellphone.value" :disabled="guardian.cellphone.disabled" placeholder="Cellphone Number" class="box ion-margin-top" />
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-top">
            <ion-col class="ion-margin-top">
              <ion-button class="searchBtn">Next step</ion-button>
              <ion-button class="searchBtn" color="warning">Reset</ion-button>
            </ion-col>
          </ion-row>
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
  },
  setup() {
    const estimateAge = ref(false)
    const guardianNotAvailable = ref(false)
    const addCustomVillage = ref(false)
    const addCustomLandmark = ref(false)
    const guardianPhoneUnknown = ref(false)
    const patientPhoneUnknown = ref(false)

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
      cellphone: {
        required: true,
        value: ''
      },
      homeVillage: {
        required: true,
        value: ''
      },
      landMark: {
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

    watch(guardianNotAvailable, (isNotAvailable) =>{
      for (const key in guardian) {
        guardian[key].value = isNotAvailable ? 'Unknown' : '' 
        guardian[key].disabled = isNotAvailable
      }
    })

    watch(guardianPhoneUnknown, (isUnknown) => {
      guardian.cellphone.value = isUnknown ? 'Unknown' : ''
      guardian.cellphone.disabled = isUnknown
    })

    watch(patientPhoneUnknown, (isUnknown) => {
      patient.cellphone.value = isUnknown ? 'Unknown' : ''
      patient.cellphone.disabled = isUnknown
    })

    return {
      patient,
      guardian,
      guardianNotAvailable,
      addCustomVillage,
      addCustomLandmark,
      guardianPhoneUnknown,
      patientPhoneUnknown,
      estimateAge
    };
  },
});
</script>

<style scoped>
.box {
  border-color: #a3a3a3;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
}

.searchBtn {
  height: 50px !important;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: .5rem;
}

.checkbox-label {
  color: rgb(67, 149, 204);
  font-weight: bold;
}
</style>
