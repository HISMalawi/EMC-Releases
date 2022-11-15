<template>
<layout>
  <ion-grid class="ion-no-margin ion-no-padding" v-if="isReady">
    <ion-row>
      <ion-col size="12">
        <information-header
          v-if="patient"
          :patient="patient"
          :guardians="guardians"
          :artStartDate="artStartDate"
          @updateARVNumber="updateARVNumber"
          @addGuardian="addGuardian"
          @updatePatient="updateDemographics"
        />
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <visits-summary
          v-if="patient"
          :patient="patient"
          :startDate="artStartDate"
        />
      </ion-col>
    </ion-row>
  </ion-grid>
</layout>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import HisDate from "@/utils/Date";
import { Patient } from "@/interfaces/patient";
import { RelationshipService } from "@/services/relationship_service";
import Layout from "../Components/Layout.vue";
import VisitsSummary from "../Components/tables/VisitsSummary.vue";
import InformationHeader from "@/apps/EMC/Components/InformationHeader.vue";
import { PatientObservationService } from "@/services/patient_observation_service";
import PatientDemographics from "../Components/modals/PatientDemographics.vue";
import GuardianDemographicsVue from "../Components/modals/GuardianDemographics.vue";
import ARVNumberVue from "../Components/modals/ArvNumber.vue";
import { useRoute } from "vue-router";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../interfaces/emc_event";
import { modal } from "@/utils/modal";
import { isEmpty } from "lodash";

export default defineComponent({
  components: {
    Layout,
    VisitsSummary,
    InformationHeader,
  },
  setup () {
    const route = useRoute();
    const patientId = parseInt(route.params.patientId.toString()) || 0;
    const patient = ref<PatientObservationService>();
    const artStartDate = ref<string>("");
    const guardians = ref<string>("");
    const isReady = computed(() => !isEmpty(patient.value))

    const setPatient = async () => {
      if (patientId) {
        const patientData: Patient = await PatientObservationService.findByID(patientId);
        if(patientData) {
          patient.value = new PatientObservationService(patientData);
        }
      }
    };

    const setPatientGuardian = async () => {
      const relationship = await RelationshipService.getGuardianDetails(patientId);
      guardians.value = relationship.map((r: any) => ` ${r.name} (${r.relationshipType})`).join(", ");
    }

    const updateDemographics = async (attribute: string) => {
      await modal.show(PatientDemographics, {
        patientService: patient.value,
        attribute,
      });
    }

    const addGuardian = async () => {
      await modal.show(GuardianDemographicsVue, {
        patientId,
      });
    }

    const updateARVNumber = async () => {
      await modal.show(ARVNumberVue, {
        patient: patient.value,
      });
    }

    EventBus.on(EmcEvents.RELOAD_PATIENT_DATA,async () => {
      await setPatient();
    });
    EventBus.on(EmcEvents.RELOAD_GUARDIAN_DATA, async () => {
      await setPatientGuardian();
    });

    onMounted(async () => {
      await setPatient();
      const date = await patient.value?.getARTStartDate();
      artStartDate.value = date ? HisDate.toStandardHisDisplayFormat(date) : "N/A";
      await setPatientGuardian();
    });

    return {
      patient,
      artStartDate,
      guardians,
      isReady,
      updateDemographics,
      addGuardian,
      updateARVNumber,
    };
  },
});
</script>