<template>
    <ion-item>
        <ion-input
            v-model="valueInput"
            type="Date"
            inputmode="Date"
            :disabled="isDisabled"
        />
    </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DTMixinVue from './DTMixin.vue'
import { IonInput, IonItem } from "@ionic/vue"

export default defineComponent({
    name: 'DT_CHECKBOX',
    components: { IonInput, IonItem },
    emits: ['onValue'],
    mixins:[DTMixinVue]
})
</script>
