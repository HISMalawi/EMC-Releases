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
                    if (t['Type'].match(/lims/i)) {
                        type = `${t['Test type']} results for ${t['ARV-Number'] || t['Accession number']}`
                        message = `Ordered by <b>${t['Ordered By'] || 'N/A'}</b>`
                        handler = () => router.push(`/art/encounters/lab/${t['PatientID']}`)
                    }
                } catch (e) {
                    console.warn(e)
                }
                return {
                    handler,
                    message,
                    title: type,
                    id: n.alert_id,
                    date: HisDate.toStandardHisDisplayFormat(n.date_created)
                }
            })
            toastWarning(`You have ${notifications.length} unread notification(s)`)
        }
    }

    async function markAllAsRead() {
        const data = notificationData.value.filter(n => !n.read)
        if (!isEmpty(data)) {
            if ((await NotificationService.read(data.map(n => n.id)))) {
                notificationData.value = notificationData.value.map(n => {
                    return {
                        ...n,
                        read: true
                    }
                })
            }
        }
    }

    function openNotification(notification: NotificationInterface) {
        if (typeof notification.handler === 'function') {
            notification.handler()
        }
    }

    return {
        markAllAsRead,
        openNotification,
        loadNotifications,
        sortedNotifications,
        hasUnreadNotifications,
        notificationCount,
        hasNotifications,
        notificationData
    }
}
