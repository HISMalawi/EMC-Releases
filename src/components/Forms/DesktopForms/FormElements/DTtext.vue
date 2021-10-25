<template>
    <ion-input
        v-model="data"
        :type="config?.component?.type || 'text'"
        :inputmode="config?.component?.inputmode || 'text'"
        :max="config?.component?.max || null"
        :min="config?.component?.max || null"
        :required="required"
    />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import { IonInput } from "@ionic/vue"
export default defineComponent({
    components: { IonInput },
    emits: ['onValue'],
    mixins:[DTMixinVue],
    watch: {

    }
})
</script>
