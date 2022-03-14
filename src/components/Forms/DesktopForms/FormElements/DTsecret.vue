<template>
    <ion-input
        v-model="valueInput"
        class="box-input"
        type="Password"
        inputmode="Password"
        :class="config?.component?.cssClass"
        :disabled="isDisabled"
        :max="config?.component?.max || null"
        :min="config?.component?.max || null"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import { IonInput } from "@ionic/vue"

export default defineComponent({
    name: 'DT_SECRET',
    components: { IonInput },
    emits: ['onValue'],
    mixins:[DTMixinVue]
})
</script>
