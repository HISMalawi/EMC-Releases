<template>
    <div v-if="!hasNotifications"
        class="his-card ion-text-center his-lg-text"> 
        No notifications
    </div>
    <ion-list v-if="hasNotifications"> 
        <ion-item class="his-md-text"
            button
            detail
            @click="openNotification(item)"
            v-for="(item, index) in sortedNotifications"
            :key="index">
            <ion-label class="his-lg-text">
                <h1>{{item.title}}</h1>
                <p class="his-lg-text" v-html="item.message"></p>
            </ion-label>
            <ion-chip color="success" class="his-md-text">{{item.date}}</ion-chip>
        </ion-item>
    </ion-list>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue'
import { Notification } from "@/composables/notifications"
import { 
    IonItem,
    IonList,
    IonLabel,
    IonChip
} from "@ionic/vue";
export default defineComponent({
    components: {
        IonLabel,
        IonItem,
        IonList,
        IonChip
    },
    setup() {
        const { 
            openNotification,
            markAllAsRead,
            sortedNotifications,
            notificationData,
            hasNotifications
        } = Notification()
        watch(notificationData, (d) => {
            if (d) {
                markAllAsRead()
            }
        },{ deep : true, immediate: true})
        return {
            openNotification,
            sortedNotifications,
            hasNotifications,
        }
    }
})
</script>
<style scoped>
ul {
    list-style: none;
}
</style>
