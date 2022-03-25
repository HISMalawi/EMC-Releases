<template>
    <ion-card class="his-card task-card clickable">
        <ion-item lines="none">
            <ion-thumbnail slot="start">
                <img :src="icon"/>
            </ion-thumbnail>
            <ion-label class="his-md-text">{{title}}</ion-label>
        </ion-item>
    </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
    IonCard,
    IonThumbnail,
    IonItem,
    IonLabel
} from "@ionic/vue"
export default defineComponent({
    components: {
        IonCard, 
        IonThumbnail, 
        IonItem, 
        IonLabel
    },
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    }
})
</script>
<style scoped>
    .task-card {
        padding: 0px;
        margin: 0;
        height: 73px;
        overflow: hidden;
    }
</style>
