

<template>
  <his-standard-form
    :fields="fields"
    :onFinishAction="onFinish"
    :skipSummary="false"
    :cancelDestinationPath="cancelDestination"
  >
  </his-standard-form>
</template> 
<script lang="ts">
import { defineComponent } from "vue";
import { FieldType } from "@/components/Forms/BaseFormElements";
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import Validation from "@/components/Forms/validations/StandardValidations";
import EncounterMixinVue from "../../../../views/EncounterMixin.vue";
import { TreatmentService } from "@/apps/CxCa/services/CxCaTreatmentService";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { ProgramService } from "@/services/program_service";
import { ProgramWorkflow } from "@/interfaces/program_workflow";
import table from "@/components/DataViews/tables/ReportDataTable";

export default defineComponent({
  mixins: [EncounterMixinVue],
  components: { HisStandardForm },
  data: () => ({
    reception: {} as any,
    summaryData: {} as any,
    referralReason: ""
  }),
  watch: {
    patient: {
      async handler() {
        this.reception = new TreatmentService(this.patientID, this.providerID);
        this.summaryData = await this.reception.getSummary();
        await this.setReason();
        this.fields = this.getFields();
      },
      deep: true,
    },
  },
  methods: {
    async setReason() {
      const reason = await this.reception.getFirstValueCoded('Referral reason');
      this.referralReason = reason ? reason : "N/A"

    },
    showSampleCollected() {
      const reasons = ['Large Lesion (>75%)','Suspect cancer', 'Further Investigation and Management'];
      return reasons.includes(this.referralReason);
    },
    async onFinish(formData: any, computed: any) {
      const encounter = await this.reception.createEncounter();

      if (!encounter) return toastWarning("Unable to create encounter");
      const programID = ProgramService.getProgramID();
      const workflows: ProgramWorkflow[] =
        await ProgramService.getProgramWorkflows(ProgramService.getProgramID());
      const flows = {} as any;
      workflows.forEach((w) => {
        w.states.forEach((f) => {
          const conceptID = f.program_workflow_state_id;
          const conceptName = f.concept.concept_names[0].name;
          flows[conceptName] = conceptID;
        });
      });
      const stateValue = formData.patient_outcome ? formData.patient_outcome.value : 'Continue follow-up';
      const state = {
        'location_id': ProgramService.getLocationName(),
        state: flows[stateValue],
        date: ProgramService.getSessionDate(),
      };
      const saveState = await ProgramService.createState(
        this.patientID,
        programID,
        state
      );
      if (!saveState) return toastWarning("Unable to update state");
      const vals: any = [];
      Object.keys(computed).forEach(element => {
        vals.push(computed[element].obs);
      });
      const data = await Promise.all([...vals]);

      const obs = await this.reception.saveObservationList(data);

      if (!obs) return toastWarning("Unable to save patient observations");
      toastSuccess("Observations and encounter created!");
      this.nextTask();
    },

    getFields(): any {
      return [
        {
          id: "screening_summary",
          helpText: "Screening Summary",
          type: FieldType.TT_DATA_TABLE,
          config: {
            rows: () => {
              return Object.keys(this.summaryData).map((k: string) => {
                return [table.td(k), table.td(this.summaryData[k])];
              });
            },
          dataTableConfig: {
            showIndex: false
          },
          },
        },
        {
          id: "figo_staging_results",
          helpText: "FIGO staging results",
          type: FieldType.TT_SELECT,
          validation: (val: any) => Validation.required(val),
          condition: () => this.referralReason.match(/suspect/gi),
          options: () =>
            this.mapOptions([
              'Cervical stage 1',
              'Cervical stage 2',
              'Cervical stage 3',
              'Cervical stage 4',
              'Not available',
            ]),
            computedValue: (value: any) => ({
            obs: this.reception.buildValueText('FIGO staging of cervical cancer', value.label)
          })
        },
        {
          id: "type_of_sample_collected",
          helpText: "Type of sample collected",
          type: FieldType.TT_SELECT,
          validation: (val: any) => Validation.required(val),
          condition:()=> this.showSampleCollected(),
          options: () =>
            this.mapOptions([
              'Punch Biopsy',
              'LLETZ sample',
              'Not available',
            ]),
          computedValue: (value: any) => ({
            obs: this.reception.buildValueText('Sample', value.label)
          })
        },
        {
          id: "histology_results",
          helpText: "Histology results",
          type: FieldType.TT_SELECT,
          validation: (val: any) => Validation.required(val),
          condition: (formdata: any) => formdata.type_of_sample_collected.value !== "Not available" && this.showSampleCollected(), 
          options: () =>
            this.mapOptions([
              'Normal',
              'CIN 1',
              'CIN 2',
              'CIN 3',
              'Carcinoma in Situ',
              'Invasive cancer of cervix',
              'Benign cervical warts',
              'Not available',
            ]),
            computedValue: (value: any) => ({
            obs: this.reception.buildValueText('Sample', value.label)
          })
        },
        {
          id: "complications",
          helpText: "Complications",
          type: FieldType.TT_SELECT,
          validation: (val: any) => Validation.required(val),
          condition: (formdata: any) => formdata.type_of_sample_collected.value !== "Not available" && this.showSampleCollected(), 
          options: () =>
            this.mapOptions([
              'Bleeding',
              'Pain',
              'None',
            ]),
            computedValue: (value: any) => ({
            obs: this.reception.buildValueText('Complications', value.label)
          })

        },
        {
          id: "referral_outcome",
          helpText: "Treatment performed",
          type: FieldType.TT_SELECT,
          validation: (val: any) => Validation.required(val),
          options: () =>
            this.mapOptions([
              'Cryotherapy',
              'Leep',
              'LLETZ',
              'Conisation',
              'Thermocoagulation',
              'Chronic cervicitis',
              'Patient refused',
            ]),
          computedValue: (value: any) => ({
            obs: this.reception.buildValueText('Treatment', value.label)
          })
        },
        {
          id: "recommended_plan_of_care",
          helpText: "Recommended plan of care",
          type: FieldType.TT_SELECT,
          validation: (val: any) => Validation.required(val),
          condition: () => this.summaryData['Treatment Type'] !== "Same day treatment",
          options: () =>
            this.mapOptions([
              'Hysterectomy',
              'Trachelectomy',
              'Discharged',
              'Continue follow-up',
            ]),
            computedValue: (value: any) => ({
            obs: this.reception.buildValueText('Recommended Plan of care', value.label)
          })
        },{
          id: "patient_outcome",
          helpText: "Patient outcome",
          type: FieldType.TT_SELECT,
          condition: () => this.summaryData['Treatment Type'] !== "Same day treatment",
          validation: (val: any) => Validation.required(val),
          options: () =>
            this.mapOptions([
              'Continue follow-up',
              'Pallialative care',
              'No Dysplasia/Cancer',
              'Patient died',
            ]),
        },
      ];
    },
  },
});
</script>