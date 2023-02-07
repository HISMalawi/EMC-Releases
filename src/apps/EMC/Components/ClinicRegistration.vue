<template>
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
    <ion-col size="6" class="ion-margin-top ion-margin-bottom">
      <SelectInput v-model="form.tptHistory" :form="form" :options="tptHistoryOptions" />
    </ion-col>
    <template v-if="tptDrugs.length">
      <ion-col size="6" class="ion-margin-top ion-margin-bottom">
        <DateInput v-model="form.tptStartDate" :min-date="patientDob" :max-date="today" :form="form" />
      </ion-col>
      <ion-col size="6" class="ion-margin-top ion-margin-bottom" v-if="tptDrugs.includes('INH or H (Isoniazid 300mg tablet)')">
        <NumberInput v-model="form.inhQty" :form="form" :min="1" />
      </ion-col>
      <ion-col size="6" class="ion-margin-top ion-margin-bottom" v-if="tptDrugs.includes('Rifapentine (150mg)')">
        <NumberInput v-model="form.rifapentineQty" :form="form" :min="1" />
      </ion-col>
      <ion-col size="6" class="ion-margin-top ion-margin-bottom" v-if="tptDrugs.includes('INH 300 / RFP 300 (3HP)')">
        <NumberInput v-model="form.threeHPQty" :form="form" :min="1" />
      </ion-col>
      <ion-col size="6" class="ion-margin-top ion-margin-bottom">
        <SelectInput v-model="form.tptStartLocation" :form="form" :asyncOptions="getFacilities" allowCustom />
      </ion-col>
    </template>
    </template>
    <ion-col size="6" class="ion-margin-top ion-margin-bottom">
      <SelectInput v-model="form.confirmatoryTest" :form="form" :options="HIVTestOptions" />
    </ion-col>
    <template v-if="isConfirmatoryTestDone">
      <ion-col size="6" class="ion-margin-top ion-margin-bottom">
        <SelectInput v-model="form.confirmatoryTestLocation" :form="form" :asyncOptions="getFacilities" allowCustom />
      </ion-col>
      <ion-col size="6" class="ion-margin-top ion-margin-bottom">
        <DateInput v-model="form.confirmatoryTestDate" :form="form" :min-date="patientDob" :max-date="today" />
      </ion-col>
    </template>
    <ion-col size="12" class="ion-margin-top">
      <ion-button class="ion-margin-top ion-float-right" size="large" @click="onSubmit" color="success">Next</ion-button>
      <ion-button class="ion-margin-top ion-float-right" size="large" color="warning" @click="onClear">Clear</ion-button>
      <ion-button class="ion-margin-top ion-float-right" size="large" @click="$router.back()" color="primary" v-if="!isNewPatient">Back</ion-button>
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import {  computed, defineComponent, onMounted, PropType, reactive, ref, watch } from "vue";
import { IonRow, IonCol, IonTitle } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import {  alertConfirmation } from "@/utils/Alerts";
import { Option } from "@/components/Forms/FieldInterface";
import { STANDARD_DATE_FORMAT } from "@/utils/Date";
import { isEmpty } from "lodash";
import { DTForm } from "../interfaces/dt_form_field";
import TextInput from "../Components/inputs/TextInput.vue";
import DateInput from "../Components/inputs/DateInput.vue"
import YesNoInput from "../Components/inputs/YesNoInput.vue";
import { ProgramService } from "@/services/program_service";
import { ClinicRegistrationService } from "@/apps/ART/services/registration_service";
import SelectInput from "../Components/inputs/SelectInput.vue";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";
import NumberInput from "../Components/inputs/NumberInput.vue";
import { initialTbStatusOptions, HIVTestOptions, tptHistoryOptions } from '@/apps/EMC/utils/DTFormElements'
import dayjs from "dayjs";
import { VitalsService } from "@/apps/ART/services/vitals_service";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { submitForm } from "../utils/form";
import { PatientTypeService } from "@/apps/ART/services/patient_type_service";
import { ConsultationService } from "@/apps/ART/services/consultation_service";
import { RegimenService } from "@/services/regimen_service";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../interfaces/emc_event";

