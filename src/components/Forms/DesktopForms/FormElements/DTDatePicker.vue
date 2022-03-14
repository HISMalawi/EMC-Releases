<template>
    <ion-item class="box-input" lines="none">
        <ion-input
            v-model="valueInput"
            type="Date"
            inputmode="Date"
            :class="config?.component?.cssClass"
            :disabled="isDisabled"
        />
    </ion-item>
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
