<template>
    <ion-page> 
        <his-date-input
            :config="config"
            :options="options"
            :clear="clear"
            :fdata="formData"
            :cdata="computedFormData"
            :activationState="state"
            :onValue="onValue"
            @onValue="onNewValue"
            :defaultValue="defaultValue">  
                <ion-list> 
                    <ion-item class="his-md-text" lines="none">
                        <ion-label slot="start">
                            Expected Date Of Delivery:
                        </ion-label>
                        <ion-label slot="end">
                            {{delieveryDate}}
                        </ion-label>
                    </ion-item>
                    <ion-item class="his-md-text" lines="none">
                        <ion-label slot="start"> 
                            Gestation Weeks:
                        </ion-label>
                        <ion-label :color="gestationWeeks < 0 ? 'danger' : ''" slot="end">
                            {{gestationWeeks}}
                        </ion-label>
                    </ion-item>
                </ion-list>
        </his-date-input>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import FieldMixinVue from './FieldMixin.vue'
import HisDateInput from "@/components/FormElements/HisDateInput.vue"
import { IonPage } from '@ionic/vue'
import { Option } from "@/components/Forms/FieldInterface"
import {
    IonItem,
    IonLabel,
    IonList
} from "@ionic/vue"
export default defineComponent({
    components: { 
        HisDateInput, 
        IonPage,
        IonItem,
        IonLabel,
        IonList 
    },
    mixins: [FieldMixinVue],
    data: () => ({
        delieveryDate: 'N/A' as string,
        gestationWeeks: 'N/A' as string
    }),
    methods: {
        onNewValue(v: Option | null) {
            this.$emit('onValue', v)
            
            if (v && v.label !='Unknown') {
                if (typeof this.config.calculateDelieveryDate === 'function') {
                    this.delieveryDate =  this.config.calculateDelieveryDate(v.value)
                }
                if (typeof this.config.calculateGestationWeeks === 'function') {
                    this.gestationWeeks = this.config.calculateGestationWeeks(v.value)
                }
            } else {
                this.delieveryDate = 'N/A'
                this.gestationWeeks = 'N/A'
            }
        }
    }
})
</script>

