<template>
  <ion-page>
    <his-standard-form 
      :cancelDestinationPath="patientDashboardUrl" 
      :fields="fields" 
      :onFinishAction="onSubmit" 
      :skipSummary="true" 
    />
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import Validation from '@/components/Forms/validations/StandardValidations';
import { Field, Option } from '@/components/Forms/FieldInterface';
import { FieldType } from '@/components/Forms/BaseFormElements';
import { IonPage } from '@ionic/vue';
import { reactive } from 'vue';
import useEncounter from "@/composables/useEncounter";
import { PatientAdmitService } from "../../services/patient_admit_service";
import { resolveObs } from '@/utils/HisFormHelpers/commons';
import { getFacilityWards } from '@/utils/HisFormHelpers/LocationFieldOptions';

const fields = ref<Array<Field>>([]);
let admitService = reactive({} as PatientAdmitService);
const { isReady, patient, provider, goToNextTask, patientDashboardUrl } = useEncounter();

async function onSubmit(_fdata: any, cdata: any) {
  await admitService.createEncounter();
  const obs = await resolveObs(cdata);
  await admitService.saveObservationList(obs);
  goToNextTask();
}

function getWardsField(): Field {
  return {
    id: 'wards',
    helpText: "Admit to ward",
    type: FieldType.TT_SELECT,
    options: (_fdata: any, filter = '') => getFacilityWards(filter),
    validation: (v: Option) => Validation.required(v),
    computedValue: (v: Option) => ({
      obs: admitService.buildValueText('Admit to ward', v.label)
    }),
    config: {
      showKeyboard: true,
      isFilterDataViaApi: true
    },
  }
}

watch(isReady, (ready) => {
  if (ready) {
    admitService = new PatientAdmitService(patient.value.getID(), provider.value);
    fields.value.push(getWardsField());
  }
}, {
  immediate: true,
  deep: true
})
</script>
