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
    service: {} as any
  }),
  watch: {
    ready: {
      handler(ready: boolean) {
        if (ready) {
          this.fields = this.getFields()
        }
      },
      immediate: true
    }
  },
  methods: {
    async onFinish(f: any, c: any) {
      const visit = new AncVisitTypeService(this.patientID, this.providerID)
      await visit.createEncounter()
      await visit.saveVisitNumber(c['visit_number'])
      this.nextTask()
    },
    getFields() {
      return [
        {
          id: 'visit_number',
          helpText: 'ANC Visit Number',
          type: FieldType.TT_NUMBER,
          computedValue: (v: Option) => v.value,
          validation: (v: Option) => this.validateSeries([
            () => Validation.required(v),
            () => !(v.value > 0 && v.value <= 500) ? ['Value not within range of 1 and 500'] : null
          ])
        }
      ]
    }
  }
})
</script>
