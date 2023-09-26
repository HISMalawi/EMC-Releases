<template>
    <ion-card style="padding: 0 !important">
      <ion-card-header style="border-bottom: 1px solid #c2c2c2; font-weight: 500; color: #000;">
        <ion-grid>
          <ion-row>
            <ion-col size="1" class="ion-padding ion-margin-end">
              <img :src="`assets/images/${reportIcon}`" :style="{height: subtitle ? 7 : 5 + 'rem', width: subtitle ? 7 : 5 + 'rem'}" />
            </ion-col>
            <ion-col>
              <h1 v-html="title"></h1>
              <h3 v-html="subtitle" v-if="subtitle" style="color:#818181;"></h3>
              <h5 v-if="useDateRangeFilter"> Period: {{ period }} </h5>
              <h5 v-else-if="useQuarterFilter"> Quarter: {{ quarter.value }} </h5>
              <h5 v-else-if="useDateFilter">Date: {{ date }}</h5>
              <h5 v-if="totalClients">Total Clients: {{ totalClients }}</h5>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-header>
      <ion-card-content class="ion-no-padding" style="min-height: 45vh;">
        <data-table 
          :rows="rows"
          :async-rows="asyncRows" 
          :columns="columns" 
          :actions-buttons="actionBtns" 
          :row-actions-buttons="rowActionButtons" 
          :custom-filters="filters" 
          :config="{ showIndices }"
          @custom-filter="onCustomFilter"
          @drilldown="onDrilldown"
          color="custom"
        >
          <template v-for="(_, name) in $slots" #[name]="{ filter }">
            <slot :name="name" :filter="filter"></slot>
          </template>
          <template #dateRange>
            <date-range-picker v-model="dateRange" />
          </template>
          <template #datePicker>
            <date-picker v-model="pickerDate" />
          </template>
        </data-table>
      </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { IonCard, IonCardContent, IonCardHeader, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import dayjs from "dayjs";
import { ArtReportService } from "@/apps/ART/services/reports/art_report_service";
import { Option } from '@/components/Forms/FieldInterface';
import { 
  ActionButtonInterface, 
  CustomFilterInterface, 
  DataTable, 
  RowActionButtonInterface, 
  TableColumnInterface 
} from '@uniquedj95/vtable'
import { toastWarning } from "@/utils/Alerts";
import { isEmpty } from "lodash";
import { exportToCSV, sanitize } from "../../utils/exports";
import DateRangePicker, { DateRange } from "@/apps/EMC/Components/inputs/DateRangePicker.vue";
import DatePicker from "@/apps/EMC/Components/inputs/DatePicker.vue";

export default defineComponent({
  name: "BaseReportTable",
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    DataTable,
    DateRangePicker,
    DatePicker
},
  props: {
    title: {
      type: String,
      default: "Report",
    },
    subtitle: {
      type: String,
      default: "",
    },
    period: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    quarter: {
      type: Object as PropType<Option>,
      default: () => ({}),
    },
    totalClients: {
      type: Number,
      default: 0,
    },
    reportIcon: {
      type: String,
      default: "reports/report.png",
    },
    columns: {
      type: Array as PropType<TableColumnInterface[]>,
      default: () => [],
    },
    rows: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    asyncRows: {
      type: Function as PropType<() => Promise<any[]>>,
    },
    actionButtons: {
      type: Array as PropType<ActionButtonInterface[]>,
      default: () => [],
    },
    rowActionButtons: {
      type: Array as PropType<RowActionButtonInterface[]>,
      default: () => [],
    },
    canExportCsv: {
      type: Boolean,
      default: true,
    },
    canExportPDF: {
      type: Boolean,
      default: true,
    },
    showRefreshButton: {
      type: Boolean,
      default: true,
    },
    useDateRangeFilter: {
      type: Boolean,
      default: false,
    },
    useQuarterFilter: {
      type: Boolean,
      default: false,
    },
    useDateFilter: {
      type: Boolean,
      default: false,
    },
    customFilters: {
      type: Array as PropType<CustomFilterInterface[]>,
      default: () => [],
    },
    showIndices: {
      type: Boolean,
      default: false
    },
    filename: {
      type: String,
      default: "",
    },
    reportType: {
      type: String,
      default: "",
    }
  },
  emits: ["regenerate", "customFilter", "drilldown"],
  setup(props, { emit }) {
    const dateRange = ref({} as DateRange)
    const pickerDate = ref("");
    const filename = computed(() => `
      ${props.reportType} 
      ${PatientReportService.getLocationName()} 
      ${sanitize(props.filename || props.title).replace(props.reportType, "")} 
      ${ props.period ? props.period : props.date }
    `);


    const actionBtns = computed<ActionButtonInterface[]>(() => {
      const btns = [...props.actionButtons];

      if(props.showRefreshButton){
        btns.push({ label: "Refresh/Rebuild", color: 'success', action: () => emit("regenerate") });
      }

      if (props.canExportCsv) {
        btns.push({
          label: "CSV",
          color: "primary",
          action: async (_a, rows, filters, columns) => exportToCSV({
            rows, 
            filters,
            columns, 
            quarter: props.quarter?.label,
            period: props.period,
            filename: filename.value
          })
        })
      }
      return btns;
    })

    const filters = computed<CustomFilterInterface[]>(() => {
      const f = [...props.customFilters];
      if(props.useDateRangeFilter) {
        f.push({
          id: "dateRange",
          label: "Date Range",
          type: "dateRange",
          slotName: "dateRange",
          gridSize: 5,
          value: {
            start: props.period.split("-")[0],
            end: props.period.split("-")[1],
          },
        })
      } else if(props.useQuarterFilter) {
        f.push({
          id: "quarter",
          label: "Quarter:",
          type: "select",
          value: props.quarter,
          options: ArtReportService.getReportQuarters().map(q => ({label: q.name, value: q.name, other: q})),
        })
      } else if (props.useDateFilter) {
        f.push({
          id: "date",
          label: "Date",
          type: "date",
          slotName: "datePicker",
          value: props.date,
        })
      }
      return f;
    })

    const onCustomFilter = (customfilters: Record<string, any>) => {
      if ("dateRange" in customfilters) {
        if(isEmpty(dateRange.value)) return toastWarning("Invalid date range")
        customfilters.dateRange = {
          startDate: dateRange.value.start,
          endDate: dateRange.value.end
        }
      }

      if("date" in customfilters) {
        if(isEmpty(pickerDate.value)) return toastWarning("Invalid date")
        customfilters.date = pickerDate.value 
      }

      if (filters.value.every(f => {
        if (f.required === false) return true;
        if (!isEmpty(customfilters[f.id]) && typeof customfilters[f.id] === 'object') return Object.values(customfilters[f.id]).every(v => !isEmpty(v));
        return !isEmpty(customfilters[f.id]);
      })) {
        return emit("customFilter", customfilters);
      }
      toastWarning("Invalid filters")
    }

    const onDrilldown = (data: {column: TableColumnInterface; row: any}) => {
      emit("drilldown", data);
    }

    return {
      actionBtns,
      filters,
      onCustomFilter,
      onDrilldown,
      dayjs,
      dateRange,
      pickerDate,
    }
  }
})
</script>

<style scoped>
.date-picker {
  margin-top: 0px !important;
  padding-top: 0px !important;
}
</style>