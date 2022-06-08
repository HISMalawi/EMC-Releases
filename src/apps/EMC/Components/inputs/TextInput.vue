<template>
  <ion-label class=" ion-padding-bottom bold" v-if="model.label">
    <span></span>{{ model.label }}
    <span class="ion-float-right ion-margin-end checkbox-label" v-if="allowUnknown">
      {{ model.label }} Unknown?
      <ion-checkbox v-model="isUnknown"></ion-checkbox>
    </span>
  </ion-label>
  <ion-input
    class="ion-margin-top"
    :class="model.error ? 'box-input-error'  : 'box-input'"
    v-model="model.value"
    :placeholder="model.placeholder"
    :disabled="model.disabled || isUnknown"
    @ionFocus="model.error = ''"
    @ionBlur="validate"
  />
  <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
</template>
<script lang="ts">
import { IonCheckbox, IonInput, IonLabel, IonNote } from "@ionic/vue";
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import { DTFormField } from "../../interfaces/dt_form_field";

export default defineComponent({
  name: "TextInput",
  props: {
    modelValue: {
      type: Object as PropType<DTFormField>,
      default: () => ({}),
    },
    allowUnknown: {
      type: Boolean,
      default: false
    },
  },
  components: {
    IonLabel,
    IonInput,
    IonNote,
    IonCheckbox,
  },
  emits: ["update:modelValue"],
  setup(props, { emit}) {
    const isUnknown = ref(false);

    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    })

    const validate = () => {
      if (model.value.required && !model.value.value) {
        return model.value.error = "This field is required";
      }
      if (!props.allowUnknown && model.value.value === "Unknown" || model.value.value === "N/A") {
        return model.value.error = "Unknown is not allowed";
      }
      if (model.value.validation) {
        const errors = model.value.validation({label: model.value, value: model.value});
        if (errors && errors.length) {
          return model.value.error += errors.toString();
        }
      }
      return model.value.error = "";
    };

    watch(isUnknown, (newValue) => model.value.value = newValue ? "Unknown" : "");
    watch(props.modelValue, newModel => {
      if (newModel.value === "Unknown") {
        if(!isUnknown.value) {
          isUnknown.value = true;
        }
      } else {
        isUnknown.value = false;
      }
    });

    onMounted(() => {
      if(model.value.value === "Unknown" && !isUnknown.value) {
        isUnknown.value = true;
      }
    })

    return {
      validate,
      model,
      isUnknown,
    };
  }
});
</script>