<template>
  <layout>
    <h1>Dashboard</h1>
    <ion-grid>
      <ion-row>
        <ion-col size="7">
          <visit-stats-chart />
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

export default defineComponent({
  components: { Layout, VisitStatsChart, IonGrid, IonRow, IonCol },
});
</script>