export default defineComponent({
  components: {
    IonRow,
    IonCol,
    IonTitle,
    TextInput,
    DateInput,
    YesNoInput,
    SelectInput,
    NumberInput
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
    sitePrefix: {
      type: String,
      required: true
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
  emits: ["onValue", "onNext"],
  setup(props, { emit }) {
    const customRegimenIngredients = ref<any[]>([])
    const registrationService = new ClinicRegistrationService(props.patient.getID(), -1)
    const consultationService = new ConsultationService(props.patient.getID(), -1)
    const vitalsService = new VitalsService(props.patient.getID(), -1)
    const patientTypeService = new PatientTypeService(props.patient.getID(), -1);
    const today = dayjs().format(STANDARD_DATE_FORMAT)
    const patientDob = computed(() => {
      const date = props.patient.getBirthdate() 
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
          const isNumberErr = StandardValidations.isNumber(arvNumber, "POSITIVE_INTEGERS")
          if(isNumberErr !== null) return isNumberErr
          const patients = await Patientservice.findByOtherID(4, `${props.sitePrefix}-ARV-${arvNumber.value}`);
          return isEmpty(patients) ?  null : ['ARV Number already exists'];
        },
      },
      initialVisitDate: {
        value: props.initialVisitDate,
        label: 'Registration Date',
        required: true,
      },
      shouldFollowUp: {
        value: props.observations['Agrees to followup'] 
          ? props.observations['Agrees to followup'].match(/yes|home visit/i) 
            ? 'Yes'
            : 'No'
          : '',
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
        value: props.observations['Ever received ART'] || '',
        label: 'Ever received ARVs for treatment or prophylaxis?',
        computedValue: (receivedTreatment: string) => ({
          tag: 'registration',
          obs: registrationService.buildValueCoded('Ever received ART', receivedTreatment)
        }),
        required: true,
      },
      dateLastTakenArvs: {
        value: props.observations['Date ART last taken'] || '',
        label: 'Date last taken ARVs',
        computedValue: (date: string) => ({
          tag: 'registration',
          obs: registrationService.buildValueDate('Date ART last taken', date)
        }),
        validation: async (date: Option, f: DTForm) => f.receivedArvTreatmentBefore.value === 'Yes' &&
          StandardValidations.required(date),
      },
      everRegisteredAtClinic: {
        value: props.observations['Ever registered at ART clinic'] || '',
        label: 'Ever registred at an ART clinic',
        computedValue: (everRegistered: string) => ({
          tag: 'registration',
          obs: registrationService.buildValueCoded('Ever registered at ART clinic', everRegistered)
        }),
        validation: async (everRegistered: Option, f: DTForm) => f.receivedArvTreatmentBefore.value === 'Yes' &&
          StandardValidations.required(everRegistered),
      },
      artInitiationLocation: {
        value: props.observations['Location of ART initiation'] || '',
        label: 'Location of ART Initiation',
        computedValue: (facility: Option | string) => ({
          tag:'registration',
          obs: consultationService.buildValueText(
            'Location of ART initiation',
            typeof facility === 'string' ? facility : facility.label
          )
        }),
        validation: async (location: Option, f: DTForm) => {
          return f.everRegisteredAtClinic.value === 'Yes' &&
           StandardValidations.required(location)
        }
      },
      artStartDate: {
        value: props.observations['Date ART started'] || '',
        label: 'Date started ART',
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
        value: props.observations['weight'] || '',
        label: 'Initial Weight',
        placeholder: 'Enter weight',
        computedValue: (weight: number) => ({
          tag: 'vitals',
          obs: vitalsService.buildValueNumber('weight', weight)
        }),
        validation: async (weight: Option, f: DTForm) => {
          return f.everRegisteredAtClinic.value === 'Yes' && weight.value !== "Unknown" && StandardValidations.validateSeries([
            () => StandardValidations.required(weight),
            () => vitalsService.validator({...weight, label: 'Weight'})
          ])
        }
      },
      initialHeight: {
        value: props.observations['Height'] || '',
        label: 'Initial Height',
        placeholder: 'Enter height',
        computedValue: (height: number) => ({
          tag: 'vitals',
          obs: registrationService.buildValueNumber('Height', height)
        }),
        validation: async (height: Option, f: DTForm) => {
          return f.everRegisteredAtClinic.value === 'Yes' && height.value !== "Unknown" && StandardValidations.validateSeries([
            () => StandardValidations.required(height),
            () => vitalsService.validator({ ...height, label: 'Height' })
          ])
        }
      },
      initialTBStatus: {
        value: props.observations["TB Status at Initiation"] || '',
        label: 'Initial TB Status',
        placeholder: 'select TB status',
        computedValue: (status: Option) => ({
          tag: 'registration',
          obs: registrationService.buildValueCoded(
            "TB Status at Initiation", 
            typeof status === 'string' ? status : status.label
          )
        }),
        validation: async (status: Option, f: DTForm) => {
          return f.everRegisteredAtClinic.value === 'Yes' && StandardValidations.required(status)
        }
      },
      tptHistory: {
        value: props.observations["Previous TB treatment history"] || '',
        label: "TPT History",
        placeholder: "Select TPT history",
        computedValue: (history: Option) => ({
          tag: "consultation",
          obs: consultationService.buildValueText(
            "Previous TB treatment history", 
            typeof history === 'string' ? history : history.label
          )
        }),
        validation: async (history, form) => {
          return form.everRegisteredAtClinic.value === 'Yes' && 
            StandardValidations.required(history)
        }
      },
      tptStartDate: {
        value: props.observations['TPT Drugs Received'] || '',
        label: "Date started TPT",
        validation: async (date, form) => {
          return form.tptHistory?.value?.label?.match(/currently/i) && 
            StandardValidations.required(date)
        }
      },
      inhQty: {
        value: '',
        label: "INH Amount Received",
        validation: async (amount, form) => {
          const history = form.tptHistory?.value?.label
          return history?.match(/currently/i) && 
            (history.match(/ipt/i) || history.includes('3HP (RFP + INH)')) && 
            StandardValidations.required(amount)
        },
        computedValue: (amount, form) => ({
          tag: 'consultation',
          obs:  consultationService.buildObs('TPT Drugs Received', {
            'value_drug': customRegimenIngredients.value.find(d => d.name === 'INH or H (Isoniazid 300mg tablet)')?.drug_id || 0,
            'value_datetime': form?.tptStartDate.value || null,
            'value_numeric': amount || 0
          })
        }),
      },
      rifapentineQty: {
        value: '',
        label: "Rifapentine Amount Received",
        validation: async (amount, form) => {
          const history = form.tptHistory?.value?.label
          return history?.match(/currently/i) && history.includes('3HP (RFP + INH)') && 
            StandardValidations.required(amount)
        },
        computedValue: (amount, form) => ({
          tag: 'consultation',
          obs: consultationService.buildObs('TPT Drugs Received', {
            'value_drug': customRegimenIngredients.value.find(d => d.name === 'Rifapentine (150mg)')?.drug_id || 0,
            'value_datetime': form?.tptStartDate.value || null,
            'value_numeric': amount || 0
          })
        }),
      },
      threeHPQty: {
        value: '',
        label: "INH / RFP Amount Received",
        validation: async (amount, form) => {
          const history = form.tptHistory?.value?.label
          return history?.match(/currently/i) && history.includes('INH 300 / RFP 300 (3HP)') && 
            StandardValidations.required(amount)
        },
        computedValue: (amount, form) => ({
          tag: 'consultation',
          obs: consultationService.buildObs('TPT Drugs Received', {
            'value_drug': customRegimenIngredients.value.find(d => d.name === 'INH 300 / RFP 300 (3HP)')?.drug_id || 0,
            'value_datetime': form?.tptStartDate.value || null,
            'value_numeric': amount || 0
          })
        }),
      },
      tptStartLocation: {
        value: props.observations['Location TPT Last Received'] || '',
        label: "TPT Transfer From",
        validation: async (date, form) => {
          return form.tptHistory?.value?.label?.match(/currently/i) && 
            StandardValidations.required(date)
        },
        computedValue: (facility: Option | string) => ({
          tag:'consultation',
          obs: consultationService.buildValueText(
            'Location TPT Last Received',
            typeof facility === 'string' ? facility : facility.label
          )
        }),
      },
      confirmatoryTest: {
        value: props.observations['Confirmatory hiv test type'] || '',
        label: 'Confirmatory Test',
        placeholder: 'Select confirmatory test',
        required: true,
        computedValue(test: Option){
          return {
            tag: 'registration',
            obs: registrationService.buildValueCoded(
              'Confirmatory hiv test type',
              typeof test === 'string' ? test : test.value
            )
          }
        }
      },
      confirmatoryTestLocation: {
        value: props.observations['Confirmatory HIV test location'] || '',
        label: 'Location of Confirmatory',
        placeholder: 'Select location',
        validation: async (location: Option, f: DTForm) => {
          return !(f.confirmatoryTest.value.label === 'Not done' || f.confirmatoryTest.value === 'Not done') && 
            StandardValidations.required(location)
        },
        computedValue(facility: Option | string){
          return {
            tag: 'registration',
            obs: registrationService.buildValueText(
              'Confirmatory HIV test location', 
              typeof facility === 'string' ? facility : facility.label
            )
          }
        }
      },
      confirmatoryTestDate: {
        value: props.observations['Confirmatory HIV test date'] || '',
        label: 'Confirmatory HIV Test Date',
        validation: async (date: Option, f: DTForm) => {
          return !(f.confirmatoryTest.value.label === 'Not done' || f.confirmatoryTest.value === 'Not done') && 
            StandardValidations.required(date)
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

    const isConfirmatoryTestDone = computed(() => !(form.confirmatoryTest.value.label === 'Not done' || form.confirmatoryTest.value === 'Not done'))

    watch(form.receivedArvTreatmentBefore, state => {
      if (state.value === 'No') {
        form.everRegisteredAtClinic.value = ''
      }
    });

    const tptDrugs = computed(() => {
      const tptHistory = typeof form.tptHistory.value === 'string' 
        ? form.tptHistory.value 
        : form.tptHistory.value?.label
      
        if(tptHistory?.match(/currently/i)){
        if(tptHistory.match(/ipt/i)) {
          return ["INH or H (Isoniazid 300mg tablet)"]
        } else if(tptHistory.includes("3HP (RFP + INH)")){
          return ['INH or H (Isoniazid 300mg tablet)', 'Rifapentine (150mg)']
        } else if(tptHistory.includes("INH 300 / RFP 300 (3HP)")){
          return ["INH 300 / RFP 300 (3HP)"]
        }
      }
      return []
    })

    const onClear = async () => {
      if((await alertConfirmation('Are you sure you want to clear all fields?'))) {
        for(const key in form) {
          if(key === 'patientType') continue;
          form[key].value = undefined
          form[key].error = ""
        }
      }
      EventBus.emit(EmcEvents.ON_CLEAR)
    }

    const onSubmit = async () => {
      patientTypeService.setDate(form.initialVisitDate.value)
      registrationService.setDate(form.initialVisitDate.value)
      vitalsService.setDate(form.initialVisitDate.value)
      consultationService.setDate(form.initialVisitDate.value)
      
      await submitForm(form, async (formData, computedData) => {
        emit("onValue", {
          type: 'registration',
          data: {
            formData,
            computedData,
            arvNumberEditable: !form.arvNumber.disabled
          }
        })
        emit("onNext")
      })
    }

    onMounted(async () => {
      const arvNumber = props.patient.getArvNumber()
      if(arvNumber && arvNumber !== 'Unknown') {
        form.arvNumber.value = arvNumber.split('-')[2]
        form.arvNumber.disabled = true
      } else {
        const suggestedNumber = await ProgramService.getNextSuggestedARVNumber();
        form.arvNumber.value = suggestedNumber.arv_number.replace(/^\D+|\s/g, "");
      }
      RegimenService.getCustomIngridients().then(drugs => customRegimenIngredients.value = drugs)
    }) 
 
    return {
      today,
      patientDob,
      form,
      isConfirmatoryTestDone,
      initialTbStatusOptions,
      tptHistoryOptions,
      HIVTestOptions,
      tptDrugs,
      getFacilities,
      onClear,
      onSubmit,
    };
  },
});
</script>
