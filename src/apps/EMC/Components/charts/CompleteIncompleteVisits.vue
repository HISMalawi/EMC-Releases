<template>
  <ion-card class="his-card">
    <ion-card-header>
      <ion-title>Complete / incomplete visits</ion-title>
    </ion-card-header>
    <ion-card-content>
      <apexchart
        width="100%"
        type="line"
        :options="options"
        :series="series"
      ></apexchart>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import HisDate from "@/utils/Date";
import { IonCard, IonCardHeader, IonCardContent, IonTitle } from "@ionic/vue";

export default defineComponent({
  name: "CompleteIncompleteVisits",
  props: {
    visits: {
      type: Object as PropType<Record<string, number[]>>,
      default: () => ({})
    },
    days: {
      type: Object as PropType<string[]>,
      default: () => []
    }
  },
  components: {IonCard, IonCardHeader, IonCardContent, IonTitle},
  setup(props) {
    const options = computed(() => ({
      chart: {
        id: "vuechart-example",
        height: 510,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        categories: props.days.map(d => HisDate.toStandardHisDisplayFormat(d)),
        tickAmount: 30,
        labels: {
          show: true,
          rotate: -75,
        }
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
        data: props.visits.complete,
      },
      {
        name: "Incomplete Visits",
        data: props.visits.incomplete,
      },
    ]);

    return {
      options,
      series,
    };
  },
});
</script>