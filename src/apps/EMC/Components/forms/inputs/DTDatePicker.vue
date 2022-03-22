<template>
  <ion-row style="width: 100%; padding-top: 0.5rem">
    <ion-col size="4">
      <ion-input
        v-model="day"
        :min="1"
        :max="31"
        :class="hasErrors ? 'box-input-error' : 'box-input'"
        type="number"
        placeholder="DD"
      />
    </ion-col>
    <ion-col size="4">
      <ion-input
        v-model="month"
        :min="1"
        :max="12"
        :class="hasErrors ? 'box-input-error' : 'box-input'"
        type="number"
        placeholder="MM"
      />
    </ion-col>
    <ion-col size="4">
      <ion-input
        v-model="year"
        :min="1900"
        :class="hasErrors ? 'box-input-error' : 'box-input'"
        type="number"
        placeholder="YYYY"
      />
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import HisDate from "@/utils/Date";
import { IonCol, IonInput, IonRow } from '@ionic/vue';

export default defineComponent({
  name: 'DTDatePicker',
  props: {
    minDate: {
      type: String,
      default: '1900-01-01'
    },
    maxDate: {
      type: String,
    }
  },
  components: {
    IonRow,
    IonCol,
    IonInput,
  },
  emits: ['onValue'],
  setup(props, { emit }) {
    const day = ref('')
    const month = ref('')
    const year = ref('')
    const hasErrors = ref(false)

    const date = computed(() => {
      if(day.value && month.value && year.value) {
        const d = `${year.value}-${month.value}-${day.value}`
        if(HisDate.rangeOf(d, props.minDate, props.maxDate)) {
          hasErrors.value = false
          return d
        }
        hasErrors.value = true
      }
      return ''
    })

    watch(date, newDate => {
      if(newDate && !hasErrors.value) {
        emit('onValue', newDate)
      }
    })

    return {
      day,
      month,
      year,
      hasErrors
    }
  },
})
</script>
