import { computed, ref } from "vue"
import { toastNotification } from "@/utils/Alerts";

export interface NotificationInterface {
    title: string;
    message: string;
    read?: boolean;
    data?: any;
    handler?: () => void;
}

const notificationData = ref([] as NotificationInterface[])

export function Notification() {
    const unReadNotifications = computed((): NotificationInterface[] => {
        return notificationData.value.filter(n => !n.read)
    })
    const hasNotifications = computed((): boolean =>  {
        return unReadNotifications.value.length > 0
    })
    const notificationCount = computed((): number => {
        return unReadNotifications.value.length
    })
    function pushNotification(notification: NotificationInterface) {
        const notice = {...notification}
        notice.read = false
        notificationData.value.push(notice)
        toastNotification(notification.title, notification.message)
    }
    return {
        pushNotification,
        notificationCount,
        hasNotifications,
        notificationData
    }
}
