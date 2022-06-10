<template>
    <apexchart
    width="100%"
    type="area" 
    :options="options" 
    :series="series"
    ></apexchart>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApiClient from "@/services/api_client";
import dayjs from "dayjs";
export default defineComponent({
  data: function () {
    return {
      dayjs,
      startDate: "",
      endDate: "",
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: ["", "", "", "", "","", "", "", "", "", "", ""],
        },
      },
  
      series: [
        {
          name: "Influenza Like Illness ",
          data: [0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0],
        },
        {
          name: "Respiratory",
          data: [0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0],
        },
       
      ],
    };
  },
  mounted() {
    this.endDate = this.dayjs().subtract(1, "days").format("YYYY-MM-DD");
    this.startDate = this.dayjs().subtract(5, "days").format("YYYY-MM-DD");
    this.getRespiratory();
  },
  methods: {
    getRespiratory: async function() {
      const response = await ApiClient.get(
        `/dashboard_stats_for_syndromic_statistics?date=${this.startDate}&program_id=14`
      );

      if (response && response.status == 200) {
        const stats = await response.json();

        let chartKeys = [];
        const chartData = stats['down'];
        const dates = [];
        const ILI: number[] = [];
        const Respiratory: number[] = [];

        for(let key in chartData){
          const keys = chartData[key];
          for(key in keys){
            chartKeys.push(parseInt(key));
          }
          break;
        }

      chartKeys = chartKeys.sort((a, b) => {return a-b});
      const types = ['ILI','Respiratory'];
      const numbers: any = {};

      for(let i = 0 ; i < chartKeys.length ; i++){
        const sdate = (chartData[types[0]][chartKeys[i]].start_date);
        dates.push(sdate);
      }

      for(let i = 0 ; i < dates.length ; i++)
      {
        for(const name in chartData){
          const attr = chartData[name];
          for(const key in attr){
            const sdate = chartData[name][key].start_date;
            if(sdate != dates[i])
              continue;

              if(numbers[name] == undefined)
                  numbers[name] = [];

              if(name == 'ILI')
                ILI.push(chartData[name][key].count);
              if(name == 'Respiratory')
                Respiratory.push(chartData[name][key].count);
          }
        }
        this.series[0].data = [...ILI];
        this.series[1].data = [...Respiratory];
        const formattedDays: any[] = dates;
        this.options = {
          ...this.options,
          ...{
            xaxis: {
              categories: [...formattedDays],
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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
ion-card-header + .card-content-md {
    width: 21vw;
}
.md.hydrated {
    justify-content: center;
}
 ion-card
 {
   background-color: lightyellow;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
 }
 .ion-inherit-color.md.hydrated {
    font-weight: bold;
    font-size: 18px;
}
</style>