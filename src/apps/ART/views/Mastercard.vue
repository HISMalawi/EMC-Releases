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
import { Patientservice } from "@/services/patient_service";
import { ObservationService } from "@/services/observation_service";
import InformationHeader from "@/components/InformationHeader.vue";
import VisitInformation from "@/components/VisitInformation.vue";
import HisFooter from "@/components/HisDynamicNavFooter.vue";
import { isEmpty } from "lodash";
import { IonPage, IonContent, modalController } from "@ionic/vue";
import { EncounterService } from "@/services/encounter_service";
import { RelationshipService } from "@/services/relationship_service";
import { alertConfirmation, toastDanger } from "@/utils/Alerts";
import { ProgramService } from "@/services/program_service";
import { PatientPrintoutService } from "@/services/patient_printout_service";
import { NavBtnInterface } from "@/components/HisDynamicNavFooterInterface";
import Store from "@/composables/ApiStore"

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    VisitInformation,
    InformationHeader,
    HisFooter,
  },
  data: () => ({
    patientId: 0 as any,
    patient: {} as any,
    patientProgram: {} as Array<Option>,
    patientCardInfo: [] as any,
    encounters: [] as Array<Encounter>,
    visitDates: [] as Array<Option> as any,
    btns: [] as Array<NavBtnInterface>,
    tbStats: [] as Array<any>,
    guardians: "",
  }),
  created() {
    this.patientId = parseInt(`${this.$route.params.patient_id}`)
    if (this.patientId) {
      this.setPatientCards()
    }
    this.btns.push(this.getFinishBtn())
  },
  async mounted() {
    for(const item of this.patientCardInfo) {
      if (typeof item.init === 'function') {
        await item.init()
      }
      if (typeof item.asyncValue === 'function') {
        item.asyncValue().then((value: any) => item.value = value || '')
      } else if (typeof item.staticValue === 'function') {
        item.value = item.staticValue()
      } 
    }
  },
  methods: {
    setPatientCards() {
      this.patientCardInfo = [
        { 
          label: "ARV Number", 
          value: '...',
          staticValue: () => this.patient.getArvNumber(),
          init: async () => {
            this.patient = await Store.get('ACTIVE_PATIENT', { patientID: this.patientId })
          },
          other: {
            editable: true,
            category: "arv_number"
          }
        },
        { 
          label: "National Patient ID", 
          value: '...',
          staticValue: () => this.patient.getNationalID() 
        },
        {
          label: "Given Name",
          value: '...',
          staticValue: () => this.patient.getGivenName(),
          other: {
            editable: true,
            attribute: "given_name",
            category: "demographics",
          }
        },
        {
          label: "Family Name",
          value: '...',
          staticValue: () => this.patient.getFamilyName(),
          other: {
            editable: true,
            attribute: "family_name",
            category: "demographics",
          },
        },
        {
          label: "Age",
          value: '...',
          staticValue: () => this.patient.getAge(),
          other: {
            editable: true,
            attribute: "year_birth_date",
            category: "demographics",
          }
        },
        {
          label: "Sex",
          value: '...',
          staticValue: () => this.patient.getGender(),
          other: {
            editable: true,
            attribute: "gender",
            category: "demographics",
          }
        },
        {
          label: "Location",
          value: '...',
          staticValue: () => this.patient.getCurrentVillage(),
          other: {
            editable: true,
            attribute: "home_region",
            category: "demographics",
          }
        },
        { 
          label: "Landmark",
          value: '...', 
          staticValue: () => this.patient.getAttribute(19) 
        },
        {
          label: "Guardian",
          value: '...',
          asyncValue: async () => {
            const relationship = await RelationshipService.getGuardianDetails(this.patientId)
            return relationship 
              ? relationship.map((r: any) => ` ${r.name} (${r.relationshipType})`).join(" ")
              : 'add'
          }
        },
        { 
          label: "Init W(KG)", 
          value: '...',
          asyncValue: () => this.patient.getInitialWeight() 
        },
        { 
          label: "Init H(CM)", 
          value: '...',
          asyncValue: () => this.patient.getInitialHeight() 
        },
        { 
          label: "BMI(CM)", 
          value: '...',
          asyncValue: () => this.patient.getInitialBMI() 
        },
        { 
          label: "TI", 
          value:  '...',
          asyncValue: () => ObservationService.getFirstValueCoded(
            this.patientId, "Ever received ART"
          )
        },
        { 
          label: "Agrees to follow up", 
          value: '...',
          asyncValue: () => ObservationService.getFirstValueCoded(
            this.patientId, "Agrees to followup"
          ) 
        },
        { 
          label: "Reason for starting ART", 
          value: '...',
          asyncValue: () => ObservationService.getFirstValueCoded(
            this.patientId, "Reason for ART eligibility"
          )
        },
        { 
          label: "HIV test date", 
          value: '...',
          asyncValue: async () => {
            const date = await ObservationService.getFirstValueDatetime(
              this.patientId, 'Confirmatory HIV test date'
            )
            return date ? HisDate.toStandardHisDisplayFormat(date) : ''
          }
        },
        { 
          label: "HIV test place", 
          value: "...",
          asyncValue: () => ObservationService.getFirstValueText(
            this.patientId,
            "Confirmatory HIV test location"
          )
        },
        { 
          label: "Date of starting first line ART", 
          value: '...',
          asyncValue: async () => {
            const date = await ObservationService.getFirstValueDatetime(
              this.patientId, 'Date ART started'
            )
            return date ? HisDate.toStandardHisDisplayFormat(date) : ''
          }
        },
        {
          label: "Pulmonary TB within the last 2 years",
          value: '...',
          init: async () => {
            this.tbStats = (await ObservationService.getAllValueCoded(
              this.patientId, "Who stages criteria present"
            )) || []
          },
          staticValue: () => this.hasTbStat('Tuberculosis (PTB or EPTB) within the last 2 years')
        },
        {
          label: "Extra pulmonary TB (EPTB)",
          value:'...',
          staticValue: () => this.hasTbStat('Extrapulmonary tuberculosis (EPTB)')
        },
        {
          label: "Pulmonary TB (current)",
          value: '-',
          staticValue: () => this.hasTbStat('Pulmonary tuberculosis (current)')
        },
        {
          label: "Kaposis sarcoma",
          value: '...',
          staticValue: () => this.hasTbStat('Kaposis sarcoma')
        }
      ]
    },
    hasTbStat(conceptName: string) {
      return this.tbStats.includes(conceptName) ? 'Yes' : 'No'
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
    printLabel(date: any) {
      new PatientPrintoutService(this.patientId).printVisitSummaryLbl(date);
    }
  }
});
</script>