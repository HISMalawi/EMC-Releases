<template>
<layout>
  <ion-grid class="ion-no-margin ion-no-padding">
    <ion-row>
      <ion-col size="12">
        <information-header
          v-if="isReady"
          :patient="patient"
          :guardians="guardians"
          :artStartDate="StartDate"
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
          :patientId="patientId"
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
import { Encounter } from "@/interfaces/encounter";
import { Option } from "@/components/Forms/FieldInterface";
import { Patient } from "@/interfaces/patient";
import { Patientservice } from "@/services/patient_service";
import { ObservationService } from "@/services/observation_service";
import { isEmpty } from "lodash";
import { EncounterService } from "@/services/encounter_service";
import { RelationshipService } from "@/services/relationship_service";
import { alertConfirmation } from "@/utils/Alerts";
import { ProgramService } from "@/services/program_service";
import { NavBtnInterface } from "@/components/HisDynamicNavFooterInterface";
import Layout from "../Components/Layout.vue";
import VisitsSummary from "../Components/tables/VisitsSummary.vue";
import { DrugOrderService } from "@/services/drug_order_service";
import InformationHeader from "@/apps/EMC/Components/InformationHeader.vue";
import { PatientObservationService } from "@/services/patient_observation_service";

export default defineComponent({
  components: {
    Layout,
    VisitsSummary,
    InformationHeader,
  },
  data: () => ({
    isBDE: false as boolean,
    currentDate: "",
    sessionDate: "",
    nextTask: {} as any,
    patientId: 0 as any,
    programID: 0,
    patient: {} as any,
    patientProgram: {} as Array<Option>,
    patientCardInfo: [] as any,
    programCardInfo: [] as Array<Option> | [],
    encounters: [] as Array<Encounter>,
    medications: [] as any,
    labOrders: [] as any,
    visitDates: [] as Array<Option> as any,
    activeVisitDate: "" as string | number,
    encountersCardItems: [] as Array<Option>,
    medicationCardItems: [] as Array<Option>,
    labOrderCardItems: [] as Array<Option>,
    alertCardItems: [] as Array<Option>,
    guardians: "",
    startDate: '',
    isReady: false as boolean,
  }),
  computed: {
    visitDatesTitle(): string {
      return `${this.visitDates.length} Visits`;
    },
  },
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
    async activeVisitDate(date: string) {
      this.encounters = await EncounterService.getEncounters(this.patientId, {
        date,
      });
    },
  },
  methods: {
    async init() {
      this.patient = await this.fetchPatient(this.patientId);
      this.setARTStartDate()
      this.guardians = await this.getGuardian();
      this.patientCardInfo = await this.getPatientCardInfo(this.patient);
      this.isReady = true;
    },
    async setARTStartDate() {
      let date = await ObservationService.getFirstValueDatetime(this.patientId, "Date ART started")

      if (date === undefined) {
        date = await ObservationService.getFirstValueText(this.patientId, "Date ART started")
      }

      if (date === undefined) {
        const orders = await DrugOrderService.getAllDrugOrders(this.patientId, 100000);
        if(!isEmpty(orders)){
          date = orders[0].order['start_date']
        }
      }
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
    updateDemographics(attribute: string) {
      this.$router.push({
        path: "/patient/registration",
        query: {
          'edit_person': this.patientId,
          'person_attribute': attribute,
        },
      });
    },
    addGuardian() {
      this.$router.push({
        path: `/guardian/registration/${this.patientId}`,
        query: {
          source: this.$route.name?.toString(),
        },
      });
    },
    updateARVNumber() {
      this.$router.push({name: "Edit ARV Number"})
    },
    async fetchPatient(patientId: number | string) {
      const patient: Patient = await Patientservice.findByID(patientId);
      return patient ? new PatientObservationService(patient) : {};
    },
    getProp(data: any, prop: string): string {
      return prop in data ? data[prop]() : "-";
    },
    async getPatientVisitDates() {
      const dates = await Patientservice.getPatientVisits(this.patientId, true);
      const f = dates.map(async (date: string) => {
        const d = await this.getExtras(date);
        return {
          label: HisDate.toStandardHisDisplayFormat(date),
          value: date,
          data: d,
        };
      });
      const y = await Promise.all(f);
      return y;
    },
    async getExtras(date: any) {
      return await ProgramService.getCurrentProgramInformation(
        this.patientId,
        date
      );
    },
    onActiveVisitDate(data: Option) {
      this.activeVisitDate = data.value;
    },

    async getHIVTestDate() {
      let date = await ObservationService.getFirstValueDatetime(this.patientId, "Confirmatory HIV test date")
      if(date === undefined){
        date = await ObservationService.getFirstValueText(this.patientId, "Confirmatory HIV test date")
      }
      return date ? HisDate.toStandardHisDisplayFormat(date) : "N/A";
    },

    async getPatientCardInfo(patient: PatientObservationService) {
      const placeOfTest = await ObservationService.getFirstValueText(
        this.patientId,
        "Confirmatory HIV test location"
      );

      const TI = await ObservationService.getFirstValueCoded(
        this.patientId,
        "Ever received ART"
      );
      const agreesToFollowUp = await ObservationService.getFirstValueCoded(
        this.patientId,
        "Agrees to followup"
      );
      const reasonForStarting = await ObservationService.getFirstValueCoded(
        this.patientId,
        "Reason for ART eligibility"
      );

      const Breastfeeding = await ObservationService.getLastValueText(
        this.patientId,
        "Is patient breast feeding"
      );

      return [
        { 
          label: "ARV Number", 
          value: this.patient.getArvNumber(),
          other: {
            editable: true,
            category: "arv_number"
          }
        },
        { label: "National Patient ID", value: patient.getNationalID() },
        {
          label: "Given Name",
          value: patient.getGivenName(),
          other: {
            editable: true,
            attribute: "given_name",
            category: "demographics",
          },
        },
        {
          label: "Family Name",
          value: patient.getFamilyName(),
          other: {
            editable: true,
            attribute: "family_name",
            category: "demographics",
          },
        },
        {
          label: "Age",
          value: patient.getAge(),
          other: {
            editable: true,
            attribute: "year_birth_date",
            category: "demographics",
          },
        },
        {
          label: "Sex",
          value: patient.getGender(),
          other: {
            editable: true,
            attribute: "gender",
            category: "demographics",
          },
        },
        {
          label: "Location",
          value: patient.getCurrentVillage(),
          other: {
            editable: true,
            attribute: "home_region",
            category: "demographics",
          },
        },
        { label: "Landmark", value: patient.getClosestLandmark() },
        { label: "Phone Number", value: patient.getPhoneNumber() },
        {
          label: "Guardian",
          value: this.guardians ? this.guardians : "add",
          other: {
            editable: !this.guardians,
            attribute: "",
            category: "guardian",
          },
        },
        { label: "Initial Weight (KG)", value: await patient.getInitialWeight() },
        { label: "Initial Height (CM)", value: await patient.getInitialHeight() },
        { label: "BMI", value: await patient.getInitialBMI() },
        { label: "Pregnant at Initiation", value: "No" },
        { label: "Breastfeeding at Initiation", value: Breastfeeding },
        { label: "TI", value: TI },
        { label: "Agrees to follow up", value: agreesToFollowUp },
        { label: "Reason for starting ART", value: reasonForStarting },
        { label: "HIV test date", value: await this.getHIVTestDate() },
        { label: "HIV test place", value: `${placeOfTest ? placeOfTest : ""}` },
        { label: "Date of starting first line ART", value: this.startDate },
        { label: "Staging codition", value: this.startDate },
        ...(await this.getTBStats()),
      ] as Option[];
    },

    async getTBStats(): Promise<Option[]> {
      const stats = await ObservationService.getFirstValueCoded(
        this.patientId,
        "Who stages criteria present"
      );
      return [
        {
          label: "Pulmonary TB within the last 2 years",
          value: stats && stats.match(/last/i) ? "Yes" : "N/A",
        },
        {
          label: "Extra pulmonary TB (EPTB)",
          value: stats && stats.match(/eptb/i) ? "Yes" : "N/A",
        },
        {
          label: "Pulmonary TB (current)",
          value: stats && stats.match(/current/i) ? "Yes" : "N/A",
        },
        {
          label: "Kaposi's sarcoma",
          value: stats && stats.match(/kepos/i) ? "Yes" : "N/A",
        },
      ];
    },
  },
});
</script>

<style scoped>
ion-list {
  height: 100%;
}
</style>