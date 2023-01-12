<template>
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
      <ion-col size="6" class="ion-margin-top ion-margin-bottom">
        <SelectInput v-model="form.cd4CountLocation" :asyncOptions="getFacilities" allowCustom />
      </ion-col>
    </template>
    <ion-col size="6" class="ion-margin-top ion-padding-top" >
      <SelectInput v-model="form.whoConditions" :options="stagingCoditions" multiple />
    </ion-col>
    <ion-col size="12" class="ion-margin-top">
      <ion-button class="ion-margin-top ion-float-right" size="large" @click="onSubmit" color="success">Finish</ion-button>
      <ion-button class="ion-margin-top ion-float-right" size="large" color="warning" @click="onClear">Clear</ion-button>
      <ion-button class="ion-margin-top ion-float-right" size="large" @click="$emit('onPrevious')" color="primary">Previous</ion-button>
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from "vue";
import { IonRow, IonCol, IonButton, IonTitle } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import { alertConfirmation } from "@/utils/Alerts";
import { Option } from "@/components/Forms/FieldInterface";
import { STANDARD_DATE_FORMAT } from "@/utils/Date";
import { DTForm } from "../interfaces/dt_form_field";
import TextInput from "../Components/inputs/TextInput.vue";
import DateInput from "../Components/inputs/DateInput.vue"
import YesNoInput from "../Components/inputs/YesNoInput.vue";
import SelectInput from "../Components/inputs/SelectInput.vue";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";
import dayjs from "dayjs";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { submitForm } from "../utils/form";
import { StagingService } from "@/apps/ART/services/staging_service";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../interfaces/emc_event";

export default defineComponent({
  components: {
    IonRow,
    IonCol,
    IonButton,
    IonTitle,
    TextInput,
    DateInput,
    YesNoInput,
    SelectInput,
  },
  props: {
    patient: {
      type: Object as PropType<Patientservice>,
      required: true,
    },
    isNewPatient: {
      type: Boolean,
      default: true,
    },

    observations: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    initialVisitDate: {
      type: String,
      default: ""
    } 
  },
  emits: ["onValue", "onPrevious", "onFinish"],
  setup(props, { emit }) {
    const stagingCoditions = ref<Option[]>([])
    const selectedConditions = ref<Option[]>([])
    const today = dayjs().format(STANDARD_DATE_FORMAT)
    
    const patientDob = computed(() => {
      const date = props.patient.getBirthdate() 
      return date ? dayjs(date).format(STANDARD_DATE_FORMAT) : ''
    })

    const stagingService = new StagingService(props.patient.getID(), props.patient.getAge(), -1)
    const reasonsForArt = stagingService
      .getAllReasonsForART()
      .map(r => ({ label: r.name, value: r.name}))

    const whoStages = stagingService
      .getAllWhoStages()
      .map(stage => ({ label: stage.name, value: stage.name }))

    const form = reactive<DTForm>({
      reasonsForEligibity: {
        value: props.observations['Reason for ART eligibility'] || '',
        label: 'Reason for Starting',
        placeholder: "Select Reason for Starting",
        required: true,
        computedValue: (reason: Option) => ({
          obs: stagingService.buildReasonForArtObs(
            typeof reason === 'string' ? reason : reason.label
          )
        })
      },
      whoStage: {
        value: props.observations['Who stage'] || '',
        label: 'Select Stage',
        placeholder: "Select Stage",
        required: true,
        computedValue: (stage: Option) => ({
          obs: stagingService.buildWhoStageObs(
            typeof stage === 'string' ? stage : stage.label  
          )
        }),
      },
      cd4countAvailable: {
        value:  props.observations['CD4 count'] ? 'Yes' : props.isNewPatient ? '' : 'No',
        label: 'Recent CD4 Count results available?',
        required: true,
      },
      cd4CountDate: {
        value: props.observations['Cd4 count datetime'] || '',
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
        value: props.observations['CD4 count'] || '',
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
            () => stagingService.cd4CountIsValid(cd4Count.value.toString()) 
              ? null
              : ['Please start with a modifier. e.g. >, <, or =']
          ])
        }
      },
      cd4CountLocation: {
        value: props.observations['Cd4 count location'] || '',
        label: 'CD4 Count location',
        computedValue: (facility: Option) => ({
          obs: StagingService.buildValueText(
            'Cd4 count location', 
            typeof facility === 'string' ? facility : facility.label
          )
        }),
        validation: async (location: Option, f: DTForm) => {
          return f.cd4countAvailable.value === 'Yes' && StandardValidations.required(location)
        }
      },
      whoConditions: {
        value: props.observations['Who stages criteria present'] 
          ? [{
              label: props.observations['Who stages criteria present'],
              value: props.observations['Who stages criteria present'],
            }]
          : '',
        required: true,
        label: "Select Staging Conditions",
        computedValue: (conditions: Option[]) => ({
          obs: typeof conditions === 'string' 
            ? stagingService.buildWhoCriteriaObs(conditions)
            : conditions.map(x => stagingService.buildWhoCriteriaObs(x.label))
        })
      }
    });

    const onClear = async () => {
      if((await alertConfirmation('Are you sure you want to clear all fields?'))) {
        for(const key in form) {
          form[key].value = undefined
          form[key].error = ""
        }
        form.whoConditions.value = [];
        EventBus.emit(EmcEvents.ON_CLEAR)
      }
    }

    const onSubmit = async () => {
      await submitForm(form, async (formData, computedData) => {
        emit("onValue", {
          type: "staging",
          data: { formData, computedData }
        })
        emit("onFinish")
      })
    }

    const setStagingConditions = (stage?: string) => {
      let stageNum = 1
      if(stage?.match(/2|stage ii/i)) stageNum = 2
      if(stage?.match(/3|stage iii/i)) stageNum = 3
      if(stage?.match(/4|stage iv/i)) stageNum = 4
      stagingCoditions.value = stagingService
        .getStagingConditions(stageNum)
        .map(c => ({ label: c.name, value: c.name, other: c }))
        .sort((a, b) => a.label.localeCompare(b.label))
    }

    watch(()=> form.whoStage.value, (stage) => setStagingConditions(stage?.label))
    onMounted(() => setStagingConditions())
 
    return {
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
