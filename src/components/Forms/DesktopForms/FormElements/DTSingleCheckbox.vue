<template>
    <ion-item>
        <ion-checkbox 
            :disabled="isDisabled" 
            v-model="valueInput"
        >
        </ion-checkbox>
    </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import { IonCheckbox, IonItem } from "@ionic/vue"

export default defineComponent({
    name: "DT_CHECKBOX",
    components: { IonCheckbox, IonItem },
    mixins:[DTMixinVue]
})
</script>
