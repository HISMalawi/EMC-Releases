<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="stat in patientSummaryStats" :key="stat.label">
        <opd-stat-card
          :label="stat.label"
          :value="stat.value"
          :color="stat.color ?? ''"
        />
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ApexChart 
          width="100%"
          height="350px"
          type="bar"
          :options="optionsVisits"
          :series="seriesVisits"
        />
      </ion-col>
      <ion-col>
        <table class="his-sm-text">
          <tr>
            <th></th>
            <th>Female</th>
            <th>Male</th>
            <th>Me</th>
            <th>Facility</th>
          </tr>
          <tr v-for="(data, index) in rows" :key="index">
            <td class="encounter-td">{{ data.encounter }}</td>
            <td class="other-td">{{ data.female }}</td>
            <td class="other-td">{{ data.male }}</td>
            <td class="other-td">{{ data.me }}</td>
            <td class="other-td">{{ data.facility }}</td>
          </tr>
        </table>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent } from "vue";
import ApiClient from "@/services/api_client";
import dayjs from "dayjs";
import ApexChart from "vue3-apexcharts";
import PatientVisitsService from '@/apps/OPD/services/patient_visits_service'
import OpdStatCard from '@/apps/OPD/components/OpdStatCard.vue'
import { ProgramService } from "@/services/program_service"

export default defineComponent({
  data: function () {
    return {
      dayjs,
      sessionDate: "",
      rows: [
        { encounter: "Patient Registration", female: 0, male: 0, me: 0, facility: 0 },
        { encounter: "HIV tests", female: 0, male: 0, me: 0, facility: 0 },
        { encounter: "Influeza data", female: 0, male: 0, me: 0, facility: 0},
        { encounter: "Chronic conditions", female: 0, male: 0, me: 0, facility: 0 },
        { encounter: "Patient Diagnosis", female: 0, male: 0, me: 0, facility: 0 },
        { encounter: "Prescriptions", female: 0, male: 0, me: 0, facility: 0 },
        { encounter: "Dispensations", female: 0, male: 0, me: 0, facility: 0 },
        { encounter: "Discharges", female: 0, male: 0, me: 0, facility: 0 },
      ] as any,
      patientSummaryStats: [
        { label: 'Registered today', value: -1, color: 'lightyellow' },
        { label: 'Returning today', value: -1, color: 'lightyellow' },
        { label: 'Referred today', value: -1, color: 'lightyellow' },
        { label: 'Total', value: -1, color: 'yellowgreen' },
      ],
      seriesVisits: [] as any,
      optionsVisits: {} as any,
      optionsSyndromic: {} as any,
      seriesSyndromic: [] as any,

      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: ["", "", "", "", ""],
        },
        yaxis: {
        min: 0,
        forceNiceScale: true,
        title: {
          text: 'Number of clients'
        }
      },
      noData: {  
        text: "Loading data. Please wait...",  
        align: 'center',  
        verticalAlign: 'middle',  
        offsetX: 0,  
        offsetY: 0,  
        style: {  
          color: "#000000",  
          fontSize: '30px',  
          fontFamily: "Helvetica"
        }  
      }
      },
      series: [] as any,
    };
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    ApexChart,
    OpdStatCard
  },
  mounted() {
    this.sessionDate = ProgramService.getSessionDate()
    this.getPatientSummary();
    this.getSyndromic();
  },
  methods: {
    getSyndromic: async function(){
      const response = await ApiClient.get(
        `dashboard_stats_for_syndromic_statistics?date=${this.sessionDate}&program_id=14`
      );
      if(response && response.status == 200) {
        const data = await response.json();
        this.buildGraphData(data.down,'syndromicGraph')
      }
    },
    getPatientSummary: async function(){
      const response = await ApiClient.get(
        `dashboard_stats?date=${this.sessionDate}&program_id=14`
      );
      if(response && response.status == 200) {
        const data = await response.json();
        this.patientSummaryStats =PatientVisitsService.getTodaysPatientVisits(data.top)
        this.buildGraphData(data.down,'visitGraph')
      }
    },
    buildGraphData: async function(data: any,graphType: any){
      for(const name in data){
        const x = data[name]
        const startDates = Object.keys(x).map(key => { return  dayjs(x[key].start_date).format("MMM/YYYY")});
        const count = Object.keys(x).map(key => { return  x[key].count });
        const obj = {
          'name': name,
          'data': count,
        }
        if(graphType == 'visitGraph'){
          this.seriesVisits.push(obj)
          this.optionsVisits = {
            ...this.options,
            ...{
              xaxis: {
                categories: [...startDates],
              },
            },
          };
        }
        else
        if(graphType == 'syndromicGraph'){
          this.seriesSyndromic.push(obj)
          this.optionsSyndromic = {
            ...this.options,
            ...{
              xaxis: {
                categories: [...startDates],
              },
            },
          };
        }
      }
    }
  },
});
</script>

<style scoped>
ion-grid {
  color: #333333;
}
.encounter-td {
  text-align: left;
  border: 1px solid #dddddd;
}
.other-td {
  text-align: right;
  font-weight: bold;
  border: 1px solid #dddddd;
  min-width: 60px;

}
table {
  border-collapse: collapse;
  width: 100%;
  height: 49vh;
}

td,
th {
  padding: 0.3em;
  text-align: right;
}

tr:nth-child(even) {
  background-color: #f1efef;
}
@media (min-width: 1280px)  {
  td,
  th {
    text-align: right;
    padding: 0.8em;
  }
}
</style>