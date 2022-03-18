<template>
  <ion-page>
    <his-standard-form 
      :cancelDestinationPath="cancelDestination" 
      :fields="fields" 
      :onFinishAction="onSubmit"
      :skipSummary="true"
    />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HisStandardForm from "@/components/Forms/TouchScreenForm.vue";
import EncounterMixinVue from '@/views/EncounterMixin.vue';
import { PatientComplaintsService } from "@/apps/OPD/services/patient_complaints_service";
import LabOrderModal from "@/components/DataViews/LabOrderModal.vue"
import Validation from '@/components/Forms/validations/StandardValidations';
import { Field, Option } from '@/components/Forms/FieldInterface';
import { FieldType } from '@/components/Forms/BaseFormElements';
import { modalController, IonPage } from '@ionic/vue';
import { ObservationService } from "@/services/observation_service"
import { EncounterService } from '@/services/encounter_service'

export default defineComponent({
  components: { HisStandardForm, IonPage },
  mixins: [EncounterMixinVue],
  data: () => ({
    complaintsService: {} as any,
    todaysDate: ObservationService.getSessionDate(),
    presentingComplaints: "" as any,
    triageComplaintStatus: false
  }),
  watch: {
    ready: {
      async handler(isReady: boolean) {
        if(isReady){
          this.complaintsService = new PatientComplaintsService(this.patientID, this.providerID)
          this.fields = this.getFields()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async onSubmit(_: any, computedData: any){     
      const data = await Promise.all(computedData.complaints)   
      await this.complaintsService.createEncounter()    
      await this.complaintsService.saveObservationList(data)
      this.nextTask()        
    },
    async launchOrderSelection() {
      const modal = await modalController.create({
        component: LabOrderModal,
        backdropDismiss: false,
        cssClass: 'large-modal'
      })
      modal.present()
      await modal.onDidDismiss()
    },
    async fetchLatestTriageEncounter() {
      await ObservationService.getObs({
          'concept_id': '10539',
          'start_date': this.todaysDate,
          'end_date': this.todaysDate,
          'person_id': this.patientID,
      }).then(async (data: any) => {
          await this.getTriagePresentingComplaints(data)
        }
      );
      if(this.presentingComplaints.length > 0){
        this.triageComplaintStatus = true;
        return true;
      }
    },
    async getTriagePresentingComplaints(data: any){
      if(data.length > 0){
        const encounters = await EncounterService.getEncounters(this.patientID, this.todaysDate)
        const date = this.todaysDate

        const todayPresentingComplaints = encounters.filter(function (el: any){
          return el.type.name == "TRIAGE PRESENTING COMPLAINTS" &&
          new Date(el.encounter_datetime).toISOString().slice(0, 10) == date 
        });
        
        this.presentingComplaints =   todayPresentingComplaints[0].observations;
      }
    },
    buildResults() {
      const columns = [ 'Group','Presenting complaints'];
      let group = "";
      let rows =this.presentingComplaints.map((item: any) =>{
        if(item.obs_group_id != null)
          return [group,item.value_text]

        group = item.value_text;
      });
      rows = rows.filter((el: any) =>{
        return el != undefined
      })
      this.presentingComplaints = rows;
      return [
        {
          label: '',
          value: '',
          other: { columns, rows},
        },
      ];
    },

    getFields(): Array<Field>{
      return [
        {
          id: "triage_complaints",
          helpText: "Triage Presenting Complaint",
          condition: () => this.fetchLatestTriageEncounter(),
          type: FieldType.TT_TABLE_VIEWER,
          options: (d: any) => this.buildResults(),
          config: {
            hiddenFooterBtns: ["Clear"],
          },
        },
        {
          id: 'complaints',
          helpText: 'Presenting Complaints',
          type: FieldType.TT_COMPLAINTS_PICKER,
          validation: (data: any) => Validation.required(data),
          computedValue: (options: Option[]) => {
            return options.map(async (option)=> ({
              ...(await this.complaintsService.buildValueCoded('Presenting complaint', option.other.parent)),
              child: (await this.complaintsService.buildValueCodedFromConceptId(option.other.parent, option.other.concept_id))
            }))
          },
          beforeNext: (data: any) => {
            if(this.triageComplaintStatus){
              const OPDComplaint = data.map((value: any)=>{
                return {
                  'label': "OPD Presenting Complaints",
                  'value': value.label,
                };
              })
              const triageComplaint = this.presentingComplaints.map((value: any)=>{
                return {
                  'label': 'Triage Presenting Complaint',
                  'value': value[1],
                };
              })
              this.presentingComplaints = OPDComplaint.concat(triageComplaint);
            }
            
            return true
          },
          config: {
            footerBtns: [
              {
                name: "Lab Order",
                size: "large",
                slot: "end",
                color: "primary",
                visible: true,
                onClick: async () => await this.launchOrderSelection(),
                visibleOnStateChange: (state: Record<string, any>) => {
                  return state.index === 1;
                },
              },
            ],
          }
        },
        {
          id: "all_presenting_complaints",
          helpText: "Summary",
          condition: () => this.triageComplaintStatus,
          type: FieldType.TT_SUMMARY,
          options: (d: any) => this.presentingComplaints,
          config: {
            hiddenFooterBtns: ["Clear"],
          },
        },
      ]
    }
  }
})
</script>
<style>
  .his-table tr {
    height: 50px;
  }
</style>
