<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Guadian Demographics</ion-title>
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
        <ion-col size="12" class="ion-margin-top ion-margin-bottom">
          <TextInput v-model="guardian.givenName" />
        </ion-col>
        <ion-col size="12" class="ion-margin-top ion-margin-bottom">
          <TextInput v-model="guardian.familyName" />
        </ion-col>
        <ion-col size="12" class="ion-margin-top ion-margin-bottom">
          <TextInput v-model="guardian.cellPhoneNumber" allowUnknown />
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
import { defineComponent, reactive } from "vue";
import { IonGrid, IonRow, IonCol, modalController } from "@ionic/vue";
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from "@/components/Forms/FieldInterface";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { DTForm } from "@/apps/EMC/interfaces/dt_form_field";
import TextInput from "../inputs/TextInput.vue";
import { isValidForm, resolveFormValues } from "@/apps/EMC/utils/form";
import { loader } from "@/utils/loader";
import { toUnderscores } from "@/utils/Strs";
import { RelationsService } from "@/services/relations_service";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../../interfaces/emc_event";

export default defineComponent({
  components: {
    IonGrid,
    IonRow,
    IonCol,
    TextInput,
  },
  props: {
    patientId: {
      type: Number,
      required: true,
    }
  },
  setup(props) {    
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
        validation: async (phone: Option) => {
          return phone.value !== 'Unknown' && Validation.isMWPhoneNumber(phone)
        }
      },
    })

    const closeModal = (data?: any) => {
      modalController.dismiss(data);
    };

    const onFinish = async () => {
      await loader.show("Processing...");
      if(!(await isValidForm(guardian))) return
      try {
        const { formData } = resolveFormValues(guardian)
        const person: Record<string, any> = {
          'home_district': "N/A",
          'home_traditional_authority': "N/A",
          'home_village': "N/A",
          'current_district': "N/A",
          'current_traditional_authority': "N/A",
          'current_village': "N/A",
          'middle_name': "",
          'gender': "N/A",
          'birthdate': "N/A",
          'birthdate_estimated': "N/A",
          'landmark': "N/A",
          'relationship': "N/A",
          'patient_type': "",
          'isPatient': false,
          'patient_id': props.patientId
        };
        for (const key in formData) {
          person[toUnderscores(key)] = formData[key]
        }

        const registrationService = new PatientRegistrationService()
        await registrationService.registerGuardian(person)
        const guardianId = registrationService.getPersonID()      
        await RelationsService.createRelation(props.patientId, guardianId, 13)
        await loader.hide();
        closeModal();
        EventBus.emit(EmcEvents.RELOAD_GUARDIAN_DATA)
      } catch (error) {
        await loader.hide();
        console.log(error)
      } 
    }
 
    return {
      guardian,
      closeModal,
      onFinish,
    };
  },
});
</script>
