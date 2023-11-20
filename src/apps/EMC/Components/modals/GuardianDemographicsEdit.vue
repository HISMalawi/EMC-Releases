<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Edit Guadian Demographics</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="modal.hide()">
          <ion-icon slot="icon-only" name="close"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col size="12" class="ion-margin-top ion-margin-bottom">
          <SelectInput v-model="guardian.givenName" :options="guardianOptions" />
        </ion-col>
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
      <ion-button color="primary" @click="modal.hide()" slot="end">Close</ion-button>
      <ion-button class="ion-margin-end" color="success" @click="onFinish" slot="end">Save</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts" setup>
import { reactive, defineProps } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from "@/components/Forms/FieldInterface";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { DTForm, DTFormField } from "@/apps/EMC/interfaces/dt_form_field";
import TextInput from "../inputs/TextInput.vue";
import { submitForm } from "@/apps/EMC/utils/form";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../../interfaces/emc_event";
import { modal } from "@/utils/modal";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { GuardianDetails } from "@/interfaces/relationship";
import SelectInput from "../inputs/SelectInput.vue";

const props = defineProps<{guardians: Array<GuardianDetails>}>();

const guardianOptions = props.guardians.map(g => ({
  label: `${g.name} (${g.relationshipType})`,
  value: g.name,
  other: g
}));

const activeGuardian = reactive<DTFormField>({
  label: "Select Guardian",
  placeholder: "Select guardian to be edited",
  value: ""
})

const guardian = reactive<DTForm>({
  givenName: {
    label: "First Name",
    value: "",
    placeholder: "First Name",
    required: true,
    validation: (name) => StandardValidations.isName(name)
  },
  familyName: {
    label: "Last Name",
    value: "",
    placeholder: "Last Name",
    required: true,
    validation: (name) => StandardValidations.isName(name)
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

const onFinish = async () => submitForm(guardian, async (formData) => {
  const person: Record<string, any> = {
    ...formData
  };
  const registrationService = new PatientRegistrationService()
  registrationService.setPersonID(activeGuardian.value.names.person_id); 
  await registrationService.updatePerson(person);
  await modal.hide()
  EventBus.emit(EmcEvents.RELOAD_GUARDIAN_DATA)
}, 
{ 
  underscoreKeys: true 
})
</script>
