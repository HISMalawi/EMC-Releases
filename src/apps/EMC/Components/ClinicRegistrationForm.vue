<template>
  <ion-grid>
    <ion-row>
        <ion-col size="12">
          <ion-title class=" ion-text-center ion-margin-vertical"><b>HIV Clinic Registration</b></ion-title>
          <ion-row class="ion-margin-bottom">
            <ion-col size="6">
              <ion-label>ARV Number (*): </ion-label>
              <ion-input 
                id="arv-number"
                v-model="patient.givenName.value"
                placeholder="First Name" 
                class="ion-margin-top"
                :class="patient.givenName.hasErrors ? 'box-error' : 'box'" 
              />
            </ion-col>
             <ion-col size="6">
              <ion-label>
                <span>Initial Visit Date (*):</span>
              </ion-label>
              <ion-row style="width: 100%; padding-top: .5rem;">
                <ion-col size="4">
                  <ion-input 
                    v-model="patient.birthDay.value"
                    :min="1"
                    :max="31"
                    :class="patient.birthDay.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="DD"
                  />
                </ion-col>
                <ion-col size="4">
                  <ion-input
                    v-model="patient.birthMonth.value"
                    :min="1"
                    :max="12"
                    :class="patient.birthMonth.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="MM"
                  />
                </ion-col>
                <ion-col size="4">
                  <ion-input 
                    v-model="patient.birthYear.value"
                    :min="1900"
                    :class="patient.birthYear.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="YYYY"
                  />
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-bottom">
            <ion-col size="6">
              <ion-label >Agrees to follow up? (*): </ion-label>
              <searchable-select-input
                class="ion-margin-top"
                placeholder="Select Option"
                :value="patient.gender.value"
                :class="patient.gender.hasErrors ? 'box-error' : 'box'"
                :options="genderOptions"
                :searchable="false"
                @onSelect="setPatientGender"
              />
            </ion-col>
            <ion-col size="6">
              <ion-label >Ever received ARVs for treatment or prophylaxis? (*): </ion-label>
              <searchable-select-input
                class="ion-margin-top"
                placeholder="Select Option"
                :value="patient.gender.value"
                :class="patient.gender.hasErrors ? 'box-error' : 'box'"
                :options="genderOptions"
                :searchable="false"
                @onSelect="setPatientGender"
              />
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-bottom" v-show="true">
            <ion-col size="6">
              <ion-label>
                <span>Date last taken ARVs (*):</span>
              </ion-label>
              <ion-row style="width: 100%; padding-top: .5rem;">
                <ion-col size="4">
                  <ion-input 
                    v-model="patient.birthDay.value"
                    :min="1"
                    :max="31"
                    :class="patient.birthDay.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="DD"
                  />
                </ion-col>
                <ion-col size="4">
                  <ion-input
                    v-model="patient.birthMonth.value"
                    :min="1"
                    :max="12"
                    :class="patient.birthMonth.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="MM"
                  />
                </ion-col>
                <ion-col size="4">
                  <ion-input 
                    v-model="patient.birthYear.value"
                    :min="1900"
                    :class="patient.birthYear.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="YYYY"
                  />
                </ion-col>
              </ion-row>
            </ion-col>
            <ion-col size="6">
              <ion-label>
                Ever registred at an ART clinic (*):
              </ion-label>
              <searchable-select-input
                class="ion-margin-top"
                placeholder="Select Option"
                :value="patient.homeVillage.value"
                :class="patient.homeVillage.hasErrors ? 'box-error' : 'box'"
                :asyncOptions="getVillagesByName"
                @onSelect="setPatientVillage"
              />
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-bottom" v-show="true">
            <ion-col size="6">
              <ion-label>
                Location of ART Initiation (*):
                <span class="ion-float-right ion-margin-end checkbox-label">
                  Location Unknown? 
                  <ion-checkbox v-model="guardianPhoneUnknown"></ion-checkbox>
                </span>
              </ion-label>
              <searchable-select-input
                class="ion-margin-top"
                placeholder="Select Location"
                :value="patient.homeVillage.value"
                :class="patient.homeVillage.hasErrors ? 'box-error' : 'box'"
                :asyncOptions="getVillagesByName"
                @onSelect="setPatientVillage"
              />
            </ion-col>
            <ion-col size="6">
              <ion-label>
                <span>Date started ART (*):</span>
              </ion-label>
              <ion-row style="width: 100%; padding-top: .5rem;">
                <ion-col size="4">
                  <ion-input 
                    v-model="patient.birthDay.value"
                    :min="1"
                    :max="31"
                    :class="patient.birthDay.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="DD"
                  />
                </ion-col>
                <ion-col size="4">
                  <ion-input
                    v-model="patient.birthMonth.value"
                    :min="1"
                    :max="12"
                    :class="patient.birthMonth.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="MM"
                  />
                </ion-col>
                <ion-col size="4">
                  <ion-input 
                    v-model="patient.birthYear.value"
                    :min="1900"
                    :class="patient.birthYear.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="YYYY"
                  />
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-bottom" v-show="true">
            <ion-col size="6">
              <ion-label>
                Initial Vitals (*):
                <span class="ion-float-right ion-margin-end checkbox-label">
                  Vitals Unknown? 
                  <ion-checkbox v-model="guardianPhoneUnknown"></ion-checkbox>
                </span>
              </ion-label>
              <ion-row style="width: 100%; padding-top: .5rem;">
                <ion-col size="6">
                  <ion-input 
                    v-model="patient.birthDay.value"
                    :min="1"
                    :max="31"
                    :class="patient.birthDay.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="Enter Height"
                  />
                </ion-col>
                <ion-col size="6">
                  <ion-input
                    v-model="patient.birthMonth.value"
                    :min="1"
                    :max="12"
                    :class="patient.birthMonth.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="Enter Height"
                  />
                </ion-col>
              </ion-row>
            </ion-col>
            <ion-col size="6">
              <ion-label>
                <span>Initial TB Status (*):</span>
              </ion-label>
              <searchable-select-input
                class="ion-margin-top"
                placeholder="Select Option"
                :value="patient.homeVillage.value"
                :class="patient.homeVillage.hasErrors ? 'box-error' : 'box'"
                :asyncOptions="getVillagesByName"
                @onSelect="setPatientVillage"
              />
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-bottom">
            <ion-col size="4">
              <ion-label >Confirmatory Test (*): </ion-label>
              <searchable-select-input
                class="ion-margin-top"
                placeholder="Select Option"
                :value="patient.gender.value"
                :class="patient.gender.hasErrors ? 'box-error' : 'box'"
                :options="genderOptions"
                :searchable="false"
                @onSelect="setPatientGender"
              />
            </ion-col>
            <ion-col size="4">
              <ion-label>
                Location of Confirmatory (*):
                <span class="ion-float-right ion-margin-end checkbox-label">
                  Location Unknown? 
                  <ion-checkbox v-model="patientPhoneUnknown"></ion-checkbox>
                </span>
              </ion-label>
              <searchable-select-input
                class="ion-margin-top"
                placeholder="Select Option"
                :value="patient.gender.value"
                :class="patient.gender.hasErrors ? 'box-error' : 'box'"
                :options="genderOptions"
                :searchable="false"
                @onSelect="setPatientGender"
              />
            </ion-col>
            <ion-col size="4">
              <ion-label>
                <span>Confirmatory HIV Test Date (*):</span>
              </ion-label>
              <ion-row style="width: 100%; padding-top: .5rem;">
                <ion-col size="4">
                  <ion-input 
                    v-model="patient.birthDay.value"
                    :min="1"
                    :max="31"
                    :class="patient.birthDay.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="DD"
                  />
                </ion-col>
                <ion-col size="4">
                  <ion-input
                    v-model="patient.birthMonth.value"
                    :min="1"
                    :max="12"
                    :class="patient.birthMonth.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="MM"
                  />
                </ion-col>
                <ion-col size="4">
                  <ion-input 
                    v-model="patient.birthYear.value"
                    :min="1900"
                    :class="patient.birthYear.hasErrors ? 'box-error' : 'box'"
                    type="number"
                    placeholder="YYYY"
                  />
                </ion-col>
              </ion-row>
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
import { IonCheckbox, IonCol, IonGrid, IonInput, IonRow } from '@ionic/vue'
import { computed, defineComponent, PropType, reactive, ref, watch } from 'vue'
import { getLandmarks, getVillagesByName } from "@/utils/HisFormHelpers/LocationFieldOptions";
import SearchableSelectInput from './inputs/SearchableSelectInput.vue'
import { Option } from '@/components/Forms/FieldInterface';

