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
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";
import dayjs from "dayjs";
import { defineComponent, reactive, ref } from "vue";
import { DTForm } from "../interfaces/dt_form_field";
import { isValidForm } from "../utils/form";
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
  emits: ["enrollProgram"],
  setup(_props, { emit }) {
    const today = dayjs().format("YYYY-MM-DD");
    const form = reactive<DTForm>({
      date: {
        value: "",
        label: "Date of Enrollment",
        required: true,
      },
    })

    const onReset = () => {
      form.date.value = "";
      form.date.error = "";
    }

    const enrollProgram = async () => {
      if(await isValidForm(form)) emit("enrollProgram", form.date.value);
    }

    return {
      form,
      today,
      onReset,
      enrollProgram,
    }
  }
})
</script>
