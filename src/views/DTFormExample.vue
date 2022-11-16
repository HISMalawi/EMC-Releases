<template>
    <div class="his-card ion-margin">
        <Form :fieldSections="fields" :onSubmitForm="onfinish">
            <template #buttons="{ isSubmitting, hasErrors, onClear, onSubmit }">
                <ion-row>
                    <ion-col size="12">
                        <ion-button @click="onSubmit" class="ion-float-right" size="large" :disabled="isSubmitting || hasErrors">Next Step</ion-button>
                        <ion-button @click="onClear" color="warning" class="ion-float-right" size="large">Clear All</ion-button>
                    </ion-col>
                </ion-row>
            </template>
        </Form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Form from "@/components/Forms/DesktopForms/DesktopForm.vue"
import { DtFieldInterface, DtFormSections } from '@/components/Forms/DesktopForms/DTFieldInterface'
import { DTFieldType } from '@/components/Forms/DesktopForms/DTFormElements'
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from '@/components/Forms/FieldInterface'
import { 
    getRegions, 
    getDistricts, 

} from "@/utils/HisFormHelpers/LocationFieldOptions"
import { isEmpty } from "lodash"

export default defineComponent({
    components: { Form },
    data: () => ({
        fields: [] as DtFormSections[]
    }),
    methods: {
        onfinish(f: any, c: any) {
            console.log(f, c)
        }
    },
    created() {
        this.fields = [
            {
                section: 'Personal Details',
                fields: [
                    {
                        id: 'first_name',
                        helpText: 'First name',
                        type: DTFieldType.DT_TEXT,
                        group: 'name',
                        validation: (val: Option | Option[] | null) => Validation.isName(val),
                        required: true
                    },
                    {
                        id: 'middle_name',
                        type: DTFieldType.DT_TEXT,
                        helpText: 'Middle Name', 
                        group: 'name',
                        required: false,
                        onUpdateRequired: {
                            observes: ['first_name'],
                            update: (f: any, d: any) => {
                                return !isEmpty(d)
                            }
                        },
                        validation: (val: Option | Option[] | null) => Validation.isName(val)
                    },
                    {
                        id: 'last_name',
                        type: DTFieldType.DT_TEXT,
                        group: 'name',
                        validation: (val: any) => Validation.isName(val),
                        helpText: 'Last name',
                        required: true
                    },
                    {
                        id: 'is_birth_estimate',
                        helpText: 'Is birth unknown?',
                        group: 'birth-date',
                        required: false,
                        type: DTFieldType.DT_SINGLE_CHECKBOX
                    },
                    {
                        id: 'birth_date',
                        helpText: 'Birth date',
                        group: 'birth-date',
                        type: DTFieldType.DT_DATE,
                        onUpdateCondition: {
                            observes: ['is_birth_estimate'],
                            update: (_: string, data: any) => {
                                if (data) {
                                    return data.label === false
                                }
                                return true
                            }
                        },
                    },
                    {
                        id: 'birth_estimate',
                        helpText: 'Estimate Age',
                        group: 'birth-date',
                        type: DTFieldType.DT_NUMBER,
                        condition: false,
                        onUpdateCondition: {
                            observes: ['is_birth_estimate'],
                            update: (_: string, data: any) => {
                                if (data) {
                                    return data.label === true
                                }
                                return false
                            }
                        }
                    },
                    {
                        id: 'gender',
                        type: DTFieldType.DT_SELECT,
                        helpText: 'Gender',
                        options: [
                            {
                                label: 'Male',
                                value: 'M'
                            },
                            {
                                label: 'Female',
                                value: 'F'
                            }
                        ]
                    },
                    {
                        id: "hobbies",
                        helpText: "Select your hobbies",
                        type: DTFieldType.DT_MULTIPLE_SELECT,
                        required: false,
                        options: [
                            {label: 'Joggin', value: 'Jogging'},
                            {label: 'walking', value: 'walking'},
                            {label: 'running', value: 'running'},
                            {label: 'cycling', value: 'cycling'},
                            {label: 'jumping', value: 'jumping'}
                        ]
                    }
                ]
            },
            {
                section: 'Contacts',
                fields: [
                    {
                        id: 'cellphone',
                        helpText: 'Cellphone Number',
                        type: DTFieldType.DT_TEXT,
                        validation: (
                            val: Option | Option[] | null
                        ) => Validation.isMWPhoneNumber(val)
                    },
                    {
                        id: 'current_region',
                        helpText: 'Current Region',
                        type: DTFieldType.DT_SELECT,
                        required: true,
                        group: 'physical-address',
                        options: getRegions()
                    },
                    {
                        id: 'current_district',
                        helpText: 'Current District',
                        type: DTFieldType.DT_SELECT,
                        group: 'physical-address',
                        required: true,
                        onUpdateDefaultValueOption: {
                            observes: ['current_region'],
                            update: () => ({})
                        },
                        onUpdateOptions: {
                            observes: ['current_region'],
                            update: (_, data: any) => {
                                return !isEmpty(data) ? getDistricts(data.value) : []
                            } 
                        }
                    },
                    {
                        id: 'ta',
                        helpText: 'Traditional Authority',
                        type: DTFieldType.DT_SELECT,
                        required: true,
                        options: [
                            { label: 'Lilongwe village', value: 'Lilognwe Village'},
                            { label: 'Blantyre village', value: 'Blantyre village'},
                            { label: 'Zomba village', value: 'Zomba village'}
                        ]
                    }
                ]
            },
        ]
    }
})
</script>
