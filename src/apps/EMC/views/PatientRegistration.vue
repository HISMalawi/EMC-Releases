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
                @isEstimated="(estimate: boolean) => isBirthdateEstimated = estimate"/>
            </ion-col>
            <ion-col size="4" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="patient.gender" :options="genderOptions" />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <TextInput v-model="patient.cellPhoneNumber" allowUnknown />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="patient.homeVillage" :asyncOptions="getVillagesByName" allowCustom searchable />
            </ion-col>
            <ion-col size="12" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="patient.landmark" :options="landmarks" allowCustom searchable />
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
          <ion-button class="ion-margin-top ion-float-end" @click="onFinish" size="large" color="success">Finish</ion-button>
          <ion-button class="ion-margin-top ion-float-end" @click="onClear" size="large" color="warning">Clear</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol,IonCheckbox, loadingController } from "@ionic/vue";
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

export default defineComponent({
  components: {
    Layout,
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
        placeholder: "First Name",
        required: true,
        error: "",
      },
      familyName: {
        label: "last Name",
        value: "",
        placeholder: "Last Name",
        required: true
      },
      middleName: {
        label: "middle Name",
        value: "",
        placeholder: "middle Name",
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
        placeholder: 'Date of Birth',
        required: true,
      },
      cellPhoneNumber: {
        value: '',
        required: true,
        label: "Cellphone Number",
        placeholder: "cellphone number e.g. 0991234567",
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
        placeholder: "First Name",
        required: true,
      },
      familyName: {
        label: "Last Name",
        value: "",
        placeholder: "Last Name",
        required: true,
      },
      cellPhoneNumber: {
        value: '',
        required: true,
        label: "Cellphone Number",
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
      const confirm = await alertConfirmation('Are you sure you want to clear all fields?')
      if(confirm) {
        for(const key in patient) {
          patient[key].value = undefined
          patient[key].error = ""
        }
        for(const key in guardian) {
          guardian[key].value = undefined
          guardian[key].error = ""
        }
      }
    }

    const resolvePerson = (client: DTForm, other = {} as Record<string, any>) => {
      const person: Record<string, any> = {
        ...other,
        'facility_name': null,
        'occupation': null,
      }
      for (const key in client) {
        person[toUnderscores(key)] = client[key]
      }
      return person
    }

    const resolveAddress = async (villageId?: number) => {
      const village = villageId ? await LocationService.getVillage(villageId) : {}
      const TA = isEmpty(village)
        ? null
        : await LocationService.getTraditionalAuthorityById(village.traditional_authority_id)
      
      const district = isEmpty(TA) 
        ? null
        : await LocationService.getDistrictByID(TA[0].district_id)

      return {
        'home_district': isEmpty(district) ?  "N/A" : district[0].name,
        'home_traditional_authority': isEmpty(TA) ? "N/A" : TA[0].name ,
        'home_village': village.name || "N/A",
        'current_district': isEmpty(district) ? "N/A" : district[0].name,
        'current_traditional_authority': isEmpty(TA) ? "N/A" : TA[0].name,
        'current_village': village.value || "N/A" 
      }
    }

    const onFinish = async () => {
      const loader = await loadingController.create({
        message: 'Processing data...'
      });
      await loader.present();
      if(!(await isValidForm(patient) || (!guardianAbsent.value && await isValidForm(guardian)))) {
        return await loader.dismiss()
      } 
      try {
        const { formData: patientData } = resolveFormValues(patient)
        const registrationService = new PatientRegistrationService()
        const address = await resolveAddress(patientData.homeVillage)
        const person = resolvePerson(patientData, {
          birthdate :patientData.birthdate,
          ...address,
          'isPatient': true,
          'patient_type': null,
          'birthdate_estimated': isBirthdateEstimated.value ? "Yes" : "No",
          'relationship': guardianAbsent.value ? "No" : "Yes",
        })
        await registrationService.createPerson(person)
        await registrationService.createPatient()
        const patientId = registrationService.getPersonID()
        if(!guardianAbsent.value) {
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
        await loader.dismiss()
        router.push(`/emc/registration/${patientId}/true`)
      } catch (error) {
        console.log(error)
        await loader.dismiss()
      }
    }
 
    return {
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
