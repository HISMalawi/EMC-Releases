<template>
  <ion-grid class="ion-no-margin ion-no-padding">
    <ion-row>
      <ion-col :size="12">
        <ion-label class="ion-margin-end"><b>{{ model.label }}:</b></ion-label>
        <br v-if="!inline"><br v-if="!inline">
        <ion-radio-group v-model="model.value" @ionChange="() => model.error = ''">
          <span class="ion-margin-start">Yes</span>
          <ion-radio class="ion-margin-start" slot="start" color="primary" value="Yes" :disabled="disabled"/>
          <span class="ion-margin-start">No</span>
          <ion-radio class="ion-margin-start" slot="start" color="primary" value="No" :disabled="disabled" />
        </ion-radio-group><br>
        <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { IonRadioGroup, IonRadio, IonGrid, IonRow, IonCol, IonItem, IonLabel } from "@ionic/vue";
import { DTFormField } from "../../interfaces/dt_form_field";

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
