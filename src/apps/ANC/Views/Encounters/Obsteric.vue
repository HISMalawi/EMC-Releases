<template>
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
import { AncObstericService } from "@/apps/ANC/Services/anc_obsteric_service"
import { Field, Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import { IonPage } from "@ionic/vue"
import { ObsValue } from '@/services/observation_service'
import { alertConfirmation } from '@/utils/Alerts'

export default defineComponent({
  components: { IonPage },
  mixins: [EncounterMixinVue],
  data: () => ({
    service: {} as any
  }),
  watch: {
    ready: {
      async handler(ready: boolean) {
        if (ready) {
            this.service = new AncObstericService(this.patientID, this.providerID)
            this.fields = this.getFields()
        } 
      },
      immediate: true
    }
  },
  methods: {
    async onFinish(_: any, computedData: any) {
      const obs = await this.resolveObs(computedData)
      await this.service.createEncounter()
      await this.service.saveObservationList(obs as ObsValue[])
      this.nextTask()
    },
    getFields(): Field[] {
        return [
            {
                id: 'gravida',
                helpText: 'Gravida',
                type: FieldType.TT_NUMBER,
                beforeNext: async (v: Option) => {
                    if (parseInt(`${v.value}`) > 9) {
                        const ok = await alertConfirmation(
                            'The value is bigger than maximum 9. Are you sure about this value?'
                        )
                        if (!ok) {
                            return false
                        } 
                    }
                    return true
                },
                computedValue: (v: Option) => this.service.buildValueNumber('Gravida', v.value),
                validation: (v: Option) => this.validateSeries([
                    () => Validation.required(v),
                    () => Validation.rangeOf(v, 1, 19)
                ])
            },
            {
                id: 'para',
                helpText: 'Para',
                type: FieldType.TT_NUMBER,
                condition: (f: any) => f.gravida.value > 1,
                computedValue: (v: Option) => this.service.buildValueNumber('Parity', v.value), 
                validation: (v: Option, f: any) => this.validateSeries([
                    () => Validation.required(v),
                    () => Validation.rangeOf(v, 0, f.gravida.value - 1)
                ])
            },
            {
                id: 'known_pregnancies',
                helpText: 'Pregnancies with available information',
                type: FieldType.TT_ANC_PREGNANCY_INPUT_CONFIG,
                condition: (f: any) => f.para.value > 0,
                config: {
                  pregnancyCount: (f: any) => f.para.value
                }
            }
        ]
    }
  }
})
</script>
