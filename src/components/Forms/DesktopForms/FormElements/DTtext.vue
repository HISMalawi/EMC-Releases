<template>
   <ion-item class="box-input" lines="none">
        <ion-input
        type="text"
        inputmode="text"
        v-model="valueInput"
        :disabled="isDisabled"
        :value="valueInput"
        :placeholder="config?.component?.placeholder || 'Enter something'"
        :class="config?.component?.cssClass"
        :max="config?.component?.max || null"
        :min="config?.component?.max || null"/>
   </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import { IonInput } from "@ionic/vue"

export default defineComponent({
    name: 'DT_TEXT',
    components: { IonInput },
    emits: ['onValue'],
    mixins:[DTMixinVue]
})
</script>
