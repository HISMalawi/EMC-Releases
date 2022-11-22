<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <DateInput v-model="form.date" :form="form" :max-date="today" />
      </ion-col>
      <ion-col>
        <ion-button color="warning" @click="onReset">Reset</ion-button>
        <ion-button color="success" @click="enrollProgram">Enroll</ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { alertConfirmation } from "@/utils/Alerts";
import EventBus from "@/utils/EventBus";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";
import dayjs from "dayjs";
import { defineComponent, reactive, ref } from "vue";
import { DTForm } from "../interfaces/dt_form_field";
import { EmcEvents } from "../interfaces/emc_event";
import { submitForm } from "../utils/form";
import DateInput from "./inputs/DateInput.vue";

export default defineComponent({
  name: "EnrollmentForm",
  components: {
    DateInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
  },
  props: ["birthdate"],
  emits: ["enrollProgram"],
  setup(props, { emit }) {
    const today = dayjs().format("YYYY-MM-DD");
    const form = reactive<DTForm>({
      date: {
        value: "",
        label: "Date of Enrollment",
        required: true,
        validation: async (date) => {
          if(dayjs(date.value).isBefore(props.birthdate)) return ["Date of enrollment cannot be before date of birth"]
          return null
        }
      },
    })

    const onReset = async () => {
      if((await alertConfirmation("Are you sure you want to clear all fields"))){
        form.date.value = "";
        form.date.error = "";
        EventBus.emit(EmcEvents.ON_CLEAR)
      }
    }

    const enrollProgram = async () => submitForm(form, ({ date }) => emit("enrollProgram", date))

    return {
      form,
      today,
      onReset,
      enrollProgram,
    }
  }
})
</script>
