<template>
  <date-picker v-model="range" is-range :masks="masks" :popover="popover">
    <template #default="{ inputValue, inputEvents }">
      <div class="date-picker-wrapper">
        <input :value="inputValue.start" class="box date-picker-input" v-on="inputEvents.start" placeholder="DD/MMM/YYYY" />
        <ion-icon :icon="arrowForward" class="date-picker-icon"></ion-icon>
        <input :value="inputValue.end" class="box date-picker-input" v-on="inputEvents.start"  placeholder="DD/MMM/YYYY"/>
      </div>
    </template>
  </date-picker>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { IonIcon } from "@ionic/vue";
import { arrowForward } from "ionicons/icons";
import { DatePicker } from "v-calendar";
import Date from "@/utils/Date";

export interface DateRange {
  start: string;
  end: string;
}

export default defineComponent({
  name: "DateRangePicker",
  components: {
    IonIcon,
    DatePicker,
  },
  props: {
    modelValue: {
      type: Object as PropType<DateRange>,
      default: () => ({ start: "", end: "" }),
    }
  },
  emits: ["update:modelValue"],
  setup (props, { emit }) {
    const masks = ref({ input: "DD/MMM/YYYY" });
    const popover = ref({ visibility: 'click' });
    
    const range = computed({
      get: () => props.modelValue,
      set: ({start, end}: DateRange) => emit("update:modelValue", {
        start: Date.toStandardHisFormat(start),
        end: Date.toStandardHisFormat(end)
      })
    })

    return {
      arrowForward,
      range,
      masks,
      popover,
    };
  },
})
</script>

<style scoped>
.date-picker-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.date-picker-icon { 
  font-size: 20px;
  padding: .2em !important;
  max-width: 48px !important;
}

.date-picker-input {
  padding-left: .2em;
  max-width: 150px;
}
</style>