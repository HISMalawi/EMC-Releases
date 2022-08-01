<template>
  <ion-grid class='ion-no-padding ion-no-margin' :style="{height: '100%'}">
    <ion-row>
      <ion-col size="5">
        <ion-input v-model="start" type="date" class="box" :style="{ width: '100%', height: '100%'}"  />
      </ion-col>
      <ion-col size="1" style="display: flex; justify-content:center" >
        <ion-icon :icon="arrowForward" :style="{ fontSize: '24px', padding: '.5rem'}" ></ion-icon>
      </ion-col>
      <ion-col size="5">
        <ion-input v-model="end" type="date" class="box" :style="{ width: '100%', height: '100%'}" />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { IonGrid, IonInput, IonRow, IonCol, IonIcon } from "@ionic/vue";
import { arrowForward } from "ionicons/icons";
import dayjs from "dayjs";
import { toastWarning } from "@/utils/Alerts";

export default defineComponent({
  name: "DateRangePicker",
  components: {
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
  },
  props: {
    range: {
      type: Object as PropType<{ startDate: string; endDate: string }>,
      default: () => ({ startDate: "", endDate: "" }),
    }
  },
  emits: ["rangeChange"],
  setup (props, { emit }) {
    const start = ref(props.range.startDate);
    const end = ref(props.range.endDate);

    const isValidRange = (start: string, end: string) => {
      if(dayjs(start).isSame(end) || dayjs(start).isBefore(end)){
        return true;
      }
      toastWarning("Start date must be before or equal to end date");
      return false;
    }
    const cRange = computed(() => {
      if(start.value && end.value && isValidRange(start.value, end.value)) {
        return { startDate: start.value, endDate: end.value };
      }
    })

    watch(cRange, (newVal) => {
      if(newVal) {
        emit("rangeChange", newVal);
      }
    })

    return {
      arrowForward,
      start,
      end,
    };
  },
})
</script>