import { computed, ref } from "vue";
import { NotificationService } from "@/services/notification_service"
import HisDate from "@/utils/Date";
import router from "@/router/index";
import { isEmpty } from "lodash";
import { toastWarning } from "@/utils/Alerts";

export interface NotificationInterface {
    id: number;
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

    async function loadNotifications() {
        const notifications = await NotificationService.unread()
        if (!isEmpty(notifications)) {
            notificationData.value = notifications.map((n: any) => {
                let type = 'General'
                let message = n.text
                let handler = null
                try {
                    const t = JSON.parse(n.text)
                    type = t['Type']
                    if (type.match(/lims/i)) {
                        message = `Accession# ${t['Accession number']} result for ${t['Test type']} available`
                        handler = () => router.push(`/patient/dashboard/${t['patientID']}`)
                    }
                } catch (e) {
                    console.warn(e)
                }
                return {
                    message,
                    handler,
                    title: type,
                    id: n.alert_id,
                    date: HisDate.toStandardHisDisplayFormat(n.date_created)
                }
            })
            toastWarning(`You have ${notifications.length} unread notifications`)
        }
    }

    async function openNotification(notification: NotificationInterface) {
        notification.read = true
        if ((await NotificationService.read([notification.id]))) {
            if (typeof notification.handler === 'function') {
                notification.handler()
            }
        }
    }

    return {
        openNotification,
        loadNotifications,
        sortedNotifications,
        hasUnreadNotifications,
        notificationCount,
        hasNotifications,
        notificationData
    }
}
