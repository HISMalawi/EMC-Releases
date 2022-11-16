<template>
  <Layout>
    <ion-grid>
      <ion-row class="his-card">
        <ion-col size="12">
          <ion-title class="ion-text-center ion-margin-vertical ion-padding-bottom bold">
            Staging
          </ion-title>
          <ion-row class="ion-margin-top ion-margin-bottom">
          <ion-col size="6" class="ion-margin-top ion-margin-bottom">
            <SelectInput v-model="form.reasonsForEligibity" :options="reasonsForArt" />
          </ion-col>
          <ion-col size="6" class="ion-margin-top ion-margin-bottom">
            <SelectInput v-model="form.whoStage" :options="whoStages" />
          </ion-col>
          <ion-col size="12" class="ion-margin-top ion-margin-bottom">
            <yes-no-input v-model="form.cd4countAvailable" inline />
          </ion-col>
          <template v-if="form.cd4countAvailable.value === 'Yes'">
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <DateInput v-model="form.cd4CountDate" :min-date="patientDob" :max-date="today" />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <text-input v-model="form.cd4Count"  />
            </ion-col>
            <ion-col size="12" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="form.cd4CountLocation" :asyncOptions="getFacilities" allowCustom />
            </ion-col>
          </template>
          <ion-col size="12" class="ion-margin-top ion-padding-top" >
            <SelectInput v-model="form.whoConditions" :options="stagingCoditions" multiple />
          </ion-col>
        </ion-row>
          <ion-button class="ion-margin-top ion-float-right" size="large" @click="onSubmit" color="success">Finish</ion-button>
          <ion-button class="ion-margin-top ion-float-right" size="large" @click="onClear" color="warning">Clear</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import {  computed, defineComponent, onMounted, reactive, ref } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol, IonButton, IonTitle } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import {  alertConfirmation, toastSuccess } from "@/utils/Alerts";
