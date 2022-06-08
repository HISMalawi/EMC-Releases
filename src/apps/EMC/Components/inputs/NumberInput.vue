<template>
  <ion-label class=" ion-padding-bottom bold" v-if="model.label"> {{ model.label }}</ion-label>
  <ion-input
    type="number"
    class="ion-margin-top"
    :class="model.error ? 'box-input-error'  : 'box-input'"
    v-model="model.value"
    :placeholder="model.placeholder"
    :disabled="model.disabled"
    @ionFocus="model.error = ''"
    @ionBlur="validate"
    :min="min"
    :max="max"
  />
  <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
</template>
<script lang="ts">
import { IonInput, IonLabel, IonNote } from "@ionic/vue";
import { computed, defineComponent, PropType } from "vue";
import { DTFormField } from "../../interfaces/dt_form_field";

export default defineComponent({
  name: "NumberInput",
  props: {
    modelValue: {
      type: Object as PropType<DTFormField>,
      default: () => ({}),
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    }
  },
  components: {
    IonLabel,
    IonInput,
    IonNote
  },
  emits: ["update:modelValue"],
  setup(props, { emit}) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    })

    const validate = async () => {
      if (model.value.required && !model.value.value) {
        return model.value.error = "This field is required";
      }
      if (model.value.validation) {
        const errors = await model.value.validation({label: model.value.value, value: model.value.value});
        if (errors && errors.length) {
          return model.value.error += errors.toString();
        }
      }
      return model.value.error = "";
    };

    return {
      validate,
      model,
    };
  }
});
</script>