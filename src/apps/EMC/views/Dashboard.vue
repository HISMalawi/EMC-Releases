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
        <ion-col size="3">
          <dashboard-card
            label="Patients on DTG"
            :value="totalPatientsOnDTG"
            class="his-card"
          />
          <dashboard-card
            label="TX Current (30 Days)"
            :value="totalTXCurrent30"
            class="his-card"
          />
          <dashboard-card
            label="TX Current (60 Days)"
            :value="totalTXCurrent60"
            class="his-card"
          />
        </ion-col>
        <ion-col size="9" style="max-height: 650px">
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
import VisitStatsChart from "../Components/charts/CompleteIncompleteVisits.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import DashboardCard from "../Components/DashboardCard.vue";
import { people, calendar, alarm, time } from "ionicons/icons";
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

    const missedAppointments = ref<any[]>()
    const totalMissedAppointments = computed(() => missedAppointments.value?.length || -1);

    const appointmentsDue = ref<any[]>()
    const totalAppointmentsDue = computed(() => appointmentsDue.value?.length || -1);

    const dueForViralLoad = ref<any[]>()
    const totalDueForVL = computed(() => dueForViralLoad.value?.length || -1);

    const defaulters = ref<any[]>()
    const totalDefaulters = computed(() => defaulters.value?.length || -1);

    const patientsOnDTG = ref<any[]>()
    const totalPatientsOnDTG = computed(() => patientsOnDTG.value?.length || -1)

    const txCurrent30 = ref<any[]>()
    const totalTXCurrent30 = computed(() => txCurrent30.value?.length)

    const txCurrent60 = ref<any[]>()
    const totalTXCurrent60 = computed(() => txCurrent60.value?.length)

    onMounted(async () => {
      patientsOnDTG.value = await DashboardService.getPatientsOnDTG(range)
      visits.value = await DashboardService.getVisits(range)
      appointmentsDue.value = await DashboardService.getAppointmentsDue(tomorrow)
      missedAppointments.value = await DashboardService.getMissedAppointments(today, range)
      txCurrent30.value = await DashboardService.getTXCurrent({
        start: today, 
        end: HisDate.subtract(today, 'days', 30).format(STANDARD_DATE_FORMAT)
      })
      txCurrent60.value = await DashboardService.getTXCurrent({
        start: today, 
        end: HisDate.subtract(today, 'days', 60).format(STANDARD_DATE_FORMAT)
      })
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
      accumulativeVisits,
      totalPatientsOnDTG,
      totalTXCurrent30,
      totalTXCurrent60,
    };
  },
});
</script>
