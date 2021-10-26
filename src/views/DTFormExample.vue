<template>
    <Form :fields="fields"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Form from "@/components/Forms/DesktopForms/DesktopForm.vue"
import { DtFieldInterface } from '@/components/Forms/DesktopForms/DTFieldInterface'
import { FieldType } from '@/components/Forms/DesktopForms/DTFormElements'

export default defineComponent({
    components: { Form },
    data: () => ({
        fields: [] as DtFieldInterface[]
    }),
    created() {
        this.fields = [
            {
                id: 'first_name',
                type: FieldType.DT_TEXT,
                group: 'name',
                helpText: 'First name',
                required: true
            },
            {
                id: 'last_name',
                type: FieldType.DT_TEXT,
                group: 'name',
                helpText: 'Last name',
                required: true
            },
            {
                id: 'full_name',
                type: FieldType.DT_TEXT,
                disabled: true,
                helpText: 'Full name',
                onUpdateDefaultValue: {
                    observes: ['first_name', 'last_name'],
                    update: (_: any, form: any) => {
                        return `Hello ${form?.first_name?.value || ''} ${form?.last_name?.value || ''}`
                    }
                }
            },
            {
                id: 'gender',
                type: FieldType.DT_RADIO,
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
                type: FieldType.DT_DATE,
                required: true
            },
        ]
    }
})
</script>
