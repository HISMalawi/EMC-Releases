<template>
    <ion-checkbox 
        :disabled="isDisabled" 
        v-model="valueInput"
    >
    </ion-checkbox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import { IonCheckbox } from "@ionic/vue"

export default defineComponent({
    name: "DT_CHECKBOX",
    components: { IonCheckbox },
    mixins:[DTMixinVue]
})
</script>
