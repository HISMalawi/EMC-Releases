<template>
  <p class="ion-padding-horizontal ion-margin-vertical bold ion-margin-top">Previous Outcomes</p>
  <report-table
    :rows="rows"
    :columns="columns"
    :config="tableConfig"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import table, { ColumnInterface, RowInterface } from '@/components/DataViews/tables/ReportDataTable';
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import HisDate from "@/utils/Date";
import { alertConfirmation } from "@/utils/Alerts";

export default defineComponent({
  name: "OutcomesTable",
  props: {
    patientStates: {
      type: Array as PropType<Array<any>>,
      required: true
    },
  },
  components: {
    ReportTable,
  },
  emits: ["voidOutcome"],
  setup(props, { emit }) {
    const columns = ref<ColumnInterface[][]>([[
      table.thTxt("Outcome"),
      table.thTxt("Start Date"),
      table.thTxt("End Date"),
      table.thTxt("Void"),
    ]]);

    const tableConfig = reactive({
      showIndex: false,
      tableCssTheme: "emc-datatable-theme"
    })

    const rows = computed<RowInterface[][]>(() => props.patientStates.map((state: any, index: number) => [
      table.td(state.name),
      table.td(HisDate.toStandardHisDisplayFormat(state.start_date)),
      table.td(HisDate.toStandardHisDisplayFormat(state.end_date)),
      table.tdBtn('x', async () => {
        const confirm = await alertConfirmation(`Are you sure you want to void this outcome?`);
        if(confirm) {
          emit("voidOutcome", {stateId: state.patient_state_id, index});
        }
      }, {}, 'danger')
    ]) || []);

    return {
      rows,
      columns,
      tableConfig,
    };
  }
})
</script>