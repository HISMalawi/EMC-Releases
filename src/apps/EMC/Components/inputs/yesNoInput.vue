<template>
  <ion-grid class="ion-no-margin ion-no-padding">
    <ion-row>
      <ion-col :size="12">
        <ion-label class="ion-margin-end"><b>{{ label }}:</b></ion-label>
        <br v-if="!inline"><br v-if="!inline">
        <ion-radio-group :value="value" @ionChange="onSelect">
          <span class="ion-margin-start">Yes</span>
          <ion-radio class="ion-margin-start" slot="start" value="Yes" />
          <span class="ion-margin-start">No</span>
          <ion-radio class="ion-margin-start" slot="start" value="No" />
        </ion-radio-group>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IonRadioGroup, IonRadio, IonGrid, IonRow, IonCol, IonItem, IonLabel } from "@ionic/vue";

export default defineComponent({
  name: "YesNoInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String as PropType<"Yes" | "No">,
    },
    inline: {
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
  emits: ["onSelect"],
  setup(_, { emit }) {
    const onSelect = (evt: Event) => {
      emit("onSelect", (evt.target as HTMLInputElement).value);
    };
    return {
      onSelect,
    };
  },
});
</script>
