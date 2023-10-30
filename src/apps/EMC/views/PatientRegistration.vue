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
          <ion-row class="ion-margin-top ion-margin-bottom">
            <ion-col size="4" class="ion-margin-top ion-margin-bottom">
              <TextInput v-model="patient.givenName" />
            </ion-col>
            <ion-col size="4" class="ion-margin-top ion-margin-bottom">
              <TextInput v-model="patient.middleName" />
            </ion-col>
            <ion-col size="4" class="ion-margin-top ion-margin-bottom">
              <TextInput v-model="patient.familyName" />
            </ion-col>
            <ion-col size="8" class="ion-margin-top ion-margin-bottom">
              <DateInput 
                v-model="patient.birthdate" 
                :allowEstimation="true"
                :estimationLabel="'Estimate Age'"
                minDate="1920-01-01"
                :maxDate="today"
                @isEstimated="(estimate: boolean) => isBirthdateEstimated = estimate"/>
            </ion-col>
            <ion-col size="4" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="patient.gender" :options="genderOptions" />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <TextInput v-model="patient.cellPhoneNumber" allowUnknown />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="patient.homeVillage" :asyncOptions="getVillagesByName" allowCustom />
            </ion-col>
            <ion-col size="12" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="patient.landmark" :options="landmarks" allowCustom />
            </ion-col>
          </ion-row>
          <ion-title class="ion-text-center ion-margin-vertical ion-padding-top">
            <b>Guardian details</b>
            <span class="ion-margin-start checkbox-label">
              Guardian Details Unknown?
              <ion-checkbox v-model="guardianAbsent"></ion-checkbox>
            </span>
          </ion-title>
          <ion-row class="ion-margin-top ion-margin-bottom">
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <TextInput v-model="guardian.givenName" />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <TextInput v-model="guardian.familyName" />
            </ion-col>
            <ion-col size="12" class="ion-margin-top ion-margin-bottom">
              <TextInput v-model="guardian.cellPhoneNumber" allowUnknown />
            </ion-col>
          </ion-row>
          <ion-button class="ion-margin-top ion-float-right" @click="onFinish" size="large" color="success">Finish</ion-button>
          <ion-button class="ion-margin-top ion-float-right" @click="onClear" size="large" color="warning">Clear</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { IonGrid, IonRow, IonCol,IonCheckbox } from "@ionic/vue";
import { alertConfirmation } from "@/utils/Alerts";
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from "@/components/Forms/FieldInterface";
import { LocationService } from "@/services/location_service";
import { isEmpty } from "lodash";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { useRouter } from "vue-router";
import { RelationsService } from "@/services/relations_service";
import { DTForm } from "../interfaces/dt_form_field";
import TextInput from "../Components/inputs/TextInput.vue";
import DateInput from "../Components/inputs/DateInput.vue";
import SelectInput from "../Components/inputs/SelectInput.vue";
import { getLandmarks, getVillagesByName } from "@/utils/HisFormHelpers/LocationFieldOptions";
import { isValidForm, resolveFormValues } from "../utils/form";
import { toUnderscores } from "@/utils/Strs";
import { loader } from "@/utils/loader";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../interfaces/emc_event";
import dayjs from "dayjs";
import { STANDARD_DATE_FORMAT } from "@/utils/Date";
import StandardValidations from "@/components/Forms/validations/StandardValidations";

