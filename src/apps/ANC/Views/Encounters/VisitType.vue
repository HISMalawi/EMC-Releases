templ<template>
  <ion-page> 
    <his-standard-form 
      :fields="fields"
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
    async onFinish(f: any) {
      this.nextTask()
    },
    getFields() {
      return [
        {
          id: 'prescription',
          helpText: 'Prescription',
          type: FieldType.TT_YES_NO,
          validation: (v: Option) => Validation.required(v)
        }
      ]
    }
  }
})
</script>
