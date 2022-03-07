<template>
  <layout>
    <h1>Dashboard</h1>
    <ion-grid>
      <ion-row>
        <ion-col size="3">
          <dashboard-card :value="totalMissedAppointments" label="Missed Appointments" color="primary" :icon="calendar" />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="8">
          <visit-stats-chart 
            :startDate="range.start" 
            :endDate="range.end" 
          />
        </ion-col>
      </ion-row>
    </ion-grid>
  </layout>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import VisitStatsChart from "../Components/VisitStatsChart.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import DashboardCard from "../Components/DashboardCard.vue";
import { people, calendar, alarm } from "ionicons/icons";
import HisDate from "@/utils/Date";
import DashboardService from "../services/dashboard.service";

export default defineComponent({
  components: { Layout, VisitStatsChart, IonGrid, IonRow, IonCol, DashboardCard },
  setup() {
    const range = HisDate.getDateQuarter(new Date())
    const today = HisDate.toStandardHisFormat(new Date())
    const missedAppointments = DashboardService.getMissedAppointments(today, range)
    const totalMissedAppointments = computed(() => missedAppointments.value 
      ? missedAppointments.value.length
      : -1
    )
    
    return {
      people,
      calendar,
      alarm,
      range,
      totalMissedAppointments
    }
  }
});
</script>
