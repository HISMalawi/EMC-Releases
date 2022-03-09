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
      this.nextTask()
    },
    getFields() {
      return [
        {
          id: 'ultrasound',
          helpText: 'Ultrasound scan results available',
          type: FieldType.TT_SELECT,
          validation: (v: Option) => Validation.required(v),
          // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
          options: () => this.yesNoOptions()
        },
        {
            id: 'multiple_gestation',
            helpText: 'Number of fetuses',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
            condition: (f: any) => f.ultrasound.value === 'Yes',
            options: () => [
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 },
                { label: 'Three', value: 3 },
                { label: 'Four', value: 4 },
                { label: 'Unknown', value: 'unknown' }
            ]
        },
        {
            id: 'liquor',
            helpText: 'Liquor',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
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
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
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
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
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
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
        },
        {
            id: 'fetal_heart_beat',
            helpText: 'Fetal heart beat',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
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
            condition: (f: any) => f.fetal_heart_beat.value === 'Heard'
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
        },
        {
            id: 'enter_fetal_movement',
            helpText: 'Fetal movement heard',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
            options: () => this.yesNoOptions()
        },
        {
            id: 'fetal_movement_felt',
            helpText: 'Fetal movement felt',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            // condition: (f: any) => f.presentation.value != 'Ball' || f.presentation.value != 'Nil palpable'
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
            options: () => this.yesNoOptions()
        },
        {
            id: 'last_fmf',
            helpText: 'Last fetal movement felt (in Weeks)',
            type: FieldType.TT_NUMBER,
            validation: (v: Option) => Validation.required(v),
            condition: (f: any) => f.fetal_movement_felt.value === 'No',
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
            options: () => this.yesNoOptions()
        },
        {
            id: 'diagnosis',
            helpText: 'Diagnosis',
            type: FieldType.TT_MULTIPLE_SELECT,
            validation: (v: Option) => Validation.required(v),
            // computedValue: (v: Option) => AncExaminationService.buildValueCoded('ultrasound', `${v.value}`),
            options: async () => {
                return ConceptService.getConceptsByCategory('anc_diagnosis')
                    .map((c: any) => this.toOption(c.name))
            }
        }
      ]
    }
  }
})
</script>
