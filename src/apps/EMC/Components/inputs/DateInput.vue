<template>
  <ion-label class="ion-padding-bottom bold" v-if="model.label">
    <span v-if="isEstimated">{{ estimationLabel }}</span>
    <span v-else>{{ model.label }}</span>
    <span class="ion-float-right ion-margin-end checkbox-label" v-if="allowEstimation">
      Estimate {{ model.label }}
      <ion-checkbox v-model="isEstimated"></ion-checkbox>
    </span>
  </ion-label>
  <ion-input
    v-if="isEstimated"
    type="number"
    class="ion-margin-top"
    :class="model.error ? 'box-input-error'  : 'box-input'"
    v-model="age"
    :placeholder="estimationLabel"
    :disabled="model.disabled"
    :min="1"
    @ionFocus="() => model.error = ''"
    @ionBlur="validate"
  />
  <div v-else style="display: flex; justify-content: flex-start;">
    <ion-input 
      v-model="day" 
      :min="1" 
      :max="31" 
      class="ion-margin-top" 
      :class="model.error ? 'box-input-error'  : 'box-input'"
      style="width: 30%;"
      type="number"
      placeholder="DD"
      :disabled="model.disabled"
      @ionFocus="() => model.error = ''"
      @ionBlur="validate"
    />
    <select 
      v-model="month" 
      class="ion-margin-top ion-margin-horizontal" 
      :class="model.error ? 'box-input-error'  : 'box-input'"
      style="background-color: #fff; width: 30%;"
      :style="month ? {'color': '#000'} : {'color': '#a0a0a0'}"
      :disabled="model.disabled"
      @focus="() => model.error = ''"
      @blur="validate"
    >
      <option :value="0" disabled selected hidden>MM</option>
      <option v-for="(month, i) in months" :value="i + 1" :key="i">{{ month }}</option>
    </select>
    <ion-input 
      v-model="year" 
      :min="1900" 
      class="ion-margin-top" 
      :class="model.error ? 'box-input-error'  : 'box-input'" 
      type="number" 
      placeholder="YYYY" 
      :disabled="model.disabled"
      @ionFocus="() => model.error = ''"
      @ionBlur="validate"
    />
  </div>
  <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
</template>
<script lang="ts">
import { IonCheckbox, IonInput, IonLabel, IonNote } from "@ionic/vue";
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { DTForm, DTFormField } from "../../interfaces/dt_form_field";
import HisDate from "@/utils/Date";
import dayjs from "dayjs";

export default defineComponent({
  name: "DateInput",
  props: {
    modelValue: {
      type: Object as PropType<DTFormField>,
      default: () => ({}),
    },
    form: {
      type: Object as PropType<DTForm>,
      default: () => ({}),
    },
    minDate: {
      type: String,
      default: ''
    },
    maxDate: {
      type: String,
      default: ''
    },
    allowEstimation: {
      type: Boolean,
      default: false
    },
    estimationLabel: {
      type: String,
      default: "Estimate"
    }
  },
  components: {
    IonLabel,
    IonInput,
    IonNote,
    IonCheckbox,
  },
  emits: ["update:modelValue", "isEstimated"],
  setup(props, { emit}) {
    const isEstimated = ref(false);
    const age = ref<number>();
    const day = ref<number | undefined>(props.modelValue.value ? dayjs(props.modelValue.value).date() : undefined);
    const month = ref<number>(props.modelValue.value ? dayjs(props.modelValue.value).month() + 1 : 0);
    const year = ref<number | undefined>(props.modelValue.value ? dayjs(props.modelValue.value).year() : undefined);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = computed(() => {
      if (isEstimated.value && age.value) {
        return  HisDate.toStandardHisFormat(HisDate.estimateDateFromAge(age.value));
      }
      if (day.value && month.value && year.value) {
        const date = `${year.value}-${month.value}-${day.value}`
        if(date.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/))
          return HisDate.toStandardHisFormat(date);
      }
      return ``;
    });

    const model = computed({
      get: () => props.modelValue as DTFormField,
      set: (value) => emit("update:modelValue", value)
    })

    const validate = async () => {
      if (model.value.required && !model.value.value) {
        return model.value.error = "This field is required";
      }
      if (props.minDate && dayjs(model.value.value).isBefore(dayjs(props.minDate))) {
        return model.value.error = isEstimated.value 
          ? `Estimated period must be less than or equal to ${dayjs().diff(props.minDate, 'years')} years ago`
          : `Date must be after ${props.minDate}`
      }
      if (props.maxDate && dayjs(model.value.value).isAfter(dayjs(props.maxDate))) {
        return model.value.error = isEstimated.value
          ? `Estimated period must be more than or equal to ${dayjs(model.value.value).diff(props.maxDate, 'years')} years ago`
          : `Date must be before ${props.maxDate}`
      }
      if (model.value.validation) {
        const errors = await model.value.validation({label: model.value.value, value: model.value.value}, props.form);
        if (errors && errors.length) {
          return model.value.error += errors.toString();
        }
      }
      return model.value.error = "";
    };

    watch(date, newDate => {
      if(newDate) model.value.value = newDate
    })

    watch(() => props.modelValue.value, (date) => {
      day.value = date ? dayjs(date).date() : undefined;
      month.value = date ? dayjs(date).month() + 1 : 0;
      year.value = date ? dayjs(date).year() : undefined;
    })

    watch(isEstimated, newValue => {
      age.value = undefined;
      day.value = undefined;
      month.value = 0;
      year.value = undefined;
      model.value.error = "";
      emit("isEstimated", newValue);
    })

    return {
      validate,
      isEstimated,
      model,
      age,
      day,
      month,
      year,
      months,
    };
  }
});
</script>