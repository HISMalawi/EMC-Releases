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
              <h5 v-else-if="useQuarterFilter"> Quarter: {{ quarter }} </h5>
              <h5 v-else>Date: {{ dayjs(date).format("DD/MMM/YYYY") }}</h5>
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
          color="custom"
          @custom-filter="onCustomFilter"
          @drilldown="onDrilldown"
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
import DataTable, { 
  ActionButtonInterface, 
  TableColumnInterface, 
  RowActionButtonInterface, 
  CustomFilterInterface, 
  convertToCsv, 
  exportToCSV
} from "@/apps/EMC/Components/datatable";
import { ArtReportService } from "@/apps/ART/services/reports/art_report_service";

export default defineComponent({
  name: "BaseReportTable",
  components: {
    DataTable,
    IonCard,
    IonCardHeader,
    IonCardContent,
    Layout,
    IonGrid,
    IonRow,
    IonCol,
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
      type: String,
      default: "",
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
    useDateRangeFilter: {
      type: Boolean,
      default: false,
    },
    useQuarterFilter: {
      type: Boolean,
      default: false,
    },
    customFilters: {
      type: Array as PropType<CustomFilterInterface[]>,
      default: () => [],
    },
  },
  emits: ["regenerate", "customFilter", "drilldown"],
  setup(props, { emit }) {
    const filename = computed(() => {
      return `${PatientReportService.getLocationName()} ${props.title} ${ props.period ? props.period : props.date }`;
    })

    const actionBtns = computed<ActionButtonInterface[]>(() => {
      const btns = [
        { label: "Refresh/Rebuild", color: 'success', action: () => emit("regenerate") },
        ...props.actionButtons,
      ]

      if (props.canExportCsv) {
        btns.push({
          label: "CSV",
          color: "primary",
          action: async (_a, rows) => {
            const period = {} as any;
            if (props.useDateRangeFilter) {
              period.startDate = props.period.split(" - ")[0] || "";
              period.endDate = props.period.split(" - ")[1] || "";
            } 
            if (props.useQuarterFilter) {
              const [qtrName, year] = props.quarter.split(" ");
              const {start, end } = ArtReportService.buildQtrObj(qtrName, parseInt(year));
              period.startDate = start;
              period.endDate = end;
            }
            exportToCSV(
              convertToCsv(
                props.columns, 
                rows, 
                period,
              ), 
              filename.value
            );
          }
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
          options: ArtReportService.getReportQuarters().map(q => q.name),
        })
      } else {
        f.push({
          id: "date",
          label: "Date",
          type: "date",
          value: props.date,
        })
      }
      return f;
    })

    const onCustomFilter = (filters: Record<string, any>) => {
      emit("customFilter", filters);
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