<template>
    <ion-grid>
      <ion-row>
        <ion-col size="5" offset="7" class="ion-padding">
          <date-range-picker :range="range" @rangeChange="fetchData" />
        </ion-col>
        <ion-col size="2" class="ion-padding-top">
          <div class="his-card ">
            <ion-list>
              <ion-item button @click="drilldown(totalAttendance, 'Total Attendance')">
                <ion-label> Total Attendance </ion-label>
                <ion-badge> {{ totalAttendance.length }}</ion-badge>
              </ion-item>
              <ion-item button @click="drilldown(totalPatientVisits, 'Total patient visits')">
                <ion-label> Patient Visit </ion-label>
                <ion-badge> {{ totalPatientVisits.length }}</ion-badge>
              </ion-item>
              <ion-item button @click="drilldown(totalGuardianVisits, 'Total guardian visits')">
                <ion-label> Guardian Visit </ion-label>
                <ion-badge> {{ totalGuardianVisits.length }}</ion-badge>
              </ion-item>
            </ion-list>
          </div>
        </ion-col>
        <ion-col size="10">
          <line-chart :series="series" :options="options" @pointSelection="pointSelection" placeholder="select date period" />
        </ion-col>
      </ion-row>
    </ion-grid>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import LineChart from "@/apps/EMC/Components/charts/LineChart.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { isEmpty } from "lodash";
import DateRangePicker, { DateRange } from "@/apps/EMC/Components/inputs/DateRangePicker.vue";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import { loader } from "@/utils/loader";
import { RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { Patientservice } from "@/services/patient_service";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "../../Components/tables/DrilldownTable.vue";
import { useRouter } from "vue-router";
import HisDate from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "../../utils/common";

export default defineComponent({
  components: {
    LineChart,
    IonGrid,
    IonRow,
    IonCol,
    DateRangePicker,
  },
  setup() {
    const router = useRouter();
    const range = reactive({} as DateRange);
    type PointData = { patientId: number, date: string }
    type SeriesData = { name: string; raw: PointData[][], data: number[][] }
    const series = ref([] as SeriesData[]);
    const totalPatientVisits = computed(() => series.value[0]?.raw.flat() || []);
    const totalGuardianVisits = computed(() => series.value[1]?.raw.flat() || []);
    const totalAttendance = computed(() => series.value.map(({ raw }) => raw).flat(3))

    const options = {
      title: {
        text: "Patient Vists Statistics",
        align: "left",
      },
      yaxis: {
        title: { 
          text: "Number of clients"
        },
        plotAreaHeight: 800,
      },
    }

    const buildSeries = (data: any) => {
      const patientPresent: Record<string, Array<PointData>> = {};
      const guardianPresent: Record<string, Array<PointData>> = {};
      const bothPresent: Record<string, Array<PointData>> = {};
      const seriesData: Array<SeriesData> = [
        { name: 'Patient present', raw: [], data: []},
        { name: 'Guardian present', raw: [], data: []},
        { name: 'Both patient and guardian present', raw: [], data: []}
      ]

      Object.entries(data).forEach(([date, patients]: any) => {
        patientPresent[date] = []
        guardianPresent[date] = []
        bothPresent[date] = []
        Object.entries(patients).forEach(([patientId, {patient_present, guardian_present}]: any) => {
          if (guardian_present && patient_present) bothPresent[date].push({patientId, date})
          else if (patient_present) patientPresent[date].push({patientId, date})
          else if (guardian_present) guardianPresent[date].push({patientId, date})
        })
        const ms = new Date(date).getTime();
        seriesData[0].data.push([ms, patientPresent[date].length])
        seriesData[0].raw.push(patientPresent[date])
        seriesData[1].data.push([ms, guardianPresent[date].length])
        seriesData[1].raw.push(guardianPresent[date])
        seriesData[2].data.push([ms, bothPresent[date].length])
        seriesData[2].raw.push(bothPresent[date])
      })

      return seriesData
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

    const resolvePatientDetails = async (patientId: number) => {
      const data = await Patientservice.findByID(patientId)
      const p = new Patientservice(data)
      return {
        "arv_number": p.getArvNumber(),
        "birthdate": p.getBirthdate(),
        "gender": p.getGender(),
        "address": `${p.getCurrentVillage()}`,
        ...data,
      }
    }

    const drilldown = async (patients: PointData[], title= "Drill down clients") => {
      if(isEmpty(patients)) return
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc', preSort: sortByARV },
        { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "date", label: "Visit Date", formatter: HisDate.toStandardHisDisplayFormat },
        { path: "address", label: "Address" }
      ]
      const rows = ref<any[]>([])
      const fillRows = async () => {
        for (const { patientId, date } of patients) {
          const patient = await resolvePatientDetails(patientId)
          rows.value.push({...patient, date})
        }
      }
      fillRows();
      const rowActionButtons: RowActionButtonInterface[] = [{ 
        label: "Select",
        action: (row: any) => router.push(`/emc/patient/${row['patient_id']}`)
      }]

      await modal.show(DrilldownTableVue, {
        title,
        columns,
        rows: rows.value,
        rowActionButtons,
      })
    }

    const pointSelection = async (dataPointIndex: number, sIndex: number) => {
      if(isEmpty(series.value)) return 
      try {
        await drilldown(series.value[sIndex].raw[dataPointIndex], `${series.value[sIndex].name} visits`)
      } catch (e) {
        console.error(e)
      }
    }

    return {
      range,
      series,
      options,
      totalAttendance,
      totalPatientVisits,
      totalGuardianVisits,
      fetchData,
      pointSelection,
      drilldown,
    };
  },
});
</script>