export default defineComponent({
  name: 'PatientRegistrationForm',
  props: {
    isBirthdateEstimated: {
      type: Boolean,
      default: false
    },
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
    IonCheckbox,
    SearchableSelectInput
},
  emits: ["updatePatient", "updateGuardian", "estimateBirthdate"],
  setup(props, { emit }) {
    const estimateAge = computed({
      get: () => props.isBirthdateEstimated,
      set: (value) => emit("estimateBirthdate", value)
    })
    const genderOptions = [
      { label: "Male", value: "M" },
      { label: "Female", value: "F"}
    ]
    const landmarks = getLandmarks()
    const guardianNotAvailable = ref(false)
    const addCustomVillage = ref(false)
    const addCustomLandmark = ref(false)
    const guardianPhoneUnknown = ref(false)
    const patientPhoneUnknown = ref(false)
    const guardian = reactive(props.guardianDetails)
    const patient = reactive(props.patientDetails)

    const setPatientLandmark = (option: Option) => {
      patient.landmark.value = option.label
      patient.landmark.other = option.other
    }

    const setPatientVillage = (option: Option) => {
      patient.homeVillage.value = option.label
      patient.homeVillage.other = option.other
    }

    const setPatientGender = (option: Option) => {
      patient.gender.value = option.label
      patient.gender.other = option
    }

    watch(guardianNotAvailable, (isNotAvailable) =>{
      for (const key in guardian) {
        guardian[key].value = isNotAvailable ? 'Unknown' : '' 
        guardian[key].disabled = isNotAvailable
      }
    })

    watch(guardianPhoneUnknown, (isUnknown) => {
      guardian.cellPhoneNumber.value = isUnknown ? 'Unknown' : ''
      guardian.cellPhoneNumber.disabled = isUnknown
    })

    watch(patientPhoneUnknown, (isUnknown) => {
      patient.cellPhoneNumber.value = isUnknown ? 'Unknown' : ''
      patient.cellPhoneNumber.disabled = isUnknown
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
      guardian,
      landmarks,
      genderOptions,
      getVillagesByName,
      setPatientLandmark,
      setPatientVillage,
      setPatientGender
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
