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
          <ion-input type="date" class="box-input ion-margin-top" v-model="form.visitDate" />
        </ion-col>
        <ion-col :size="showHeightField ? 6 : 4">
          <ion-label class=" ion-padding-bottom">Weight: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" v-model="form.weight" />
        </ion-col>
        <ion-col size="6" v-if="showHeightField">
          <ion-label class="ion-padding-bottom">Height: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" v-model="form.height" />
        </ion-col>
        <ion-col :size="showHeightField ? 6 : 4">
          <ion-label class=" ion-padding-bottom">TB Status: </ion-label>
          <searchable-select-input
            class="box-input ion-margin-top"
            placeholder="Select TB status"
            :options="tbStatuses"
            :value="form.tbStatus"
            @onSelect="(status) => form.tbStatus = status"
            :searchable="false"
          />
        </ion-col>
        <template v-if="patient.isChildBearing()">
          <ion-col size="6" class="ion-margin-vertical ion-padding-top">
            <yes-no-input 
              label="Pregnant" 
              :value="form.isPregnant"  
              @onSelect="(state) => form.isPregnant = state" 
              inline
            />
          </ion-col>
          <ion-col size="6" class="ion-margin-vertical ion-padding-top">
            <yes-no-input 
              label="Breast feeding" 
              :value="form.isBreastfeeding" 
              @onSelect="(state) => form.isBreastfeeding = state" 
              inline
            />
          </ion-col>
        </template>
        <ion-col size="12" class="ion-margin-top ion-padding-top" >
          <yes-no-input 
            label="Has Side Effects / Contraindications ?" 
            :value="form.hasContraindications" 
            @onSelect="(state) => form.hasContraindications = state" 
            inline 
          />
          <multi-column-view :items="contraIndications" :numberOfColumns="5" v-slot="{ entries }" v-if="form.hasContraindications === 'Yes'">
            <template v-for="entry in entries" :key="entry.value" >
             <ion-label style="font-weight: normal !important;">
                <ion-checkbox class="ion-margin-end ion-float-left"  />
                <span class="ion-margin-top" style="vertical-align: middle;">{{ entry.label }}</span>
              </ion-label>
              <br><br>
            </template>
          </multi-column-view>
        </ion-col>
        <ion-col class="ion-padding-start" size="12" v-if="form.hasContraindications === 'Yes'">
          <yes-no-input 
            label="Has other side effects ?" 
            :value="form.hasSideEffects" 
            @onSelect="(state) => form.hasSideEffects = state"
            inline 
          />
          <multi-column-view :items="sideEffects" :numberOfColumns="5" v-slot="{ entries }" v-if="form.hasSideEffects === 'Yes'">
            <template v-for="entry in entries" :key="entry.value" >
              <ion-label style="font-weight: normal !important;">
                <ion-checkbox class="ion-margin-end ion-float-left"  />
                <span class="ion-margin-top" style="vertical-align: middle;">{{ entry.label }}</span>
              </ion-label>
              <br><br>
            </template>
          </multi-column-view>
        </ion-col>
        <ion-col size="6" class="ion-padding-top ion-margin-top">
          <ion-label class=" ion-padding-bottom">Regimen: </ion-label>
          <searchable-select-input
            class="box-input ion-margin-top"
            placeholder="Select regimens"
            :value="form.regimen"
            :options="regimens"
            :searchable="false"
            @onSelect="(reg) => form.regimen = reg"
          />
        </ion-col>
        <ion-col size="6" class="ion-padding-top ion-margin-top">
          <ion-label class="ion-padding-bottom">Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" v-model="form.totalArvsGiven" />
        </ion-col>
        <ion-col size="6" class="ion-padding-top">
          <ion-label class=" ion-padding-bottom">CPT Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" v-model="form.totalCPTGiven" />
        </ion-col>
         <ion-col size="6" class="ion-padding-top">
          <ion-label class=" ion-padding-bottom">TB Medications: </ion-label>
          <searchable-select-input
            class="box-input ion-margin-top"
            placeholder="Select TB Medications"
            :options="tbMeds"
            :value="form.tbMed"
            @onSelect="(med) => form.tbMed = med"
            :searchable="false"
          />
        </ion-col>
        <ion-col :size="hasGivenRFP ? 6 : 12" v-if="hasGiven6H || hasGivenRFP">
          <ion-label class="ion-padding-bottom">IPT Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" v-model="form.totalIPTGiven" />
        </ion-col>
        <ion-col size="6" v-if="hasGivenRFP">
          <ion-label class=" ion-padding-bottom">RFP Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" v-model="form.totalRFPGiven" />
        </ion-col>
        <ion-col size="12" v-if="hasGiven3HP">
          <ion-label class=" ion-padding-bottom">3HP Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" v-model="form.total3HPGiven" />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical ion-padding-vertical">
          <yes-no-input 
            label="Drugs given to patient"
            :value="form.patientPresent"
            @onSelect="setPatientPresent" 
            inline
          />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical ion-padding-vertical">
          <yes-no-input 
            label="Drugs given to guardian" 
            :value="form.guardianPresent"
            @onSelect="setGuardianPresent" 
            inline
          />
        </ion-col>
        <ion-col size="6"> 
          <ion-label class="ion-padding-bottom">Pill Count: (Last dispensation: {{ totalPrevDrugs }}) </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" v-model="form.pillCount" />
        </ion-col>
        <ion-col size="6" >
          <ion-label class=" ion-padding-bottom">Next Appointment Date: </ion-label>
          <ion-input type="date" class="box-input ion-margin-top" v-model="form.nextAppointmentDate" />
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
import { isEmpty } from "lodash";
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
    const { toStandardHisFormat } = HisDate
    const prevHeight = ref<number>()
    const totalPrevDrugs = ref<number>()
    const regimens = ref<Option[]>([])
    const contraIndications = ref<Option[]>([]);
    const sideEffects = ref<Option[]>([]);

    const form = reactive({
      weight: undefined as number | undefined,
      height: undefined as number | undefined,
      regimen: undefined as Option | undefined,
      isPregnant: undefined as "Yes" | "No"  | undefined,
      isBreastfeeding: undefined as "Yes" | "No"  | undefined,
      visitDate: undefined as string | undefined,
      nextAppointmentDate: undefined as string | undefined,
      patientPresent: undefined as "Yes" | "No" | undefined,
      guardianPresent: undefined as "Yes" | "No"  | undefined,
      pillCount: undefined as number | undefined,
      totalCPTGiven: undefined as number | undefined,
      totalIPTGiven: undefined as number | undefined,
      totalRFPGiven: undefined as number | undefined,
      total3HPGiven: undefined as number | undefined,
      totalArvsGiven: undefined as number | undefined,
      tbMed: undefined as Option | undefined,
      hasContraindications: undefined as "Yes" | "No"  | undefined,
      hasSideEffects: undefined as "Yes" | "No"  | undefined,
      tbStatus: undefined as Option | undefined,
    })
    
    const hasGiven3HP = computed(() => form.tbMed?.label === '3HP (INH 300 / RFP 300)')
    const hasGivenRFP = computed(() => form.tbMed?.label === '3HP (RFP + INH)')
    const hasGiven6H = computed(() => form.tbMed?.label === '6H')
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
      form.patientPresent = state 
      if(state === 'No') {
        form.guardianPresent = "Yes"
      }
    }

    const setGuardianPresent = (state: "Yes" | "No") => {
      form.guardianPresent = state
      if(state === 'No') {
        form.patientPresent = "Yes"
      }
    }


    const closeModal = (data?: any) => {
      modalController.dismiss(data);
    };

    const onSubmit = async () => {
      closeModal({ data: 'refresh'});
    }

    const onClear = async () => {
      const confirm = await alertConfirmation('Are you sure you want to clear all fields?')
      if(confirm) {
        type K = keyof typeof form
        for(const key in form) {
          form[key as K] = undefined
        }
      }
    }

    watch(form, f => console.log(f))

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