<template>
  <his-standard-form
    v-show="showForm"
    @onFinish="onFinish"
    :skipSummary="true" 
    :fields="fields">
  </his-standard-form>
  <ion-page v-if="!showForm">
    <ion-header>
      <ion-toolbar>
        <ion-thumbnail slot="start"> 
          <ion-img :src="logo"/>
        </ion-thumbnail>
        <ion-label> 
          <ul class="header-text-list"> 
            <li>Title <b>{{ title }}</b></li>
            <li>Period <b>{{ period }}</b></li>
            <li v-if="customInfo">{{customInfo.label}} <b>{{customInfo.value}}</b></li>
          </ul>
        </ion-label>
        <report-filter
          slot="end"
          :showPerPageFilter="showFilters || paginated"
          :disableSearchFilter="isTableLoading"
          :disablePerPageFilter="isTableLoading"
          :totalRowCount="tableRows.length"
          @onItemsPerPage="(i) => itemsPerPage = i"
          @onSearchFilter="(f) => searchFilter = f"> 
        </report-filter>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="report-content">
        <report-table
          :rows="rows"
          :paginated="paginated"
          :asyncRows="asyncRows"
          :rowParser="rowParser"
          :config="{...config, tableCssTheme}"
          :columns="columns"
          :showFilters="showFilters"
          :newPage="currentPage"
          :searchFilter="searchFilter"
          :rowsPerPage="itemsPerPage"
          @onIsLoading="(l) => isTableLoading = l"
          @onTableRows="(r) => tableRows = r"
          @onPagination="(p) => totalPages = p.length"
          @onActiveColumns="(c) => activeColumns = c"
          @onActiveRows="(r) => activeRows = r">
        </report-table>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar v-if="!searchFilter && paginated || !searchFilter && totalPages > 0 && paginated">
        <pagination
          :perPage="itemsPerPage"
          :maxVisibleButtons="10"
          :totalPages="totalPages"
          @onChangePage="(p) => currentPage=p"
          />
      </ion-toolbar>
      <ion-toolbar v-if="showReportStamp"> 
        <ion-chip color="primary">Date Created: <b>{{ date }}</b></ion-chip>
        <ion-chip color="primary">His-Core Version: <b>{{ coreVersion }}</b></ion-chip>
        <ion-chip color="primary">API Version: <b>{{ apiVersion }}</b></ion-chip>
      </ion-toolbar>
    </ion-footer>
    <his-footer :color="footerColor" :btns="btns"></his-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import HisFooter from "@/components/HisDynamicNavFooter.vue";
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import { toCsv, toTablePDF } from "@/utils/Export"
import { toExportableFormat, ColumnInterface, RowInterface} from "@/components/DataViews/tables/ReportDataTable" 
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import { Field, Option } from '@/components/Forms/FieldInterface';
import { 
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  loadingController,
  IonChip, 
  IonFooter,
  IonLabel
} from "@ionic/vue"
import { Service } from "@/services/service"
import HisDate from "@/utils/Date"
import ReportFilter from "@/components/ReportFilter.vue"
import Pagination from "@/components/Pagination.vue"
import { toastDanger } from "@/utils/Alerts";

