<template>
    <ion-input
        v-model="valueInput"
        class="box-input"
        type="Date"
        inputmode="Date"
        :class="config?.component?.cssClass"
        :disabled="isDisabled"
    />
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
