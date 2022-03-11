<template>
    <ion-page> 
        <ion-header> 
            <ion-toolbar> 
                <ion-title> Social History </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <view-port>
                <ion-grid class="view-port-content">
                    <ion-row>
                        <ion-col style="width:100%"  v-for="(item, index) in options" :key="index" size="6">
                            <ion-card class="his-card"> 
                                <ion-card-header> 
                                    <ion-card-title>{{item.title}}</ion-card-title>
                                </ion-card-header>
                                <ion-card-content> 
                                    <ion-list> 
                                        <ion-radio-group v-model="item.value">
                                            <ion-item v-for="(option, optionIndex) in item.options" :key="optionIndex"> 
                                                <ion-radio :value="option.value" slot="start"/>
                                                <ion-label>{{option.label}}</ion-label>
                                            </ion-item>
                                        </ion-radio-group>
                                    </ion-list>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </view-port>
        </ion-content>
        <ion-footer>
            <ion-toolbar color="dark">
                <ion-button 
                    @click="onCancel" 
                    slot="start" 
                    color="danger" 
                    size="large"> 
                    Cancel
                </ion-button>
                <ion-button 
                    :disabled="isSubmitting || !dataComplete" 
                    @click="onFinish" 
                    slot="end" 
                    color="success" 
                    size="large">
                    Finish
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>    
</template>
<script lang="ts">
import EncounterMixinVue from '@/views/EncounterMixin.vue'
import { defineComponent } from 'vue'
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonHeader,
    IonFooter,
    IonTitle,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonCol,
    IonItem,
    IonButton,
    IonRadio,
    IonList,
    IonLabel,
    IonToolbar,
    IonRadioGroup,
} from "@ionic/vue"
import { alertConfirmation, toastDanger } from '@/utils/Alerts'
import ViewPort from "@/components/DataViews/ViewPort.vue"
import { AncSocialHistoryService } from "@/apps/ANC/Services/anc_social_history_service"

export default defineComponent({
    components: {
        ViewPort,
        IonCard,
        IonItem,
        IonList,
        IonLabel,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonHeader,
        IonTitle,
        IonGrid,
        IonPage,
        IonRow,
        IonCol,
        IonContent,
        IonFooter,
        IonButton,
        IonRadio,
        IonToolbar,
        IonRadioGroup
    },
    mixins: [EncounterMixinVue],
    data: () => ({
        isSubmitting: false as boolean,
        service: {} as any,
        options: [] as any
    }),
    watch: {
        ready: {
            handler(ready: boolean){
                if (ready) {
                    this.service = new AncSocialHistoryService(this.patientID, this.providerID)
                }
            }
        }
    },
    computed: {
        dataComplete(): boolean {
            return this.options.map((o: any) => o.value ? true : false).every(Boolean)
        }
    },
    methods: {
        async onCancel() {
            const ok = await alertConfirmation('Are you sure you want to cancel?')
            if (ok) this.gotoPatientDashboard()
        },
        async onFinish(){
            this.isSubmitting = true
            try {
                await this.service.createEncounter()
                const obs = this.options.map(
                    async ({concept, value}: any) => await this.service.buildValueCoded(concept, value)
                )
                await this.service.saveObservationList((await Promise.all(obs)))
                this.nextTask()
            } catch (e) {
                toastDanger(e)
            }
            this.isSubmitting = false
        }
    },
    created() {
        this.options = [
            { 
                title: 'Currently Smoking',
                concept: 'patient smokes',
                value: null,
                options: this.yesNoOptions()
            },
            {
                title: 'Currently taking alcohol',
                concept: 'Currently taking alcohol',
                value: null,
                options: this.yesNoOptions()
            },
            {
                title: 'Marital status',
                concept: 'Marital status',
                value: null,
                options: [
                    this.toOption('Never Married'),
                    this.toOption('Married'),
                    this.toOption('Seperated'),
                    this.toOption('Divorced')
                ]
            }
        ]
    }
})
</script>
<style scoped>
    .his-card {
        padding: 2px;
    }
</style>