export default defineComponent({
  components: { 
    HisStandardForm,   
    IonHeader,
    ReportTable, 
    HisFooter, 
    IonPage, 
    IonContent, 
    IonToolbar,
    Pagination, 
    ReportFilter,  
    IonFooter,
    IonChip, 
    IonLabel
  },
  props: {
      title: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      default: '',
    },
    config: {
      type: Object
    },
    fields: {
      type: Object as PropType<Field[]>,
      default: () => []
    },
    columns: {
      type: Object as PropType<Array<ColumnInterface[]>>,
      required: true
    },
    rows: {
      type: Object as PropType<Array<RowInterface[]>>,
      required: true
    },
    paginated: {
        type: Boolean,
        default: false
    },
    customBtns: {
      type: Array,
      default: () => []
    },
    canExportPDf: {
      type: Boolean,
      default: true
    },
    canExportCsv: {
      type: Boolean,
      default: true
    },
    onReportConfiguration: {
      type: Function,
      required: false
    },
    rowParser: {
      type: Function
    },
    showFilters: {
      type: Boolean,
      default: false
    },
    rowsPerPage: {
      type: Number
    },
    asyncRows: {
      type: Function
    },
    footerColor: {
      type: String,
      default: 'dark'
    },
    customFileName: {
      type: String,
      default: ''
    },
    canExport: {
      type: Boolean,
      default: true
    },
    showReportStamp: {
      type: Boolean,
      default: true
    },
    customInfo: {
      type: Object as PropType<Option>
    }
  },
  data: () => ({
    formData: {} as any,
    computeFormData: {} as any,
    btns: [] as Array<any>,
    isLoadingData: false as boolean,
    showForm: false as boolean,
    logo: "/assets/images/login-logos/Malawi-Coat_of_arms_of_arms.png" as string,
    isTableLoading: false as boolean,
    searchFilter: '' as string,
    itemsPerPage: 50 as number,
    currentPage: 0 as number,
    tableRows: [] as any,
    totalPages: 0 as number,
    activeColumns: [] as any,
    activeRows: [] as any,
    date: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
    apiVersion: Service.getApiVersion(),
    coreVersion: Service.getCoreVersion(),
    siteUUID: Service.getSiteUUID() as string,
    tableCssTheme: 'opd-report-theme',
  }),
  methods: {
    getFileName() {
      return `${Service.getLocationName()} ${this.title} ${this.period}`
    },
    async onFinish(formData: any, computedData: any) {
      this.formData = formData
      this.computeFormData = computedData
      this.showForm = false
      await this.presentLoading()
      try {
        if(this.onReportConfiguration) await this.onReportConfiguration(this.formData, this.computeFormData)
        loadingController.dismiss ()
      }catch(e) {
        console.error(e)
        toastDanger(`${e}`)
        loadingController.dismiss()
      }
    },
    async reloadReport() {
      await this.onFinish(this.formData, this.computeFormData)
    },
    async presentLoading() {
      const loading = await loadingController
        .create({
          message: 'Please wait...',
          backdropDismiss: false
        })
      await loading.present()
    }
  },
  created() {
    this.showForm = !!this.fields.length
    this.btns = this.customBtns
    this.btns.push(
      {
        name: "CSV",
        size: "large",
        slot: "start",
        color: "primary",
        visible: this.canExportCsv,
        onClick: async () => {
          const {columns, rows} = toExportableFormat(this.columns, this.rows)
          toCsv(columns, [
            ...rows,
            [`Date Created: ${this.date}`],
            [`Period: ${this.period}`],
            [`HIS-Core Version: ${this.coreVersion}`],
            [`API Version: ${this.apiVersion}`],
            [`Site UUID: ${this.siteUUID}`]
          ], this.getFileName())
        }
      },
      {
        name: "PDF",
        size: "large",
        slot: "start",
        color: "primary",
        visible: this.canExportPDf,
        onClick: async () => {
          const {columns, rows} = toExportableFormat(this.columns, this.rows)
          toTablePDF(columns, rows, this.getFileName())
        }
      },
      {
        name: "Back",
        size: "large",
        slot: "end",
        color: "primary",
        visible: true,
        onClick: () => this.showForm = true
      },
      {
        name: "Refresh",
        size: "large",
        slot: "end",
        color: "warning",
        visible: true,
        onClick: () => this.reloadReport()
      },
      {
        name: "Finish",
        size: "large",
        slot: "end",
        color: "success",
        visible: true,
        onClick: () => this.$router.push({ path:'/' })
      }
    )
  }
})
</script>
<style scoped>
.report-content {
  margin: auto;
  width: 99.9%;
  height: 99%;
  overflow: auto;
}
.header-text-list {
  list-style: none;
}
</style>
