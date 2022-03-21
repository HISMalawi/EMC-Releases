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
import { AncCurrentPregnancyService } from "@/apps/ANC/Services/anc_current_pregnancy"
import { Field, Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import { IonPage } from "@ionic/vue"
import { ObsValue } from '@/services/observation_service'
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions"

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
            this.service = new AncCurrentPregnancyService(this.patientID, this.providerID)
            this.fields = this.getFields()
        } 
      },
      immediate: true
    }
  },
  methods: {
    async onFinish(_: any, computedData: any) {
      await this.service.enrollPatient()
      const obs = await this.resolveObs(computedData)
      await this.service.createEncounter()
      await this.service.saveObservationList(obs as ObsValue[])
      this.nextTask()
    },
    getFields(): Field[] {
        return [
            {
                id: 'lnmp',
                proxyID: 'delivery_date',
                helpText: 'Last Normal Menstrual Period',
                type: FieldType.TT_FULL_DATE,
                computedValue: (v: Option) => this.service.buildValueDate('Last menstrual period', v.value),
                validation: (v: Option) => Validation.required(v),
                config: {
                    allowUnknown: true
                }
            },
            {
                id: 'estimate_lmp',
                proxyID: 'delivery_date',
                helpText: 'Gestation (months)',
                type: FieldType.TT_NUMBER,
                condition: (f: any) => f.lnmp.value === 'Unknown',
                computedValue: (v: Option) => this.service.buildValueDate('Estimated date of delivery', v.value),
                validation: (v: Option) => this.validateSeries([
                    () => Validation.required(v),
                    () => Validation.rangeOf(v, 1, 10)
                ])
            },
            {
                id: 'planned_delivery_place',
                helpText: 'Planned delivery place',
                type: FieldType.TT_SELECT,
                computedValue: (v: Option) => this.service.buildValueText('Planned Delivery Place', v.label),
                validation: (v: Option) => Validation.required(v),
                options: (_: any, filter='') => getFacilities(filter),
                config: {
                    showKeyboard: true,
                    isFilterDataViaApi: true
                }
            },
            {
                id: 'bed_net_available_for_use',
                helpText: 'Mosquito net in good condition available for own use',
                type: FieldType.TT_SELECT,
                computedValue: (v: Option) => this.service.buildValueCoded('Do you use bed nets', v.value),
                validation: (v: Option) => Validation.required(v),
                options: () => {
                    return this.yesNoOptions()
                }
            },
            {
                id: 'bed_net_given',
                helpText: 'Bed net given today',
                type: FieldType.TT_SELECT,
                computedValue: (v: Option) => this.service.buildValueCoded('Mosquito net started', v.value),
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.bed_net_available_for_use.value === 'No',
                options: () => {
                    return this.yesNoOptions()
                }
            },
            {
                id: 'previous_ttv_given',
                helpText: 'Previous TTV given before this pregnancy',
                type: FieldType.TT_NUMBER,
                computedValue: (v: Option) => this.service.buildValueNumber('TTV', v.value),
                validation: (v: Option) => Validation.required(v)
            }
        ]
    }
  }
})
</script>
