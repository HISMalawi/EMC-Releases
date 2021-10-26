<template>
    <Form :fields="fields"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Form from "@/components/Forms/DesktopForms/DesktopForm.vue"
import { DtFieldInterface } from '@/components/Forms/DesktopForms/DTFieldInterface'
import { DTFieldType } from '@/components/Forms/DesktopForms/DTFormElements'
import Validation from "@/components/Forms/validations/StandardValidations"

export default defineComponent({
    components: { Form },
    data: () => ({
        fields: [] as DtFieldInterface[]
    }),
    created() {
        this.fields = [
            {
                id: 'first_name',
                type: DTFieldType.DT_TEXT,
                group: 'name',
                validation: (val: any) => Validation.isName(val),
                helpText: 'First name',
                required: true
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
                id: 'gender',
                type: DTFieldType.DT_RADIO,
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
                id: 'birth_date',
                helpText: 'Birth date',
                type: DTFieldType.DT_DATE,
                required: true
            },
        ]
    }
})
</script>
