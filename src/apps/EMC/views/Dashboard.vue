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
            :icon="time"
          />
        </ion-col>
        <ion-col size="3">
          <dashboard-card
            :value="totalDefaulters"
            label="Defaulters (this Quarter)"
            color="danger"
            :icon="people"
          />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="8">
          <visit-stats-chart
            :days="days"
            :visits="accumulativeVisits"
          />
        </ion-col>
      </ion-row>
    </ion-grid>
  </layout>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import VisitStatsChart from "../Components/VisitStatsChart.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import DashboardCard from "../Components/DashboardCard.vue";
import { people, calendar, alarm, hourglass, time } from "ionicons/icons";
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
    const visits = ref<any>();
    const days = computed<string[]>(() => visits.value && Object.keys(visits.value) || []);
    const accumulativeVisits = computed(() => {
      const complete: Array<number> = []
      const incomplete: Array<number> = []
      days.value.forEach(day => {
        complete.push(visits.value[day].complete)
        incomplete.push(visits.value[day].incomplete)
      })
      return {
        complete,
        incomplete
      }
    })

    const appointments = ref<any[]>()
    const totalMissedAppointments = computed(() => appointments.value?.length || -1);

    const appointmentsDue = ref<any[]>()
    const totalAppointmentsDue = computed(() => appointmentsDue.value?.length || -1);

    const dueForViralLoad = ref<any[]>()
    const totalDueForVL = computed(() => dueForViralLoad.value?.length || -1);

    const defaulters = ref<any[]>()
    const totalDefaulters = computed(() => defaulters.value?.length || -1);

    onMounted(async () => {
      visits.value = await DashboardService.getVisits(range)
      appointments.value = await DashboardService.getAppointmentsDue(tomorrow)
      appointmentsDue.value = await DashboardService.getMissedAppointments(today, range)
      dueForViralLoad.value = await DashboardService.getPatientsDueForVL(range)
      defaulters.value = await DashboardService.getDefaulters(today, range)
    })

    return {
      people,
      calendar,
      alarm,
      time,
      totalMissedAppointments,
      totalAppointmentsDue,
      totalDueForVL,
      totalDefaulters,
      days,
      accumulativeVisits
    };
  },
});
</script>
