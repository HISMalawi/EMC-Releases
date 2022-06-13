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
                        <ion-label :color="lmpIsAbnormal ? 'danger' : 'success'" slot="end">
                           <ion-text  v-if="lmpIsAbnormal">(Abnormal)</ion-text> 
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
    IonText,
    IonItem,
    IonLabel,
    IonList
} from "@ionic/vue"
export default defineComponent({
    components: { 
        HisDateInput,
        IonText, 
        IonPage,
        IonItem,
        IonLabel,
        IonList 
    },
    mixins: [FieldMixinVue],
    data: () => ({
        delieveryDate: 'N/A' as string,
        gestationWeeks: 'N/A' as string,
        minGestationWeeks: 0 as number,
        maxGestationWeeks: 42 as number
    }),
    mounted() {
        this.minGestationWeeks = this.config?.minGestationWeeks || 0
        this.maxGestationWeeks = this.config?.maxGestationWeeks || 42
    },
    computed: {
        lmpIsAbnormal(): boolean {
            const gestationWeeks = parseInt(this.gestationWeeks)
            return gestationWeeks < this.minGestationWeeks || gestationWeeks > this.maxGestationWeeks
        }
    },
    methods: {
        onNewValue(v: Option | null) {
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
            this.$emit('onValue', {...v, other: this.gestationWeeks})
        }
    }
})
</script>
