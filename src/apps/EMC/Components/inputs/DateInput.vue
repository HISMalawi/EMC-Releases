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
    @ionInput="onEstimate"
    @ionFocus="() => model.error = ''"
    @ionBlur="validate"
  />
  <div v-else style="display: flex; justify-content: flex-start;">
    <div class="ion-margin-top ion-padding-end" >
      <DatePicker 
        mode="date"
        v-model="pickerDate"
        :min-date="minDate" 
        :max-date="maxDate"
        :masks="{ input: 'YYYY-MM-DD' }"
      >
        <template v-slot="{ showPopover }">
          <ion-button @click="showPopover">
            <ion-icon :icon="calendar" ></ion-icon>
          </ion-button>
        </template>
      </DatePicker>
    </div>
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
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import { DTForm, DTFormField } from "../../interfaces/dt_form_field";
import HisDate from "@/utils/Date";
import dayjs from "dayjs";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../../interfaces/emc_event";
import { calendar } from "ionicons/icons";
import { DatePicker } from "v-calendar";

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
    },
  },
  components: {
    IonLabel,
    IonInput,
    IonNote,
    IonCheckbox,
    DatePicker,
  },
  emits: ["update:modelValue", "isEstimated"],
  setup(props, { emit}) {
    const isEstimated = ref(false);
    const age = ref<number>();
    const day = ref<number | undefined>(props.modelValue.value ? dayjs(props.modelValue.value).date() : undefined);
    const month = ref<number>(props.modelValue.value ? dayjs(props.modelValue.value).month() + 1 : 0);
    const year = ref<number | undefined>(props.modelValue.value ? dayjs(props.modelValue.value).year() : undefined);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const pickerDate = ref(props.modelValue.value as string)

    const model = computed({
      get: () => props.modelValue as DTFormField,
      set: (value) => emit("update:modelValue", value)
    })

    const onEstimate = (e: any) => {
      model.value.error = StandardValidations.isNumber({value: e.target.value})?.join()
      if(!model.value.error) age.value = parseInt(e.target.value)
    }

    const validate = async () => {
      let date = "";
      if (isEstimated.value && age.value) {
        date = HisDate.toStandardHisFormat(HisDate.estimateDateFromAge(age.value));
      } else if (day.value || month.value || year.value) {
        const d = `${year.value}-${month.value}-${day.value}`
        if(d.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)) {
          date = HisDate.toStandardHisFormat(d);
        } else {
          return model.value.error = "Invalid date"
        }
      }

      if (model.value.required && !date) {
        return model.value.error = "This field is required";
      }
      if (props.minDate && new Date(date) < new Date(props.minDate)) {
        return model.value.error = isEstimated.value 
          ? `Estimated period must be less than or equal to ${dayjs(date).diff(props.minDate, 'years')} years`
          : `Date must be after ${props.minDate}`
      }
      if (props.maxDate && new Date(date) > new Date(props.maxDate)) {
        return model.value.error = isEstimated.value
          ? `Estimated period must be more than or equal to ${dayjs(date).diff(props.maxDate, 'years')} years`
          : `Date must be before ${props.maxDate}`
      }
      if (model.value.validation) {
        const errors = await model.value.validation({label: date, value: date}, props.form);
        if (errors && errors.length) {
          return model.value.error += errors.toString();
        }
      }
      model.value.error = "";
      model.value.value = date;
    };

    watch (pickerDate, (date) => {
      day.value = dayjs(date).date()
      month.value = dayjs(date).month() + 1;
      year.value = dayjs(date).year();
      validate();
    })


    const resetValues = () => {
      age.value = undefined;
      day.value = undefined;
      month.value = 0;
      year.value = undefined;
      model.value.error = "";
      pickerDate.value = ""
    }

    watch(() => props.modelValue.value, (date) => {
      day.value = date ? dayjs(date).date() : undefined;
      month.value = date ? dayjs(date).month() + 1 : 0;
      year.value = date ? dayjs(date).year() : undefined;
      pickerDate.value = date;
    })

    watch([
      () => props.minDate,
      () => props.maxDate,
    ], () => validate())

    watch(isEstimated, newValue => {
      resetValues()
      emit("isEstimated", newValue);
    })

    onMounted(() => EventBus.on(EmcEvents.ON_CLEAR, resetValues))

    return {
      validate,
      onEstimate,
      pickerDate,
      isEstimated,
      model,
      age,
      day,
      month,
      year,
      months,
      calendar,
    };
  }
});
</script>

<style>
.vc-popover-content-wrapper {
  z-index: 1000 !important;
}
</style>