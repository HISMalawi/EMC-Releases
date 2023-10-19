<template>
    <his-standard-form :cancelDestinationPath="patientDashboardUrl" :fields="fields" :onFinishAction="onSubmit"/>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import Validation from '@/components/Forms/validations/StandardValidations';
import { Field, Option } from '@/components/Forms/FieldInterface';
import { FieldType } from '@/components/Forms/BaseFormElements';
import { getFacilities, getSpecialistClinics } from '@/utils/HisFormHelpers/LocationFieldOptions';
import { PatientReferralService } from '@/apps/SPINE/services/patient_referral_service'
import { PatientDischargeService } from '@/apps/SPINE/services/patient_discharge_service';
import { resolveObs } from '@/utils/HisFormHelpers/commons';
import useEncounter from '@/composables/useEncounter';
import { isEmpty } from 'lodash';

let referralService: PatientReferralService;
let dischargeService: PatientDischargeService;
const fields = ref<Array<Field>>([]);

const {isReady, patient, provider, goToNextTask, patientDashboardUrl } = useEncounter();

watch(isReady, ready => {
  if(ready) {
    dischargeService = new PatientDischargeService(patient.value.getID(), provider.value);
    referralService = new PatientReferralService(patient.value.getID(), provider.value)
    fields.value = [
      getOutcomeField(),
      getFacilityField(),
      getSpecialistClinicField()
    ];
  }
});

async function onSubmit(_fdata: any, cdata: any) {
  await dischargeService.createEncounter();
  const outcomeObs = await resolveObs({...cdata}, 'outcome');
  await dischargeService.saveObservationList(outcomeObs);
  const referralObs = await resolveObs({...cdata}, 'referral')
  if(!isEmpty(referralObs)) {
    await referralService.createEncounter()
    await referralService.saveObservationList(referralObs);
  }
  goToNextTask() 
}

function getOutcomeField (): Field {
  return {
    id: 'outcome',
    helpText: 'Select Discharge Outcome',
    type: FieldType.TT_SELECT,
    validation: (value: any) => Validation.required(value),
    computedValue: (v: Option) => ({
      tag: 'outcome',
      obs: dischargeService.buildValueCoded("outcome", v.value)
    }),
    options: () => [
      { label: "Referred (Within the Facility)", value: "Patient transferred(within  facility)"},
      { label: "Dead", value: "Died in treatment"},
      { label: "Abscorded", value: "Absconded"},
      { label: "Alive (Discharged home)", value: "Discharged home"},
      { label: "Transferred (Another health facility)", value: "Discharged to another facility"}
    ]
  }
}

function getFacilityField (): Field {
  return {
    id: 'facility_name',
    helpText: 'Select Facility name',
    type: FieldType.TT_SELECT,
    validation: (value: any) => Validation.required(value),
    computedValue: (v: Option) => ({
      tag: 'referral',
      obs: referralService.buildValueText('Referred', v.label)
    }),
    condition: (f: any) => /Transferred/i.test(f.outcome.value),
    options: (_: any, filter='') => getFacilities(filter),
    config: {
        showKeyboard: true,
        isFilterDataViaApi: true
    }
  }
}

function getSpecialistClinicField(): Field {
  return {
    id: 'specialist_clinic',
    helpText: 'Select clinic',
    type: FieldType.TT_SELECT,
    validation: (value: any) => Validation.required(value),
    computedValue: ({ other }: Option) => ({
      tag: 'referral',
      obs: referralService.buildValueCodedFromConceptId('Specialist clinic', other.concept_id)
    }),
    condition: (f: any) => /Referred/i.test(f.opd_outcome.value),
    options: () => getSpecialistClinics(),
    config: { showKeyboard: true }
  }
}
</script>

