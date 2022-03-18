<template>
    <view-port>
        <ion-grid class='view-port-content'> 
            <ion-row> 
                <ion-col size="4">
                    <ion-list> 
                        <ion-radio-group v-model="selected">
                            <ion-item detail v-for="(item, index) in listData" :key="index"> 
                                <ion-radio slot="start" :value="item"></ion-radio>
                                <ion-label v-html="item.label"></ion-label>
                            </ion-item>
                        </ion-radio-group>
                    </ion-list>
                </ion-col>
                <ion-col v-if="selected" size="8">
                    <ion-grid class="his-card" v-for="(subItemRows, subItemRowIndex) in selected.other.data" :key="subItemRowIndex">
                        <ion-row> 
                            <ion-col class="ion-text-center"> 
                                {{subItemRowIndex+1}}
                            </ion-col>
                        </ion-row>
                        <p/>
                        <ion-row v-for="(subItem, subIndex) in subItemRows" :key="subIndex"> 
                            <ion-col>
                                <ion-label><b>{{subItem.label}}</b></ion-label>
                            </ion-col>
                            <ion-col>
                                <b>{{subItem.value || '?'}}</b>
                            </ion-col>
                            <ion-col>
                                <ion-button @click="editField(subItem)">EDIT</ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
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
} from "@ionic/vue"
import {
    arrowUp,
    arrowDown
} from "ionicons/icons"

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
        selected: null as Option | null,
        listData: [] as Option[]
    }),
    async activated() {
        this.$emit('onFieldActivated', this)
        this.selected = null
        this.listData = await this.options(this.fdata)
    },
    methods: {
       editField() {
           /**
            * TODO: update field values
            */
       }
    },
    watch: {
        listData: {
            handler(data: Option[]) {
                this.$emit('onValue', data)
            },
            deep: true
        }
    }
})
</script>
<style scoped>
    ion-radio {
        --size: 38px;
    }
</style>