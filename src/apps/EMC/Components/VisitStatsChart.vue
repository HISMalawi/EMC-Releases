<template>
  <p>Complete / incomplete visits</p>
  <apexchart
    width="100%"
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import DashboardService from "@/apps/EMC/services/dashboard.service";
import HisDate from "@/utils/Date";

export default defineComponent({
  name: "VisitStatsChart",
  setup() {
    const Visits = DashboardService.getVisits("2021-01-01", "2022-03-31");

    const VisitsArray = computed(() =>
      Visits.value
        ? Object.values(Visits.value).map((visit: any) => [
            visit.complete,
            visit.incomplete,
          ])
        : []
    );

    const options = computed(() => ({
      chart: {
        id: "vuechart-example",
      },
      xaxis: {
        categories: Visits.value
          ? Object.keys(Visits.value).map((date) =>
              HisDate.toStandardHisDisplayFormat(date)
            )
          : [[], []],
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
    }));

    const series = computed(() => [
      {
        label: "Complete Visits",
        borderColor: "rgba(222, 187, 240, 0.9)",
        backgroundColor: "rgba(187, 130, 245, 0.1)",
        data: VisitsArray.value[0],
      },
      {
        label: "Incomplete Visits",
        borderColor: "rgba(174, 225, 242, 0.9)",
        backgroundColor: "rgba(150, 229, 255, 0.1)",
        data: VisitsArray.value[1],
      },
    ]);

    return {
      options,
      series,
    };
  },
});
</script>