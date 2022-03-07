<template>
  <layout>
    <h1>Dashboard</h1>
    <ion-grid>
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
import { defineComponent } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import VisitStatsChart from "../Components/VisitStatsChart.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import DashboardCard from "../Components/DashboardCard.vue";
import { people, calendar, alarm } from "ionicons/icons";
import HisDate from "@/utils/Date";

export default defineComponent({
  components: { Layout, VisitStatsChart, IonGrid, IonRow, IonCol, DashboardCard },
  setup() {
    const range = HisDate.getDateQuarter(new Date())
    return {
      people,
      calendar,
      alarm,
      range,
    }
  }
});
</script>
