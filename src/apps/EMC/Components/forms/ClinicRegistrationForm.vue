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
              :class="form.arvNumber.hasErrors ? 'box-input-error' : 'box-input'"
              @onValue="(arvNumber) => form.arvNumber.value = arvNumber"
            />
          </ion-col>
          <ion-col size="6">
            <ion-label>
              <span>Initial Visit Date (*):</span>
            </ion-label>
            <date-input
              :minDate="patientBirthday"
              :maxDate="today"
              @onValue="(date) => form.initialVisitDate.value = date"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom">
          <ion-col size="6">
            <ion-label>Agrees to follow up? (*): </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :value="form.shouldFollowUp.value"
              :class="form.shouldFollowUp.hasErrors ? 'box-input-error' : 'box-input'"
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
              :class="form.receivedArvTreatmentBefore.hasErrors ? 'box-input-error' : 'box-input'"
              :options="yesNoOptions"
              :searchable="false"
              @onSelect="({value}) => form.receivedArvTreatmentBefore.value = value"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom" v-show="receivedTreatment">
          <ion-col size="6">
            <ion-label>
              <span>Date last taken ARVs (*):</span>
            </ion-label>
            <date-input
              :minDate="patientBirthday"
              :maxDate="today"
              @onValue="(date) => form.dateLastTakenArvs.value = date"
            />
          </ion-col>
          <ion-col size="6">
            <ion-label> Ever registred at an ART clinic (*): </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :searchable="false"
              :value="form.everRegisteredAtClinic.value"
              :class="form.everRegisteredAtClinic.hasErrors ? 'box-input-error' : 'box-input'"
              :options="yesNoOptions"
              @onSelect="({value}) => form.everRegisteredAtClinic.value = value"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom" v-show="registeredBefore">
          <ion-col size="6">
            <ion-label>
              Location of ART Initiation (*):
              <span class="ion-float-right ion-margin-end checkbox-label">
                Location Unknown?
                <ion-checkbox v-model="artInitiationLocationUknown" class="checkbox-label"></ion-checkbox>
              </span>
            </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Location"
              :disabled="artInitiationLocationUknown"
              :value="form.artInitiationLocation.value"
              :class="form.artInitiationLocation.hasErrors ? 'box-input-error' : 'box-input'"
              :asyncOptions="getFacilities"
              @onSelect="({label}) => form.artInitiationLocation.value = label"
            />
          </ion-col>
          <ion-col size="6">
            <ion-label>
              <span>Date started ART (*):</span>
            </ion-label>
            <date-input
              :minDate="patientBirthday"
              :maxDate="today"
              @onValue="(date) => form.artStartDate.value = date"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom" v-show="registeredBefore">
          <ion-col size="6">
            <ion-label>
              Initial Vitals (*):
              <span class="ion-float-right ion-margin-end checkbox-label">
                Vitals Unknown?
                <ion-checkbox v-model="vitalsUnknown" class="checkbox-label"></ion-checkbox>
              </span>
            </ion-label>
            <ion-row style="width: 100%; padding-top: 0.5rem">
              <ion-col size="6">
                <ion-input
                  v-model="form.initialWeight.value"
                  :class="form.initialWeight.hasErrors ? 'box-input-error' : 'box-input'"
                  :placeholder="vitalsUnknown ? 'Unknown Weight' : 'Enter Weight'"
                  :disabled="vitalsUnknown"
                  type="number"
                />
              </ion-col>
              <ion-col size="6">
                <ion-input
                  v-model="form.initialHeight.value"
                  :class="form.initialHeight.hasErrors ? 'box-input-error' : 'box-input'"
                  :placeholder="vitalsUnknown ? 'Unknown Height' : 'Enter Height'"
                  :disabled="vitalsUnknown"
                  type="number"
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
              :searchable="false"
              :value="form.initialTBStatus.value"
              :class="form.initialTBStatus.hasErrors ? 'box-input-error' : 'box-input'"
              :options="tbStatusOptions"
              @onSelect="({value}) => form.initialTBStatus.value = value"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom">
          <ion-col size="12">
            <ion-label>Confirmatory Test (*): </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :value="form.confirmatoryTest.value"
              :class="form.confirmatoryTest.hasErrors ? 'box-input-error' : 'box-input'"
              :options="HIVTestOptions"
              :searchable="false"
              @onSelect="({value}) => form.confirmatoryTest.value = value"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-bottom" v-show="confirmatoryTestDone">
          <ion-col size="6">
            <ion-label>
              Location of Confirmatory (*):
              <span class="ion-float-right ion-margin-end checkbox-label">
                Location Unknown?
                <ion-checkbox v-model="confirmatoryTestLocationUnknown" class="checkbox-label"></ion-checkbox>
              </span>
            </ion-label>
            <searchable-select-input
              class="ion-margin-top"
              placeholder="Select Option"
              :disabled="confirmatoryTestLocationUnknown"
              :value="form.confirmatoryTestLocation.value"
              :class="form.confirmatoryTestLocation.hasErrors ? 'box-input-error' : 'box-input'"
              :asyncOptions="getFacilities"
              :searchable="false"
              @onSelect="({value}) => form.confirmatoryTestLocation.value = value"
            />
          </ion-col>
          <ion-col size="6">
            <ion-label>
              <span>Confirmatory HIV Test Date (*):</span>
            </ion-label>
            <date-input
              :minDate="patientBirthday"
              :maxDate="today"
              @onValue="(date) => form.confirmatoryTestDate.value = date"
            />
          </ion-col>
        </ion-row>
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
  getFacilities
} from "@/utils/HisFormHelpers/LocationFieldOptions";
import SearchableSelectInput from "@/apps/EMC/Components/forms/inputs/SearchableSelectInput.vue";
import { Option } from "@/components/Forms/FieldInterface";
import { Patientservice } from "@/services/patient_service";
import Validation from "@/components/Forms/validations/StandardValidations"
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import HisDate, { STANDARD_DATE_FORMAT } from "@/utils/Date";
import { yesNoOptions, tbStatusOptions, HIVTestOptions } from '@/apps/EMC/utils/DTFormElements'
import { ClinicRegistrationService } from "@/apps/ART/services/registration_service";
import DateInput from "@/apps/EMC/Components/forms/inputs/DateInput.vue"
import InputGroup from "./inputs/InputGroup.vue";
import dayjs from "dayjs";

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
    IonCheckbox,
    SearchableSelectInput,
    DateInput,
    InputGroup
  },
  setup(props) {
    const today = dayjs().format(STANDARD_DATE_FORMAT)
    const sitePrefix = ref("");
    const hasErrors = ref(false);
    const artInitiationLocationUknown = ref(false)
    const confirmatoryTestLocationUnknown = ref(false)
    const vitalsUnknown = ref(false)
    const registrationService = new ClinicRegistrationService(props.patient.getID(), -1)
    const patientBirthday = computed(() => dayjs(props.patient.getBirthdate()).format(STANDARD_DATE_FORMAT))

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
      initialVisitDate: {
        value: '',
        required: () => true,
        computedValue: ({value}) => ({
          tag: 'reg',
          obs: buildDateObs('Initial Visit Date', value.toString())
        })
      },
      shouldFollowUp: {
        value: '',
        required: () => true,
        computedValue: ({value}) => ({
          tag: 'reg',
          obs: registrationService.buildValueCoded('Agrees to followup', value.toString())
        })
      },
      receivedArvTreatmentBefore: {
        value: '',
        required: () => true,
        computedValue: ({value}) => ({
          tag: 'reg',
          obs: registrationService.buildValueCoded('Ever received ART', value.toString())
        })
      },
      dateLastTakenArvs: {
        value: '',
        computedValue: ({value}) => ({
          tag: 'reg',
          obs: buildDateObs('Date ART last taken', value.toString())
        })
      },
      everRegisteredAtClinic: {
        value: '',
        required: (f) => f?.receivedArvTreatmentBefore.value === "Yes",
        computedValue: ({value}) => {
          return registrationService.buildValueCoded('Ever registered at ART clinic', value.toString())
        }
      },
      artInitiationLocation: {
        value: '',
        computedValue: ({value}) => ({
          tag:'reg',
          obs: registrationService.buildValueText(
            'Location of ART initiation', value.toString()
          )
        })
      },
      artStartDate: {
        value: '',
        computedValue({value}){
          return {
            tag: 'reg',
            obs: buildDateObs('Date ART started', value.toString())
          }
        }
      },
      initialWeight: {
        value: '',
        computedValue({value}){
          return {
            tag: 'vitals',
            obs: registrationService.buildValueNumber('weight', parseFloat(value.toString()))
          }
        }
      },
      initialHeight: {
        value: '',
        computedValue({value}){
          return {
            tag: 'vitals',
            obs: registrationService.buildValueNumber('Height', parseFloat(value.toString()))
          }
        }
      },
      initialTBStatus: {
        value: '',
        computedValue({value}) {
          return {
            tag: 'vitals',
            obs: registrationService.buildValueText("TB Status", value.toString())
          }
        }
      },
      confirmatoryTest: {
        value: '',
        computedValue({value}){
          return {
            tag: 'reg',
            obs: registrationService.buildValueCoded(
              'Confirmatory hiv test type', value.toString()
            )
          }
        }
      },
      confirmatoryTestLocation: {
        value: '',
        computedValue({label}){
          return {
            tag: 'reg',
            obs: registrationService.buildValueText(
              'Confirmatory HIV test location', label
            )
          }
        }
      },
      confirmatoryTestDate: {
        value: '',
        computedValue({value}){
          return {
            tag: 'reg',
            obs: buildDateObs('Confirmatory HIV test date', value.toString())
          }
        }
      }
    });

    const receivedTreatment = computed(() => form.receivedArvTreatmentBefore.value === "Yes")
    const registeredBefore = computed(() => form.everRegisteredAtClinic.value === "Yes")
    const confirmatoryTestDone = computed(() => 
      form.confirmatoryTest.value === "Rapid Antibody Test" || 
      form.confirmatoryTest.value === "DNA PCR"
    )

    watch(artInitiationLocationUknown, isUnknown => {
      form.artInitiationLocation.value = isUnknown ? "Unknown" : ''
    })

    watch(confirmatoryTestLocationUnknown, isUnknown => {
      form.confirmatoryTestLocation.value = isUnknown ? "Unknown" : ''
    })

    onMounted(async () => {
      sitePrefix.value = await GLOBAL_PROP.sitePrefix();
    });

    return {
      form,
      today,
      patientBirthday,
      hasErrors,
      sitePrefix,
      isArvNumberEditable,
      artInitiationLocationUknown,
      confirmatoryTestLocationUnknown,
      confirmatoryTestDone,
      vitalsUnknown,
      yesNoOptions,
      HIVTestOptions,
      tbStatusOptions,
      receivedTreatment,
      registeredBefore,
      getFacilities,
    };
  },
});
</script>
