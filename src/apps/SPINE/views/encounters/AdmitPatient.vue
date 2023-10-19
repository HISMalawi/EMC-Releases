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
import { getFacilities } from '@/utils/HisFormHelpers/LocationFieldOptions';

const fields = ref<Array<Field>>([]);
let admitService = reactive({} as PatientAdmitService);
const { isReady, patient, provider, goToNextTask, patientDashboardUrl } = useEncounter();

async function onSubmit(fdata: any) {
  await admitService.createEncounter();
  const ward = fdata.otherWards?.value ?? fdata.wards.label;
  const obs = await admitService.buildValueText('Admit to ward', ward);
  await admitService.saveObservationList([ obs ]);
  goToNextTask();
}

function getWardsField(): Field {
  return {
    id: 'wards',
    helpText: "Admit to ward",
    type: FieldType.TT_SELECT,
    options: (_fdata: any, filter = '') => getFacilities(filter),
    validation: (v: Option) => Validation.required(v),
    config: {
      showKeyboard: true,
      isFilterDataViaApi: true,
    },
  }
}

function getOtherWardsField(): Field {
  return {
    id: "otherWards",
    helpText: "Enter custom ward",
    type: FieldType.TT_TEXT,
    validation: (v: Option) => Validation.required(v),
    condition: (f: any) => /other/i.test(f.wards.label),
  }
}

watch(isReady, (ready) => {
  if (ready) {
    admitService = new PatientAdmitService(patient.value.getID(), provider.value);
    fields.value.push(getWardsField());
    fields.value.push(getOtherWardsField());
  }
}, {
  immediate: true,
  deep: true
})
</script>
