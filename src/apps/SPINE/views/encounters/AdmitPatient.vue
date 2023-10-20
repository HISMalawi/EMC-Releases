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
import { LocationService } from '@/services/location_service';
import { alertConfirmation, toastDanger, toastWarning } from '@/utils/Alerts';

const fields = ref<Array<Field>>([]);
let admitService = reactive({} as PatientAdmitService);
const { isReady, patient, provider, goToNextTask, patientDashboardUrl } = useEncounter();

watch(isReady, (ready) => {
  if (ready) {
    admitService = new PatientAdmitService(patient.value.getID(), provider.value);
    fields.value.push(getInternalSectionsField());
  }
}, {
  immediate: true,
})

async function onSubmit(_fdata: any, cdata: any) {
  const obs = await Promise.all([cdata.internal_sections]);
  await admitService.createEncounter();
  await admitService.saveObservationList(obs);
  goToNextTask();
}

function getInternalSectionsField(): Field {
  return {
    id: 'internal_sections',
    helpText: 'Select Ward/internal section',
    type: FieldType.TT_SELECT,
    validation: (value: any) => Validation.required(value),
    computedValue: (v: Option) => admitService.buildValueText('Admit to ward', v.label),
    options: () => LocationService.getInternalSections(),
    config: { 
      showKeyboard: true,
      footerBtns: [{
        name: 'Add Section',
        slot: 'end',
        color: 'success',
        onClick: async (f: any, c: any, field: any) => {
          if (typeof field.filter != 'string' || field.filter.length < 3) {
            return toastWarning(`Please enter a valid section name`)
          }
          if (field.filtered.some((i: Option) => i.label.toLowerCase() === field.filter.toLowerCase())) {
            return toastWarning(`Section already existing`)
          }
          if ((await alertConfirmation(`Do you want to add internal section?`))) {
            const data = await LocationService.createInternalSection(field.filter.toUpperCase())
            if (data) {
              field.filter = data.name
              field.listData = [{label: data.name, value: data.id}, ...field.listData]
            } else {
              toastDanger(`Unable to add ${field.filter}`)
            }
          }
        }
      }]
    }
  }
}
</script>
