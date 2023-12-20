<template>
  <ion-grid class="ion-no-margin ion-no-padding">
    <ion-row>
      <ion-col size="12">
        <ion-label class="ion-margin-end"><b>
          <span>{{ model.label }}:</span>
          <span v-if="model.required" class="text-danger">*</span>
        </b></ion-label>
        <br v-if="!inline"><br v-if="!inline">
        <ion-radio-group v-model="model.value" @ionChange="() => model.error = ''">
          <template v-if="customOptions?.length">
            <template v-for="option in customOptions" :key="option.label">
              <span class="ion-margin-start">{{ option.label }}</span>
              <ion-radio class="ion-margin-start" slot="start" color="primary" :value="option.value" :disabled="disabled"/>
            </template>
          </template>
          <template v-else>
            <span class="ion-margin-start">Yes</span>
            <ion-radio class="ion-margin-start" slot="start" color="primary" value="Yes" :disabled="disabled"/>
            <span class="ion-margin-start">No</span>
            <ion-radio class="ion-margin-start" slot="start" color="primary" value="No" :disabled="disabled" />
          </template>
        </ion-radio-group><br>
        <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { IonRadioGroup, IonRadio, IonGrid, IonRow, IonCol, IonLabel } from "@ionic/vue";
import { DTFormField } from "../../interfaces/dt_form_field";
import { Option } from "@/components/Forms/FieldInterface";

export default defineComponent({
  name: "YesNoInput",
  props: {
    modelValue: {
      type: Object as PropType<DTFormField>,
      default: () => ({}),
    },
    inline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customOptions: {
      type: Array as PropType<Array<Option>>
    }
  },
  components: {
    IonRadioGroup,
    IonRadio,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    })
    
    return {
      model,
    };
  },
});
</script>
