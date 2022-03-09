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
import { AncExaminationService } from "@/apps/ANC/Services/anc_examination_service"
import { Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import { IonPage } from "@ionic/vue"
import { ConceptService } from '@/services/concept_service'

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
            this.service = new AncExaminationService(this.patientID, this.providerID)
            this.formFields = this.getFields()
        } 
      },
      immediate: true
    }
  },
  methods: {
    async onFinish(_: any, computedData: any) {
      await this.service.createEncounter()
      await this.service.saveObservationList((await this.resolveObs(computedData)))
      this.nextTask()
    },
    getFields() {
      return [
        {
          id: 'ultrasound',
          helpText: 'Ultrasound scan results available',
          type: FieldType.TT_SELECT,
          validation: (v: Option) => Validation.required(v),
          computedValue: (v: Option) => this.service.buildValueCoded(
            'Ultrasound', v.value
          ),
          options: () => this.yesNoOptions()
        },
        {
            id: 'multiple_gestation',
            helpText: 'Number of fetuses',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            computedValue: (v: Option) => this.service.buildValueText(
                'Multiple gestation', v.value),
            condition: (f: any) => f.ultrasound.value === 'Yes',
            options: () => [
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 },
                { label: 'Three', value: 3 },
                { label: 'Four', value: 4 },
                { label: 'Unknown', value: 'Unknown' }
            ]
        },
        {
            id: 'liquor',
            helpText: 'Liquor',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            computedValue: (v: Option) => this.service.buildValueText(
                'LIQUOR', v.value),
            condition: (f: any) => f.ultrasound.value === 'Yes',
            options: () => this.mapStrToOptions([
                'Adequate',
                'Not adequate',
                'Unknown'
            ])
        },
        {
            id: 'lie',
            helpText: 'Lie',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            computedValue: (v: Option) => this.service.buildValueText(
                'Lie', v.value),
            condition: (f: any) => f.ultrasound.value === 'Yes',
            options: () => this.mapStrToOptions([
                'Longitudinal',
                'Transverse',
                'Unknown'
            ])
        },
        {
            id: 'fetal_heart_movement_seen',
            helpText: 'Fetal heart movement seen',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            computedValue: (v: Option) => this.service.buildValueCoded(
                'Fetal heart movement seen', v.value),
            condition: (f: any) => f.ultrasound.value === 'Yes',
            options: () => this.yesNoOptions()
        },
        /**
         * Add Presentation Field here
         */
        {
            id: 'enter_fundal_height',
            helpText: 'Fundal height (cm)',
            type: FieldType.TT_NUMBER,
            validation: (v: Option) => Validation.required(v),
            computedValue: (v: Option) => {
                return v.value != 'Unknown' 
                    ? this.service.buildValueNumber('Fundus', v.value as number)
                    : this.service.buildObs('Fundus', {
                        'value_coded': v.value,
                        'value_numeric': 0
                    })
            },
            config: {
                noChars: false
            }
        },
        {
            id: 'fetal_heart_beat',
            helpText: 'Fetal heart beat',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            computedValue: (v: Option) => this.service.buildValueText(
                'Fetal Heart Beat', v.value),
            options: () => this.mapStrToOptions([
                'Heard',
                'Not heard'
            ])
        },
        {
            id: 'fetal_heart_rate',
            helpText: 'Fetal heart rate',
            type: FieldType.TT_NUMBER,
            validation: (v: Option) => Validation.required(v),
            condition: (f: any) => f.fetal_heart_beat.value === 'Heard',
            computedValue: (v: Option) => {
                return v.value != 'Unknown'
                    ? this.service.buildValueNumber('Fetal heart movement seen', `${v.value}`)
                    : this.service.buildObs('Fetal heart movement seen', {
                        'value_numeric': 0, 'value_coded': v.value
                    })
            },
            config: {
                noChars: false
            }
        },
        {
            id: 'enter_fetal_movement',
            helpText: 'Fetal movement heard',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            computedValue: (v: Option) => this.service.buildValueCoded(
                'Fetal movement heard', `${v.value}`),
            options: () => this.yesNoOptions()
        },
        {
            id: 'fetal_movement_felt',
            helpText: 'Fetal movement felt',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            condition: (f: any) => f.presentation.value != 'Ball' || f.presentation.value != 'Nil palpable',
            computedValue: (v: Option) => this.service.buildValueCoded('Fetal movement felt', `${v.value}`),
            options: () => this.yesNoUnknownOptions()
        },
        {
            id: 'last_fmf',
            helpText: 'Last fetal movement felt (in Weeks)',
            type: FieldType.TT_NUMBER,
            validation: (v: Option) => Validation.required(v),
            condition: (f: any) => f.fetal_movement_felt.value != 'Unknown',
            computedValue: (v: Option) => {
                return v.value != 'Unknown'
                    ? this.service.buildValueNumber('Last Fetal movement felt', v.value as number)
                    : this.service.buildObs('Last Fetal movement felt', {
                        'value_numeric': 0, 'value_coded': v.value
                    })
            },
            options: () => this.yesNoUnknownOptions()
        },
        {
            id: 'diagnosis',
            helpText: 'Diagnosis',
            type: FieldType.TT_MULTIPLE_SELECT,
            validation: (v: Option) => Validation.required(v),
            computedValue: (v: Option[]) => v.map(d => this.service.buildValueCoded(d.label, 'Yes')),
            options: () => {
                return ConceptService.getConceptsByCategory('anc_diagnosis')
                    .map((c: any) => this.toOption(c.name)) as Option[]
            }
        }
      ]
    }
  }
})
</script>
