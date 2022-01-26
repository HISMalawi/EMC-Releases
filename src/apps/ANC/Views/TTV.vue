<template>
  <ion-page> 
    <his-standard-form 
      :fields="formFields"
      :skipSummary="true"
      :onFinishAction="onFinish"
    />
  </ion-page>
</template>

<script lang="ts">
import EncounterMixinVue from '@/views/EncounterMixin.vue'
import { FieldType } from "@/components/Forms/BaseFormElements"
import { defineComponent } from 'vue'
import { AncDispensationService} from "@/apps/ANC/Services/anc_dispensing_service"
import { AncTreatmentService } from "@/apps/ANC/Services/anc_treatment_service"
import { Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import { IonPage } from "@ionic/vue"

export default defineComponent({
  components: { IonPage },
  mixins: [EncounterMixinVue],
  data: () => ({
    formFields: [] as any,
    service: {} as any
  }),
  watch: {
    ready: {
      handler(ready: boolean) {
        if (ready) {
          this.formFields = this.getFields()
        }
      },
      immediate: true
    }
  },
  methods: {
    async onFinish(f: any) {
      if (f.prescription.value.match(/true/i)) {
        await this.updateTreatment()
      } else {
        await this.updateDispensation()
      }
      this.nextTask()
    },
    async updateDispensation() {
      const service = new AncDispensationService(this.patientID, this.providerID)
      await service.createEncounter()
      await service.saveNoDispensationObs() 
    },
    async updateTreatment() {
      const service = new AncTreatmentService(this.patientID, this.providerID)
      await service.createEncounter()
      await service.updateTTvOrder()
    },
    getFields() {
      return [
        {
          id: 'prescription',
          helpText: 'Prescription',
          type: FieldType.TT_YES_NO,
          validation: (v: Option) => Validation.required(v),
          options: () => ([
            {
              label: 'TTV has been given today',
              values: [
                {
                  label: "yes",
                  value: "true"
                },
                {
                  label: "no",
                  value: "false"
                }
              ]
            }
          ])
        }
      ]
    }
  }
})
</script>
