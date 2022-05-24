<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Patient Visit</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class=" ion-padding">
    <ion-grid style="width: 100%">
      <ion-row >
        <ion-col size="3">
          <ion-label class=" ion-padding-bottom">Visit Date: </ion-label>
          <ion-input type="date" class="box-input ion-margin-top" />
        </ion-col>
        <ion-col size="3">
          <ion-label class=" ion-padding-bottom">Weight: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top"  />
        </ion-col>
        <ion-col size="3">
          <ion-label class=" ion-padding-bottom">Height: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top"  />
        </ion-col>
        <ion-col size="3">
          <ion-label class=" ion-padding-bottom">TB Status: </ion-label>
          <searchable-select-input
            class="box-input ion-margin-top"
            placeholder="Select Outcome"
            :asyncOptions="getFacilities"
          />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <yes-no-input label="Pregnant" value="No" @onSelect="''" inline/>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <yes-no-input label="Breast feeding" value="No" @onSelect="''" inline/>
        </ion-col>
        <ion-col size="12" >
          <yes-no-input label="Has Side Effects / Contraindications ?" value="No" @onSelect="''" inline />
          <multi-column-view :items="contraIndications" :numberOfColumns="5" v-slot="{ entries }">
            <template v-for="entry in entries" :key="entry.value" >
              <ion-checkbox class="ion-margin-end ion-no-padding"  />
              <span class="ion-padding-bottom">{{ entry.label }}</span>
              <br><br>
            </template>
          </multi-column-view>
        </ion-col>
        <ion-col size="12">
          <yes-no-input label="Has other side effects ?" value="No" @onSelect="''" inline />
          <multi-column-view :items="sideEffects" :numberOfColumns="5" v-slot="{ entries }">
            <template v-for="entry in entries" :key="entry.value" >
              <ion-checkbox class="ion-margin-end ion-no-padding"  />
              <span class="ion-padding-bottom">{{ entry.label }}</span>
              <br><br>
            </template>
          </multi-column-view>
        </ion-col>
        <ion-col size="3">
          <ion-label class=" ion-padding-bottom">Regimen: </ion-label>
          <searchable-select-input
            class="box-input ion-margin-top"
            placeholder="Select regimens"
            :asyncOptions="getFacilities"
          />
        </ion-col>
        <ion-col size="3">
          <ion-label class="ion-padding-bottom">Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" />
        </ion-col>
        <ion-col size="3">
          <ion-label class=" ion-padding-bottom">CPT Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top"  />
        </ion-col>
         <ion-col size="3">
          <ion-label class=" ion-padding-bottom">TB Meds: </ion-label>
          <searchable-select-input
            class="box-input ion-margin-top"
            placeholder="Select TB Medicines"
            :asyncOptions="getFacilities"
          />
        </ion-col>
        <ion-col size="4">
          <ion-label class="ion-padding-bottom">IPT Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" />
        </ion-col>
        <ion-col size="4">
          <ion-label class=" ion-padding-bottom">RFP Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top"  />
        </ion-col>
        <ion-col size="4">
          <ion-label class=" ion-padding-bottom">3HP Quantity: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top"  />
        </ion-col>
        <ion-col size="3" class="ion-margin-vertical">
          <yes-no-input label="Drugs given to patient" value="No" @onSelect="''"/>
        </ion-col>
        <ion-col size="3" class="ion-margin-vertical">
          <yes-no-input label="Drugs given to guardian" value="No" @onSelect="''"/>
        </ion-col>
        <ion-col size="3"> 
          <ion-label class="ion-padding-bottom">Pill Count (Last dispensation: 60): </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" />
        </ion-col>
        <ion-col size="3" >
          <ion-label class=" ion-padding-bottom">Next Appointment Date: </ion-label>
          <ion-input type="date" class="box-input ion-margin-top" />
        </ion-col>
      </ion-row>   
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="closeModal" slot="end">Close</ion-button>
      <ion-button color="warning" @click="resetOutcome" slot="end">Reset</ion-button>
      <ion-button color="success" @click="saveOutcome" slot="end">Save</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
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
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { PatientProgramService } from "@/services/patient_program_service";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { Option } from "@/components/Forms/FieldInterface";
import SearchableSelectInput from "../inputs/SearchableSelectInput.vue";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";
import YesNoInput from "../inputs/yesNoInput.vue";
import { ConceptService } from "@/services/concept_service";
import MultiColumnView from "@/components/containers/MultiColumnView.vue";

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
    patientId: {
      type: Number,
      required: true
    },
  },
  setup(props) {
    const { toStandardHisDisplayFormat } = HisDate
    const patient = new PatientProgramService(props.patientId);
    const contraIndications = ref<Option[]>([]);
    const sideEffects = ref<Option[]>([]);
    const closeModal = (data?: any) => {
      modalController.dismiss(data);
    };

    const saveOutcome = async () => {
      closeModal({ data: 'refresh'});
    }

    const resetOutcome = () => {
      closeModal();
    }

    onMounted (async () => {
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
      contraIndications,
      sideEffects,
      toStandardHisDisplayFormat,
      closeModal,
      resetOutcome,
      saveOutcome,
      getFacilities,
    };
  },
})
</script>

<style scoped>
ion-label {
  font-weight: bold;
}
</style>