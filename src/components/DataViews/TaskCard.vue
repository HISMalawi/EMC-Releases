<template>
    <ion-card class="his-card task-card clickable">
        <ion-item lines="none">
            <ion-thumbnail slot="start">
                <img :src="isCompleted ? checkIcon : icon"/>
            </ion-thumbnail>
            <ion-label
                class="his-sm-text ion-text-wrap"
                style="font-weight:600;color:#333!important;">
                <span v-if="!isCompleted"> 
                    {{title}} 
                </span>
                <s v-if="isCompleted">
                    {{title}}
                </s>
            </ion-label>
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
import img from "@/utils/Img"

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
        },
        taskCompleted: {
            type: Boolean,
            required: false
        }
    },
    setup(props) {
        const checkIcon = img('Checkmark.svg')
        const isCompleted: boolean = typeof props.taskCompleted === 'boolean' 
            ? props.taskCompleted 
            : false;
        return {
            checkIcon,
            isCompleted
        }
    }
})
</script>
<style scoped>
    ion-thumbnail {
        --size: 18px!important;
    }
    ion-item {
        padding: 0;
    }
    .task-card {
        padding: 0;
        margin: 0;
        height: 73px;
        overflow: hidden;
    }
</style>
