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
import { Option } from "@/components/Forms/FieldInterface"

export default defineComponent({
    mixins: [EncounterMixinVue],
    components: {
        IonPage,
        HisStandardForm
    },
    watch: {
        ready: {
            handler(ready: any) {
                if (ready) {
                    this.fields = this.getFields()
                }
            },
            immediate: true
        }
    },
    methods: {
        getFields() {
            return [
                {
                    id: "list_of_radiology_test",
                    helpText: "Please select the type of examination",
                    type: FieldType.TT_SELECT,
                    // validation: (v: Option) => Validation.required(v),
                    options: () => {
                        return []
                    }
                },
                {
                    id: "examination",
                    helpText: "Please select the examination",
                    type: FieldType.TT_SELECT,
                    // validation: (v: Option) => Validation.required(v),
                    options: () => {
                        return []
                    }
                },
                {
                    id: "detailed_examination",
                    helpText: "Please select the detailed examination",
                    type: FieldType.TT_SELECT,
                    // validation: (v: Option) => Validation.required(v),
                    options: () => {
                        return []
                    }
                },
                {
                    id: "referred_by",
                    helpText: "Referred from",
                    type: FieldType.TT_SELECT,
                    // validation: (v: Option) => Validation.required(v),
                    options: () => {
                        return []
                    }
                },
                {
                    id: "paying",
                    helpText: "Is this a paying patient?",
                    type: FieldType.TT_SELECT,
                    // validation: (v: Option) => Validation.required(v),
                    options: () => {
                        return []
                    }
                },
                {
                    id: "payment_type",
                    helpText: "Select payment method",
                    type: FieldType.TT_SELECT,
                    // validation: (v: Option) => Validation.required(v),
                    options: () => {
                        return []
                    }
                },
                {
                    id: "receipt_number",
                    helpText: "Enter receipt number",
                    type: FieldType.TT_TEXT,
                    // validation: (v: Option) => Validation.required(v),
                },
                {
                    id: "invoice_number",
                    helpText: "Enter invoice number",
                    type: FieldType.TT_TEXT,
                    // validation: (v: Option) => Validation.required(v),
                },
                {
                    id: "payment_amount",
                    helpText: "Enter payment amount",
                    type: FieldType.TT_NUMBER,
                    // validation: (v: Option) => Validation.required(v),
                },
                {
                    id: "invoice_amount",
                    helpText: "Enter invoice amount",
                    type: FieldType.TT_NUMBER,
                    // validation: (v: Option) => Validation.required(v),
                }
            ]
        },
        onFinish() {
            //TODO: save encounter
        }
    }
})
</script>
