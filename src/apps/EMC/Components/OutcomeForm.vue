<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <p>Add New Outcome</p>
      </ion-col>  
      <ion-col size="6" class="ion-margin-top-vertical">
        <DateInput v-model="form.date" :form="form" :minDate="dateEnrolled" :max-date="today" />
      </ion-col>
      <ion-col size="6" class="ion-margin-top-vertical">
        <SelectInput v-model="form.status" :form="form" :options="outcomes" />
      </ion-col>
      <template v-if="isTransferredOut">
        <ion-col size="6" class="ion-margin-top-vertical">
          <SelectInput v-model="form.nextFacility" :form="form" :asyncOptions="getFacilities" />
        </ion-col>
        <ion-col size="6" class="ion-margin-top-vertical">
          <SelectInput v-model="form.reason" :form="form" :options="transferOutReasons" />
        </ion-col>
        <ion-col size="12" v-if="specifyOther" class="ion-margin-top-vertical">
          <text-input v-model="form.otherReason" :form="form" />
        </ion-col>
      </template>
      <ion-col size="12" class="ion-margin-top">
        <ion-button color="warning" @click="onReset">Reset</ion-button>
        <ion-button color="success" @click="onSave">Save</ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";
import dayjs from "dayjs";
import { computed, defineComponent, PropType, reactive } from "vue";
import { DTForm } from "../interfaces/dt_form_field";
import { submitForm } from "../utils/form";
import DateInput from "./inputs/DateInput.vue";
import SelectInput from "./inputs/SelectInput.vue";
import TextInput from "./inputs/TextInput.vue";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { Option } from "@/components/Forms/FieldInterface";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../interfaces/emc_event";
import { alertConfirmation } from "@/utils/Alerts";
import { transferOutReasons } from "../utils/DTFormElements"

export default defineComponent({
  name: "OutcomeForm",
  props: {
    outcomes: {
      type: Array as PropType<Option[]>,
      required: true,
    },
    dateEnrolled: {
      type: String,
      required: true
    },
    birthdate: {
      type: String,
      required: true
    }
  },
  components: {
    DateInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    SelectInput,
    TextInput,
  },
  emits: ["saveOutcome"],
  setup(props, { emit }) {
    const today = dayjs().format("YYYY-MM-DD");
    const form = reactive<DTForm>({
      date: {
        value: "",
        label: "Outcome Date",
        required: true,
        validation: async (date) => {
          if(new Date(date.value) < new Date(props.birthdate)) return [`Outcome date cannot be before date of birth - ${dayjs(props.birthdate).format(DISPLAY_DATE_FORMAT)}` ]
          if(new Date(date.value) < new Date(props.dateEnrolled)) return [`Outcome date cannot be before enrollment date- ${dayjs(props.dateEnrolled).format(DISPLAY_DATE_FORMAT)}`]
          return null
        }
      },
      status: {
        value: "",
        label: "Outcome",
        required: true,
      },
      nextFacility: {
        value: "",
        label: "Next Facility",
        validation: async (facility, form) => {
          return form.status.value.label === "Patient transferred out" && 
            StandardValidations.required(facility);
        }
      },
      reason: {
        value: "",
        label: "Reason for transfer out",
        validation: async (reason, form) => {
          return form.status.value.label === "Patient transferred out" && 
            StandardValidations.required(reason);
        }
      },
      otherReason: {
        value: "",
        label: "Other reason for transfer out",
        placeholder: "Specify other reason for transfer out",
        validation: async (reason, form) => {
          return form.status?.value?.label === "Patient transferred out" && 
            form.reason?.value?.label === "Other" &&
            StandardValidations.required(reason);
        }
      },
    })

    const isTransferredOut = computed(() => form.status.value?.label === "Patient transferred out");
    const specifyOther = computed(() => form.reason?.value?.label === "Other")

    const onReset = async () => {
      if((await alertConfirmation("are you sure you want to clear all fields"))) {
        for (const key in form) {
          form[key].value = '';
          form[key].error = '';
        }
        EventBus.emit(EmcEvents.ON_CLEAR)
      }
    }

    const onSave = () => submitForm(form, data => emit("saveOutcome", {
      ...data, 
      isTransferredOut: isTransferredOut.value 
    }))

    return {
      form,
      today,
      isTransferredOut,
      specifyOther,
      onSave,
      onReset,
      getFacilities,
      transferOutReasons
    }
  }
})
</script>
