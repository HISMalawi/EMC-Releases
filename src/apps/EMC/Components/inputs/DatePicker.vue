<template>
  <date-picker v-model="date" :masks="masks" :popover="popover">
    <template #default="{ inputValue, inputEvents }">
      <div class="date-picker-wrapper">
        <input :value="inputValue" class="box date-picker-input" v-on="inputEvents" placeholder="DD/MMM/YYYY" />
      </div>
    </template>
  </date-picker>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { arrowForward } from "ionicons/icons";
import { DatePicker } from "v-calendar";
import HisDate from "@/utils/Date";

export default defineComponent({
  name: "DatePicker",
  components: {
    DatePicker,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    }
  },
  emits: ["update:modelValue"],
  setup (props, { emit }) {
    const masks = ref({ input: "DD/MMM/YYYY" });
    const popover = ref({ visibility: 'click' });    
    const date = computed({
      get: () => props.modelValue,
      set: (date: string) => emit("update:modelValue", HisDate.toStandardHisFormat(date))
    })

    return {
      arrowForward,
      date,
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

.date-picker-input {
  padding-left: .2em;
  max-width: 150px;
}
</style>