import { Option } from "@/components/Forms/FieldInterface";
import { STANDARD_DATE_FORMAT } from "@/utils/Date";
import { useRoute, useRouter } from "vue-router";
import { DTForm } from "../interfaces/dt_form_field";
import TextInput from "../Components/inputs/TextInput.vue";
import DateInput from "../Components/inputs/DateInput.vue"
import YesNoInput from "../Components/inputs/YesNoInput.vue";
import SelectInput from "../Components/inputs/SelectInput.vue";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";
import dayjs from "dayjs";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { resolveObs, submitForm } from "../utils/form";
import { StagingService } from "@/apps/ART/services/staging_service";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../interfaces/emc_event";

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonTitle,
    TextInput,
    DateInput,
    YesNoInput,
    SelectInput,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const patientId = parseInt(route.params.id.toString() || '')
    const isEditMode = route.params.new.toString().match(/false/i) ? true : false
    const patient = ref<Patientservice>()
    const stagingService = ref<StagingService>()
    const reasonsForArt = ref<Option[]>([])
    const stagingCoditions = ref<Option[]>([])
    const whoStages = ref<Option[]>([])
    const selectedConditions = ref<Option[]>([])

    const today = dayjs().format(STANDARD_DATE_FORMAT)
    const patientDob = computed(() => {
      const date = patient.value?.getBirthdate() 
      return date ? dayjs(date).format(STANDARD_DATE_FORMAT) : ''
    })

    const form = reactive<DTForm>({
      reasonsForEligibity: {
        value: '',
        label: 'Reason for Starting',
        placeholder: "Select Reason for Starting",
        required: true,
        computedValue: (reason: Option) => ({
          obs: stagingService.value?.buildReasonForArtObs(reason.label)
        })
      },
      whoStage: {
        value: '',
        label: 'Select Stage',
        placeholder: "Select Stage",
        required: true,
        computedValue: (stage: Option) => ({
          obs: stagingService.value?.buildWhoStageObs(stage.label)
        }),
      },
      cd4countAvailable: {
        value: '',
        label: 'Recent CD4 Count results available?',
        required: true,
      },
      cd4CountDate: {
        value: '',
        label: 'CD4 Count date',
        placeholder: 'CD4 Count date',
        computedValue: (date: string) => ({
          obs: StagingService.buildValueDate('Cd4 count datetime', date)
        }),
        validation: async (date: Option, f: DTForm) => {
          return f.cd4countAvailable.value === 'Yes' && 
            StandardValidations.required(date)
        }
      },
      cd4Count: {
        value: '',
        label: 'CD4 Count',
        placeholder: 'CD4 Count e.g. <100 or >500',
        computedValue: (cd4Count: string) => {
          const count = parseInt(cd4Count.substring(1))
          const modifier = cd4Count.substring(0, 1)
          return {
            modifier,
            count,
            obs: StagingService.buildValueNumber('CD4 count', count, modifier)
          }
        },
        validation: async (cd4Count: Option, f: DTForm) => {
          return f.cd4countAvailable.value === 'Yes' && StandardValidations.validateSeries([
            () => StandardValidations.required(cd4Count),
            () => stagingService.value?.cd4CountIsValid(cd4Count.value.toString()) 
              ? null
              : ['Please start with a modifier. e.g. >, <, or =']
          ])
        }
      },
      cd4CountLocation: {
        value: '',
        label: 'CD4 Count location',
        computedValue: (facility: Option) => ({
          obs: StagingService.buildValueText('Cd4 count location', facility.label)
        }),
        validation: async (location: Option, f: DTForm) => {
          return f.cd4countAvailable.value === 'Yes' && StandardValidations.required(location)
        }
      },
      whoConditions: {
        value: '',
        required: true,
        label: "Select Staging Conditions",
        computedValue: (conditions: Option[]) => ({
          obs: conditions.map(x => stagingService.value?.buildWhoCriteriaObs(x.label))
        })
      }
    });

    const onClear = async () => {
      const confirm = await alertConfirmation('Are you sure you want to clear all fields?')
      if(confirm) {
        for(const key in form) {
          form[key].value = undefined
          form[key].error = ""
        }
      }
    }

    const onSubmit = async () => {
      await submitForm(form, async (_, computedFormData) => {
        await stagingService.value?.createEncounter()
        const obs = await resolveObs(computedFormData)
        await stagingService.value?.saveObservationList(obs)
        await toastSuccess('Saved successfully')
        await StagingService.resetSessionDate()
        if(isEditMode) EventBus.emit(EmcEvents.RELOAD_STAGING_INFORMATION)
        router.push(`/emc/patient/${patientId}`)
      })
    }

    onMounted(async () => {
      const data = await Patientservice.findByID(patientId)
      patient.value = new Patientservice(data)
      stagingService.value = new StagingService(patientId, patient.value.getAge(), -1)
      stagingCoditions.value = [
        ...stagingService.value.getStagingConditions(1).map(condition => ({ label: condition.name, value: condition.concept_id, other: condition })),
        ...stagingService.value.getStagingConditions(2).map(condition => ({ label: condition.name, value: condition.concept_id, other: condition })),
        ...stagingService.value.getStagingConditions(3).map(condition => ({ label: condition.name, value: condition.concept_id, other: condition })),
        ...stagingService.value.getStagingConditions(4).map(condition => ({ label: condition.name, value: condition.concept_id, other: condition })),
      ].sort((a, b) => a.label.localeCompare(b.label))

      whoStages.value = stagingService.value.getAllWhoStages().map(stage => ({
        label: stage.name, value: stage.name
      }))

      reasonsForArt.value = stagingService.value.getAllReasonsForART().map(r => ({ label: r.name, value: r.name}))
    }) 
 
    return {
      patient,
      today,
      patientDob,
      form,
      whoStages,
      stagingCoditions,
      selectedConditions,
      reasonsForArt,
      getFacilities,
      onClear,
      onSubmit,
    };
  },
});
</script>

<style scoped>
ion-checkbox {
  --size: 20px!important;
}

.options {
  height: 400px; 
  overflow-y: auto;
}

.options ion-label span:hover {
  background-color: #ddd;
  padding: 1rem;
  cursor: pointer;
}
</style>
