<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="stat in patientSummaryStats" :key="stat.label">
        <opd-stat-card
          :label="stat.label"
          :value="stat.value"
          :color="stat.color ?? ''"
        />
      </ion-col>
    </ion-row>
    
  </ion-grid>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonGrid, IonRow, IonCol} from "@ionic/vue";
import OpdStatCard from '@/apps/Registration/components/OpdStatCard.vue'

export default defineComponent({
  components: {
    OpdStatCard,
    IonGrid, 
    IonRow, 
    IonCol,
  },
  setup() {
    const patientSummaryStats = computed(() => {
      return  [
        { label: 'Registered today', value: '-', color: 'lightyellow' },
        { label: 'Returning today', value:'-', color: 'lightyellow' },
        { label: 'Referred today', value: '-', color: 'lightyellow' },
        { label: 'Total', value: '-', color: 'yellowgreen' },
      ]
    })
    
    return {
      patientSummaryStats
    }
  },
})
</script>

<style scoped>
ion-col {
  padding: 0; 
  margin: 0.5rem .1rem;
}
</style>
