<template>
  <Layout>
    <ion-grid>
      <ion-row>
        <ion-col class="ion-margin-bottom">
          <h1>New Patient Registration</h1>
        </ion-col>
      </ion-row>
      <ion-row class="his-card">
        <template v-if="showForm">
          <keep-alive>
            <PatientRegistrationForm
              :patientDetails="patient"
              :guardianDetails="guardian"
              :hasErrors="hasErrors"
              @updatePatient="updatePatient"
              @updateGuardian="updateGuardian"
            />
          </keep-alive>
        </template>
        <template v-else>
          <ion-col size="12" class="ion-margin-vertical">
            <h1 class=" ion-text-center ion-margin-vertical"><b>Registration Summary</b></h1>
          </ion-col>          
          <ion-col size="12">
            <ion-list>
              <ion-item v-for="(item, index) in summaryData" :key="index">
                <ion-label style="display: flex; justify-content: space-between">
                  <span>{{ item.label }}</span>
                  <span><b>{{ item.value }}</b></span>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </template>
        <ion-col class="ion-margin-top" size="12">
          <ion-button class="searchBtn ion-float-end" @click="goNext" v-if="showForm">Next step</ion-button>
          <template v-else>
            <ion-button class="searchBtn ion-float-end" @click="onFinish" color="success">Finish</ion-button>
            <ion-button class="searchBtn ion-float-end" @click="onPrevious">Previous</ion-button>
          </template>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import { toastWarning } from "@/utils/Alerts";
import PatientRegistrationForm from "../Components/PatientRegistrationForm.vue";
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from "@/components/Forms/FieldInterface";
import HisDate from "@/utils/Date";

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    PatientRegistrationForm
},
  setup() {
    const showForm = ref(true)
    const hasErrors = ref(false)
    const patient = reactive<Record<string, any>>({
      givenName: {
        value: '',
        validation: (name: string) => Validation.validateSeries([
          () => Validation.isName(name),
          () => Validation.required(name)
        ]) 
      },
      familyName: {
        value: '',
        validation: (name: string) => Validation.validateSeries([
          () => Validation.isName(name),
          () => Validation.required(name)
        ])        
      },
      middleName: {
        value: '',
        validation: (name: string) => name.length && Validation.isName(name)
      },
      gender: {
        value: '',
        validation: (gender: string) => Validation.isName(gender)
      },
      birthdate: {
        value: '',
        validation: (date: string) => Validation.required(date)
      },
      estimatedBirthdate: {
        value: '',
        validation: (age: string) => Validation.required(age)
      },
      cellphone: {
        value: '',
        validation: (phone: string) => Validation.validateSeries([
          () => Validation.isMWPhoneNumber(phone),
          () => Validation.required(phone)
        ])
      },
      homeVillage: {
        value: '',
        validation: (name: string) => Validation.validateSeries([
          () => Validation.isName(name),
          () => Validation.required(name)
        ])
      },
      landmark: {
        value: '',
        validation: (name: string) => Validation.validateSeries([
          () => Validation.isName(name),
          () => Validation.required(name)
        ])
      },
    })

    const guardian = reactive<Record<string, any>>({
      givenName: {
        value: '',
        validation: (name: string) => Validation.validateSeries([
          () => Validation.isName(name),
          () => Validation.required(name)
        ])
      },
      familyName: {
        value: '',
        validation: (name: string) => Validation.validateSeries([
          () => Validation.isName(name),
          () => Validation.required(name)
        ])
      },
      cellphone: {
        value: '',
        validation: (phone: string) => Validation.validateSeries([
          () => Validation.isMWPhoneNumber(phone),
          () => Validation.required(phone)
        ])
      },
    })

    const summaryData = computed<Option[]>(() => {
      const birthdate = patient.birthdate.value 
        ? HisDate.toStandardHisDisplayFormat(patient.birthdate.value)
        : HisDate.toStandardHisDisplayFormat(
          HisDate.estimateDateFromAge(patient.estimatedBirthdate.value)
        )

      return [
        { label: 'Name', value: `${patient.givenName.value} ${patient.middleName.value} ${patient.familyName.value}`.trim()},
        { label: 'Birthdate' , value: birthdate },
        { label: 'Gender', value: patient.gender.value },
        { label: "Cellphone", value: patient.cellphone.value },
        { label: "Physical address", value: `${patient.homeVillage.value} near ${patient.landmark.value}`},
        { label: "Guardian name", value: `${guardian.givenName.value} ${guardian.familyName.value}`},
        { label: "Guardian cellphone", value: guardian.cellphone.value}
      ]
    })
    const updateGuardian = (newGauardian: Record<string, any>) => {
      Object.assign(guardian, newGauardian)
    }
    
    const updatePatient = (newPatient: Record<string, any>) => {
      Object.assign(patient, newPatient)
    }

    const isClientDetailsInvalid = (client: Record<string, any>) => {
      let isInvalid = false;
      for (const key in client){
        if(key === 'birthdate' || key === 'estimatedBirthdate') {
          client[key].hasErrors = (client.birthdate.value || client.estimatedBirthdate.value) ? null : ['Required birthdate']
          isInvalid = !client.birthdate.hasErrors
        } else if(client[key].value !== 'Unknown'){
          const errs = client[key].validation({value: client[key].value, label: ''})
          if(errs) {
            client[key].hasErrors = true,
            isInvalid = true
          } else {
            client[key].hasErrors = false
          }
        } else {
          client[key].hasErrors = false
        }      
      }
      return isInvalid
    }

    const goNext = () => {
      // double negation to force execution of all conditions
      hasErrors.value = !(!isClientDetailsInvalid(patient) || !isClientDetailsInvalid(guardian))
      console.log(hasErrors.value)
      showForm.value = hasErrors.value
    }

    const onFinish = () => {
      console.log(patient, guardian)
    }

    const onPrevious = () => {
      showForm.value = true
    }
 
    return {
      summaryData,
      patient,
      guardian,
      hasErrors,
      showForm,
      updatePatient,
      updateGuardian,
      goNext,
      onFinish,
      onPrevious
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
