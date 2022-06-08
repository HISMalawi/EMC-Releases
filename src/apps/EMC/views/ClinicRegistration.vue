<template>
  <Layout>
    <ion-grid>
      <ion-row class="his-card">
        <ion-col size="12">
          <ion-title class="ion-text-center ion-margin-vertical ion-padding-bottom bold">
            HIV Clinic Registration
          </ion-title>
          <ion-row class="ion-margin-top ion-margin-bottom">
          <ion-col size="5" class="ion-margin-top ion-margin-bottom">
            <text-input v-model="form.arvNumber" :prefix="`${sitePrefix}-ARV-`" />
          </ion-col>
          <ion-col size="7" class="ion-margin-top ion-margin-bottom">
            <DateInput v-model="form.initialVisitDate" />
          </ion-col>
          <ion-col size="5" class="ion-margin-top ion-margin-bottom">
            <yes-no-input v-model="form.shouldFollowUp" inline />
          </ion-col>
          <ion-col size="7" class="ion-margin-top ion-margin-bottom">
            <yes-no-input v-model="form.receivedArvTreatmentBefore" inline />
          </ion-col>
          <template v-if="form.receivedArvTreatmentBefore.value === 'Yes'">
            <ion-col size="12" class="ion-margin-top ion-margin-bottom">
              <DateInput v-model="form.dateLastTakenArvs" />
            </ion-col>
            <ion-col size="12" class="ion-margin-top ion-margin-bottom">
              <yes-no-input v-model="form.everRegisteredAtClinic" inline />
            </ion-col>
          </template>
          <template v-if="form.everRegisteredAtClinic.value === 'Yes'">
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="form.artInitiationLocation" :asyncOptions="getFacilities" allowCustom searchable />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <DateInput v-model="form.artStartDate" />
            </ion-col>
            <ion-col size="3" class="ion-margin-top ion-margin-bottom">
              <NumberInput v-model="form.initialWeight" :min="1" allowUnknown />
            </ion-col>
            <ion-col size="3" class="ion-margin-top ion-margin-bottom">
              <NumberInput v-model="form.initialHeight" :min="1" allowUnknown />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="form.initialTBStatus" :options="tbStatusOptions" />
            </ion-col>
          </template>
          <ion-col size="12" class="ion-margin-top ion-margin-bottom">
            <SelectInput v-model="form.confirmatoryTest" :options="HIVTestOptions" />
          </ion-col>
          <template v-if="form.confirmatoryTest.value !== 'Not Done'">
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="form.confirmatoryTestLocation" :asyncOptions="getFacilities" allowCustom searchable />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <DateInput v-model="form.confirmatoryTestDate" :min-date="patientDob" :max-date="today" />
            </ion-col>
          </template>
        </ion-row>
          <ion-button class="ion-margin-top ion-float-end" size="large" color="success">Next</ion-button>
          <ion-button class="ion-margin-top ion-float-end" size="large" color="warning">Clear</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import {  computed, defineComponent, onMounted, reactive, ref, watch } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol, IonButton, IonTitle } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import {  toastWarning } from "@/utils/Alerts";
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from "@/components/Forms/FieldInterface";
import HisDate, { STANDARD_DATE_FORMAT } from "@/utils/Date";
import { LocationService } from "@/services/location_service";
import { isEmpty } from "lodash";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { useRoute, useRouter } from "vue-router";
import { RelationsService } from "@/services/relations_service";
import { DTForm } from "../interfaces/dt_form_field";
import TextInput from "../Components/inputs/TextInput.vue";
import DateInput from "../Components/inputs/DateInput.vue"
import YesNoInput from "../Components/inputs/YesNoInput.vue";
import { ProgramService } from "@/services/program_service";
import { ClinicRegistrationService } from "@/apps/ART/services/registration_service";
import SelectInput from "../Components/inputs/SelectInput.vue";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";
import NumberInput from "../Components/inputs/NumberInput.vue";
import { tbStatusOptions, HIVTestOptions } from '@/apps/EMC/utils/DTFormElements'
import dayjs from "dayjs";

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
    NumberInput
},
  setup() {
    const route = useRoute()
    const patientId = ref(route.params.id.toString() || '')
    const patient = ref<Patientservice>()
    const sitePrefix = ref("");
    const registrationService = new ClinicRegistrationService(parseInt(patientId.value), -1)
    const today = dayjs().format(STANDARD_DATE_FORMAT)
    const patientDob = computed(() => {
      const date = patient.value?.getBirthdate() 
      return date ? dayjs(date).format(STANDARD_DATE_FORMAT) : ''
    })

    const  buildDateObs = (conceptName: string, date: string, isEstimate = false) => {
      if (date.match(/unknown/i)) {
        return registrationService.buildValueText(conceptName, 'Unknown')
      } else if (isEstimate) {
        return registrationService.buildValueDateEstimated(conceptName, date)
      } else {
        return registrationService.buildValueDate(conceptName, date)
      }
    }

    const form = reactive<DTForm>({
      arvNumber: {
        value: '',
        label: 'ARV Number',
        placeholder: "Enter ARV Number",
        required: true,
        validation: async (arvNumber: Option) => {
          const patients = await Patientservice.findByOtherID(4, `${sitePrefix.value}-ARV-${arvNumber.value}`);
          return isEmpty(patients) ?  null : ['ARV Number already exists'];
        },
      },
      initialVisitDate: {
        value: '',
        label: 'Initial Visit Date',
        placeholder: "Enter Initial Visit Date",
        computedValue: (date: string) => ({
          tag: 'registration',
          obs: buildDateObs('Initial Visit Date', date)
        }),
        required: true,
      },
      shouldFollowUp: {
        value: '',
        label: 'Agrees to follow up ?',
        computedValue: (agrees: string) => ({
          tag: 'registration',
          obs: registrationService.buildValueCoded('Agrees to followup', agrees)
        }),
        required: true,
      },
      receivedArvTreatmentBefore: {
        value: '',
        label: 'Ever received ARVs for treatment or prophylaxis?',
        computedValue: (receivedTreatment: string) => ({
          tag: 'registration',
          obs: registrationService.buildValueCoded('Ever received ART', receivedTreatment)
        }),
        required: true,
      },
      dateLastTakenArvs: {
        value: '',
        label: 'Date last taken ARVs',
        placeholder: "Enter Date last taken ARVs",
        computedValue: (date: string) => ({
          tag: 'registration',
          obs: buildDateObs('Date ART last taken', date)
        }),
        required: true,
      },
      everRegisteredAtClinic: {
        value: '',
        label: 'Ever registred at an ART clinic',
        computedValue: (everRegistered: string) => ({
          tag: 'registration',
          obs: registrationService.buildValueCoded('Ever registered at ART clinic', everRegistered)
        })
      },
      artInitiationLocation: {
        value: '',
        label: 'Location of ART Initiation',
        computedValue: (location: string) => ({
          tag:'registration',
          obs: registrationService.buildValueText('Location of ART initiation', location)
        })
      },
      artStartDate: {
        value: '',
        label: 'Date started ART',
        placeholder: 'Date started ART',
        computedValue: (date: string) => ({
          tag: 'registration',
          obs: buildDateObs('Date ART started', date)
        })
      },
      initialWeight: {
        value: '',
        label: 'Initial Weight',
        placeholder: 'Enter weight',
        computedValue: (weight: number) => ({
          tag: 'vitals',
          obs: registrationService.buildValueNumber('weight', weight)
        })
      },
      initialHeight: {
        value: '',
        label: 'Initial Height',
        placeholder: 'Enter height',
        computedValue: (height: number) => ({
          tag: 'vitals',
          obs: registrationService.buildValueNumber('Height', height)
        })
      },
      initialTBStatus: {
        value: '',
        label: 'Initial TB Status',
        placeholder: 'select TB status',
        computedValue(status: string) {
          return {
            tag: 'vitals',
            obs: registrationService.buildValueText("TB Status", status)
          }
        }
      },
      confirmatoryTest: {
        value: '',
        label: 'Confirmatory Test',
        placeholder: 'Select confirmatory test',
        computedValue(test: string){
          return {
            tag: 'registration',
            obs: registrationService.buildValueCoded('Confirmatory hiv test type', test)
          }
        }
      },
      confirmatoryTestLocation: {
        value: '',
        label: 'Location of Confirmatory',
        placeholder: 'Select location',
        computedValue(location: string){
          return {
            tag: 'registration',
            obs: registrationService.buildValueText(
              'Confirmatory HIV test location', location
            )
          }
        }
      },
      confirmatoryTestDate: {
        value: '',
        label: 'Confirmatory HIV Test Date',
        computedValue(date: string){
          return {
            tag: 'reg',
            obs: buildDateObs('Confirmatory HIV test date', date)
          }
        }
      }
    })

    onMounted(async () => {
      const data = await Patientservice.findByID(patientId.value)
      patient.value = new Patientservice(data)
      sitePrefix.value = await GLOBAL_PROP.sitePrefix();
      const suggestedNumber = await ProgramService.getNextSuggestedARVNumber();
      form.arvNumber.value = suggestedNumber.arv_number.replace(/^\D+|\s/g, "");
    }) 
 
    return {
      patient,
      today,
      patientDob,
      form,
      sitePrefix,
      tbStatusOptions,
      HIVTestOptions,
      getFacilities,
    };
  },
});
</script>
