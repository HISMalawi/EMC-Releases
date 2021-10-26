<template>
    <Form :fields="fields"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Form from "@/components/Forms/DesktopForms/DesktopForm.vue"
import { DtFieldInterface } from '@/components/Forms/DesktopForms/DTFieldInterface'
import { DTFieldType } from '@/components/Forms/DesktopForms/DTFormElements'
import Validation from "@/components/Forms/validations/StandardValidations"
import { Option } from '@/components/Forms/FieldInterface'
import { 
    getRegions, 
    getDistricts, 
    getTraditionalAuthorities, 
    getVillages
} from "@/utils/HisFormHelpers/LocationFieldOptions"

export default defineComponent({
    components: { Form },
    data: () => ({
        fields: [] as DtFieldInterface[]
    }),
    created() {
        this.fields = [
            {
                id: 'first_name',
                helpText: 'First name',
                type: DTFieldType.DT_TEXT,
                group: 'name',
                colSizes: {
                    md: 4,
                    lg: 4,
                    sm: 12
                },
                validation: (val: Option | Option[] | null) => Validation.isName(val),
                required: true
            },
            {
                id: 'middle_name',
                type: DTFieldType.DT_TEXT,
                helpText: 'Middle Name',
                group: 'name',
                colSizes: {
                    md: 4,
                    lg: 4,
                    sm: 12
                },
                required: false,
                validation: (val: Option | Option[] | null) => Validation.isName(val)
            },
            {
                id: 'last_name',
                type: DTFieldType.DT_TEXT,
                group: 'name',
                colSizes: {
                    md: 4,
                    lg: 4,
                    sm: 12
                },
                validation: (val: any) => Validation.isName(val),
                helpText: 'Last name',
                required: true
            },
            {
                id: 'is_birth_estimate',
                helpText: 'Is birth unknown?',
                group: 'birth-date',
                type: DTFieldType.DT_SINGLE_CHECKBOX
            },
            {
                id: 'birth_date',
                helpText: 'Birth date',
                group: 'birth-date',
                type: DTFieldType.DT_DATE,
                onUpdateCondition: {
                    observes: ['is_birth_estimate'],
                    update: ({value}: any) => {
                        if (value) {
                            return value.label === false
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
                    update: ({value}: any) => {
                        if (value) {
                            return value.label === true
                        }
                        return false
                    }
                }
            },
            {
                id: 'gender',
                type: DTFieldType.DT_SELECT,
                helpText: 'Gender',
                colSizes: {
                    md: 12,
                    lg: 12,
                    sm: 12
                },
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
                group: 'physical-address',
                options: getRegions()
            },
            {
                id: 'current_district',
                helpText: 'Current District',
                type: DTFieldType.DT_MULTIPLE_SELECT,
                group: 'physical-address',
                onUpdateOptions: {
                    observes: ['current_region'],
                    update: ({value}: any) => {
                        if (value) {
                            return getDistricts(value.value)
                        }
                        return []
                    }
                }
            },
            {
                id: 'ta',
                helpText: 'Traditional Authority',
                type: DTFieldType.DT_SELECT,
                options: [
                    { label: 'Lilongwe village', value: 'Lilognwe Village'},
                    { label: 'Blantyre village', value: 'Blantyre village'},
                    { label: 'Zomba village', value: 'Zomba village'}
                ]
            }
        ]
    }
})
</script>
