<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <p>Add New Outcome</p>
      </ion-col>  
      <ion-col size="6" class="ion-margin-top-vertical">
        <SelectInput v-model="form.status" :form="form" :options="outcomes" />
      </ion-col>
      <ion-col size="6" class="ion-margin-top-vertical">
        <DateInput v-model="form.date" :form="form" :max-date="today" />
      </ion-col>
      <ion-col size="12" v-if="isTransferredOut" class="ion-margin-top-vertical">
        <SelectInput v-model="form.nextFacility" :form="form" :asyncOptions="getFacilities" />
      </ion-col>
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
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { Option } from "@/components/Forms/FieldInterface";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";

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
          if(dayjs(date.value).isBefore(props.birthdate)) return [`Outcome date cannot be before date of birth - ${dayjs(props.birthdate).format(DISPLAY_DATE_FORMAT)}` ]
          if(dayjs(date.value).isBefore(props.dateEnrolled)) return [`Outcome date cannot be before enrollment date- ${dayjs(props.dateEnrolled).format(DISPLAY_DATE_FORMAT)}`]
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
    })

    const isTransferredOut = computed(() => form.status.value?.label === "Patient transferred out");

    const onReset = () => {
      for (const key in form) {
        form[key].value = '';
        form[key].error = '';
      }
    }

    const onSave = () => submitForm(form, data => emit("saveOutcome", data))

    return {
      form,
      today,
      isTransferredOut,
      onSave,
      onReset,
      getFacilities,
    }
  }
})
</script>
