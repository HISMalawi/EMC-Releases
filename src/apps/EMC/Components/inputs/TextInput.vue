<template>
  <ion-label class=" ion-padding-bottom bold" v-if="model.label">
    <span></span>{{ model.label }}
    <span class="ion-float-right ion-margin-end checkbox-label" v-if="allowUnknown">
      {{ model.label }} Unknown?
      <ion-checkbox v-model="isUnknown"></ion-checkbox>
    </span>
  </ion-label>
  <div class="ion-margin-top" :class="model.error ? 'box-input-error' : 'box-input'" style="width: 100%; height: 2.5rem; display: flex; justify-content: space-between;">
    <div v-if="prefix" style="background: #f2f2f2; height: 100%; padding: .5rem; flex-grow: 1;">
      <ion-label class="checkbox-label bold">{{ prefix }}</ion-label>
    </div>
    <div style="background: #ffffff; height: 100%; padding: .5rem;  flex-grow: 8;">
      <ion-input
        class="ion-no-margin ion-no-padding"
        v-model="model.value"
        :type="password ? 'password' : 'text'"
        :placeholder="model.placeholder"
        :disabled="model.disabled || isUnknown"
        @ionFocus="model.error = ''"
        @ionBlur="validate"
      />
    </div>
    <div v-if="suffix" style="background: #f2f2f2; height: 100%; padding: .5rem; flex-grow: 1;">
      <ion-label class="checkbox-label bold ion-float-end">{{ suffix }}</ion-label>
    </div>
  </div>
  <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
</template>
<script lang="ts">
import { IonCheckbox, IonCol, IonInput, IonLabel, IonNote, IonRow } from "@ionic/vue";
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import { DTForm, DTFormField } from "../../interfaces/dt_form_field";

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
    form: {
      type: Object as PropType<DTForm>,
      default: () => ({}),
    },
    prefix: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    password: {
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