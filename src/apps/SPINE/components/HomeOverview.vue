<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="stat in patientSummaryStats" :key="stat.label">
        <stat-card
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
        <ApexChart
        width="100%"
        height="350px"
        type="area" 
        :options="optionsSyndromic" 
        :series="seriesSyndromic"
        />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent } from "vue";
import dayjs from "dayjs";
import ApexChart from "vue3-apexcharts";
import StatCard from '@/apps/SPINE/components/StatCard.vue'

export default defineComponent({
  data: function () {
    return {
      dayjs,
      sessionDate: '',
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
    StatCard
  },
  methods: {
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