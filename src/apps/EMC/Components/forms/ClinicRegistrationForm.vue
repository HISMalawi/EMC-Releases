<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <ion-title
          class="ion-text-center ion-margin-vertical ion-padding-bottom"
        >
          <b>HIV Clinic Registration</b>
        </ion-title>
        <ion-row class="ion-margin-bottom">
          <ion-col size="6">
            <ion-label>ARV Number (*): </ion-label>
            <input-group
              placeholder="Enter ARV Number"
              :value="form.arvNumber.value"
              :prepend="`${sitePrefix}-ARV-`"
              :disabled="!isArvNumberEditable"
              :class="form.arvNumber.hasErrors ? 'box-error' : 'box'"
              @onValue="(arvNumber) => form.arvNumber.value = arvNumber"
            />
          </ion-col>
          <ion-col size="6">
            <ion-label>
              <span>Initial Visit Date (*):</span>
            </ion-label>
            <ion-row style="width: 100%; padding-top: 0.5rem">
              <ion-col size="4">
                <ion-input
                  v-model="form.initialVisitDay.value"
                  :min="1"
                  :max="31"
                  :class="form.initialVisitDay.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="DD"
                />
              </ion-col>
              <ion-col size="4">
                <ion-input
                  v-model="form.initialVisitMonth.value"
                  :min="1"
                  :max="12"
                  :class="form.initialVisitMonth.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="MM"
                />
              </ion-col>
              <ion-col size="4">
                <ion-input
                  v-model="form.initialVisitYear.value"
                  :min="1900"
                  :class="form.initialVisitYear.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="YYYY"
                />
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom">
          <ion-col size="6">
            <ion-label>Agrees to follow up? (*): </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :value="form.shouldFollowUp.value"
              :class="form.shouldFollowUp.hasErrors ? 'box-error' : 'box'"
              :options="yesNoOptions"
              :searchable="false"
              @onSelect="(option) => form.shouldFollowUp.value = option.value"
            />
          </ion-col>
          <ion-col size="6">
            <ion-label
              >Ever received ARVs for treatment or prophylaxis? (*):
            </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :value="form.receivedArvTreatmentBefore.value"
              :class="form.receivedArvTreatmentBefore.hasErrors ? 'box-error' : 'box'"
              :options="yesNoOptions"
              :searchable="false"
              @onSelect="({value}) => form.receivedArvTreatmentBefore.value = value"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom" v-show="receivedTreatment">
          <ion-col size="6">
            <d-t-date-picker
              label="Date last taken ARVs (*):"
              :maxDate="'2022-03-18'"
              @onValue="(date) => form.dateLastTakenArvs.value = date"
            />
          </ion-col>
          <ion-col size="6">
            <ion-label> Ever registred at an ART clinic (*): </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :value="form.everRegisteredAtClinic.value"
              :class="form.everRegisteredAtClinic.hasErrors ? 'box-error' : 'box'"
              :options="yesNoOptions"
              @onSelect="({value}) => form.everRegisteredAtClinic.value = value"
            />
          </ion-col>
        </ion-row>
        <!-- <ion-row class="ion-margin-bottom" v-if="true">
          <ion-col size="6">
            <ion-label>
              Location of ART Initiation (*):
              <span class="ion-float-right ion-margin-end checkbox-label">
                Location Unknown?
                <ion-checkbox v-model="guardianPhoneUnknown"></ion-checkbox>
              </span>
            </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Location"
              :value="form.homeVillage.value"
              :class="form.homeVillage.hasErrors ? 'box-error' : 'box'"
              :asyncOptions="getVillagesByName"
              @onSelect="setPatientVillage"
            />
          </ion-col>
          <ion-col size="6">
            <ion-label>
              <span>Date started ART (*):</span>
            </ion-label>
            <ion-row style="width: 100%; padding-top: 0.5rem">
              <ion-col size="4">
                <ion-input
                  v-model="form.birthDay.value"
                  :min="1"
                  :max="31"
                  :class="form.birthDay.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="DD"
                />
              </ion-col>
              <ion-col size="4">
                <ion-input
                  v-model="form.birthMonth.value"
                  :min="1"
                  :max="12"
                  :class="form.birthMonth.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="MM"
                />
              </ion-col>
              <ion-col size="4">
                <ion-input
                  v-model="form.birthYear.value"
                  :min="1900"
                  :class="form.birthYear.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="YYYY"
                />
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom" v-show="true">
          <ion-col size="6">
            <ion-label>
              Initial Vitals (*):
              <span class="ion-float-right ion-margin-end checkbox-label">
                Vitals Unknown?
                <ion-checkbox v-model="guardianPhoneUnknown"></ion-checkbox>
              </span>
            </ion-label>
            <ion-row style="width: 100%; padding-top: 0.5rem">
              <ion-col size="6">
                <ion-input
                  v-model="form.birthDay.value"
                  :min="1"
                  :max="31"
                  :class="form.birthDay.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="Enter Height"
                />
              </ion-col>
              <ion-col size="6">
                <ion-input
                  v-model="form.birthMonth.value"
                  :min="1"
                  :max="12"
                  :class="form.birthMonth.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="Enter Height"
                />
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label>
              <span>Initial TB Status (*):</span>
            </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :value="form.homeVillage.value"
              :class="form.homeVillage.hasErrors ? 'box-error' : 'box'"
              :asyncOptions="getVillagesByName"
              @onSelect="setPatientVillage"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom">
          <ion-col size="4">
            <ion-label>Confirmatory Test (*): </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :value="form.gender.value"
              :class="form.gender.hasErrors ? 'box-error' : 'box'"
              :options="genderOptions"
              :searchable="false"
              @onSelect="setPatientGender"
            />
          </ion-col>
          <ion-col size="4">
            <ion-label>
              Location of Confirmatory (*):
              <span class="ion-float-right ion-margin-end checkbox-label">
                Location Unknown?
                <ion-checkbox></ion-checkbox>
              </span>
            </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :value="form.gender.value"
              :class="form.gender.hasErrors ? 'box-error' : 'box'"
              :options="genderOptions"
              :searchable="false"
              @onSelect="setPatientGender"
            />
          </ion-col>
          <ion-col size="4">
            <ion-label>
              <span>Confirmatory HIV Test Date (*):</span>
            </ion-label>
            <ion-row style="width: 100%; padding-top: 0.5rem">
              <ion-col size="4">
                <ion-input
                  v-model="form.birthDay.value"
                  :min="1"
                  :max="31"
                  :class="form.birthDay.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="DD"
                />
              </ion-col>
              <ion-col size="4">
                <ion-input
                  v-model="form.birthMonth.value"
                  :min="1"
                  :max="12"
                  :class="form.birthMonth.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="MM"
                />
              </ion-col>
              <ion-col size="4">
                <ion-input
                  v-model="form.birthYear.value"
                  :min="1900"
                  :class="form.birthYear.hasErrors ? 'box-error' : 'box'"
                  type="number"
                  placeholder="YYYY"
                />
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row> -->
        <ion-title
          class="ion-text-center ion-margin-top ion-padding-top errors"
          v-if="hasErrors"
        >
          <b>All required fields (*) must be completed before proceeding.</b>
        </ion-title>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCheckbox, IonCol, IonGrid, IonInput, IonRow } from "@ionic/vue";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import {
  getLandmarks,
  getVillagesByName,
} from "@/utils/HisFormHelpers/LocationFieldOptions";
import SearchableSelectInput from "@/apps/EMC/Components/forms/inputs/SearchableSelectInput.vue";
import { Option } from "@/components/Forms/FieldInterface";
import { Patientservice } from "@/services/patient_service";
import Validation from "@/components/Forms/validations/StandardValidations"
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import HisDate from "@/utils/Date";
import { yesNoOptions } from '@/apps/EMC/utils/DTFormElements'
import { ClinicRegistrationService } from "@/apps/ART/services/registration_service";
import DTDatePicker from "@/apps/EMC/Components/forms/inputs/DTDatePicker.vue"
import InputGroup from "./inputs/InputGroup.vue";

