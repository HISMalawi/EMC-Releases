<template>
  <ion-row style="width: 100%; height: 40px; margin-top: .8rem;">
    <ion-col size="4" v-if="prepend" style="background: #f2f2f2; height: 38px">
      <b style="color: orange; margin: auto .5rem !important; font-size: 22px">{{ prepend }}</b>
    </ion-col>
    <ion-col size="8" style="padding: 0">
      <ion-input
        v-model="cValue"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import { IonCol, IonInput, IonRow } from '@ionic/vue'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: "InputGroup",
  components: {
    IonRow,
    IonCol,
    IonInput,
  },
  props: {
    value: {
      type: String,
    },
    prepend: {
      type: String
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["onValue"],
  setup(props, { emit }) {
    const cValue = computed({
      get: () => props.value,
      set: (value) => emit("onValue", value) 
    })
    return {
      cValue
    }
  },
})
</script>
