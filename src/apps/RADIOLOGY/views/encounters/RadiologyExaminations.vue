<template>
    <ion-page> 
        <his-standard-form 
            :fields="fields"
            :onFinishAction="onFinish"
            :cancelDestinationPath="cancelDestination" 
        />
    </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EncounterMixinVue from '@/views/EncounterMixin.vue'
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import { IonPage } from "@ionic/vue";
import { FieldType } from '@/components/Forms/BaseFormElements';
import Validation from "@/components/Forms/validations/StandardValidations";
import { Field, Option } from "@/components/Forms/FieldInterface"
import { RadiologyExaminationService } from "@/apps/RADIOLOGY/services/radiology_examination_service";
import { isEmpty } from 'lodash';

export default defineComponent({
    mixins: [EncounterMixinVue],
    components: {
        IonPage,
        HisStandardForm
    },
    data: () => ({
        service: {} as any,
        examinationOptions: [] as any,
        detailedExaminationOptions: [] as any
    }),
    watch: {
        ready: {
            handler(ready: any) {
                if (ready) {
                    this.service = new RadiologyExaminationService(this.patientID, this.providerID)
                    this.fields.push(this.listOfRadiologyTestsField())
                    this.fields.push(this.examinationField())
                    this.fields.push(this.detailedExaminationField())
                }
            },
            immediate: true
        }
    },
    methods: {
        async getTestsOptions(id: string | number) {
            return (await RadiologyExaminationService.getListOfRadiologyTests(id))
                .map((e: any) => ({
                    value: e.concept_id,
                    label: e.name
                }))
        },
        listOfRadiologyTestsField(): Field {
            let tests = [] as any;
            let selectedTest = -1 as number;
            return {
                id: "list_of_radiology_test",
                helpText: "Please select the type of examination",
                type: FieldType.TT_SELECT,
                validation: (v: Option) => Validation.required(v),
                beforeNext: async (v: Option) => {
                    if (selectedTest != v.value) {
                        selectedTest = v.value as number
                        this.examinationOptions = await this.getTestsOptions(v.value)
                    }
                    return true
                },
                options: async () => {
                    if (isEmpty(tests)) {
                        tests = await this.getTestsOptions('LIST OF RADIOLOGY TESTS')
                    }
                    return tests
                }
            }
        },
        examinationField() {
            let selectedExamID = -1
            return {
                id: "examination",
                helpText: "Please select the examination",
                type: FieldType.TT_SELECT,
                validation: (v: Option) => Validation.required(v),
                condition: () => !isEmpty(this.examinationOptions),
                beforeNext: async (v: Option, f: any) => {
                    if (selectedExamID != f.list_of_radiology_test.value) {
                        selectedExamID = v.value as number
                        this.detailedExaminationOptions = await this.getTestsOptions(selectedExamID)
                    }
                    return true
                },
                options:() => this.examinationOptions
            }
        },
        detailedExaminationField() {
            return {
                id: "detailed_examination",
                helpText: "Please select the detailed examination",
                type: FieldType.TT_SELECT,
                condition: () => !isEmpty(this.detailedExaminationOptions),
                validation: (v: Option) => Validation.required(v),
                options: () => this.detailedExaminationOptions
            }
        },
        // getFields() {
        //     return [
        //         {
        //             id: "list_of_radiology_test",
        //             helpText: "Please select the type of examination",
        //             type: FieldType.TT_SELECT,
        //             validation: (v: Option) => Validation.required(v),
        //             options: () => {
        //                 return []
        //             }
        //         },
        //         {
        //             id: "examination",
        //             helpText: "Please select the examination",
        //             type: FieldType.TT_SELECT,
        //             // validation: (v: Option) => Validation.required(v),
        //             options: () => {
        //                 return []
        //             }
        //         },
        //         {
        //             id: "detailed_examination",
        //             helpText: "Please select the detailed examination",
        //             type: FieldType.TT_SELECT,
        //             // validation: (v: Option) => Validation.required(v),
        //             options: () => {
        //                 return []
        //             }
        //         },
        //         {
        //             id: "referred_by",
        //             helpText: "Referred from",
        //             type: FieldType.TT_SELECT,
        //             // validation: (v: Option) => Validation.required(v),
        //             options: () => {
        //                 return []
        //             }
        //         },
        //         {
        //             id: "paying",
        //             helpText: "Is this a paying patient?",
        //             type: FieldType.TT_SELECT,
        //             // validation: (v: Option) => Validation.required(v),
        //             options: () => {
        //                 return []
        //             }
        //         },
        //         {
        //             id: "payment_type",
        //             helpText: "Select payment method",
        //             type: FieldType.TT_SELECT,
        //             // validation: (v: Option) => Validation.required(v),
        //             options: () => {
        //                 return []
        //             }
        //         },
        //         {
        //             id: "receipt_number",
        //             helpText: "Enter receipt number",
        //             type: FieldType.TT_TEXT,
        //             // validation: (v: Option) => Validation.required(v),
        //         },
        //         {
        //             id: "invoice_number",
        //             helpText: "Enter invoice number",
        //             type: FieldType.TT_TEXT,
        //             // validation: (v: Option) => Validation.required(v),
        //         },
        //         {
        //             id: "payment_amount",
        //             helpText: "Enter payment amount",
        //             type: FieldType.TT_NUMBER,
        //             // validation: (v: Option) => Validation.required(v),
        //         },
        //         {
        //             id: "invoice_amount",
        //             helpText: "Enter invoice amount",
        //             type: FieldType.TT_NUMBER,
        //             // validation: (v: Option) => Validation.required(v),
        //         }
        //     ]
        // },
        onFinish() {
            //TODO: save encounter
        }
    }
})
</script>
