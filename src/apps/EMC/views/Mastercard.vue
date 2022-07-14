<template>
<layout>
  <ion-grid class="ion-no-margin ion-no-padding">
    <ion-row>
      <ion-col size="12">
        <information-header
          v-if="isReady"
          :patient="patient"
          :guardians="guardians"
          :artStartDate="startDate"
          @updateARVNumber="updateARVNumber"
          @addGuardian="addGuardian"
          @updatePatient="updateDemographics"
        />
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <visits-summary
          v-if="patientId !== 0 && startDate"
          :patient="patient"
          :startDate="startDate"
        />
      </ion-col>
    </ion-row>
  </ion-grid>
</layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HisDate from "@/utils/Date";
import { Patient } from "@/interfaces/patient";
import { RelationshipService } from "@/services/relationship_service";
import Layout from "../Components/Layout.vue";
import VisitsSummary from "../Components/tables/VisitsSummary.vue";
import InformationHeader from "@/apps/EMC/Components/InformationHeader.vue";
import { PatientObservationService } from "@/services/patient_observation_service";
import { modalController } from "@ionic/vue";
import PatientDemographics from "../Components/modals/PatientDemographics.vue";
import { isEmpty } from "lodash";
import GuardianDemographicsVue from "../Components/modals/GuardianDemographics.vue";

export default defineComponent({
  components: {
    Layout,
    VisitsSummary,
    InformationHeader,
  },
  data: () => ({
    patientId: 0 as any,
    patient: {} as any,
    guardians: "",
    startDate: '',
    isReady: false as boolean,
  }),
  watch: {
    $route: {
      async handler({ params }: any) {
        if (!params) return;

        this.patientId = parseInt(params.patientId);

        if (this.patientId) this.init();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async init() {
      this.patient = await this.fetchPatient(this.patientId);
      await this.setARTStartDate()
      this.guardians = await this.getGuardian();
      this.isReady = true;
    },
    async setARTStartDate() {
      const date = await this.patient.getARTStartDate();
      this.startDate = date ? HisDate.toStandardHisDisplayFormat(date) : "N/A";
    },

    async getGuardian() {
      const relationship = await RelationshipService.getGuardianDetails(
        this.patientId
      );
      return relationship
        .map((r: any) => {
          return ` ${r.name} (${r.relationshipType})`;
        })
        .join(" ");
    },
    async showModal(component: any, componentProps?: Record<string, any>, cssClass = 'custom-modal', backdropDismiss = true) {
      const modal = await modalController.create({
        component,
        cssClass,
        backdropDismiss,
        componentProps,
      });
      modal.present();
      const { data } = await modal.onWillDismiss();
      if(data) return data;
    },
    async updateDemographics(attribute: string) {
      const data = await this.showModal(PatientDemographics, {
        patientService: this.patient,
        attribute,
      });
      if(!isEmpty(data)) {
        this.patient = await this.fetchPatient(this.patientId);
      }
    },
    async addGuardian() {
      const data = await this.showModal(GuardianDemographicsVue, {
        patientId: this.patientId
      })
      this.patient = await this.fetchPatient(this.patientId);
    },
    updateARVNumber() {
      this.$router.push({name: "Edit ARV Number"})
    },

    async fetchPatient(patientId: number | string) {
      const patient: Patient = await PatientObservationService.findByID(patientId);
      return patient ? new PatientObservationService(patient) : {};
    },
  },
});
</script>