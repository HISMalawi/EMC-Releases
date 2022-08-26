<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <p>Add New Outcome</p>
      </ion-col>  
      <ion-col size="6" class="ion-margin-top-vertical">
        <SelectInput v-model="form.status" :form="form" :options="outcomes" searchable />
      </ion-col>
      <ion-col size="6" class="ion-margin-top-vertical">
        <DateInput v-model="form.date" :form="form" :max-date="today" />
      </ion-col>
      <ion-col size="12" v-if="isTransferredOut" class="ion-margin-top-vertical">
        <SelectInput v-model="form.nextFacility" :form="form" :asyncOptions="getFacilities" searchable />
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
import { isValidForm, resolveFormValues } from "../utils/form";
import DateInput from "./inputs/DateInput.vue";
import SelectInput from "./inputs/SelectInput.vue";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { Option } from "@/components/Forms/FieldInterface";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";

export default defineComponent({
  name: "OutcomeForm",
  props: {
    outcomes: {
      type: Array as PropType<Option[]>,
      required: true,
    },
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
  setup(_props, { emit }) {
    const today = dayjs().format("YYYY-MM-DD");
    const form = reactive<DTForm>({
      date: {
        value: "",
        label: "Outcome Date",
        required: true,
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

    const onSave = async () => {
      if(await isValidForm(form)) {
        const data = resolveFormValues(form).formData;
        console.log(data)
        emit("saveOutcome", data);
      }
    }

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
