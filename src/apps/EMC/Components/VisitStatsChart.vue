<template>
  <p>Complete / incomplete visits</p>
  <apexchart
    width="100%"
    type="line"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import DashboardService from "@/apps/EMC/services/dashboard.service";
import HisDate from "@/utils/Date";

export default defineComponent({
  name: "VisitStatsChart",
  setup() {
    const Visits = DashboardService.getVisits("2021-01-01", "2021-03-31");
    const days = computed(() =>
      Visits.value ? Object.keys(Visits.value) : []
    );
    const formatedVisits = computed(() => {
      const complete: Array<number> = [];
      const incomplete: Array<number> = [];
      days.value.forEach(day => {
        complete.push(Visits.value[day].complete);
        incomplete.push(Visits.value[day].incomplete);
      });
      return {
        completeVisits: complete, 
        incompleteVisits: incomplete
      };
    });
    const options = computed(() => ({
      chart: {
        id: "vuechart-example",
        height: 450,
      },
      xaxis: {
        categories: days.value.map((date: string) =>
          HisDate.toStandardHisDisplayFormat(date)
        ),
      },
      noData: {
        text: "Loading data...",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#000000",
          fontSize: "30px",
          fontFamily: "Helvetica",
        },
      },
    }));

    const series = computed(() => [
      {
        name: "Complete Visits",
        data: formatedVisits.value.completeVisits,
        color: "#7cb5ec",
      },
      {
        name: "Incomplete Visits",
        color: "#434348",
        data: formatedVisits.value.incompleteVisits,
      },
    ]);

    return {
      options,
      series,
    };
  },
});
</script>