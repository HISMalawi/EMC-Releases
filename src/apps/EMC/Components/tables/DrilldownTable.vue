<template>
<IonPage>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="end">
        <IonButton slot="end" @click="modal.hide()" icon-only>
          <IonIcon :icon="close"></IonIcon>
        </IonButton>
      </IonButtons>
      <IonTitle>{{ title }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <data-table 
      :rows="rows"
      :async-rows="asyncRows" 
      :columns="columns"
      :row-actions-buttons="rowActionButtons"
      :actions-buttons="actionButtons"
      color="custom"
    />
  </IonContent>
</IonPage>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IonButton, IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonTitle, IonIcon } from "@ionic/vue";
import { DataTable, ActionButtonInterface, TableColumnInterface, RowActionButtonInterface } from "@uniquedj95/vtable";
import { close } from "ionicons/icons";
import { modal } from "@/utils/modal";

export default defineComponent({
  name: "DrilldownTable",
  components: {
    DataTable,
    IonButton,
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonIcon,
  },
  props: {
    title: {
      type: String,
      default: "Report",
    },
    rows: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    asyncRows: {
      type: Function as PropType<() => Promise<any[]>>,
    },
    columns: {
      type: Array as PropType<TableColumnInterface[]>,
      default: () => [],
    },
    rowActionButtons: {
      type: Array as PropType<RowActionButtonInterface[]>,
      default: () => [],
    },
    actionButtons: {
      type: Array as PropType<ActionButtonInterface[]>,
      default: () => [],
    },
    canExportCsv: {
      type: Boolean,
      default: false,
    },
    period: {
      type: String,
      default: "",
    },
  },
  setup(){
    return {
      close,
      modal,
    }
  }
})
</script>