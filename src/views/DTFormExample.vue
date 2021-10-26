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
                validation: (val: Option | Option[] | null) => Validation.isName(val),
                required: true
            },
            {
                id: 'middle_name',
                type: DTFieldType.DT_TEXT,
                helpText: 'Middle Name',
                group: 'name',
                required: false,
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
                id: 'birth_date',
                helpText: 'Birth date',
                group: 'birthdate-gender-section',
                type: DTFieldType.DT_DATE
            },
            {
                id: 'gender',
                type: DTFieldType.DT_SELECT,
                group: 'birthdate-gender-section',
                helpText: 'Gender',
                colSizes: {
                    md: 6,
                    lg: 6,
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
            }
        ]
    }
})
</script>
