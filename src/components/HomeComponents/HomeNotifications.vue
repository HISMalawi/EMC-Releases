<template>
    <div v-if="!hasNotifications"
        class="his-card ion-text-center his-lg-text"> 
        No notifications in this area..
    </div>
    <ul v-if="hasNotifications"> 
        <li style="margin-bottom: 2%;" v-for="(item, index) in sortedNotifications" 
            :key="index" class="ion-text-center his-card his-md-text">
            <ul> 
                <li><b>{{item.title}}</b></li>
                <li>{{item.message}}</li>
                <li>{{item.date || 'N/A'}}</li>
                <li>
                    <ion-button
                        v-if="typeof item.handler==='function'"
                        @click="openNotification(item)"
                        size="large"
                    >
                        Open
                    </ion-button>
                    <ion-button 
                        size="large"
                        @click="item.read=true" 
                        :disabled="item.read">
                        <span v-if="!item.read">Mark as read</span>
                        <span v-if="item.read">Read</span>
                    </ion-button>
                </li>
            </ul>
        </li>
    </ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Notification } from "@/composables/notifications"
import { IonButton } from "@ionic/vue";
export default defineComponent({
    components: {
        IonButton
    },
    setup() {
        const { 
            openNotification, 
            sortedNotifications, 
            notificationData, 
            hasNotifications 
        } = Notification()
        return {
            openNotification,
            sortedNotifications,
            hasNotifications,
            notificationData
        }
    }
})
</script>
<style scoped>
ul {
    list-style: none;
}
</style>
