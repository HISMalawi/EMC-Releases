<template>
    <ion-grid> 
        <ion-row
            v-for="(fields, rowIndex) in fieldRows"
            :key="rowIndex"
            > 
            <ion-col
                v-for="(field, fieldIndex) in fields" 
                :key="fieldIndex"
                :size-sm="field.colSizes.sm"
                :size-md="field.colSizes.md"
                :size-lg="field.colSizes.lg"
                > 
                <ion-row> 
                    <ion-col>
                        <ion-label>
                            {{ field.helpText(formData, computedData) }}
                            <span v-if="field.required(formData, computedData)"> 
                                (*)
                            </span>
                        </ion-label>
                    </ion-col>
                </ion-row>
                <ion-row> 
                    <ion-col> 
                        <keep-alive> 
                            <component
                                v-bind:is="field.type"
                                :beforeValue="field.beforeValue"
                                :required="field.required(formData, computedData)"
                                v-if="field.visible 
                                    ? field.visible(formData, computedData)
                                    : true"
                                :options="
                                    field.options 
                                    ? field.options(formData, computedData) 
                                    :[]"
                                :defaultValue="
                                    field.defaultValue 
                                    ? field.defaultValue(formData, computedData)
                                    : null"
                                :disabled="
                                    field.disabled 
                                    ? field.disabled(formData, computedData)
                                    : false"
                                :config="field.config
                                    ? field.config
                                    : {}"
                            >
                            </component>
                        </keep-alive>
                    </ion-col>
                </ion-row>
                <ion-row> 
                    <ion-col> 
                    <!---Render field Errors here--->
                    </ion-col>
                </ion-row>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DtFieldInterface } from "@/components/Forms/DesktopForms/DTFieldInterface"
import { Option } from "@/components/Forms/FieldInterface"
import {
    IonGrid,
    IonRow,
    IonCol,
    IonLabel
} from "@ionic/vue"
export default defineComponent({
    components: { 
        IonGrid, 
        IonRow, 
        IonCol, 
        IonLabel 
    },
    props: {
        fields: {
            type: Object as PropType<DtFieldInterface[]>,
            required: true   
        }
    },
    data: () => ({
        fieldRows: [] as Array<DtFieldInterface[]>,
        formData: {} as Record<string, Option | Option[] | null>,
        computedData: {} as Record<string, any>
    }),
    methods: {
        buildFormData(fields: Array<DtFieldInterface>): void {
            this.formData = {};
            fields.forEach((field) => this.formData[field.id] = null)
        },
        buildFieldRows(fields: Array<DtFieldInterface>) {
            const collection: any = { }
            fields.forEach(field => {
                //Group fields with similar group name
                if (!field.group) {
                    collection[field.id] = [field]
                    return
                } 
                if (!(field.group in collection)) {
                    collection[field.group] = []
                }
                collection[field.group].push(field)
            })
            return Object.values(collection)
        }
    }
})
</script>
