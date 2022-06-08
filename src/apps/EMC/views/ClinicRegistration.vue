<template>
  <Layout>
    <ion-grid>
      <ion-row class="his-card">
        <ion-col size="12">
          <ClinicRegistrationForm
            v-if="patient"
            :patient="patient"
            :newRegistration="true"
            :onNext="createRegistrationEncounter"
          />
          <!-- <ion-button class="ion-margin-top ion-float-end" @click="onFinish" size="large" color="success">Finish</ion-button> -->
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import {  defineComponent, onMounted, reactive, ref, watch } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import {  toastWarning } from "@/utils/Alerts";
import ClinicRegistrationForm from "@/apps/EMC/Components/forms/ClinicRegistrationForm.vue";
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from "@/components/Forms/FieldInterface";
import HisDate from "@/utils/Date";
import { LocationService } from "@/services/location_service";
import { isEmpty } from "lodash";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { useRoute, useRouter } from "vue-router";
import { RelationsService } from "@/services/relations_service";
import StagingMixinVue from "@/apps/ART/views/encounters/StagingMixin.vue";

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    ClinicRegistrationForm
  },
  mixins: [StagingMixinVue],
  setup() {
    const router = useRouter()
    const route = useRoute()
    const patientId = ref(route.params.id.toString() || '')
    const newPatient = ref(route.params.new || true)
    const patient = ref<Patientservice>()
    const hasErrors = ref(false)
    const isBirthdateEstimated = ref(false)
    const isInRange = (value: number | string, min: number, max: number) => {
      if(!value) return false
      if(typeof value === 'string') value = parseInt(value)
      return (value >= min && value <= max)
    }

    const createRegistrationEncounter = () => console.log("creaTING ENCOUNTER")

    const convertToUnderscores = (str: string) => str.split(/(?=[A-Z])/).join('_').toLowerCase()

    const resolvePerson = (client: Record<string, any>, other = {} as Record<string, any>) => {
      const person: Record<string, any> = {
        ...other,
        'facility_name': null,
        'occupation': null,
      }
      for (const key in client) {
        if(key === 'birthDay' || key === 'birthMonth' || key === 'birthYear') continue
        person[convertToUnderscores(key)] = client[key].value
      }
      return person
    }

    onMounted(async () => {
      const data = await Patientservice.findByID(patientId.value)
      patient.value = new Patientservice(data)
    }) 
 
    return {
      patient,
      hasErrors,
      createRegistrationEncounter,
    };
  },
});
</script>
