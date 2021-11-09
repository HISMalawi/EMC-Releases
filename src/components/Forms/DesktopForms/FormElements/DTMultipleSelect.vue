<template>
    <ion-item>
        <ion-label> Select </ion-label>
        <ion-select :disabled="isDisabled" v-model="checkedOptionList" multiple="true"> 
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
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption 
} from "@ionic/vue"
export default defineComponent({
    name: "DT_MULTIPLE_SELECT",
    components: { 
        IonSelectOption,
        IonSelect,
        IonLabel,
        IonItem
    },
    mixins:[DTMixinVue]
})
</script>
