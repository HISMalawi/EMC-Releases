import { computed, ref } from "vue"
import { toastNotification } from "@/utils/Alerts";
import dayjs from "dayjs";

export interface NotificationInterface {
    title: string;
    message: string;
    read?: boolean;
    date?: string;
    handler?: () => void;
}

const notificationData = ref([] as NotificationInterface[])

export function Notification() {
    const unReadNotifications = computed((): NotificationInterface[] => {
        return notificationData.value.filter(n => !n.read)
    })
    const hasNotifications = computed((): boolean =>  {
        return notificationData.value.length > 0
    })
    const hasUnreadNotifications = computed((): boolean =>  {
        return unReadNotifications.value.length > 0
    })
    const notificationCount = computed((): number => {
        return unReadNotifications.value.length
    })

    const sortedNotifications = computed((): NotificationInterface[] => {
        return notificationData.value.sort((a, b) => {
            return new Date(a.date as string) > new Date(b.date as string) ? -1 : 1
        })
    })

    function pushNotification(notification: NotificationInterface) {
        const notice = {...notification}
        notice.read = false
        notice.date = dayjs().format('DD/MMM/YYYY HH:mm:ss')
        notificationData.value.push(notice)
        toastNotification(notification.title, notification.message)
    }
    return {
        pushNotification,
        sortedNotifications,
        hasUnreadNotifications,
        notificationCount,
        hasNotifications,
        notificationData
    }
}
