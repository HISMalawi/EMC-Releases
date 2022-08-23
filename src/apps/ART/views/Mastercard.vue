<template>
  <ion-page style="background: #fff">
    <information-header
      :items="patientCardInfo"
      :numberOfColumns="4"
      @addGuardian="addGuardian"
      @update="updateDemographics"
      @updateARVNumber="updateARVNumber"
    ></information-header>
    <ion-content>
      <visit-information
        :getVisitDates="getPatientVisitDates"
        @onPrint="printLabel"
        style="font-size: 11px"
      ></visit-information>
    </ion-content>
    <his-footer :btns="btns" />
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HisDate from "@/utils/Date";
import { Encounter } from "@/interfaces/encounter";
import { Option } from "@/components/Forms/FieldInterface";
import { Patient } from "@/interfaces/patient";
import { Patientservice } from "@/services/patient_service";
import { ObservationService } from "@/services/observation_service";
import InformationHeader from "@/components/InformationHeader.vue";
import VisitInformation from "@/components/VisitInformation.vue";
import MastercardDetails from "@/components/MastercardDetails.vue";
import HisFooter from "@/components/HisDynamicNavFooter.vue";
import { isArray, isEmpty } from "lodash";
import { IonPage, IonContent, modalController } from "@ionic/vue";
import { EncounterService } from "@/services/encounter_service";
import { RelationshipService } from "@/services/relationship_service";
import { alertConfirmation } from "@/utils/Alerts";
import { ProgramService } from "@/services/program_service";
import { PatientPrintoutService } from "@/services/patient_printout_service";
import { NavBtnInterface } from "@/components/HisDynamicNavFooterInterface";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    VisitInformation,
    InformationHeader,
    HisFooter,
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
    btns: [] as Array<NavBtnInterface>,
    guardians: "",
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

        this.patientId = parseInt(params.patient_id);

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
      this.guardians = await this.getGuardian();
      this.patientCardInfo = await this.getPatientCardInfo(this.patient);
      this.btns.push(this.getFinishBtn());
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
    getFinishBtn(): NavBtnInterface {
      return {
        name: "Finish",
        color: "success",
        size: "large",
        slot: "end",
        visible: true,
        onClick: async () => {
          const confirmation = await alertConfirmation(
            "Are you sure you want to exit?"
          );
          if (confirmation)
            return this.$router.push(`/patient/dashboard/${this.patientId}`);
        },
      };
    },
    async fetchPatient(patientId: number | string) {
      const patient: Patient = await Patientservice.findByID(patientId);
      return patient ? new Patientservice(patient) : {};
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
      const programInfo = await ProgramService.getCurrentProgramInformation(
        this.patientId, date
      );
      const drugInformation = await ProgramService.getMastercardDrugInformation(
        this.patientId, date
      );
      return { ...programInfo, drugs: drugInformation };
    },
    onActiveVisitDate(data: Option) {
      this.activeVisitDate = data.value;
    },

    async getPatientCardInfo(patient: Patientservice) {
      const { toStandardHisDisplayFormat } = HisDate;
      let dateOfTest = await ObservationService.getAll(
        this.patientId,
        "Confirmatory HIV test date"
      );
      if (dateOfTest) {
        dateOfTest = toStandardHisDisplayFormat(dateOfTest[0].value_datetime);
      }
      const placeOfTest = await ObservationService.getFirstValueText(
        this.patientId,
        "Confirmatory HIV test location"
      );

      let startDate = await ObservationService.getAll(
        this.patientId,
        "Date ART started"
      );

      startDate = !isEmpty(startDate)
        ? toStandardHisDisplayFormat(startDate[0].value_datetime)
        : "N/A";

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
        { label: "Landmark", value: patient.getAttribute(19) },
        {
          label: "Guardian",
          value: this.guardians ? this.guardians : "add",
          other: {
            editable: !this.guardians,
            attribute: "",
            category: "guardian",
          },
        },
        { label: "Init W(KG)", value: await patient.getInitialWeight() },
        { label: "Init H(CM)", value: await patient.getInitialHeight() },
        { label: "BMI(CM)", value: await patient.getInitialBMI() },
        { label: "TI", value: TI },
        { label: "Agrees to follow up", value: agreesToFollowUp },
        { label: "Reason for starting ART", value: reasonForStarting },
        { label: "HIV test date", value: `${dateOfTest ? dateOfTest : ""}` },
        { label: "HIV test place", value: `${placeOfTest ? placeOfTest : ""}` },
        { label: "Date of starting first line ART", value: startDate },
        ...(await this.getTBStats()),
      ] as Option[];
    },

    async getTBStats(): Promise<Option[]> {
      const stats: any[] | undefined = await ObservationService.getAllValueCoded(
        this.patientId,
        "Who stages criteria present"
      );
      const exists = (v: string) => !Array.isArray(stats) ? 'N/A' : stats.includes(v) ? 'Yes' : 'No'
      return [
        {
          label: "Pulmonary TB within the last 2 years",
          value: exists('Tuberculosis (PTB or EPTB) within the last 2 years'),
        },
        {
          label: "Extra pulmonary TB (EPTB)",
          value: exists('Extrapulmonary tuberculosis (EPTB)'),
        },
        {
          label: "Pulmonary TB (current)",
          value: exists('Pulmonary tuberculosis (current)'),
        },
        {
          label: "Kaposis sarcoma",
          value: exists('Kaposis sarcoma')
        },
      ];
    },

    async openModal(items: any, title: string, component: any) {
      const date = HisDate.toStandardHisDisplayFormat(
        this.activeVisitDate.toString()
      );
      const modal = await modalController.create({
        component: component,
        backdropDismiss: false,
        cssClass: "custom-modal",
        componentProps: {
          items,
          title: `${title}: ${date}`,
          taskParams: {
            patient: this.patient.getObj(),
            program: this.patientProgram,
            visitDate: this.activeVisitDate,
            patientID: this.patientId,
          },
        },
      });
      modal.present();
    },
    printLabel(date: any) {
      new PatientPrintoutService(this.patientId).printVisitSummaryLbl(date);
    }
  }
});
</script>