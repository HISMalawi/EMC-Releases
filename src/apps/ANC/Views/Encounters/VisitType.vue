<template>
  <ion-page> 
    <his-standard-form 
      :fields="fields"
      :skipSummary="true"
      :onFinishAction="onFinish"
      :cancelDestinationPath="cancelDestination"
    />
  </ion-page>
</template>

<script lang="ts">
import EncounterMixinVue from '@/views/EncounterMixin.vue'
import { FieldType } from "@/components/Forms/BaseFormElements"
import { defineComponent } from 'vue'
import { Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import { IonPage } from "@ionic/vue"
import { AncVisitTypeService } from "@/apps/ANC/Services/anc_visit_type_service"

export default defineComponent({
  components: { IonPage },
  mixins: [EncounterMixinVue],
  data: () => ({
    service: {} as any,
    helpText: 'ANC Visit Number' as string
  }),
  watch: {
    ready: {
      async handler(ready: boolean) {
        if (ready) {
          this.service = new AncVisitTypeService(this.patientID, this.providerID)
          await this.service.loadLastVisitNumber()
          this.fields = this.getFields()
        }
      },
      immediate: true
    }
  },
  methods: {
    async onFinish(_: any, c: any) {
      const visit = new AncVisitTypeService(this.patientID, this.providerID)
      await visit.createEncounter()
      await visit.saveVisitNumber(c['visit_number'])
      this.nextTask()
    },
    getFields() {
      return [
        {
          id: 'visit_number',
          helpText: this.helpText,
          dynamicHelpText: () => {
            if (this.service.lastVisitNumber) {
              return `${this.helpText} (Last visit number: ${this.service.lastVisitNumber})`
            }
            return this.helpText
          },
          type: FieldType.TT_NUMBER,
          computedValue: (v: Option) => v.value,
          validation: (v: Option) => this.validateSeries([
            () => Validation.required(v),
            () => Validation.rangeOf(v, this.service.lastVisitNumber+1, 40)
          ])
        }
      ]
    }
  }
})
</script>
