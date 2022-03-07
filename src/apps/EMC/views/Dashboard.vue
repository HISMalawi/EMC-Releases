<template>
  <layout>
    <h1>Dashboard</h1>
    <ion-grid>
      <ion-row>
        <ion-col size="3">
          <dashboard-card
            :value="totalMissedAppointments"
            label="Missed Appointments"
            color="primary"
            :icon="calendar"
          />
        </ion-col>
        <ion-col size="3">
          <dashboard-card
            :value="totalAppointmentsDue"
            label="Appointments Due"
            color="success"
            :icon="alarm"
          />
        </ion-col>
        <ion-col size="3">
          <dashboard-card
            :value="totalDueForVL"
            label="Due for Viral Load"
            color="secondary"
            :icon="people"
          />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="8">
          <visit-stats-chart :startDate="range.start" :endDate="range.end" />
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
import HisDate, { STANDARD_DATE_FORMAT } from "@/utils/Date";
import DashboardService from "../services/dashboard.service";

export default defineComponent({
  components: {
    Layout,
    VisitStatsChart,
    IonGrid,
    IonRow,
    IonCol,
    DashboardCard,
  },
  setup() {
    const range = HisDate.getDateQuarter(new Date());
    const today = HisDate.toStandardHisFormat(new Date());
    const tomorrow = HisDate.add(today, "day", 1).format(STANDARD_DATE_FORMAT);

    const totalMissedAppointments = computed(() => {
      return DashboardService.getMissedAppointments(today, range).value?.length || -1
    });

    const totalAppointmentsDue = computed(() => {
      return DashboardService.getAppointmentsDue(tomorrow).value?.legnth || -1
    });

    const totalDueForVL = computed(() => {
      return DashboardService.getPatientsDueForVL(range).value?.length || -1
    })

    return {
      people,
      calendar,
      alarm,
      range,
      totalMissedAppointments,
      totalAppointmentsDue,
      totalDueForVL,
    };
  },
});
</script>
