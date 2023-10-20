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

const fields = ref<Array<Field>>([]);
let admitService = reactive({} as PatientAdmitService);
const { isReady, patient, provider, goToNextTask, patientDashboardUrl } = useEncounter();

watch(isReady, (ready) => {
  if (ready) {
    admitService = new PatientAdmitService(patient.value.getID(), provider.value);
    fields.value.push(getInfluenzaSysmptomsField());
    fields.value.push(getOtherInfluenzaSymptomsField());
  }
}, {
  immediate: true,
})

async function onSubmit(fdata: any) {
  await admitService.createEncounter();
  const ward = fdata.otherWards?.value ?? fdata.wards.label;
  const obs = await admitService.buildValueText('Admit to ward', ward);
  await admitService.saveObservationList([ obs ]);
  goToNextTask();
}

function getInfluenzaSysmptomsField(): Field {
  return {
    id: "symptoms",
    helpText: "Influenza Symptoms",
    type: FieldType.TT_MULTIPLE_YES_NO,
    validation: (data: any) => Validation.validateSeries([
      () => Validation.required(data),
      () => Validation.anyEmpty(data),
    ]),
    // computedValue: (v: Option[]) => ({
    //   obs: v.map(async (d) => ({
    //     ...(await this.consultation.buildValueCoded('Malawi ART side effects', d.label)),
    //     child: [await this.consultation.buildValueCoded(d.label, d.value)]
    //   }))
    // }),
    // beforeNext: (data: Option[]) => this.buildSideEffectObs(data, 'malawiSideEffectReasonObs'),
    options: (_: any, checked: Array<Option>) => []
  }
}

function getOtherInfluenzaSymptomsField(): Field {
  return {
    id: "other_ssymptoms",
    helpText: "Other Symptoms",
    type: FieldType.TT_MULTIPLE_YES_NO,
    validation: (data: any) => Validation.validateSeries([
      () => Validation.required(data),
      () => Validation.anyEmpty(data),
    ]),
    // computedValue: (v: Option[]) => ({
    //   tag: 'consultation',
    //   obs: v.filter(d => d.label != 'Other (Specify)')
    //     .map(async (d) => ({
    //     ...(await this.consultation.buildValueCoded('Other side effect', d.label)),
    //     child: [await this.consultation.buildValueCoded(d.label, d.value)]
    //   }))
    // }),
    // beforeNext: (data: Option[]) => this.buildSideEffectObs(data, 'otherSideEffectReasonObs'),
    options: (_: any, checked: Array<Option>) => [],
  }
}
</script>
