<template>
    <ion-radio-group>
        <ion-item
            v-for="(option, index) in optionList"
            :key="index"
            > 
            <ion-label>{{ option.label }}</ion-label>
            <ion-radio slot="end" :value="option.value"> </ion-radio>
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
    components: {
        IonRadioGroup,
        IonLabel,
        IonRadio,
        IonItem
    },
    mixins:[DTMixinVue]
})
</script>
