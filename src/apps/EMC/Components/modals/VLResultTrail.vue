<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-grid style="width: 100%">  
      <ion-row style="padding: 0 !important;" :style="{ minHeight: rows.length ? '0' : '30vh'}" >
        <ion-col size="12" class="ion-no-padding">
          <data-table 
            :rows="rows"
            :columns="columns"
            :row-actions-buttons="[voidBtn]"
            :config="{ showSearchField: false }"
            color="custom"
          />
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="modal.hide()" slot="end">Close</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts" setup>
import { 
  IonCol, 
  IonGrid, 
  IonRow, 
  IonContent, 
  IonFooter, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton,
} from "@ionic/vue";
import { modal } from "@/utils/modal";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../../interfaces/emc_event";
import { Patientservice } from "@/services/patient_service";
import { computed, onMounted, ref, defineProps } from "vue";
import ApiStore from "@/composables/ApiStore";
import { Order } from "@/interfaces/order";
import isEmpty from "lodash/isEmpty";
import { DataTable, RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { Test } from "@/interfaces/test";
import HisDate from "@/utils/Date";
import popVoidReason from "@/utils/ActionSheetHelpers/VoidReason";
import { EncounterService } from "@/services/encounter_service";

const props = defineProps<{patient: Patientservice}>();
const title = computed(() => `Viral Load Results for ${props.patient.getFullName()}`);
const rows = ref<Array<any>>([])
const columns: Array<TableColumnInterface> = [
  { path: "accession_number", label: "Accession"},
  { path: "test", label: "Test Name"},
  { path: "specimen.name", label: "Specimen"},
  { path: "order_date", label: "Order Date", formatter: HisDate.toStandardHisDisplayFormat },
  { path: "result", label: "Result"},
  { path: "result_date", label: "Result Date", formatter: HisDate.toStandardHisDisplayFormat },
]

const voidBtn: RowActionButtonInterface = {
  label: "X",
  color: "danger",
  action({ encounter_id }) {
    popVoidReason(async (reason: string) => {
      try {
        await EncounterService.voidEncounter(encounter_id, reason);
        modal.hide();
        EventBus.emit(EmcEvents.RELOAD_LATEST_VL_RESULT);
        EventBus.emit(EmcEvents.RELOAD_PATIENT_VISIT_DATA);
      }catch (e) {
        console.error(e);
      }
    }, 'small-modal custom-modal-backdrop')
  },
}

const isVLTestWithResults = (test: Test) => {
  return /hiv/i.test(test.name) && !isEmpty(test.result);
}

const loadOrders = async () => {
  const orders: Array<Order> = await ApiStore.get('PATIENT_LAB_ORDERS', { patientID: props.patient.getID() });
  orders.forEach(order => order.tests?.forEach(test => {
    if(isVLTestWithResults(test)) {
      test.result?.forEach(result => {
        rows.value.push({
          ...order,
          test: test.name,
          result: `${result.value_modifier} ${result.value}`,
          result_date: result.date
        });
      }) 
    }
  }))
}

onMounted(() => loadOrders());
</script>