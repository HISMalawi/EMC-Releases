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
          <PatientRegistrationForm
            :patientDetails="patient"
            :guardianDetails="guardian"
            :hasErrors="hasErrors"
            :isBirthdateEstimated="isBirthdateEstimated"
            @updatePatient="updatePatient"
            @updateGuardian="updateGuardian"
            @estimateBirthdate="updateBirthdateEstimated"
          />
          <ion-button class="ion-margin-top ion-float-end" @click="onFinish" size="large" color="success">Finish</ion-button>
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

interface DTInputField {
  value: string;
  required?: boolean;
  validation?: (option: Option, formData?: Record<string, DTInputField>) => string[] | null;
  hasErrors?: boolean;
  other?: any;
}

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
    const isBirthdateEstimated = ref(false)
    const isInRange = (value: number | string, min: number, max: number) => {
      if(!value) return false
      if(typeof value === 'string') value = parseInt(value)
      return (value >= min && value <= max)
    }
    const patient = reactive<Record<string, DTInputField>>({
      givenName: {
        value: '',
        required: true
      },
      familyName: {
        value: '',
        required: true
      },
      middleName: {
        value: '',
      },
      gender: {
        value: '',
        required: true
      },
      birthDay: {
        value: '',
        validation: (day: Option, formData: any) => {
          const maxDay = (
            formData.birthYear.value >= HisDate.getCurrentYear() && 
            formData.birthMonth.value >= (HisDate.getCurrentMonth() + 1)
          ) ? HisDate.getCurrentDay() : 31
          if(!day.other.estimated && isInRange(day.value, 1, maxDay)){
            return null
          }
          return ['Invalid month']
        }
      },
      birthMonth: {
        value: '',
        validation: (month: Option, formData: any) => {
          const maxMonth = formData.birthYear.value >= HisDate.getCurrentYear() 
            ? HisDate.getCurrentMonth() + 1 
            : 12
          if(!month.other.estimated && isInRange(month.value, 1, maxMonth)){
            return null
          }
          return ['Invalid month']
        }
      },
      birthYear: {
        value: '',
        validation: (year: Option) => {
          const maxYear = (new Date).getFullYear()
          if(!year.other.estimated && isInRange(year.value, 1, maxYear)){
            return null
          }
          return ['Invalid month']
        }
      },
      estimatedBirthdate: {
        value: '',
        validation: (age: Option) => {
          if(age.other.estimated && (!age.value || isInRange(age.value, 1, 120))) {
            return ['Invalid age estimate']
          }
          return null
        }
      },
      cellphone: {
        value: '',
        required: true,
        validation: (phone: Option) => Validation.isMWPhoneNumber(phone)
      },
      homeVillage: {
        value: '',
        required: true,
      },
      landmark: {
        value: '',
        required: true,
      }
    })

    const guardian = reactive<Record<string, DTInputField>>({
      givenName: {
        value: '',
        required: true,
      },
      familyName: {
        value: '',
        required: true,
      },
      cellphone: {
        value: '',
        required: true,
        validation: (phone: Option) => Validation.isMWPhoneNumber(phone)
      },
    })

    const updateGuardian = (newGauardian: Record<string, any>) => {
      Object.assign(guardian, newGauardian)
    }
    
    const updatePatient = (newPatient: Record<string, any>) => {
      Object.assign(patient, newPatient)
    }

    const updateBirthdateEstimated = (value: boolean) => {
      isBirthdateEstimated.value = value
    }

    const isClientDetailsInvalid = (client: Record<string, any>) => {
      let isInvalid = false;
      for (const key in client){
        let errors: string[] | null = null
        if(client[key].value !== 'Unknown' && typeof client[key].validation === 'function') {
          const option = {
            value: client[key].value, 
            label: '',
            other: { estimated: isBirthdateEstimated.value }
          }
          errors = client[key].validation(option, client)
        } 
        if ((client[key].required && !client[key].value) || errors) {
          client[key].hasErrors = true,
          isInvalid = true
        } else {
          client[key].hasErrors = false
        }      
      }
      return isInvalid
    }

    const onFinish = () => {
      // double negation to force execution of all conditions
      hasErrors.value = !(!isClientDetailsInvalid(patient) || !isClientDetailsInvalid(guardian))
    }
 
    return {
      patient,
      guardian,
      hasErrors,
      isBirthdateEstimated,
      updateBirthdateEstimated,
      updatePatient,
      updateGuardian,
      onFinish,
    };
  },
});
</script>
