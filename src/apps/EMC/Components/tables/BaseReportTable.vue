<template>
  <Layout>
    <ion-card class="his-card" style="padding: 0 !important">
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
              <h5 v-else-if="useDateFilter">Date: {{ dayjs(date).format("DD/MMM/YYYY") }}</h5>
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
        />
      </ion-card-content>
    </ion-card>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { IonCard, IonCardContent, IonCardHeader, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import dayjs from "dayjs";
import Layout from "@/apps/EMC/Components/Layout.vue";
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
import { exportToCSV } from "../../utils/exports";

export default defineComponent({
  name: "BaseReportTable",
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    DataTable,
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
    }
  },
  emits: ["regenerate", "customFilter", "drilldown"],
  setup(props, { emit }) {
    const filename = computed(() => {
      return `${PatientReportService.getLocationName()} ${props.title} ${ props.period ? props.period : props.date }`;
    })

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
          gridSize: 5,
          value: {
            startDate: props.period.split("-")[0],
            endDate: props.period.split("-")[1],
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
          value: props.date,
        })
      }
      return f;
    })

    const onCustomFilter = (customfilters: Record<string, any>) => {
      if ("dateRange" in customfilters && (dayjs(customfilters.dateRange.startDate).isAfter(customfilters.dateRange.endDate))) {
        return toastWarning("Invalid date range")
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
    }
  }
})
</script>