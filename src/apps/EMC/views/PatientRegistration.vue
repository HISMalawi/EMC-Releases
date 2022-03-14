<template>
  <Layout>
    <ion-grid>
      <ion-row>
        <ion-col class="ion-margin-bottom">
          <h1>New Patient Registration</h1>
        </ion-col>
      </ion-row>
      <ion-row class="his-card">
        <keep-alive>
          <PatientRegistrationForm
            :patientDetails="patient"
            :guardianDetails="guardian"
            :hasErrors="hasErrors"
            @updatePatient="updatePatient"
            @updateGuardian="updateGuardian"
          />
        </keep-alive>
        <ion-col class="ion-margin-top" size="12">
          <ion-button class="searchBtn ion-float-end" @click="goNext">Next step</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import { toastWarning } from "@/utils/Alerts";
import PatientRegistrationForm from "../Components/PatientRegistrationForm.vue";
import Validation from "@/components/Forms/validations/StandardValidations"

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    PatientRegistrationForm
},
  setup() {
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
        day: '',
        month: '',
        year: '',
        age: '',
        validation: (dateOrAge: string) => Validation.required(dateOrAge)
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

    const updateGuardian = (newGauardian: Record<string, any>) => {
      Object.assign(guardian, newGauardian)
    }
    
    const updatePatient = (newPatient: Record<string, any>) => {
      Object.assign(patient, newPatient)
    }

    const isClientDetailsInvalid = (client: Record<string, any>) => {
      let isInvalid = false;
      for (const key in client){
        if(key === 'birthdate') {
          client.birthdate.hasErrors = (!client.birthdate.day || !client.birthdate.month || !client.birthdate.year) && !client.birthdate.age
          isInvalid = !!client.birthdate.hasErrors
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
    }

    return {
      patient,
      guardian,
      hasErrors,
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
