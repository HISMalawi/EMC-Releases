<template>
    <ion-item>
        <ion-input
            v-model="valueInput"
            type="Password"
            inputmode="Password"
            :disabled="isDisabled"
            :max="config?.component?.max || null"
            :min="config?.component?.max || null"
        />
    </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import { IonInput, IonItem } from "@ionic/vue"

export default defineComponent({
    name: 'DT_SECRET',
    components: { IonInput, IonItem },
    emits: ['onValue'],
    mixins:[DTMixinVue]
})
</script>
