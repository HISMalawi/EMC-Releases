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
import { AncLabResultService } from "@/apps/ANC/Services/anc_lab_result_service"
import { Field, Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import { IonPage } from "@ionic/vue"
import { ObsValue } from '@/services/observation_service'
import { generateDateFields } from '@/utils/HisFormHelpers/MultiFieldDateHelper'

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
            this.service = new AncLabResultService(this.patientID, this.providerID)
            this.formFields = this.getFields()
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
                id: '',
                helpText: '',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: () => true
            },
            {
                id: 'art_summary',
                helpText: 'ART Summary',
                type: FieldType.TT_TEXT_BANNER
            },
            {
                id: 'lab_results',
                helpText: 'Lab Results',
                type: FieldType.TT_TEXT
            },
            {
                id: 'prev_hiv_test_result',
                helpText: 'Previous HIV test results',
                type: FieldType.TT_SELECT,
                options: () => {
                    return this.mapStrToOptions([
                        'Negative',
                        'Positive',
                        'Inconclusive',
                        'Unknown'
                    ])
                }
            },
            ...generateDateFields({
                id: 'prev_hiv_test_date',
                helpText: 'Previous HIV test',
                required: true,
                minDate: () => this.patient.birthdate(),
                maxDate: () => this.service.getDate(),
                estimation: {
                    allowUnknown: false
                },
                computeValue: (date: string) => {
                    return {
                        date
                    }
                },
                condition: (f: any) => f.prev_hiv_test_result?.value ? true : false
            }),
            {
                id: 'on_art',
                helpText: 'Patient on ART',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.prev_hiv_test_result.value === 'Positive',
                options: () => this.yesNoOptions()
            },
            {
                id: 'arv_number',
                helpText: 'ARV Number',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.on_art.value === 'Yes'
            },
            {
                id: 'recency_essay',
                helpText: 'Rapid Recency Essay - Asante Results',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: () => false
            },
            {
                id: 'available_test_results',
                helpText: 'Available Lab Tests',
                type: FieldType.TT_MULTIPLE_SELECT,
                validation: (v: Option) => Validation.required(v),
                condition: () => true,
                options: () => {
                    return this.mapStrToOptions([
                        'HIV',
                        'HB',
                        'Syphilis',
                        'Malaria',
                        'Blood Group',
                        'Urine'
                    ])
                }
            },
            {
                id: 'hiv_status',
                helpText: 'HIV Test Result',
                type: FieldType.TT_SELECT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_test_results.map((v: Option) => v.value).includes('HIV'),
                options: () => {
                    return this.mapStrToOptions([
                        'Negative',
                        'Positive',
                        'Inconclusive'
                    ])
                }
            },
            {
                id: 'on_art_1',
                helpText: 'Patient on ART',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.hiv_status.value === 'Positive',
                options: () => this.yesNoOptions()
            },
            {
                id: 'arv_number_1',
                helpText: 'ARV Number',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.on_art_1.value === 'Yes'
            },
            {
                id: 'recency_essay_1',
                helpText: 'Rapid Recency Essay - Asante Results',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: () => true
            },
            {
                id: 'hb_result',
                helpText: 'HB Test Result (g/dl)',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_test_results.map((v: Option) => v.value).includes('HB'),
            },
            {
                id: 'syphilis',
                helpText: 'Syphilis Test Result',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_test_results.map((v: Option) => v.value).includes('Syphilis'),
                options: () => {
                    return this.mapStrToOptions([
                        'Negative',
                        'Positive'
                    ])
                }
            },
            {
                id: 'malaria',
                helpText: 'Malaria Test Result',
                type: FieldType.TT_SELECT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_test_results.map((v: Option) => v.value).includes('Malaria'),
                options: () => {
                    return this.mapStrToOptions([
                        'Negative',
                        'Positive'
                    ])
                }
            },
            {
                id: 'blood_group',
                helpText: 'Blood Group Test Result',
                type: FieldType.TT_SELECT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_test_results.map((v: Option) => v.value).includes('Blood Group'),
                options: () => {
                    return this.mapStrToOptions([
                        "A+",
                        "A-",
                        "B+",
                        "B-",
                        "AB+",
                        "AB-",
                        "O+",
                        "O-"
                    ])
                }
            },
            {
                id: 'available_urine_tests',
                helpText: 'Available Urine Tests Results',
                type: FieldType.TT_MULTIPLE_SELECT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_test_results.map((v: Option) => v.value).includes('Urine'),
                options: () => {
                    return this.mapStrToOptions([
                        "Protein",
                        "Glucose",
                        "WBC",
                        "RBC",
                        "Nitrate"
                    ])
                }
            },
            {
                id: 'protein',
                helpText: 'Urine Protein Test Result',
                type: FieldType.TT_SELECT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_urine_tests.map((o: Option) => o.value).includes('Protein'),
                options: () => {
                    return this.mapStrToOptions([
                        "Negative",
                        "(+)",
                        "+",
                        "++",
                        "+++",
                        "++++",
                    ])
                }
            },
            {
                id: 'glucose',
                helpText: 'Glucose Test Result (mg/dl)',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_urine_tests.map((o: Option) => o.value).includes('Glucose'),
                options: () => {
                    return this.mapStrToOptions([
                        "Normal",
                        "+",
                        "++",
                        "+++"
                    ])
                }
            },
            {
                id: 'wbc',
                helpText: 'White Blood Cells Test Result (cmm)',
                type: FieldType.TT_NUMBER,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_urine_tests.map((o: Option) => o.value).includes('WBC'),
            },
            {
                id: 'rbc',
                helpText: 'Red Blood Cells Test Result (cmm)',
                type: FieldType.TT_NUMBER,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_urine_tests.map((o: Option) => o.value).includes('RBC'),
            },
            {
                id: 'nitrate',
                helpText: 'Nitrate Test Result',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.available_urine_tests.map((o: Option) => o.value).includes('Nitrate'),
                options: () => {
                    return this.mapStrToOptions([
                        "Negative",
                        "Trace",
                        "Positive"
                    ])
                }
            }
        ]
    }
  }
})
</script>
