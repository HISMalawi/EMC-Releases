<template>
  <ion-card class="his-card" style="height: 100%;">
    <ion-card-content>
      <apex-chart
        width="100%"
        :height="height"
        type="line"        
        :options="chartOptions"
        :series="series"
        @click="(e: any, c: any, config: any) => $emit('pointSelection', config)"
      ></apex-chart>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { IonCard, IonCardContent } from "@ionic/vue";
import ApexChart from "vue3-apexcharts"

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
    },
    height: {
      type: [String, Number],
      default: 560
    }
  },
  components: { IonCard, IonCardContent, ApexChart },
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