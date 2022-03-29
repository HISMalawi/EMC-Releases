<template>
  <his-standard-form
    :fields="fields"
    :onFinishAction="onFinish"
    :skipSummary="true"
    :cancelDestinationPath="cancelDestination"
  >
  </his-standard-form>
</template> 
<script lang="ts">
import { defineComponent } from "vue";
import { Field, Option } from "@/components/Forms/FieldInterface"
import { FieldType } from "@/components/Forms/BaseFormElements";
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import Validation from "@/components/Forms/validations/StandardValidations";
import { toastWarning, toastSuccess } from "@/utils/Alerts"
import EncounterMixinVue from '../../../../views/EncounterMixin.vue'
import HisApp from "@/apps/app_lib"
import { isEmpty } from "lodash";
import { Patientservice } from "@/services/patient_service";
import { IdentifierService } from "@/services/identifier_service";

export default defineComponent({
  mixins: [EncounterMixinVue],
  components: { HisStandardForm },
  data: () => ({
    currentArvNumber: "" as any,
    prependValue: "" as any,
  }),
  watch: {
    ready: {
      async handler(ready: any) {
        if (!ready) return
        const arvNumber = this.patient.getArvNumber()
        if(arvNumber !== "Unknown") {
          const a = arvNumber.split('-')
          this.currentArvNumber = a[2].replace(/^\D+|\s/g, "")
          this.prependValue = `${a[0]}-${a[1]}-`
        }
        this.fields = this.getFields();
      },
      immediate: true
    },
  },
  methods: {
    async onFinish(formData: any) {
      const newArvNumber = formData['arv_number'].value
      if(newArvNumber === this.patient.getArvNumber()) return this.$router.back()
      const exists = await IdentifierService.arvNumberExists(newArvNumber)
      if(exists) toastWarning("ARV number already exists", 5000)
      else {
        try {
          await this.patient.updateARVNumber(newArvNumber)
          this.$router.back()
        } catch (error) {
          toastWarning(error)
        }
      }     
    },
    getFields(): Array<Field> {
      return [
        {
          id: "arv_number",
          helpText: "Update ARV Number",
          type: FieldType.TT_TEXT,
          computedValue: ({ value }: Option) => {
            return value
          },
          validation: (val: any) => Validation.required(val),
          defaultValue: () => this.currentArvNumber,
          config: {
            initialKb: '0-9',
            prependValue: () => {
              if(this.prependValue) return this.prependValue
              const artApp = HisApp.getActiveApp()
              if (artApp && artApp.programPatientIdentifiers) {
                const arvType = artApp.programPatientIdentifiers['ARV Number']
                return arvType.prefix()
              }
              return ''
            }
          }
        }
      ]
    }
  }
});
</script>
