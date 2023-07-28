<template>
  <date-picker mode="date" v-model="date" :masks="masks">
    <template #default="{ inputValue, inputEvents }">
      <input :value="inputValue" class="box date-picker-input" v-on="inputEvents" placeholder="DD/MMM/YYYY" />
    </template>
  </date-picker>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { DatePicker } from "v-calendar";
import HisDate from "@/utils/Date";

export default defineComponent({
  name: "DTDatePicker",
  components: { DatePicker, },
  props: {
    modelValue: {
      type: String,
      default: "",
    }
  },
  emits: ["update:modelValue"],
  setup (props, { emit }) {
    const masks = ref({ input: "DD/MMM/YYYY" });
    const date = computed({
      get: () => props.modelValue,
      set: (date: string) => emit("update:modelValue", HisDate.toStandardHisFormat(date))
    })
    
    return {
      date,
      masks,
    };
  },
})
</script>

<style scoped>
.date-picker-input {
  padding-left: .2em;
  max-width: 150px;
}
</style>