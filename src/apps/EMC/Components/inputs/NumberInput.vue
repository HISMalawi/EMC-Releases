<template>
  <ion-label class=" ion-padding-bottom bold" v-if="model.label">
    <span>{{ model.label }}</span>
    <span v-if="model.required" class="text-danger"> *</span>
    <span class="ion-float-right ion-margin-end checkbox-label" v-if="allowUnknown">
      Unknown?
      <ion-checkbox v-model="isUnknown"></ion-checkbox>
    </span>
  </ion-label>
  <ion-input
    type="number"
    class="ion-margin-top"
    :class="model.error ? 'box-input-error'  : 'box-input'"
    v-model="model.value"
    :placeholder="isUnknown ? 'Unknown' : model.placeholder"
    :disabled="model.disabled || isUnknown"
    @ionFocus="model.error = ''"
    @ionBlur="validate"
    :min="min"
    :max="max"
  />
  <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
</template>
<script lang="ts">
import { IonInput, IonLabel, IonNote, IonCheckbox } from "@ionic/vue";
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import { DTForm, DTFormField } from "../../interfaces/dt_form_field";

export default defineComponent({
  name: "NumberInput",
  props: {
    modelValue: {
      type: Object as PropType<DTFormField>,
      default: () => ({}),
    },
    form: {
      type: Object as PropType<DTForm>,
      default: () => ({}),
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    allowUnknown: {
      type: Boolean,
      default: false
    }
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

    const validate = async () => {
      if (model.value.required && !model.value.value) {
        return model.value.error = "This field is required";
      }
      if (!props.allowUnknown && model.value.value === "Unknown" || model.value.value === "N/A") {
        return model.value.error = "Unknown is not allowed";
      }
      if (model.value.validation) {
        const errors = await model.value.validation({label: model.value.value, value: model.value.value}, props.form);
        if (errors && errors.length) {
          return model.value.error += errors.toString();
        }
      }
      return model.value.error = "";
    };

    watch(isUnknown, isUnkown => {
      if(isUnkown) {
        model.value.value = "Unknown"
        model.value.error = ''
        model.value.disabled = true;
      } else {
        model.value.value = ""
        model.value.disabled = false;
      }
    });
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