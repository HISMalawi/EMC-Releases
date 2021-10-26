<template>
    <ion-radio-group :disabled="isDisabled" v-model="valueOption">
        <ion-item
            :key="index"
            v-for="(option, index) in optionList"> 
            <ion-label>
                {{ option.label }}
            </ion-label>
            <ion-radio 
                slot="end" 
                :value="option"            
                > 
            </ion-radio>
        </ion-item>
    </ion-radio-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import {
    IonRadioGroup,
    IonLabel,
    IonRadio,
    IonItem
} from "@ionic/vue"
export default defineComponent({
    name: 'DT_RADIO',
    components: {
        IonRadioGroup,
        IonLabel,
        IonRadio,
        IonItem
    },
    mixins:[DTMixinVue]
})
</script>
