<template>
  <layout>
    <h1 class=" his-lg-text ion-padding-start">
      Dashboard 
      <ion-button class="ion-float-end ion-margin-end" @click="loadData(true)">
        Refresh
      </ion-button>
    </h1>
    <ion-grid>
      <ion-row>
        <ion-col size="3">
          <dashboard-card
            :value="missedAppointments"
            label="Missed Appointments"
            color="primary"
            :icon="calendar"
          />
        </ion-col>
        <ion-col size="3">
          <dashboard-card
            :value="appointmentsDue"
            label="Appointments Due"
            color="success"
            :icon="alarm"
          />
        </ion-col>
        <ion-col size="3">
          <dashboard-card
            :value="dueForVL"
            label="Due for Viral Load"
            color="secondary"
            :icon="time"
          />
        </ion-col>
        <ion-col size="3">
          <dashboard-card
            :value="defaulters"
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
            :value="patientsOnDTG"
            class="his-card"
          />
          <dashboard-card
            label="TX Current (30 Days)"
            :value="txCurrent30"
            class="his-card"
          />
          <dashboard-card
            label="TX Current (60 Days)"
            :value="txCurrent60"
            class="his-card"
          />
        </ion-col>
        <ion-col size="9">
          <line-chart :options="chartOptions" :series="chartSeries" />
        </ion-col>
      </ion-row>
    </ion-grid>
  </layout>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import DashboardCard from "../Components/DashboardCard.vue";
import { people, calendar, alarm, time } from "ionicons/icons";
import HisDate, { STANDARD_DATE_FORMAT } from "@/utils/Date";
import Store from "@/composables/ApiStore";
import { EmcStore } from "../Config/emcStore";
import LineChart from "../Components/charts/LineChart.vue";
import { isEmpty } from "lodash";

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    DashboardCard,
    LineChart
  },
  setup() {
    const today = HisDate.toStandardHisFormat(new Date());
    const quarter = HisDate.getDateQuarter(today);
    const tomorrow = HisDate.add(today, "day", 1).format(STANDARD_DATE_FORMAT);
    const visits = ref<any>();
    const missedAppointments = ref<number>()
    const appointmentsDue = ref<number>()
    const dueForVL = ref<number>()
    const defaulters = ref<number>()
    const patientsOnDTG = ref<number>()
    const txCurrent30 = ref<number>()
    const txCurrent60 = ref<number>()
    const chartOptions = {
      title: {
        text: "Complete / incomplete visits",
        align: "left",
      },
    }
    const chartSeries = computed(() => {
      if(isEmpty(visits.value)) return []
      const dates = Object.keys(visits.value)
      const complete: any[][] = []
      const incomplete: any[][] = []
      dates.forEach(day => {
        const time = new Date(day).getTime();
        complete.push([time, visits.value[day].complete])
        incomplete.push([time, visits.value[day].incomplete])
      })
      return [
      {
        name: "Complete Visits",
        data: complete,
      },
      {
        name: "Incomplete Visits",
        data: incomplete,
      },
    ]
    });

    const loadData = async (reload = false) => {
      patientsOnDTG.value = (await Store.get(EmcStore.PATIENT_ON_DTG, { quarter, reload })).length
      visits.value = await Store.get(EmcStore.PATIENT_VISITS, { quarter, reload })
      appointmentsDue.value = (await Store.get(EmcStore.APPOINTMENTS_DUE, { date: tomorrow, reload })).length
      missedAppointments.value = (await Store.get(EmcStore.MISSED_APPOINTMENTS, { date: today, quarter, reload })).length
      txCurrent30.value = (await Store.get(EmcStore.TX_CURRENT_30, { quarter, reload })).length
      txCurrent60.value = (await Store.get(EmcStore.TX_CURRENT_60, { quarter, reload })).length
      dueForVL.value = (await Store.get(EmcStore.DUE_FOR_VL, { quarter, reload })).length
      defaulters.value = (await Store.get(EmcStore.PATIENT_VISITS, { quarter, reload })).length
    }

    onMounted(async () => loadData())

    return {
      people,
      calendar,
      alarm,
      time,
      missedAppointments,
      appointmentsDue,
      dueForVL,
      defaulters,
      patientsOnDTG,
      txCurrent30,
      txCurrent60,
      chartOptions,
      chartSeries,
      loadData,
    };
  },
});
</script>
