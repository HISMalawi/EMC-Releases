<template>
  <ion-grid>
    <ion-row>
        <ion-col size="12">
          <ion-title class=" ion-text-center ion-margin-vertical"><b>Personal Details</b></ion-title>
          <ion-row class="ion-margin-bottom">
            <ion-col size="4">
              <ion-label>First Name (*): </ion-label>
              <ion-input 
                v-model="patient.givenName.value"
                placeholder="First Name" 
                class="ion-margin-top"
                :class="patient.givenName.hasErrors ? 'box-error' : 'box'" 
              />
            </ion-col>
            <ion-col size="4">
              <ion-label class="ion-padding-end">Middle Name: </ion-label>
              <ion-input 
                v-model="patient.middleName.value" 
                class="ion-margin-top" 
                placeholder="Middle Name"
                :class="patient.middleName.hasErrors ? 'box-error' : 'box'"
              />
            </ion-col>
            <ion-col size="4">
              <ion-label class="ion-padding-end">Family Name (*): </ion-label>
              <ion-input 
                v-model="patient.familyName.value" 
                class="ion-margin-top" 
                placeholder="Family Name"
                :class="patient.familyName.hasErrors ? 'box-error' : 'box'"
              />
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-bottom">
            <ion-col size="6">
              <ion-label>
                <span v-if="estimateAge">Estimage Age (*):</span>
                <span v-else>Date of Birth (*):</span>
                <span class="ion-float-right ion-margin-end checkbox-label">
                  Estimate Date of Birth
                  <ion-checkbox v-model="estimateAge"></ion-checkbox>
                </span>
              </ion-label>
              <ion-input
                v-if="estimateAge"
                v-model="patient.estimatedAge.value"
                class="ion-margin-top"
                :class="patient.birthdate.hasErrors ? 'box-error' : 'box'" 
                :min="1" 
                :max="120" 
                type="number" 
                placeholder="Enter age estimate" 
              />
              <ion-input 
                v-else
                v-model="patient.birthdate.value"
                class="ion-margin-top"
                :class="patient.birthdate.hasErrors ? 'box-error' : 'box'"
                type="date"
              />
            </ion-col>
            <ion-col size="6">
              <ion-label >Gender (*): </ion-label>
              <ion-select 
                class="ion-margin-top"
                :class="patient.gender.hasErrors ? 'box-error' : 'box'" 
                v-model="patient.gender.value"
                placeholder="select gender"
              >
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
              <ion-input 
                v-model="patient.cellphone.value" 
                :disabled="patient.cellphone.disabled" 
                placeholder="Cellphone Number" 
                class="ion-margin-top"
                :class="patient.cellphone.hasErrors ? 'box-error' : 'box'"
              />
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
              <ion-input 
                v-if="addCustomVillage" 
                v-model="patient.homeVillage.value" 
                placeholder="enter village" 
                class="ion-margin-top"
                :class="patient.homeVillage.hasErrors ? 'box-error' : 'box'"
              />
              <ion-select 
                class="ion-margin-top"
                :class="patient.homeVillage.hasErrors ? 'box-error' : 'box'"
                placeholder="Select Village" 
                v-model="patient.homeVillage.value" 
                v-else
              >
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
              <ion-input 
                v-if="addCustomLandmark" 
                v-model="patient.landmark.value" 
                placeholder="enter closest landmark or plot number" 
                class="ion-margin-top"
                :class="patient.landmark.hasErrors ? 'box-error' : 'box'"
              />
              <ion-select 
                class="ion-margin-top"
                :class="patient.landmark.hasErrors ? 'box-error' : 'box'"
                placeholder="Select Landmark" 
                v-model="patient.landmark.value" 
                v-else
              >
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
              <ion-input 
                v-model="guardian.givenName.value" 
                :disabled="guardian.givenName.disabled" 
                placeholder="First Name" 
                class="ion-margin-top" 
                :class="guardian.givenName.hasErrors ? 'box-error' : 'box'"
              />
            </ion-col>
            <ion-col size="4">
              <ion-label>Family Name (*): </ion-label>
              <ion-input 
                v-model="guardian.familyName.value" 
                :disabled="guardian.familyName.disabled" 
                class="ion-margin-top" 
                placeholder="Family Name" 
                :class="guardian.familyName.hasErrors ? 'box-error' : 'box'"
              />
            </ion-col>
            <ion-col size="4">
              <ion-label>
                Cellphone Number (*):
                <span class="ion-float-right ion-margin-end checkbox-label">
                  Cellphone Number Unknown? 
                  <ion-checkbox v-model="guardianPhoneUnknown"></ion-checkbox>
                </span>
              </ion-label>
              <ion-input 
                v-model="guardian.cellphone.value" 
                :disabled="guardian.cellphone.disabled" 
                placeholder="Cellphone Number" 
                class="ion-margin-top" 
                :class="guardian.cellphone.hasErrors ? 'box-error' : 'box'"
              />
            </ion-col>
          </ion-row>
          <ion-title class="ion-text-center ion-margin-top ion-padding-top errors" v-if="hasErrors">
            <b>All required fields (*) must be completed before proceeding.</b>
          </ion-title>
        </ion-col>
      </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCheckbox, IonCol, IonGrid, IonInput, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'
import { defineComponent, PropType, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'PatientRegistrationForm',
  props: {
    guardianDetails: {
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    patientDetails: {
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    hasErrors: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
  },
  emits: ["updatePatient", "updateGuardian"],
  setup(props, { emit }) {
    const estimateAge = ref(false)
    const guardianNotAvailable = ref(false)
    const addCustomVillage = ref(false)
    const addCustomLandmark = ref(false)
    const guardianPhoneUnknown = ref(false)
    const patientPhoneUnknown = ref(false)
    const guardian = reactive(props.guardianDetails)
    const patient = reactive(props.patientDetails)

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

    watch(guardian, newGuardian => emit("updateGuardian", newGuardian), {
      deep: true,
      immediate: true
    })

    watch(patient, newPatient => emit("updatePatient", newPatient), {
      deep: true,
      immediate: true
    })

    return {
      estimateAge,
      guardianNotAvailable,
      addCustomVillage,
      addCustomLandmark,
      guardianPhoneUnknown,
      patientPhoneUnknown,
      patient,
      guardian
    }
  },
})
</script>


<style scoped>
.box {
  border-color: #a3a3a3;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
}

.checkbox-label {
  color: rgb(67, 149, 204);
  font-weight: bold;
}

.errors {
  color: red;
}

.box-error {
  border-color: red;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
}
</style>
