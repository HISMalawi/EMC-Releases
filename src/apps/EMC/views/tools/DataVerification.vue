<template>
  <Layout>
    <ion-grid class="ion-margin-vertical">
      <ion-row >
        <ion-col class="his-card ion-padding" size="10" offset="1">
          <ion-title class="ion-text-center ion-margin-vertical ion-padding-bottom bold">
            Data Cleaning Verification
          </ion-title>
          <ion-row class="ion-margin-top ion-margin-bottom">
            <ion-col size="12" class="ion-margin-top ion-margin-bottom">
              <yes-no-input v-model="form.cleaningDone" inline />
            </ion-col>
            <template v-if="form.cleaningDone.value === 'Yes'">
              <ion-col size="12" class="ion-margin-top ion-margin-bottom">
                <DateInput v-model="form.date" :max-date="today" :form="form" />
              </ion-col>
              <ion-col size="12" class="ion-margin-top ion-margin-bottom">
                <text-input v-model="form.provider" :form="form" />
              </ion-col>
            </template>
          </ion-row>
          <ion-button class="ion-margin-top " @click="onSubmit" color="success">Submit</ion-button>
          <ion-button class="ion-margin-top" @click="onClear" color="warning">Clear</ion-button>
          <ion-button class="ion-margin-top" @click="$router.back()" color="light">Back</ion-button>
        </ion-col>
      </ion-row> 
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol, IonButton, IonTitle } from "@ionic/vue";
import { useRouter } from "vue-router";
import { DTForm } from "../../interfaces/dt_form_field";
import dayjs from "dayjs";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { isValidForm, resolveFormValues } from "../../utils/form";
import { loader } from "@/utils/loader";
import { DataCleaningReportService } from "@/apps/ART/services/reports/data_cleaning_report_service";
import TextInput from "@/apps/EMC/Components/inputs/TextInput.vue";
import DateInput from "@/apps/EMC/Components/inputs/DateInput.vue"
import YesNoInput from "@/apps/EMC/Components/inputs/YesNoInput.vue"; 

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonTitle,
    YesNoInput,
    DateInput,
    TextInput
  },
  setup() {
    const router = useRouter();
    const today = dayjs().format("YYYY-MM-DD");
    const form = reactive<DTForm>({
      cleaningDone: {
        value: "",
        label: "Cleaning Done",
        required: true,
      },
      date: {
        value: "",
        label: "Date of Cleaning",
        validation: async (date, form) => {
          return form.cleaningDone.value === "Yes" &&
            StandardValidations.required(date)
        },
      },
      provider: {
        value: "",
        label: "Verified By",
        validation: async (provider, form) => {
          return form.cleaningDone.value === "Yes" &&
            StandardValidations.required(provider)
        },
      },
    })

    const onSubmit = async () => {
      if (!(await isValidForm(form))) return
      loader.show();
      const data = resolveFormValues(form).formData;
      const success = await new DataCleaningReportService().saveDataCleaningVerification({
        'data_cleaning_datetime': data.date,
        'supervisors': [data.provider],
      });
      loader.hide();
      if (success) {
        router.back();
      }
    }

    const onClear = () => {
      for(const key in form) {
        form[key].value = "";
      }
    }

    return {
      form,
      today,
      onSubmit,
      onClear,
    };
  },
});
</script>

<style>
.box {
  border-color: #a3a3a3;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
}

.searchBtn {
  height: 50px !important;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: .5rem;
}

.sc-ion-searchbar-md-h{
  --box-shadow: none !important;
}

</style>
