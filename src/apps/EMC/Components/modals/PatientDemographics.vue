<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Edit Patient Demographics</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal">
          <ion-icon slot="icon-only" name="close"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col size="4" class="ion-margin-top ion-margin-bottom">
          <TextInput v-model="patient.givenName" />
        </ion-col>
        <ion-col size="4" class="ion-margin-top ion-margin-bottom">
          <TextInput v-model="patient.middleName" />
        </ion-col>
        <ion-col size="4" class="ion-margin-top ion-margin-bottom">
          <TextInput v-model="patient.familyName" />
        </ion-col>
        <ion-col size="12" class="ion-margin-top ion-margin-bottom">
          <DateInput 
            v-model="patient.birthdate" 
            :allowEstimation="true"
            :estimationLabel="'Estimate Age'"
            minDate="1900-01-01"
            @isEstimated="(estimate) => isBirthdateEstimated = estimate"/>
        </ion-col>
        <ion-col size="12" class="ion-margin-top ion-margin-bottom">
          <SelectInput v-model="patient.gender" :options="genderOptions" />
        </ion-col>
        <ion-col size="12" class="ion-margin-top ion-margin-bottom">
          <TextInput v-model="patient.cellPhoneNumber" allowUnknown />
        </ion-col>
        <ion-col size="12" class="ion-margin-top ion-margin-bottom">
          <SelectInput v-model="patient.homeVillage" :asyncOptions="getVillagesByName" allowCustom searchable />
        </ion-col>
        <ion-col size="12" class="ion-margin-top ion-margin-bottom">
          <SelectInput v-model="patient.landmark" :options="landmarks" allowCustom searchable />
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="closeModal" slot="end">Close</ion-button>
      <ion-button class="ion-margin-end" color="success" @click="onFinish" slot="end">Save</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { IonGrid, IonRow, IonCol, loadingController, modalController } from "@ionic/vue";
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from "@/components/Forms/FieldInterface";
import { LocationService } from "@/services/location_service";
import { isEmpty } from "lodash";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { useRouter } from "vue-router";
import { DTForm } from "@/apps/EMC/interfaces/dt_form_field";
import TextInput from "../inputs/TextInput.vue";
import DateInput from "../inputs/DateInput.vue";
import SelectInput from "../inputs/SelectInput.vue";
import { getLandmarks, getVillagesByName } from "@/utils/HisFormHelpers/LocationFieldOptions";
import { isValidForm, resolveFormValues } from "@/apps/EMC/utils/form";
import { Patientservice } from "@/services/patient_service";
import { loader } from "@/utils/loader";

export default defineComponent({
  components: {
    IonGrid,
    IonRow,
    IonCol,
    TextInput,
    DateInput,
    SelectInput,
  },
  props: {
    patientService: {
      type: Object as PropType<Patientservice>,
      required: true,
    }
  },
  setup(props) {
    const router = useRouter();
    const isBirthdateEstimated = ref(false);
    const landmarks = getLandmarks();
    const genderOptions: Option[] = [
      { label: "Male", value: "M" },
      { label: "Female", value: "F" }
    ]
    const patient = reactive<DTForm>({
      givenName: {
        label: "First Name",
        value: props.patientService.getGivenName(),
        placeholder: "First Name",
        required: true,
        error: "",
      },
      familyName: {
        label: "last Name",
        value: props.patientService.getFamilyName(),
        placeholder: "Last Name",
        required: true
      },
      middleName: {
        label: "middle Name",
        value: props.patientService.getMiddleName(),
        placeholder: "middle Name",
      },
      gender: {
        value: props.patientService.getGender(),
        required: true,
        label: "Gender",
        placeholder: 'select gender'
      },
      birthdate: {
        value:props.patientService.getBirthdate(),
        label: 'Date of Birth',
        placeholder: 'Date of Birth',
        required: true,
      },
      cellPhoneNumber: {
        value: props.patientService.getPhoneNumber(),
        required: true,
        label: "Cellphone Number",
        placeholder: "cellphone number e.g. 0991234567",
        validation: async (phone: Option) => !(phone.value === 'Unknown' || phone.value === 'N/A') && Validation.isMWPhoneNumber(phone)
      },
      homeVillage: {
        value: props.patientService.getCurrentVillage(),
        label: "Home Village",
        placeholder: "Home Village",
        required: true,
      },
      landmark: {
        value: props.patientService.getClosestLandmark(),
        label: "Landmark",
        placeholder: "Closest Landmark or Plot Number",
        required: true,
      }
    })

    const closeModal = (data?: any) => {
      modalController.dismiss(data);
    };


    const resolveAddress = async (villageId: number) => {
      const village = await LocationService.getVillage(villageId)
      const TA = isEmpty(village)
        ? null
        : await LocationService.getTraditionalAuthorityById(village.traditional_authority_id)
      
      const district = isEmpty(TA) 
        ? null
        : await LocationService.getDistrictByID(TA[0].district_id)

      return {
        'current_district': isEmpty(district) ? "N/A" : district[0].name,
        'current_traditional_authority': isEmpty(TA) ? "N/A" : TA[0].name,
        'current_village': village.value || "N/A" 
      }
    }

    const onFinish = async () => {
      await loader.show("Updating patient...");
      if(!(await isValidForm(patient))) return
      try {
        const { formData } = resolveFormValues(patient)
        const updatedPatient = {} as any;
        if(formData.givenName !== props.patientService.getGivenName()) updatedPatient["given_name"] = formData.givenName;
        if(formData.familyName !== props.patientService.getFamilyName()) updatedPatient["family_name"] = formData.familyName;
        if(formData.middleName !== props.patientService.getMiddleName()) updatedPatient["middle_name"] = formData.middleName;
        if(formData.birthdate !== props.patientService.getBirthdate()) updatedPatient["birthdate"] = formData.birthdate;
        if(formData.cellPhoneNumber !== props.patientService.getPhoneNumber()) updatedPatient["cell_phone_number"] = formData.cellPhoneNumber;
        if(formData.landmark !== props.patientService.getClosestLandmark()) updatedPatient["landmark"] = formData.landmark;
        if(formData.homeVillage !== props.patientService.getCurrentVillage()) {
          Object.assign(updatedPatient, {
            ...updatedPatient,
            ...resolveAddress(formData.homeVillage)
          })
        }
        if(!isEmpty(updatedPatient)) {
          const person = new PatientRegistrationService();
          person.setPersonID(props.patientService.getID());
          await person.updatePerson(updatedPatient);
        }
        await loader.hide();
        closeModal(true);
      } catch (error) {
        await loader.hide();
        console.log(error)
      } 
    }
 
    return {
      patient,
      landmarks,
      genderOptions,
      isBirthdateEstimated,
      closeModal,
      onFinish, 
      getVillagesByName
    };
  },
});
</script>
