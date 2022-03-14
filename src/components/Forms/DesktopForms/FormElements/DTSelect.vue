<template>
    <ion-item class="box-input" lines="none">
        <ion-label> Select </ion-label>
        <ion-select
            :class="config?.component?.cssClass"
            :disabled="isDisabled" 
            v-model="valueOption"> 
            <ion-select-option
                :key="index"
                :value="option"
                v-for="(option, index) in optionList"
            > 
            {{option.label}}
            </ion-select-option>
        </ion-select>
    </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import {
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption 
} from "@ionic/vue"
export default defineComponent({
    name: "DT_SELECT",
    components: { 
        IonSelectOption,
        IonSelect,
        IonLabel,
        IonItem
    },
    mixins:[DTMixinVue]
})
</script>
