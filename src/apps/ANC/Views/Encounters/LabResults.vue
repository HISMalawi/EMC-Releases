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
import HisDate from "@/utils/Date"
import ANC_PROP from "@/apps/ANC/anc_global_props"

export default defineComponent({
  components: { IonPage },
  mixins: [EncounterMixinVue],
  data: () => ({
    formFields: [] as any,
    arvNumber: '' as string,
    hivStatus: '' as string,
    artStatus: '' as string,
    arvStartDate: '' as string,
    recencyEssayActivated: false as boolean,
    service: {} as any
  }),
  watch: {
    ready: {
      async handler(ready: boolean) {
        if (ready) {
            this.service = new AncLabResultService(this.patientID, this.providerID)
            await this.service.loadPregnancyStatus()
            await this.service.loadHivStatus()
            this.recencyEssayActivated = await ANC_PROP.recencyEssayActivated()
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
                id: 'art_summary',
                helpText: 'ART Summary',
                type: FieldType.TT_SUMMARY,
                condition: () => this.service.getHivStatus().match(/positive/i),
                options: () => {
                    return [
                        {
                            label: 'HIV Status', 
                            value: `
                                <b style="color:${this.service.getHivStatus().match(/positive/i) ? 'red': 'green'}">
                                    ${this.service.getHivStatus()}
                                </b>
                            `
                        },
                        {
                            label: 'On Art', value: this.service.getArtStatus() || 'Unknown'
                        },
                        {
                            label: 'Art Start date', value: HisDate.toStandardHisDisplayFormat(this.service.getArvStartDate()) || 'N/A'
                        },
                        {
                            label: 'ARV Number', value: this.service.getArvNumber() || 'N/A'
                        }
                    ]
                }
            },
            {
                id: 'lab_results',
                helpText: 'Lab Results',
                type: FieldType.TT_MULTIPLE_YES_NO,
                condition: () => !this.service.isSubsequentVisit,
                options: () => {
                    const options: Option[] = [
                        {
                            label: 'Pregnancy test done', 
                            value: 'B-HCG',
                            other: {
                                values: this.yesNoOptions()
                            }
                        }
                    ]
                    if (!this.service.getHivStatus().match(/positive/i)) {
                        options.push(this.toOption('Previous HIV test done',{
                            values: this.yesNoOptions()
                        }))
                    }
                    return options
                },
                validation: (v: Option) => Validation.required(v),
                computedValue: (v: Option[]) => v.map(d => this.service.buildValueCoded(d.label, d.value))
            },
            {
                id: 'prev_hiv_test_result',
                helpText: 'Previous HIV test results',
                type: FieldType.TT_SELECT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => this.inArray(
                    f.lab_results, (v: Option) => v.label === 'Previous HIV test done' && v.value === 'Yes'), 
                options: () => {
                    return this.mapStrToOptions([
                        'Negative',
                        'Positive',
                        'Inconclusive',
                        'Unknown'
                    ])
                },
                computedValue: (v: Option) => this.service.buildValueCoded('Previous HIV Test Results', v.value)
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
                condition: (f: any) => f.prev_hiv_test_result?.value ? true : false,
                computeValue: (date: string) => this.service.buildValueDate('Previous HIV Test Date', date)
            }),
            {
                id: 'on_art',
                helpText: 'Patient on ART',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                computedValue: (v: Option) => this.service.buildValueCoded('On Art', v.value),
                condition: (f: any) => f.prev_hiv_test_result.value === 'Positive',
                options: () => this.yesNoOptions()
            },
            {
                id: 'arv_number',
                helpText: 'ARV Number',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                computedValue: (v: Option) => this.service.buildValueText('Art number', v.value),
                condition: (f: any) => f.on_art.value === 'Yes'
            },
            {
                id: 'recency_essay',
                helpText: 'Rapid Recency Essay - Asante Results',
                type: FieldType.TT_MULTIPLE_YES_NO,
                condition: (f: any) => f.prev_hiv_test_result.value === 'Positive' && this.recencyEssayActivated,
                computedValue: (v: Option[]) => v.map(d => this.service.buildValueCoded(d.label, d.value)),
                options: () => {
                    return [
                        this.toYesNoOption('Line 1. Control Line Present'),
                        this.toYesNoOption('Line 2. Positive Verification Line Present'),
                        this.toYesNoOption('Line 3. Long-term Line Present')
                    ]
                }
            },
            {
                id: 'available_test_results',
                helpText: 'Available Lab Tests',
                type: FieldType.TT_MULTIPLE_SELECT,
                validation: (v: Option) => Validation.required(v),
                condition: () => true,
                onload: () => {
                    //TODO: Add PreEclampsia warning if bp_systolic >= 140 && bp_diastolic >= 90
                },
                options: (f: any) => {
                    const options = []
                    if (f.prev_hiv_test_result && f.prev_hiv_test_result.value != 'Positive' 
                        || !this.service.getHivStatus().match(/positive/i)) {
                        options.push('HIV')
                    }
                    return this.mapStrToOptions([
                        ...options,
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
                computedValue: (v: Option) => this.service.buildValueCoded('HIV status', v.value),
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
                computedValue: (v: Option) => this.service.buildValueCoded('On Art', v.value),
                options: () => this.yesNoOptions()
            },
            {
                id: 'arv_number_1',
                helpText: 'ARV Number',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                computedValue: (v: Option) => this.service.buildValueText('Art number', v.value),
                condition: (f: any) => f.on_art_1.value === 'Yes'
            },
            {
                id: 'recency_essay_1',
                helpText: 'Rapid Recency Essay - Asante Results',
                type: FieldType.TT_TEXT,
                validation: (v: Option) => Validation.required(v),
                condition: (f: any) => f.hiv_status.value === 'Positive' && this.recencyEssayActivated,
                computedValue: (v: Option[]) => v ? v.map(d => this.service.buildValueCoded(d.label, d.value)) : null,
                options: () => {
                    return [
                        this.toYesNoOption('Line 1. Control Line Present'),
                        this.toYesNoOption('Line 2. Positive Verification Line Present'),
                        this.toYesNoOption('Line 3. Long-term Line Present')
                    ]
                }
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