interface DTInputField {
  value: string;
  required?: (formData?: Record<string, DTInputField>) => boolean;
  validation?: (
    option: Option,
    computedValue?: any,
    formData?: Record<string, DTInputField>
  ) => Promise<string[] | null> | string[] | null;
  hasErrors?: boolean;
  other?: any;
  condition?: (formData: Record<string, DTInputField>) => boolean;
  computedValue?: (option: Option) => any;
}

export default defineComponent({
  name: "PatientRegistrationForm",
  props: {
    patient: {
      type: Object as PropType<Patientservice>,
      required: true
    },
    newRegistration: {
      type: Boolean,
      default: false,
    },
    onNext: {
      type: Function,
      required: true,
    },
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    // IonCheckbox,
    SearchableSelectInput,
    DTDatePicker,
    InputGroup
},
  setup(props) {
    const sitePrefix = ref("");
    const hasErrors = ref(false);
    const registrationService = new ClinicRegistrationService(props.patient.getID(), -1)
    const isArvNumberEditable = computed(() => {
      return (
        props.newRegistration || props.patient?.getArvNumber() === "Unknown"
      );
    });

    const buildDateObs = (conceptName: string, date: string, isEstimate = false) => {
      if (date.match(/unknown/i)) {
        return registrationService.buildValueText(conceptName, 'Unknown')
      } else if (isEstimate) {
        return registrationService.buildValueDateEstimated(conceptName, date)
      } else {
        return registrationService.buildValueDate(conceptName, date)
      }
    }

    const isArvNumberExists = async (arvNumber: string) => {
      const availableArvNumber = await Patientservice.findByOtherID(4, arvNumber);
      return availableArvNumber.length > 0;
    };

    const form = reactive<Record<string, DTInputField>>({
      arvNumber: {
        value: "",
        required: () => isArvNumberEditable.value,
        computedValue: ({ value }) => `${sitePrefix.value}-ARV-${value}`,
        validation: async (_, computedValue) => {
          const exists = await isArvNumberExists(computedValue);
          return exists ? ['ARV Number already exists'] : null;
        },
      },
      initialVisitDay: {
        value: '',
        validation: ({ value: day }: Option, _computedValue: any, formData: any) => {
          const maxDay = (
            formData.initialVisitYear.value >= HisDate.getCurrentYear() && 
            formData.initialVisitMonth.value >= (HisDate.getCurrentMonth() + 1)
          ) ? HisDate.getCurrentDay() : 31
          return Validation.rangeOf(day, 1, maxDay)
        }
      },
      initialVisitMonth: {
        value: '',
        validation: (month: Option, _computedValue: any, formData: any) => {
          const maxMonth = formData.initialVisitYear.value >= HisDate.getCurrentYear() 
            ? HisDate.getCurrentMonth() + 1 
            : 12
          return Validation.rangeOf(month.value, 1, maxMonth)
        }
      },
      initialVisitYear: {
        value: '',
        validation: (year: Option) => {
          const maxYear = (new Date).getFullYear()
          return Validation.rangeOf(year.value, 1900, maxYear)
        }
      },
      shouldFollowUp: {
        value: '',
        required: () => true,
        computedValue: ({value}) => {
          return registrationService.buildValueCoded('Agrees to followup', value.toString())
        }
      },
      dateLastTakenArvs: {
        value: '',
        computedValue: ({value}) => buildDateObs('Date ART last taken', value.toString())
      },
      receivedArvTreatmentBefore: {
        value: '',
        required: () => true,
        computedValue: ({value}) => {
          return registrationService.buildValueCoded('Ever received ART', value.toString())
        }
      },
      lastTakenArvDay: {
        value: '',
        validation: ({ value: day }: Option, _computedValue: any, formData: any) => {
          const maxDay = (
            formData.lastTakenArvYear.value >= HisDate.getCurrentYear() && 
            formData.lastTakenArvMonth.value >= (HisDate.getCurrentMonth() + 1)
          ) ? HisDate.getCurrentDay() : 31
          return Validation.rangeOf(day, 1, maxDay)
        }
      },
      lastTakenArvMonth: {
        value: '',
        validation: (month: Option, _computedValue: any, formData: any) => {
          const maxMonth = formData.lastTakenArvYear.value >= HisDate.getCurrentYear() 
            ? HisDate.getCurrentMonth() + 1 
            : 12
          return Validation.rangeOf(month.value, 1, maxMonth)
        }
      },
      lastTakenArvYear: {
        value: '',
        validation: (year: Option) => {
          const maxYear = (new Date).getFullYear()
          return Validation.rangeOf(year.value, 1900, maxYear)
        }
      },
      everRegisteredAtClinic : {
        value: '',
        required: (f) => f?.receivedArvTreatmentBefore.value === "Yes",
        computedValue: ({value}) => {
          return registrationService.buildValueCoded('Ever registered at ART clinic', value.toString())
        }
      }
    });

    const receivedTreatment = computed(() => form.receivedArvTreatmentBefore.value === "Yes")

    onMounted(async () => {
      sitePrefix.value = await GLOBAL_PROP.sitePrefix();
    });

    

    const genderOptions = [
      { label: "Male", value: "M" },
      { label: "Female", value: "F" },
    ];
    const landmarks = getLandmarks();
    const guardianNotAvailable = ref(false);
    const addCustomVillage = ref(false);
    const addCustomLandmark = ref(false);
    const guardianPhoneUnknown = ref(false);
    const patientPhoneUnknown = ref(false);

    const setPatientVillage = (option: Option) => {
      console.log(option);
    };

    const setPatientGender = (option: Option) => {
      console.log(option);
    };

    return {
      form,
      hasErrors,
      sitePrefix,
      isArvNumberEditable,
      yesNoOptions,
      receivedTreatment,
      guardianNotAvailable,
      addCustomVillage,
      addCustomLandmark,
      guardianPhoneUnknown,
      patientPhoneUnknown,
      landmarks,
      genderOptions,
      getVillagesByName,
      setPatientVillage,
      setPatientGender,
    };
  },
});
</script>


<style scoped>
.box {
  border-color: #a3a3a3;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
}

.checkbox-label {
  color: rgb(67, 149, 204);
  font-weight: bold;
}

.errors {
  color: red;
}

.box-error {
  border-color: red;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
}
</style>
