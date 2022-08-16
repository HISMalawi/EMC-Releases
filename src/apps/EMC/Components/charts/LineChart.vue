<template>
  <ion-card class="his-card">
    <ion-card-content style="min-height: 45vh;">
      <apexchart
        width="100%"
        height="100%"
        type="line"
        :options="chartOptions"
        :series="series"
        @click="(e: any, c: any, config: any) => $emit('pointSelection', config)"
      ></apexchart>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { IonCard, IonCardContent } from "@ionic/vue";

export default defineComponent({
  name: "LineChart",
  props: {
    series: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    options: {
      type: Object as PropType<Record<string, any>>,
      default: () => []
    }
  },
  components: {IonCard, IonCardContent },
  emits: ["pointSelection"],
  setup(props) {
    const chartOptions = computed(() => {
      const defaults: Record<string, any> = {
        chart: {
          id: "line-chart",
          type: 'line',
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 30,
          labels: {
            show: true,
            rotate: -75,
          }
        },
        title: {
          text: 'Line Chart',
          align: 'left'
        },
        noData: {
          text: "No Data Available",
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: "#000000",
            fontSize: "25px",
            fontFamily: "Helvetica",
          },
        },
      }

      for (const key in props.options) {
        defaults[key] = { ...defaults[key], ...props.options[key] };
      }
      
      return defaults;
    });

    return {
      chartOptions,
    };
  },
});
</script>