export default defineComponent({
  components: {
    IonGrid,
    IonRow,
    IonCol,
    TextInput,
    DateInput,
    SelectInput,
    IonCheckbox,
  },
  setup() {
    const router = useRouter();
    const today = dayjs().format(STANDARD_DATE_FORMAT);
    const isBirthdateEstimated = ref(false);
    const guardianAbsent = ref(false);
    const landmarks = getLandmarks();
    const genderOptions = [
      { label: "Male", value: "M" },
      { label: "Female", value: "F" }
    ]
    const patient = reactive<DTForm>({
      givenName: {
        label: "First Name",
        value: "",
        placeholder: "Enter First Name",
        required: true,
        validation: (name) => StandardValidations.isName(name)
      },
      familyName: {
        label: "Last Name",
        value: "",
        placeholder: "Enter Last Name",
        required: true,
        validation: (name) => StandardValidations.isName(name)
      },
      middleName: {
        label: "Middle Name",
        value: "",
        placeholder: "Enter middle Name",
        validation: (name) => name && name.label ? StandardValidations.isName(name) : null
      },
      gender: {
        value: '',
        required: true,
        label: "Gender",
        placeholder: 'select gender'
      },
      birthdate: {
        value: '',
        label: 'Date of Birth',
        required: true,
      },
      cellPhoneNumber: {
        value: '',
        required: true,
        label: "Cellphone Number",
        placeholder: "Enter cellphone number e.g. 0991234567",
        validation: async (phone: Option) => phone.value !== 'Unknown' && Validation.isMWPhoneNumber(phone)
      },
      homeVillage: {
        value: '',
        label: "Home Village",
        placeholder: "Home Village",
        required: true,
      },
      landmark: {
        value: '',
        label: "Landmark",
        placeholder: "Closest Landmark or Plot Number",
        required: true,
      }
    })

    const guardian = reactive<DTForm>({
      givenName: {
        label: "First Name",
        value: "",
        placeholder: "Enter First Name",
        required: true,
        validation: (name) => StandardValidations.isName(name)
      },
      familyName: {
        label: "Last Name",
        value: "",
        placeholder: "Enter Last Name",
        required: true,
        validation: (name) => StandardValidations.isName(name)
      },
      cellPhoneNumber: {
        value: '',
        required: true,
        label: "Cellphone Number",
        placeholder: "Enter cellphone number e.g. 0991234567",
        validation: async (phone: Option) => phone.value !== 'Unknown' && Validation.isMWPhoneNumber(phone)
      },
    })

    watch(guardianAbsent, (isAbsent) => {
      if (isAbsent) {
        guardian.givenName.value = "Unknown"
        guardian.familyName.value = "Unknown"
        guardian.cellPhoneNumber.value = "Unknown"
        guardian.givenName.disabled = true
        guardian.familyName.disabled = true
        guardian.givenName.error = ""
        guardian.familyName.error = ""
        guardian.cellPhoneNumber.error = ""
      } else {
        guardian.givenName.value = ""
        guardian.familyName.value = ""
        guardian.cellPhoneNumber.value = ""
        guardian.givenName.disabled = false
        guardian.familyName.disabled = false
      }
    })

    const onClear = async () => {
      if((await alertConfirmation('Are you sure you want to clear all fields?'))) {
        for(const key in patient) {
          patient[key].value = undefined
          patient[key].error = ""
        }
        for(const key in guardian) {
          guardian[key].value = undefined
          guardian[key].error = ""
        }
        EventBus.emit(EmcEvents.ON_CLEAR);
      }
    }

    const resolvePerson = (client: DTForm, other = {} as Record<string, any>) => {
      const person: Record<string, any> = {
        'facility_name': null,
        'occupation': null,
      }
      for (const key in client) {
        person[toUnderscores(key)] = client[key]
      }
      return {...person, ...other}
    }

    const resolveAddress = async (village?: Option) => {  
      const TA = (isEmpty(village) || !village?.other?.traditional_authority_id)
        ? null
        : await LocationService.getTraditionalAuthorityById(village.other.traditional_authority_id)
      
      const district = isEmpty(TA) 
        ? null
        : await LocationService.getDistrictByID(TA[0].district_id)

      return {
        'home_district': isEmpty(district) ?  "N/A" : district[0].name,
        'home_traditional_authority': isEmpty(TA) ? "N/A" : TA[0].name ,
        'home_village': village?.label || "N/A",
        'current_district': isEmpty(district) ? "N/A" : district[0].name,
        'current_traditional_authority': isEmpty(TA) ? "N/A" : TA[0].name,
        'current_village': village?.label || "N/A" 
      }
    }

    const onFinish = async () => {
      const isPatientDetailsValid = await isValidForm(patient)
      const isGuardianDetailsValid = guardianAbsent.value ? true : await isValidForm(guardian)

      if(!(isPatientDetailsValid && isGuardianDetailsValid)) return 
      await loader.show("Saving...")
      try {
        const patientData = resolveFormValues(patient).formData
        const registrationService = new PatientRegistrationService()
        const address = await resolveAddress(patientData.homeVillage)
        const person = resolvePerson(patientData, {
          ...address,
          'isPatient': true,
          'patient_type': null,
          'gender': patientData.gender.value,
          'landmark': patientData.landmark.value,
          'birthdate_estimated': isBirthdateEstimated.value ? "Yes" : "No",
          'relationship': guardianAbsent.value ? "No" : "Yes",
        })
        await registrationService.createPerson(person)
        await registrationService.createPatient()
        const patientId = registrationService.getPersonID()
        if(!guardianAbsent.value && isGuardianDetailsValid) {
          const { formData: guardianData } = resolveFormValues(guardian)
          const address = await resolveAddress()
          const person = resolvePerson(guardianData, {
            ...address,
            'middle_name': "",
            'gender': "N/A",
            'birthdate': "N/A",
            'birthdate_estimated': "N/A",
            'landmark': "N/A",
            'relationship': "N/A",
            'patient_type': "",
            'isPatient': false,
            'patient_id': patientId
          })
          await registrationService.registerGuardian(person)
          const guardianId = registrationService.getPersonID()      
          await RelationsService.createRelation(patientId, guardianId, 13)
        }
        loader.hide()
        router.push(`/emc/registration/${patientId}/true`)
      } catch (error) {
        console.log(error)
        loader.hide()
      }
    }
 
    return {
      today,
      patient,
      guardian,
      landmarks,
      genderOptions,
      guardianAbsent,
      isBirthdateEstimated,
      onClear,
      onFinish, 
      getVillagesByName
    };
  },
});
</script>
