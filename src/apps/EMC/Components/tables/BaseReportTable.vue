<template>
  <Layout>
    <ion-card class="his-card" style="padding: 0 !important">
      <ion-card-header style="border-bottom: 1px solid #c2c2c2; font-weight: 500; color: #000;">
        <ion-grid>
          <ion-row>
            <ion-col size="1" class="ion-padding ion-margin-end">
              <img :src="`assets/images/${reportIcon}`" style="width: 100%;" />
            </ion-col>
            <ion-col>
              <h1 v-html="title"></h1>
              <h5 v-if="useDateRangeFilter">
                Period: {{ toStandardHisDisplayFormat(period.startDate) + " - " + toStandardHisDisplayFormat(period.endDate) }}
              </h5>
              <h5 v-else>Date: {{ toStandardHisDisplayFormat(date) }}</h5>
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
          :custom-filters="customFilters" 
          color="custom"
        />
      </ion-card-content>
    </ion-card>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
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
import HisDate from "@/utils/Date";

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
    reportIcon: {
      type: String,
      default: "reports/report.png",
    },
    columns: {
      type: Array as () => TableColumnInterface[],
      default: () => [],
    },
    rows: {
      type: Array as () => any[],
      default: () => [],
    },
    asyncRows: {
      type: Function as PropType<() => Promise<any[]>>,
    },
    actionButtons: {
      type: Array as () => ActionButtonInterface[],
      default: () => [],
    },
    rowActionButtons: {
      type: Array as () => RowActionButtonInterface[],
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
  },
  emits: ["regenerate", "onDateRangeChange", "onDateChange", "onDrillDown"],
  setup(props, { emit }) {
    const { toStandardHisDisplayFormat, toStandardHisFormat } = HisDate;
    const date = ref(PatientReportService.getSessionDate())
    const period = reactive({
      startDate: "",
      endDate: "",
    })

    const filename = computed(() => {
      return `${PatientReportService.getLocationName()} ${props.title} ${toStandardHisFormat(date.value)}`;
    })

    const actionBtns = computed<ActionButtonInterface[]>(() => {
      const btns = [
        { label: "Refresh", action: () => emit("regenerate", props.useDateRangeFilter ? period : date.value ) },
        ...props.actionButtons,
      ]

      if (props.canExportCsv) {
        btns.push({
          label: "CSV",
          color: "primary",
          action: async (a, r) => {
            const csvContent = convertToCsv(props.columns, r, props.useDateRangeFilter ? period : {})
            exportToCSV(csvContent, filename.value)
          }
        })
      }
      return btns;
    })

    const customFilters = computed<CustomFilterInterface[]>(() => {
      if(props.useDateRangeFilter) {
        return [
          {
            label: "Date Range",
            type: "dateRange",
            defaultValue: {
              startDate: period.startDate,
              endDate: period.endDate,
            },
            action: async (newPeriod) => {
              Object.assign(period, newPeriod)
              emit("onDateRangeChange", period)
            },
          },
        ]
      }

      return [{
        label: "Date",
        type: "date",
        defaultValue: date.value,
        action: async (newDate) => {
          date.value = newDate
          emit("onDateChange", date.value)
        },
      }]
    })

    return {
      actionBtns,
      customFilters,
      date,
      period,
      dayjs,
      toStandardHisDisplayFormat,
    }
  }
})
</script>