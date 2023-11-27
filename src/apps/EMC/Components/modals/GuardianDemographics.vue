<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
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
        <ion-col size="12" class="ion-margin-top ion-margin-bottom" v-if="!isNew">
          <SelectInput v-model="activeGuardian" :options="guardianOptions" />
        </ion-col>
        <template v-if="activeGuardian.value || isNew">
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
      <ion-button color="primary" @click="addNewGuardian" slot="start" v-if="!isEmpty(props.guardians)">{{ btnLabel }}</ion-button>
      <ion-button color="primary" @click="modal.hide()" slot="end">Close</ion-button>
      <ion-button class="ion-margin-end" color="success" @click="onFinish" slot="end">Save</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts" setup>
import { reactive, defineProps, watch, ref, computed } from "vue";
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
import { RelationsService } from "@/services/relations_service";

const registrationService = new PatientRegistrationService();

interface PropInterface {
  patientId: number;
  guardians?: Array<GuardianDetails>;
}

const props = defineProps<PropInterface>();
const isNew = ref(isEmpty(props.guardians));
const title = computed(() => `${isNew.value ? 'Add' : 'Edit' } Guardian Demographics`);
const btnLabel = computed(() => `${isNew.value ? 'Edit' : 'Add' } Guardian`);
const guardianOptions = props.guardians?.map(g => ({
  label: `${g.name} (${g.relationshipType})`,
  value: g.name,
  other: g
})) ?? [];

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

function addNewGuardian() {
  isNew.value = !isNew.value;
  activeGuardian.value = "";
}

async function registerGuardian(data: Record<string, any>) {
  await registrationService.registerGuardian({
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
    'patient_id': props.patientId,
    ...data
  });

  await RelationsService.createRelation(
    props.patientId, 
    registrationService.getPersonID(), 
    13 // Other relationship type
  );
}

async function updateGuardian(newGuardian: Record<string, any>, oldGuardian: GuardianDetails) {
  const person: Record<string, any> = {};
  if(oldGuardian.names.given_name !== newGuardian.given_name) person["given_name"] = newGuardian.given_name;
  if(oldGuardian.names.family_name !== newGuardian.family_name) person["family_name"] = newGuardian.family_name;
  if(oldGuardian.phoneNumber !== newGuardian.cell_phone_number) person["cell_phone_number"] = newGuardian.cell_phone_number;
  
  if(!isEmpty(person)) {
    const registrationService = new PatientRegistrationService()
    registrationService.setPersonID(oldGuardian.names.person_id); 
    await registrationService.updatePerson(person);
  }
}

const onFinish = async () => submitForm(guardian, async (formData) => {
  if(!isNew.value && !isEmpty(activeGuardian.value)) {
    await updateGuardian(formData, activeGuardian.value.other as GuardianDetails)
  } else {
    await registerGuardian(formData);
  }
  await modal.hide()
  EventBus.emit(EmcEvents.RELOAD_GUARDIAN_DATA)
}, 
{
  underscoreKeys: true,
})
</script>
