<template>
    <ion-input
        v-model="valueInput"
        class="box-input"
        :class="config?.component?.cssClass" 
        :placeholder="config?.component?.placeholder || 'Enter numeric values only'"
        type="Number"
        inputmode="Number"
        :disabled="isDisabled"
        :max="config?.component?.max || null"
        :min="config?.component?.max || null"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import { IonInput } from "@ionic/vue"

export default defineComponent({
    name: 'DT_CHECKBOX',
    components: { IonInput },
    emits: ['onValue'],
    mixins:[DTMixinVue]
})
</script>
