<template>
    <view-port>
        <ion-grid class='view-port-content'> 
            <ion-row> 
                <ion-col size="4">
                    <ion-list> 
                        <ion-radio-group v-model="selected">
                            <ion-item detail v-for="(item, index) in listData" :key="index"> 
                                <ion-radio slot="start" :value="item.label"></ion-radio>
                                <ion-label v-html="item.label"></ion-label>
                            </ion-item>
                        </ion-radio-group>
                    </ion-list>
                </ion-col>
                <ion-col>
                    <div v-for="(option, optionIndex) in listData" :key="optionIndex"> 
                        <div v-if="selected === option.label">
                            <ion-grid class="his-card" v-for="(rows, mainRowIndex) in option.other.data" :key="mainRowIndex">
                                <ion-row>
                                    <ion-col class="ion-text-center"> 
                                        {{rowIndex+1}}
                                    </ion-col>
                                </ion-row>
                                <p/>
                                <ion-row v-for="(rowItem, rowIndex) in rows" :key="rowIndex"> 
                                    <ion-col>
                                        <ion-label><b>{{rowItem.label}}</b></ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <b>{{rowItem?.value?.label || '?'}}</b>
                                    </ion-col>
                                    <ion-col>
                                        <ion-button 
                                            :disabled="rowItem.disabled" 
                                            @click="editField(rowItem, listData[optionIndex].other.data[mainRowIndex])"
                                            >
                                            EDIT
                                        </ion-button>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </div>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
    </view-port>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Option } from '../Forms/FieldInterface'
import FieldMixinVue from './FieldMixin.vue'
import ViewPort from '../DataViews/ViewPort.vue'
import { 
    IonRadioGroup,
    IonRadio,
    IonGrid,
    IonButton,
    IonCol,
    IonRow,
    modalController
} from "@ionic/vue"
import {
    arrowUp,
    arrowDown
} from "ionicons/icons"
import TouchField from "@/components/Forms/SIngleTouchField.vue"
import { isEmpty } from 'lodash'

export default defineComponent({
    name: "HisSelect",
    mixins: [FieldMixinVue],
    components: {
        IonButton,
        IonRadioGroup,
        IonRadio,
        IonGrid,
        IonCol,
        IonRow,
        ViewPort
    },
    setup() {
        return {
            arrowUp,
            arrowDown
        }
    },
    data: () => ({
        selected: '' as string,
        listData: [] as Option[]
    }),
    async activated() {
        this.$emit('onFieldActivated', this)
        this.listData = await this.options(this.fdata)
    },
    methods: {
       async editField(option: any, rowItems: any) {
            const modal = await modalController.create({
                component: TouchField,
                backdropDismiss: false,
                cssClass: "full-modal",
                componentProps: {
                    dismissType: 'modal',
                    currentField: option.field,
                    onFinish: (v: any) => {
                        option.value = v
                        if (typeof option?.field?.computedValue === 'function') {
                            option.computedValue = option?.field?.computedValue(v)
                        }
                        if (typeof option?.field?.onValueUpdate === 'function') {
                            option.field.onValueUpdate(v, rowItems)
                        }
                    }
                }
            })
            modal.present()
       }
    },
    watch: {
        listData: {
            handler(data: Option[]) {
                const incompleteLabels: string[] = []
                const values = data.map((i: any) => i.other.data)
                    /**Flatten sub value structures*/
                    .reduce((allData: Option[], data: any) => {
                        return [...allData, ...data.reduce((a: any, d: any) => [...a, ...d], [])]
                    }, [])
                    .filter((i: any) => {
                        if (i.required && i.value ==='') {
                            incompleteLabels.push(i.label)
                            return false
                        } else if (!i.required) {
                            return false
                        }
                        return true
                    })
                    /**format to Option data structure*/
                    .map((i: any) => {
                        return {
                            label: i.label,
                            value: i.value,
                            other: {
                                obs: i.computedValue
                            }
                        }
                    })
                // Emit an error object if values are empty
                if (!isEmpty(incompleteLabels)) {
                    this.$emit('onValue', [{ 
                        label: '_INCOMPLETE_RECORD_ERROR_', 
                        value: incompleteLabels.length,
                        other: {
                            incompleteLabels
                        }
                    }])
                    return
                }
                this.$emit('onValue', values)
            },
            deep: true
        }
    }
})
</script>
<style scoped>
    ion-radio {
        --size: 48px;
    }
</style>
