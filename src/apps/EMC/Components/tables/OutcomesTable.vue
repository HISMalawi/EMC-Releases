<template>
  <p class="ion-padding-horizontal ion-margin-vertical bold ion-margin-top">Previous Outcomes</p>
  <data-table 
    :rows="rows"
    :columns="columns"
    :config="tableConfig"
    :row-actions-buttons="TableRowActions"
    color="custom"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { alertConfirmation } from "@/utils/Alerts";
import DataTable, { 
  RowActionButtonInterface, 
  TableColumnInterface, 
  TableConfigInterface 
} from "../datatable";

export default defineComponent({
  name: "OutcomesTable",
  props: {
    patientStates: {
      type: Array as PropType<Array<any>>,
      required: true
    },
  },
  components: {
    DataTable,
  },
  emits: ["voidOutcome"],
  setup(props, { emit }) {
    const columns: TableColumnInterface[] = [
      { path: 'name', label: "Outcome"},
      { path: 'start_date', label: "Start Date", date: true },
      { path: 'end_date', label: "End Date", date: true },
    ];

    const tableConfig: TableConfigInterface = {
      showSearchField: false,
      showSubmitButton: false
    }

    const rows = computed<any[]>(() => props.patientStates.map((state: any, index: number) => ({
      ...state,
      index
    })));

    const TableRowActions: RowActionButtonInterface[] = [
      { label: "void", color: 'danger', action: async (row) => {
        if(!(await alertConfirmation("Are you sure you want to void this outcome?"))){
          emit("voidOutcome", {stateId: row.patient_state_id, index: row.index});
        }
      }}
    ]

    return {
      rows,
      columns,
      tableConfig,
      TableRowActions,
    };
  }
})
</script>