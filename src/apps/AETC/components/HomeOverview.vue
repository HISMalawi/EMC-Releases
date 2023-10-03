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
  </ion-grid>

  <ion-card class="custom-card">
    <ion-grid class="no-padding">
      <ion-row class="table-header">
        <ion-col size="3" class="table-cell">Task Type</ion-col>
        <ion-col size="3" class="table-cell">Me</ion-col>
        <ion-col size="3" class="table-cell">Facility</ion-col>
        <ion-col size="3" class="table-cell">Today</ion-col>
      </ion-row>
      <ion-row v-for="(row, index) in tableData" :key="index" :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
        <ion-col size="3" class="table-cell">{{ row[0] }}</ion-col>
        <ion-col size="3" class="table-cell">{{ row[1] }}</ion-col>
        <ion-col size="3" class="table-cell">{{ row[2] }}</ion-col>
        <ion-col size="3" class="table-cell">{{ row[3] }}</ion-col>
      </ion-row>
    </ion-grid>
  </ion-card>
</template>

<script lang="ts">
import { IonGrid, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent } from "vue";
import ApiClient from "@/services/api_client";
import dayjs from "dayjs";
import ApexChart from "vue3-apexcharts";
import PatientVisitsService from '@/apps/OPD/services/patient_visits_service';
import OpdStatCard from '@/apps/AETC/components/OpdStatCard.vue';
import { ProgramService } from "@/services/program_service"

export default defineComponent({
  data: function () {
    return {
      dayjs,
      sessionDate: "",
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
      tableData: [
        ["Outpatient reception", "0", "0", "0"],
        ["Vitals", "0", "0", "0"],
        ["Outpatient Diagnosis", "0", "0", "0"],
        ["Treatment", "0", "0", "0"],
      ],
    };
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    OpdStatCard
  },
  mounted() {
    this.sessionDate = ProgramService.getSessionDate()
    this.getPatientSummary();
    this.getSyndromic();
    this.getHomeDashboardStats();
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
    getHomeDashboardStats: async function(){
      const response = await ApiClient.get(
        `dashboard_stats?date=${this.sessionDate}&program_id=30`
      );

      if(response && response.status == 200) {
        const data = await response.json();
        const convertedArray = this.transformData(data);
        //assign to table data
        this.tableData = convertedArray
      }
    },

    // Method to transform the initial data into the desired format
    transformData(data: Array<any>): Array<Array<string>> {
    return data.map(item => [
      item.name,
      item.me.toString(),
      item.facility.toString(),
      item.total.toString(),
    ]);
  },
  transformArray(inputArray: Array<any>) {
    //const transformedArray: Array<Array<string | number>> = [];
    // Iterate over the original array and transform it into the desired format
    const transformedArray = inputArray.map(item => [
      item.name.replace(/_/g, ' '), // Replace underscores with spaces
      item.me,
      item.facility,
      item.total
    ]);

    return transformedArray
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
.table-cell {
  font-size: 16px; /* Adjust the font size as desired */
  padding: 12px 16px; /* Adjust the padding as desired */
}
.no-padding {
  padding: 0 !important;
}

.custom-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table-header {
  background-color: #333333; /* Dark gray */
  color: white;
}

.even-row {
  background-color: #f1f1f1; /* Light gray */
}

.odd-row {
  background-color: white;
}
</style>