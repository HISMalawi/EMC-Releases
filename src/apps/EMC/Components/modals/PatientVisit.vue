<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Patient Visit</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class=" ion-padding">
    <ion-grid style="width: 100%">
      <ion-row >
        <ion-col :size="showHeightField ? 6 : 4">
          <ion-label class=" ion-padding-bottom">Visit Date: </ion-label>
          <ion-input 
            type="date" 
            class="ion-margin-top"
            :class="form.visitDate.error ? 'box-input-error'  : 'box-input'"
            v-model="form.visitDate.value" 
          />
          <ion-note v-if="form.visitDate.error" color="danger">{{ form.visitDate.error }}</ion-note>
        </ion-col>
        <ion-col :size="showHeightField ? 6 : 4">
          <ion-label class=" ion-padding-bottom">Weight: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.weight.error ? 'box-input-error'  : 'box-input'" 
            v-model="form.weight.value" 
          />
          <ion-note v-if="form.weight.error" color="danger">{{ form.weight.error }}</ion-note>
        </ion-col>
        <ion-col size="6" v-if="showHeightField">
          <ion-label class="ion-padding-bottom">Height: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.height.error ? 'box-input-error'  : 'box-input'" 
            v-model="form.height.value" 
          />
          <ion-note v-if="form.height.error" color="danger">{{ form.height.error }}</ion-note>
        </ion-col>
        <ion-col :size="showHeightField ? 6 : 4">
          <ion-label class=" ion-padding-bottom">TB Status: </ion-label>
          <searchable-select-input
            class="ion-margin-top"
            :class="form.tbStatus.error ? 'box-input-error'  : 'box-input'"
            placeholder="Select TB status"
            :options="tbStatuses"
            :value="form.tbStatus.value"
            @onSelect="(status) => form.tbStatus.value = status"
            :searchable="false"
          />
          <ion-note v-if="form.tbStatus.error" color="danger">{{ form.tbStatus.error }}</ion-note>
        </ion-col>
        <template v-if="patient.isChildBearing()">
          <ion-col size="6" class="ion-margin-vertical ion-padding-top">
            <yes-no-input 
              label="Pregnant" 
              :value="form.isPregnant.value"  
              @onSelect="(state) => form.isPregnant = state" 
              inline
            />
          <ion-note v-if="form.isPregnant.error" color="danger">{{ form.isPregnant.error }}</ion-note>
          </ion-col>
          <ion-col size="6" class="ion-margin-vertical ion-padding-top">
            <yes-no-input 
              label="Breast feeding" 
              :value="form.isBreastfeeding.value" 
              @onSelect="(state) => form.isBreastfeeding.value = state" 
              inline
            />
          <ion-note v-if="form.isBreastfeeding.error" color="danger">{{ form.isBreastfeeding.error }}</ion-note>
          </ion-col>
        </template>
        <ion-col size="12" class="ion-margin-top ion-padding-top" >
          <yes-no-input 
            label="Has Side Effects / Contraindications ?" 
            :value="form.hasContraindications.value" 
            @onSelect="(state) => form.hasContraindications.value = state" 
            :color="form.hasContraindications.error ? 'danger' : 'primary'"
            inline 
          />
          <ion-note v-if="form.hasContraindications.error" color="danger">{{ form.hasContraindications.error }}</ion-note>
          <multi-column-view :items="contraIndications" :numberOfColumns="5" v-slot="{ entries }" v-if="form.hasContraindications.value === 'Yes'">
            <template v-for="entry in entries" :key="entry.value" >
             <ion-label style="font-weight: normal !important;">
                <ion-checkbox class="ion-margin-end ion-float-left" v-model="entry.isChecked" />
                <span class="ion-margin-top" style="vertical-align: middle;">{{ entry.label }}</span>
              </ion-label>
              <br><br>
            </template>
          </multi-column-view>
        </ion-col>
        <ion-col class="ion-padding-start" size="12" v-if="form.hasContraindications.value === 'Yes'">
          <yes-no-input 
            label="Has other side effects ?" 
            :value="form.hasSideEffects.value" 
            @onSelect="(state) => form.hasSideEffects = state"
            :color="form.hasSideEffects.error ? 'danger' : 'primary'"
            inline 
          />
          <ion-note v-if="form.hasSideEffects.error" color="danger">{{ form.hasSideEffects.error }}</ion-note>
          <multi-column-view :items="sideEffects" :numberOfColumns="5" v-slot="{ entries }" v-if="form.hasSideEffects.value === 'Yes'">
            <template v-for="entry in entries" :key="entry.value" >
              <ion-label style="font-weight: normal !important;">
                <ion-checkbox class="ion-margin-end ion-float-left" v-model="entry.isChecked" />
                <span class="ion-margin-top" style="vertical-align: middle;">{{ entry.label }}</span>
              </ion-label>
              <br><br>
            </template>
          </multi-column-view>
        </ion-col>
        <ion-col size="6" class="ion-padding-top ion-margin-top">
          <ion-label class=" ion-padding-bottom">Regimen: </ion-label>
          <searchable-select-input
            class="ion-margin-top"
            :class="form.regimen.error ? 'box-input-error'  : 'box-input'"
            :value="form.regimen.value"
            :options="regimens"
            :searchable="false"
            @onSelect="(reg) => form.regimen = reg"
          />
          <ion-note v-if="form.regimen.error" color="danger">{{ form.regimen.error }}</ion-note>
        </ion-col>
        <ion-col size="6" class="ion-padding-top ion-margin-top">
          <ion-label class="ion-padding-bottom">Quantity: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.totalArvsGiven.error ? 'box-input-error'  : 'box-input'" 
            v-model="form.totalArvsGiven.value" 
          />
          <ion-note v-if="form.totalArvsGiven.error" color="danger">{{ form.totalArvsGiven.error }}</ion-note>
        </ion-col>
        <ion-col size="6" class="ion-padding-top">
          <ion-label class=" ion-padding-bottom">CPT Quantity: </ion-label>
          <ion-input 
            type="number" :min="1" 
            class="ion-margin-top"
            :class="form.totalCPTGiven.error ? 'box-input-error'  : 'box-input'"
            v-model="form.totalCPTGiven.value" 
          />
          <ion-note v-if="form.totalCPTGiven.error" color="danger">{{ form.totalCPTGiven.error }}</ion-note>
        </ion-col>
         <ion-col size="6" class="ion-padding-top">
          <ion-label class=" ion-padding-bottom">TB Medications: </ion-label>
          <searchable-select-input
            class="ion-margin-top"
            :class="form.tbMed.error ? 'box-input-error'  : 'box-input'"
            placeholder="Select TB Medications"
            :options="tbMeds"
            :value="form.tbMed.value"
            @onSelect="(med) => form.tbMed.value = med"
            :searchable="false"
          />
          <ion-note v-if="form.tbMed.error" color="danger">{{ form.tbMed.error }}</ion-note>
        </ion-col>
        <ion-col :size="hasGivenRFP ? 6 : 12" v-if="hasGiven6H || hasGivenRFP">
          <ion-label class="ion-padding-bottom">IPT Quantity: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.tbStatus.error ? 'box-input-error'  : 'box-input'"
            v-model="form.totalIPTGiven.value" 
          />
          <ion-note v-if="form.totalIPTGiven.error" color="danger">{{ form.totalIPTGiven.error }}</ion-note>
        </ion-col>
        <ion-col size="6" v-if="hasGivenRFP">
          <ion-label class=" ion-padding-bottom">RFP Quantity: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.totalRFPGiven.error ? 'box-input-error'  : 'box-input'" 
            v-model="form.totalRFPGiven.value" 
          />
          <ion-note v-if="form.totalRFPGiven.error" color="danger">{{ form.totalRFPGiven.error }}</ion-note>
        </ion-col>
        <ion-col size="12" v-if="hasGiven3HP">
          <ion-label class=" ion-padding-bottom">3HP Quantity: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.totalRFPGiven.error ? 'box-input-error'  : 'box-input'"  
            v-model="form.total3HPGiven.value" 
          />
          <ion-note v-if="form.total3HPGiven.error" color="danger">{{ form.total3HPGiven.error }}</ion-note>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical ion-padding-vertical">
          <yes-no-input 
            label="Drugs given to patient"
            :value="form.patientPresent.value"
            @onSelect="setPatientPresent"
            inline
          />
          <ion-note v-if="form.patientPresent.error" color="danger">{{ form.patientPresent.error }}</ion-note>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical ion-padding-vertical">
          <yes-no-input 
            label="Drugs given to guardian" 
            :value="form.guardianPresent.value"
            @onSelect="setGuardianPresent" 
            inline
          />
          <ion-note v-if="form.guardianPresent.error" color="danger">{{ form.guardianPresent.error }}</ion-note>
        </ion-col>
        <ion-col size="6"> 
          <ion-label class="ion-padding-bottom">Pill Count: (Last dispensation: {{ totalPrevDrugs }}) </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.pillCount.error ? 'box-input-error'  : 'box-input'"  
            v-model="form.pillCount.value" 
          />
          <ion-note v-if="form.pillCount.error" color="danger">{{ form.pillCount.error }}</ion-note>
        </ion-col>
        <ion-col size="6" >
          <ion-label class=" ion-padding-bottom">Next Appointment Date: </ion-label>
          <ion-input 
            type="date"
            v-model="form.nextAppointmentDate.value"
            class="ion-margin-top"
            :class="form.nextAppointmentDate.error ? 'box-input-error'  : 'box-input'" 
          />
          <ion-note v-if="form.nextAppointmentDate.error" color="danger">{{ form.nextAppointmentDate.error }}</ion-note>
        </ion-col>
      </ion-row>   
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="closeModal" slot="end">Close</ion-button>
      <ion-button color="warning" @click="onClear" slot="end">Reset</ion-button>
      <ion-button color="success" @click="onSubmit" slot="end">Save</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from "vue";
