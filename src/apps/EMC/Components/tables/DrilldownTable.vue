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
      :actions-buttons="actionBtns"
      color="custom"
    />
  </IonContent>
</IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { IonButton, IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonTitle, IonIcon } from "@ionic/vue";
import { DataTable, ActionButtonInterface, TableColumnInterface, RowActionButtonInterface } from "@uniquedj95/vtable";
import { close } from "ionicons/icons";
import { modal } from "@/utils/modal";
import dayjs from "dayjs";
import { exportToCSV } from "../../utils/exports";

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
      default: true,
    },
    period: {
      type: String,
      default: "",
    },
  },
  setup(props){
    const actionBtns = computed<ActionButtonInterface[]>(() => {
      const btns = [...props.actionButtons];
      if (props.canExportCsv) {
        btns.push({
          label: "CSV",
          color: "primary",
          action: async (_a, rows, filters, columns) => exportToCSV({
            rows, 
            filters,
            columns, 
            period: props.period.includes('Custom') ? props.period.substring(6) : props.period,
            filename: `${props.title}-${dayjs().format('DD-MMM-YYYY')}`
          })
        })
      }
      return btns;
    })

    return {
      close,
      modal,
      actionBtns,
    }
  }
})
</script>