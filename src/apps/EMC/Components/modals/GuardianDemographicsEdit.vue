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
          <SelectInput v-model="activeGuardian" :options="guardianOptions" />
        </ion-col>
        <template v-if="activeGuardian.value">
          <ion-col size="12" class="ion-margin-top ion-margin-bottom">
            <TextInput v-model="guardian.givenName" />
          </ion-col>
          <ion-col size="12" class="ion-margin-top ion-margin-bottom">
            <TextInput v-model="guardian.familyName" />
          </ion-col>
          <ion-col size="12" class="ion-margin-top ion-margin-bottom">
            <TextInput v-model="guardian.cellPhoneNumber" allowUnknown />
          </ion-col>
        </template>
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
import { reactive, defineProps, computed, watch } from "vue";
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
import { isEmpty } from "lodash";

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
});

watch(() => activeGuardian.value, (g: Option) => {
  guardian.givenName.value = g?.other?.names.given_name ?? "";
  guardian.familyName.value = g?.other?.names.family_name ?? "";
  guardian.cellPhoneNumber.value = g?.other?.phoneNumber ?? "";
}, {
  deep: true,
  immediate: true
});

const onFinish = async () => submitForm(guardian, async (newGuardian) => {
  const person: Record<string, any> = {};
  const oldGuardian = activeGuardian.value.other as GuardianDetails;

  if(oldGuardian.names.given_name !== newGuardian.givenName) person["given_name"] = newGuardian.givenName;
  if(oldGuardian.names.family_name !== newGuardian.familyName) person["family_name"] = newGuardian.familyName;
  if(oldGuardian.phoneNumber !== newGuardian.cellPhoneNumber) person["cell_phone_number"] = newGuardian.cellPhoneNumber;
  
  if(!isEmpty(person)) {
    const registrationService = new PatientRegistrationService()
    registrationService.setPersonID(oldGuardian.names.person_id); 
    await registrationService.updatePerson(person);
  }
  await modal.hide()
  EventBus.emit(EmcEvents.RELOAD_GUARDIAN_DATA)
})
</script>
