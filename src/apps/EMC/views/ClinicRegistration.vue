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
            <text-input v-model="form.arvNumber" :form="form" :prefix="`${sitePrefix}-ARV-`" :disabled="!isNewPatient" />
          </ion-col>
          <ion-col size="7" class="ion-margin-top ion-margin-bottom">
            <DateInput v-model="form.initialVisitDate" :min-date="patientDob" :max-date="today" :form="form" />
          </ion-col>
          <ion-col size="5" class="ion-margin-top ion-margin-bottom">
            <yes-no-input v-model="form.shouldFollowUp" inline />
          </ion-col>
          <ion-col size="7" class="ion-margin-top ion-margin-bottom">
            <yes-no-input v-model="form.receivedArvTreatmentBefore" inline />
          </ion-col>
          <template v-if="form.receivedArvTreatmentBefore.value === 'Yes'">
            <ion-col size="12" class="ion-margin-top ion-margin-bottom">
              <DateInput v-model="form.dateLastTakenArvs" :form="form" :min-date="patientDob" :max-date="today" />
            </ion-col>
            <ion-col size="12" class="ion-margin-top ion-margin-bottom">
              <yes-no-input v-model="form.everRegisteredAtClinic" inline />
            </ion-col>
          </template>
          <template v-if="form.everRegisteredAtClinic.value === 'Yes'">
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="form.artInitiationLocation" :form="form" :asyncOptions="getFacilities" allowCustom />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <DateInput v-model="form.artStartDate" :form="form" :min-date="patientDob" :max-date="today" />
            </ion-col>
            <ion-col size="3" class="ion-margin-top ion-margin-bottom">
              <NumberInput v-model="form.initialWeight" :form="form" :min="1" allowUnknown />
            </ion-col>
            <ion-col size="3" class="ion-margin-top ion-margin-bottom">
              <NumberInput v-model="form.initialHeight" :form="form" :min="1" allowUnknown />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="form.initialTBStatus" :form="form" :options="initialTbStatusOptions" />
            </ion-col>
          </template>
          <ion-col size="12" class="ion-margin-top ion-margin-bottom">
            <SelectInput v-model="form.confirmatoryTest" :form="form" :options="HIVTestOptions" />
          </ion-col>
          <template v-if="form.confirmatoryTest.value.label !== 'Not done'">
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <SelectInput v-model="form.confirmatoryTestLocation" :form="form" :asyncOptions="getFacilities" allowCustom />
            </ion-col>
            <ion-col size="6" class="ion-margin-top ion-margin-bottom">
              <DateInput v-model="form.confirmatoryTestDate" :form="form" :min-date="patientDob" :max-date="today" />
            </ion-col>
          </template>
        </ion-row>
          <ion-button class="ion-margin-top ion-float-end" size="large" @click="onSubmit" color="success">Next</ion-button>
          <ion-button class="ion-margin-top ion-float-end" size="large" @click="onClear" color="warning">Clear</ion-button>
          <ion-button class="ion-margin-top ion-float-end" size="large" @click="$router.back()" color="primary" v-if="!isNewPatient">Back</ion-button>
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
import {  alertConfirmation, toastSuccess } from "@/utils/Alerts";
import { Option } from "@/components/Forms/FieldInterface";
import { STANDARD_DATE_FORMAT } from "@/utils/Date";
import { isEmpty } from "lodash";
import { useRoute, useRouter } from "vue-router";
import { DTForm } from "../interfaces/dt_form_field";
import TextInput from "../Components/inputs/TextInput.vue";
import DateInput from "../Components/inputs/DateInput.vue"
import YesNoInput from "../Components/inputs/YesNoInput.vue";
import { ProgramService } from "@/services/program_service";
import { ClinicRegistrationService } from "@/apps/ART/services/registration_service";
import SelectInput from "../Components/inputs/SelectInput.vue";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";
import NumberInput from "../Components/inputs/NumberInput.vue";
import { initialTbStatusOptions, HIVTestOptions } from '@/apps/EMC/utils/DTFormElements'
import dayjs from "dayjs";
import { VitalsService } from "@/apps/ART/services/vitals_service";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { isValidForm, resolveFormValues, resolveObs } from "../utils/form";
import { PatientTypeService } from "@/apps/ART/services/patient_type_service";
import { loader } from "@/utils/loader";
import { PatientProgramService } from "@/services/patient_program_service";

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
    const router = useRouter()
    const patientId = ref(parseInt(route.params.id.toString() || ''))
    const isNewPatient = route.params.new.toString().match(/true/i) ? true : false
    const patient = ref<Patientservice>()
    const sitePrefix = ref("");
    const registrationService = new ClinicRegistrationService(patientId.value, -1)
    const vitalsService = new VitalsService(patientId.value, -1)
    const patientTypeService = new PatientTypeService(patientId.value, -1);
    const today = dayjs().format(STANDARD_DATE_FORMAT)
    const patientDob = computed(() => {
      const date = patient.value?.getBirthdate() 
      return date ? dayjs(date).format(STANDARD_DATE_FORMAT) : ''
    })

    const form = reactive<DTForm>({
      arvNumber: {
        value: '',
        label: 'ARV Number',
        placeholder: "Enter ARV Number",
        required: true,
        validation: async (arvNumber, form) => {
          if(form.arvNumber.disabled) return null
          const patients = await Patientservice.findByOtherID(4, `${sitePrefix.value}-ARV-${arvNumber.value}`);
          return isEmpty(patients) ?  null : ['ARV Number already exists'];
        },
      },
      initialVisitDate: {
        value: '',
        label: 'Initial Visit Date',
        placeholder: "Enter Initial Visit Date",
        required: true,
      },
      shouldFollowUp: {
        value: '',
        label: 'Agrees to follow up ?',
        computedValue: (agrees: string) => ({
          tag: 'registration',
          obs: [
            registrationService.buildGroupValueCoded('Agrees to followup', 'Home visit', agrees),
            registrationService.buildGroupValueCoded('Agrees to followup', 'Phone', agrees),
          ]
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
          obs: registrationService.buildValueDate('Date ART last taken', date)
        }),
        validation: async (date: Option, f: DTForm) => f.receivedArvTreatmentBefore.value === 'Yes' &&
          StandardValidations.required(date),
      },
      everRegisteredAtClinic: {
        value: '',
        label: 'Ever registred at an ART clinic',
        computedValue: (everRegistered: string) => ({
          tag: 'registration',
          obs: registrationService.buildValueCoded('Ever registered at ART clinic', everRegistered)
        }),
        validation: async (everRegistered: Option, f: DTForm) => f.receivedArvTreatmentBefore.value === 'Yes' &&
          StandardValidations.required(everRegistered),
      },
      artInitiationLocation: {
        value: '',
        label: 'Location of ART Initiation',
        computedValue: async (facility: Option) => {
          return {
            tag:'registration',
            obs: registrationService.buildValueText('Location of ART initiation', facility.label)
          }
        },
        validation: async (location: Option, f: DTForm) => {
          return f.everRegisteredAtClinic.value === 'Yes' &&
           StandardValidations.required(location)
        }
      },
      artStartDate: {
        value: '',
        label: 'Date started ART',
        placeholder: 'Date started ART',
        computedValue: (date: string) => ({
          tag: 'registration',
          obs: registrationService.buildValueDate('Date ART started', date)
        }),
        validation: async (date: Option, f: DTForm) => {
          return f.everRegisteredAtClinic.value === 'Yes' &&
           StandardValidations.required(date)
        }
      },
      initialWeight: {
        value: '',
        label: 'Initial Weight',
        placeholder: 'Enter weight',
        computedValue: (weight: number) => ({
          tag: 'vitals',
          obs: vitalsService.buildValueNumber('weight', weight)
        }),
        validation: async (weight: Option, f: DTForm) => {
          return f.everRegisteredAtClinic.value === 'Yes' && StandardValidations.validateSeries([
            () => StandardValidations.required(weight),
            () => vitalsService.validator({...weight, label: 'Weight'})
          ])
        }
      },
      initialHeight: {
        value: '',
        label: 'Initial Height',
        placeholder: 'Enter height',
        computedValue: (height: number) => ({
          tag: 'vitals',
          obs: registrationService.buildValueNumber('Height', height)
        }),
        validation: async (height: Option, f: DTForm) => {
          return f.everRegisteredAtClinic.value === 'Yes' && StandardValidations.validateSeries([
            () => StandardValidations.required(height),
            () => vitalsService.validator({ ...height, label: 'Height' })
          ])
        }
      },
      initialTBStatus: {
        value: '',
        label: 'Initial TB Status',
        placeholder: 'select TB status',
        computedValue: (status: Option) => ({
          tag: 'registration',
          obs: registrationService.buildValueCoded("TB Status at Initiation", status.label)
        }),
        validation: async (status: Option, f: DTForm) => {
          return f.everRegisteredAtClinic.value === 'Yes' && StandardValidations.required(status)
        }
      },
      confirmatoryTest: {
        value: '',
        label: 'Confirmatory Test',
        placeholder: 'Select confirmatory test',
        required: true,
        computedValue(test: Option){
          return {
            tag: 'registration',
            obs: registrationService.buildValueCoded('Confirmatory hiv test type', test.value)
          }
        }
      },
      confirmatoryTestLocation: {
        value: '',
        label: 'Location of Confirmatory',
        placeholder: 'Select location',
        validation: async (location: Option, f: DTForm) => {
          return f.confirmatoryTest.value.label !== 'Not done' && StandardValidations.required(location)
        },
        computedValue(facility: Option){
          return {
            tag: 'registration',
            obs: registrationService.buildValueText(
              'Confirmatory HIV test location', facility.label
            )
          }
        }
      },
      confirmatoryTestDate: {
        value: '',
        label: 'Confirmatory HIV Test Date',
        validation: async (date: Option, f: DTForm) => {
          return f.confirmatoryTest.value.label !== 'Not done' && StandardValidations.required(date)
        },
        computedValue: (date: string) => ({
          tag: 'registration',
          obs: registrationService.buildValueDate('Confirmatory HIV test date', date)
        }),
      },
      patientType: {
        value: "New patient",
        computedValue: (patientType: string) => ({
          tag: 'patient type',
          obs: patientTypeService.buildValueCoded('Type of patient', patientType)
        }),
      }
    });

    watch(form.receivedArvTreatmentBefore, state => {
      if (state.value === 'No') {
        form.everRegisteredAtClinic.value = ''
      }
    });

    const onClear = async () => {
      if((await alertConfirmation('Are you sure you want to clear all fields?'))) {
        for(const key in form) {
          if(key === 'patientType') continue;
          form[key].value = undefined
          form[key].error = ""
        }
      }
    }

    const onSubmit = async () => {
      if(!(await isValidForm(form))) return
      loader.show()
      patientTypeService.setDate(form.initialVisitDate.value)
      registrationService.setDate(form.initialVisitDate.value)
      vitalsService.setDate(form.initialVisitDate.value)
      PatientTypeService.setSessionDate(form.initialVisitDate.value)
      
      const {formData, computedFormData} = resolveFormValues(form)
      if(!form.arvNumber.disabled && formData.arvNumber) {
        await patient.value?.createArvNumber(`${sitePrefix.value}-ARV-${formData.arvNumber}`)
      }

      await patientTypeService.createEncounter()
      const pTypeObs = await resolveObs(computedFormData, 'patient type')
      await patientTypeService.saveObservationList(pTypeObs)

      await registrationService.createEncounter()
      const regObs = await resolveObs(computedFormData, 'registration')
      await registrationService.saveObservationList(regObs)

      if(formData.everRegisteredAtClinic === 'Yes') {
        await vitalsService.createEncounter()
        const vitalsObs = await resolveObs(computedFormData, 'vitals')
        await vitalsService.saveObservationList(vitalsObs)
      }

      // enroll patient into HIV program
      if(isNewPatient) {
        const patientProgram =  new PatientProgramService(patient.value!.getID())
        patientProgram.setProgramDate(formData.initialVisitDate)
        await patientProgram.enrollProgram();
      }

      await loader.hide()
      await toastSuccess('Saved successfully')
      router.push(`/emc/staging/${patientId.value}`)
    }

    onMounted(async () => {
      const data = await Patientservice.findByID(patientId.value)
      patient.value = new Patientservice(data)
      sitePrefix.value = await GLOBAL_PROP.sitePrefix();
      const arvNumber = patient.value.getArvNumber()
      if(arvNumber && arvNumber !== 'Unknown') {
        form.arvNumber.value = arvNumber.split('-')[2]
        form.arvNumber.disabled = true
      } else {
        const suggestedNumber = await ProgramService.getNextSuggestedARVNumber();
        form.arvNumber.value = suggestedNumber.arv_number.replace(/^\D+|\s/g, "");
      }
    }) 
 
    return {
      patient,
      today,
      patientDob,
      form,
      sitePrefix,
      initialTbStatusOptions,
      HIVTestOptions,
      isNewPatient,
      getFacilities,
      onClear,
      onSubmit,
    };
  },
});
</script>
