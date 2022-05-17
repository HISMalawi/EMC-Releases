<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Viral Load Results</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid style="width: 100%">
      <ion-row>
        <ion-col size="12">
          <ion-label class=" ion-padding-bottom">Result Modifier: </ion-label>
          <ion-select class="box-input ion-margin-top" v-model="modifier" :disabled="ldl">
            <ion-select-option value="=">&equals;</ion-select-option>
            <ion-select-option value=">">&gt;</ion-select-option>
            <ion-select-option value="<"> &lt; </ion-select-option>
            <ion-select-option value=">=">&le;</ion-select-option>
            <ion-select-option value="<=">&ge;</ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-label class=" ion-padding-bottom">Result: </ion-label>
          <ion-input type="number" :min="1" class="box-input ion-margin-top" v-model="result" :disabled="ldl" />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-label class=" ion-padding-bottom">Date: </ion-label>
          <ion-input type="date" class="box-input ion-margin-top" v-model="resultDate" />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class=" ion-margin-top">
          <ion-label class=" ion-padding-bottom ion-margin-top">Other Results Options: </ion-label>
          <ion-item>
            <ion-label>LDL</ion-label>
            <ion-checkbox slot="start" v-model="ldl" />
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="closeModal" slot="end">Close</ion-button>
      <ion-button color="warning" @click="resetResults" slot="end">Reset</ion-button>
      <ion-button color="success" @click="saveResults" slot="end">Save</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
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
  IonSelectOption,
  IonSelect,
  IonCheckbox,
  IonItem
} from "@ionic/vue";
import { ViralLoadResultsService } from "@/services/viral_load_results_service";
import { toastWarning } from "@/utils/Alerts";

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
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    IonItem
  },
  props: {
    patientId: {
      type: Number,
      required: true
    },
  },
  setup(props) {
    const modifier = ref('');
    const result = ref<number>();
    const ldl = ref(false);
    const resultDate = ref('');

    const closeModal = (data?: any) => {
      modalController.dismiss(data);
    };

    const isResultsValid = () => {
      return resultDate.value && (ldl.value || (modifier.value && result.value));
    };

    const saveResults = async () => {
      if(isResultsValid()) {
        const resultValue = ldl.value ? 1 : result.value || 0 ;
        const valueModifier = ldl.value ? '=' : modifier.value;
        const vlService = new ViralLoadResultsService(props.patientId);
        await vlService.setConcept();
        await vlService.createEncounter();
        await vlService.createOrder(resultDate.value);
        const obs = vlService.buildResultObs(resultDate.value, resultValue, valueModifier);
        await vlService.saveObs(obs);
        return closeModal({data: "ok"})
      }
      toastWarning('Please fill in all fields');
    }

    const resetResults = () => {
      modifier.value = '';
      result.value = undefined;
      ldl.value = false;
    };

    watch(ldl, (r) => {
      if(r) {
        modifier.value = '';
        result.value = undefined;
      }
    });

    return {
      result,
      modifier,
      resultDate,
      ldl,
      closeModal,
      resetResults,
      saveResults,
    };
  },
})
</script>