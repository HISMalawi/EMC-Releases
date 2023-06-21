<template>
  <ion-row>
    <ion-col size="12" class="ion-margin-vertical">
      <SelectInput v-model="form.protocol" :options="protocols" />
    </ion-col>
    <ion-col size="12" class="ion-margin-vertical">
      <TextInput v-model="form.ipAddress" />
    </ion-col>
    <ion-col size="12" class="ion-margin-vertical">
      <TextInput v-model="form.port" />
    </ion-col>
    <ion-col size="12" class="ion-margin-vertical">
      <IonButton class="ion-margin-top ion-float-right" color="success" @click="onSubmit">Submit</IonButton>
      <IonButton class="ion-margin-top ion-float-right" @click="$router.back()">Back</IonButton>
    </ion-col>
  </ion-row>
</template>

<script setup lang="ts">
import SelectInput from './inputs/SelectInput.vue';
import TextInput from './inputs/TextInput.vue';
import { IonRow, IonCol, IonButton } from '@ionic/vue';
import { Option } from "@/components/Forms/FieldInterface";
import { reactive, defineEmits } from 'vue';
import { DTForm } from '../interfaces/dt_form_field';
import StandardValidations from '@/components/Forms/validations/StandardValidations';
import { isValidForm, resolveFormValues } from '../utils/form';

const emit = defineEmits(["submit"])

const protocols: Option[] = [
  { label: "HTTP", value: "http" },
  { label: "HTTPS", value: "https" }
]

const form = reactive<DTForm>({
  protocol: {
    value: '',
    label: 'Select Protocol',
    required: true,
  },
  ipAddress: {
    value: '',
    label: 'IP Address',
    placeholder: 'Enter IP Address e.g. 127.0.0.1',
    required: true,
    validation: async (address) => StandardValidations.isIPAddress(address)
  },
  port: {
    value: '',
    label: 'Port',
    placeholder: 'Enter Port e.g. 3000',
    required: true,
  },
});

const onSubmit = async () =>  {
  if(!(isValidForm(form))) return
  emit("submit", resolveFormValues(form).formData)
}

</script>