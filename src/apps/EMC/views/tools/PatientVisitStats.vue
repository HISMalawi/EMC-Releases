<template>
  <layout>
    <ion-grid>
      <ion-row>
        <ion-col size="5" offset="7" class="ion-padding">
          <date-range-picker :range="range" @rangeChange="fetchData" />
        </ion-col>
        <ion-col size="12">
          <line-chart :series="series" :options="options" @pointSelection="pointSelection" placeholder="select date period" />
        </ion-col>
      </ion-row>
    </ion-grid>
  </layout>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import LineChart from "@/apps/EMC/Components/charts/LineChart.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { isEmpty, uniq } from "lodash";
import DateRangePicker, { DateRange } from "@/apps/EMC/Components/inputs/DateRangePicker.vue";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import { loader } from "@/utils/loader";
import { RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { Patientservice } from "@/services/patient_service";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "../../Components/tables/DrilldownTable.vue";
import { useRouter } from "vue-router";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";

export default defineComponent({
  components: {
    Layout,
    LineChart,
    IonGrid,
    IonRow,
    IonCol,
    DateRangePicker,
  },
  setup() {
    const router = useRouter();
    const range = reactive({} as DateRange);
    const series = ref([] as any[]);

    const options = {
      title: {
        text: "Patient Vists Statistics",
        align: "left",
      },
    }

    const sortData = (valueGroup: any, visitDates: string[]) => {
      return visitDates.map((date: string) => valueGroup[date])
    }

    const sortSeries = (valueGroup: any, visitDates: string[]) => {
      return visitDates.map((date: string) => [
        new Date(date).getTime(),
        valueGroup[date].length
      ])
    }

    const setGroupValue = (data: any, date: string, group: Record<string, any>, comparator: any) => {
      if (!(date in group)) group[date] = []
      const values = Object.entries(data[date])
        .filter(([_, v]: any) => comparator(v.patient_present, v.guardian_present))
        .map(([patient]) => patient)

      group[date] = [...group[date], ...values]
      return group
    }

    const buildSeries = (data: any) => {
      const visitDates: string[] = uniq(Object.keys(data))
      const patientPresent: Record<string, any> = {};
      const guardianPresent: Record<string, any> = {};
      const bothPresent: Record<string, any> = {};

      for (const date in data) {
        setGroupValue(data, date, patientPresent, (patient: any, guardian: any) => {
          return patient && !guardian
        })
        setGroupValue(data, date, guardianPresent, (patient: any, guardian: any) => {
          return !patient && guardian
        })
        setGroupValue(data, date, bothPresent, (patient: any, guardian: any) => {
          return patient && guardian
        })
      }

      return [
        {
          name: 'Patient present',
          raw: sortData(patientPresent, visitDates),
          data: sortSeries(patientPresent, visitDates)
        },
        {
          name: 'Guardian present',
          raw: sortData(guardianPresent, visitDates),
          data: sortSeries(guardianPresent, visitDates)
        },
        {
          name: 'Both patient and guardian present',
          raw: sortData(bothPresent, visitDates),
          data: sortSeries(bothPresent, visitDates)
        }
      ]
    }

    const fetchData = async (newRange: DateRange) => {
      loader.show();
      Object.assign(range, newRange);
      const report = new PatientReportService();
      report.setStartDate(newRange.startDate);
      report.setEndDate(newRange.endDate);
      const data = await report.getPatientVisitTypes();
      series.value = buildSeries(data);
      loader.hide();
    }

    const pointSelection = async (config: any) => {
      if(isEmpty(series.value)) return 
      try {
        const { dataPointIndex, seriesIndex } = config
        const sIndex = seriesIndex <= 0 ? 0 : seriesIndex
        const columns: TableColumnInterface[] = [
          { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
          { path: "birthdate", label: "Date of Birth", formatter: (v: string) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
          { path: "gender", label: "Gender", formatter: toGenderString },
          { path: "address", label: "Address" }
        ]

        const rows = ref<any[]>([])

        const popolulateRows = async () => {
          for(const patient of series.value[sIndex].raw[dataPointIndex]) {
            const data = await Patientservice.findByID(patient)
            const p = new Patientservice(data)
            rows.value.push({
              "arv_number": p.getArvNumber(),
              "birthdate": p.getBirthdate(),
              "gender": p.getGender(),
              "address": `${p.getCurrentVillage()}`,
              ...data,
            })
          }
        }
        
        popolulateRows()

        const rowActionButtons: RowActionButtonInterface[] = [{ 
          label: "Select", 
          default: true, 
          action: (row: any) => {
            router.push(`/emc/patient/${row['patient_id']}`)
          } 
        }]

        await modal.show(DrilldownTableVue, {
          title: `Patient Drilldown`,
          columns,
          rows: rows.value,
          rowActionButtons,
        })

      } catch (e) {
        console.log(e)
      }
    }

    return {
      range,
      series,
      options,
      fetchData,
      pointSelection,
    };
  },
});
</script>
