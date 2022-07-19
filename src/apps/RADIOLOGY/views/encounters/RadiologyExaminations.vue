<template>
    <ion-page> 
        <his-standard-form 
            :fields="fields"
            :onFinishAction="onFinish"
            :cancelDestinationPath="cancelDestination" 
        />
    </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EncounterMixinVue from '@/views/EncounterMixin.vue'
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import { IonPage } from "@ionic/vue";

export default defineComponent({
    mixins: [EncounterMixinVue],
    components: {
        IonPage,
        HisStandardForm
    },
    watch: {
        ready: {
            handler(ready: any) {
                if (ready) {
                    this.fields = this.getFields()
                }
            },
            immediate: true
        }
    },
    methods: {
        getFields() {
            return [

            ]
        },
        onFinish() {
            //TODO: save encounter
        }
    }
})
</script>
