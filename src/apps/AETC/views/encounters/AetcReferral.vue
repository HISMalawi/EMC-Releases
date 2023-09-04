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
  import { Service } from "@/services/service";
  import { ConceptService } from "@/services/concept_service";

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
  });
  </script>