import { 
  IonCol, 
  IonGrid, 
  IonRow, 
  modalController, 
  IonContent, 
  IonFooter, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonInput, 
  IonLabel,
  IonCheckbox, 
} from "@ionic/vue";
import { alertConfirmation, toastSuccess, toastWarning } from "@/utils/Alerts";
import { differenceWith, isEmpty, isEqual, isEqualWith } from "lodash";
import HisDate from "@/utils/Date";
import { Option } from "@/components/Forms/FieldInterface";
import SearchableSelectInput from "../inputs/SearchableSelectInput.vue";
import YesNoInput from "../inputs/yesNoInput.vue";
import { ConceptService } from "@/services/concept_service";
import MultiColumnView from "@/components/containers/MultiColumnView.vue";
import { PatientObservationService } from "@/services/patient_observation_service";
import { RegimenService } from "@/services/regimen_service";
import { ProgramService } from "@/services/program_service";
import { DrugOrderService } from "@/services/drug_order_service";
import { VitalsService } from "@/apps/ART/services/vitals_service";
import StandardValidations from "@/components/Forms/validations/StandardValidations";

export default defineComponent({
  components: {
    IonContent,
    IonFooter,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonCheckbox,
    SearchableSelectInput,
    YesNoInput,
    MultiColumnView
},
  props: {
    patient: {
      type: Object as PropType<PatientObservationService>,
      required: true
    },
  },
  setup(props) {
    const vitalsService = new VitalsService(props.patient.getID(), -1)
    const { toStandardHisFormat } = HisDate
    const prevHeight = ref<number>()
    const totalPrevDrugs = ref<number>()
    const regimens = ref<Option[]>([])
    const contraIndications = ref<Option[]>([]);
    const sideEffects = ref<Option[]>([]);

    const form = reactive({
      weight: {
        value: undefined as number | undefined,
        error: '',
        validation: (weight: Option) => StandardValidations.validateSeries([
          () => StandardValidations.required(weight),
          () => vitalsService.validator(weight)
        ])
      },
      height: {
        value: undefined as number | undefined,
        error: '',
        validation: (height: Option) => vitalsService.validator(height)
      },
      regimen: {
        value: undefined as Option | undefined,
        error: '',
        validation: (regimen: Option) => StandardValidations.required(regimen)
      },
      isPregnant: {
        value: undefined as "Yes" | "No"  | undefined,
        error: '',
        validation: (state: Option) => props.patient.isChildBearing() && StandardValidations.required(state)
      },
      isBreastfeeding: {
        value: undefined as "Yes" | "No"  | undefined,
        error: '',
        validation: (state: Option) => props.patient.isChildBearing() && StandardValidations.required(state)
      },
      visitDate: {
        value: undefined as string | undefined,
        error: '',
        validation: (date: Option) => StandardValidations.required(date)
      },
      nextAppointmentDate: {
        value: undefined as string | undefined,
        error: '',
        validation: (date: Option) => StandardValidations.required(date)
      },
      patientPresent: {
        value: undefined as "Yes" | "No"  | undefined,
        error: '',
        validation: (state: Option) => StandardValidations.required(state)
      },
      guardianPresent: {
        value: undefined as "Yes" | "No"  | undefined,
        error: '',
        validation: (state: Option) => StandardValidations.required(state)
      },
      pillCount: {
        value: undefined as number  | undefined,
        error: '',
        validation: (pills: Option) => StandardValidations.isNumber(pills)
      },
      totalCPTGiven: {
        value: undefined as number  | undefined,
        error: '',
        validation: (drugs: Option) => StandardValidations.isNumber(drugs)
      },
      totalIPTGiven: {
        value: undefined as number  | undefined,
        error: '',
        validation: (drugs: Option, form: any) => {
          return (form.tbMed.value?.label === '6H' || form.tbMed.value?.label === '3HP (RFP + INH)') && 
            StandardValidations.isNumber(drugs)
        }
      },
      totalRFPGiven: {
        value: undefined as number  | undefined,
        error: '',
        validation: (drugs: Option, form: any) => {
          return form.tbMed.value?.label === '3HP (RFP + INH)' && 
            StandardValidations.isNumber(drugs)
        }
      },
      total3HPGiven: {
        value: undefined as number  | undefined,
        error: '',
        validation: (drugs: Option, form: any) => {
          return form.tbMed.value?.label === '3HP (INH 300 / RFP 300)' && 
            StandardValidations.isNumber(drugs)
        }
      },
      totalArvsGiven: {
        value: undefined as number  | undefined,
        error: '',
        validation: (drugs: Option) => StandardValidations.isNumber(drugs)
      },
      tbMed: {
        value: undefined as Option | undefined,
        error: '',
        validation: (med: Option) => StandardValidations.required(med)
      },
      hasContraindications: {
        value: undefined as "Yes" | "No"  | undefined,
        error: '',
        validation: (state: Option, form: any) => {
          if(state.value === "Yes" && contraIndications.value.some(x => !x.isChecked))
            return ["Please select at least one"]
          return StandardValidations.required(state)
        }
      },
      hasSideEffects: {
        value: undefined as "Yes" | "No"  | undefined,
        error: '',
        validation: (state: Option, form: any) => {
          return form.hasContraindications.value === 'Yes' && StandardValidations.required(state)
        }
      },
      tbStatus: {
        value: undefined as Option | undefined,
        error: '',
        validation: (state: Option) => StandardValidations.required(state)
      },
    })
    
    const hasGiven3HP = computed(() => form.tbMed.value?.label === '3HP (INH 300 / RFP 300)')
    const hasGivenRFP = computed(() => form.tbMed.value?.label === '3HP (RFP + INH)')
    const hasGiven6H = computed(() => form.tbMed.value?.label === '6H')
    const showHeightField = computed(() => !(prevHeight.value && props.patient.getAge() > 18))
    
    const tbStatuses = ref<Option[]>([
      { label: 'Confirmed TB Not on treatment', value: 'Confirmed TB Not on treatment' },
      { label: 'Confirmed TB on treatment', value: 'Confirmed TB on treatment' },
      { label: 'TB Not Suspected', value: 'TB Not Suspected' },
      { label: 'TB Suspected', value: 'TB Suspected' },
    ]);
    const tbMeds = ref<Option[]>([
      { label: '6H', value: '6H'},
      { label: '3HP (RFP + INH)', value: '3HP (RFP + INH)'},
      { label: '3HP (INH 300 / RFP 300)', value: '3HP (INH 300 / RFP 300)'}
    ])

    const setPatientPresent = (state: "Yes" | "No") => {
      form.patientPresent.value = state 
      if(state === 'No') {
        form.guardianPresent.value = "Yes"
      }
    }

    const setGuardianPresent = (state: "Yes" | "No") => {
      form.guardianPresent.value = state
      if(state === 'No') {
        form.patientPresent.value = "Yes"
      }
    }


    const closeModal = (data?: any) => {
      modalController.dismiss(data);
    };

    const isValid = () => {
      for (const key of Object.keys(form) as (keyof typeof form)[]) {
        if(typeof form[key].validation !== 'function') {
          form[key].error = ''
          continue
        }
        const payload = typeof form[key].value === 'object'
            ? form[key].value
            : { label: form[key].value, value: form[key].value }

        const errs = form[key].validation(payload as Option, form)
        if(errs && errs.length > 0) {
          form[key].error = errs.toString()
        } else {
          form[key].error = ''
        }       
      }
      return Object.values(form).every(({ error }) => !error)
    }

    const onSubmit = async () => {
      if(!isValid()) return
      console.log("the form is valid")
    }

    const onClear = async () => {
      const confirm = await alertConfirmation('Are you sure you want to clear all fields?')
      if(confirm) {
        type K = keyof typeof form
        for(const key in form) {
          form[key as K].value = undefined
        }
      }
    }

    onMounted (async () => {
      prevHeight.value = await props.patient.getRecentHeight()
      const prevPrescription: any[] = await DrugOrderService.getLastDrugsReceived(props.patient.getID())
      if(prevPrescription.length > 0) {
        totalPrevDrugs.value = prevPrescription[0].quantity
      }
      const regs: Record<string, any[]> = await RegimenService.getRegimens(props.patient.getID())
      if(!isEmpty(regs)) {
        regimens.value = Object.keys(regs).map(key => ({ label: key, value: key, other: regs[key] }))
      }
      contraIndications.value = ConceptService
        .getConceptsByCategory("contraindication", true)
        .map(concept => ({
          value: concept.concept_id,
          label: concept.name,
          other: concept
        }));
      sideEffects.value = ConceptService
        .getConceptsByCategory("side_effect", true)
        .map(concept => ({
          value: concept.concept_id,
          label: concept.name,
          other: concept
        }));
    });

    return {
      form,
      onSubmit,
      regimens,
      contraIndications,
      sideEffects,
      tbStatuses,
      tbMeds,
      hasGiven3HP,
      hasGivenRFP,
      hasGiven6H,
      totalPrevDrugs,
      showHeightField,
      setPatientPresent,
      setGuardianPresent,
      closeModal,
      onClear,
    };
  },
})
</script>

<style scoped>
ion-label {
  font-weight: bold;
}
</style>