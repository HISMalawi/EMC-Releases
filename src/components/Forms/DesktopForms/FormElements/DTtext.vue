<template>
    <ion-item>
        <ion-input
            type="text"
            inputmode="text"
            v-model="valueInput"
            :disabled="isDisabled"
            :value="valueInput"
            :placeholder="config?.component?.placeholder || ''"
            :max="config?.component?.max || null"
            :min="config?.component?.max || null"/>
    </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import { IonInput, IonItem } from "@ionic/vue"

export default defineComponent({
    name: 'DT_TEXT',
    components: { IonInput, IonItem },
    emits: ['onValue'],
    mixins:[DTMixinVue]
})
</script>
