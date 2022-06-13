import { computed, ref } from "vue";
import { toastNotification } from "@/utils/Alerts";
import dayjs from "dayjs";
import { Service } from "@/services/service";

export interface WebsocketNotificationInterface {
    channelConf: {
        channel: string;
        room: string;
    };
    notificationBuilder: (data: any) => NotificationInterface;
}

export interface NotificationInterface {
    title: string;
    message: string;
    read?: boolean;
    date?: string;
    handler?: () => void;
}

let wbConsumer = null as any

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

    function openNotification(notification: NotificationInterface) {
        if (typeof notification.handler === 'function') {
            notification.read = true
            notification.handler()
        }
    }

    async function initNotificationSocket(params: WebsocketNotificationInterface) {
        if (!wbConsumer) {
            wbConsumer = await Service.createWebsocketConsumer()
        }
        const ID = `${params.channelConf.channel} ${params.channelConf.room}`
        wbConsumer.subscriptions.create(params.channelConf,
        {
            connected: function(){
                console.log("connected to " + ID)
            },
            disconnected: function(){
                console.log("disconnected " + ID)
            },
            rejected: function(){
                console.log("rejected " + ID)
            },
            received: function (data: any) {
                pushNotification(params.notificationBuilder(data))
            }
        })
    }

    return {
        initNotificationSocket,
        pushNotification,
        openNotification,
        sortedNotifications,
        hasUnreadNotifications,
        notificationCount,
        hasNotifications,
        notificationData
    }
}
