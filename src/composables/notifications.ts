import { computed, ref } from "vue";
import { NotificationService } from "@/services/notification_service"
import HisDate from "@/utils/Date";
import router from "@/router/index";
import { isEmpty } from "lodash";
import { alertConfirmation, toastWarning } from "@/utils/Alerts";
import { toDate } from "@/utils/Strs";

export interface NotificationInterface {
    id: number;
    title: string;
    message: any;
    vlMessageObs: any;
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

    function clearNotification(id: number|string) {
        alertConfirmation("Are you sure you want to clear notification?")
            .then((ok) => {
                if (ok) {
                    NotificationService.clear(id)
                        .then(() => {
                            notificationData.value = notificationData.value.filter(
                                (notice) => notice.id != id
                            )
                        }).catch((e) => {
                            console.error(e)
                            toastWarning("Unable to clear notification")
                        })
                }
            })
    }

    async function loadNotifications() {
        const notifications = await NotificationService.unread()
        if (!isEmpty(notifications)) {
            const vlMessageObs : any = {'highVL':[],'normalVL':[],'rejectedVL':[]}
            let vlMessage = {}
            notificationData.value = notifications.map((n: any) => {
                let type = 'General'
                const message = n.text
                
                
                let handler = null
                try {
                   
                    const t = JSON.parse(n.text)
                    if (t['Type'].match(/lims/i)) {
                        handler = () => router.push(`/art/encounters/lab/${t['PatientID']}`)
                        type = `${t['Test type']} results for ${t['ARV-Number'] || t['Accession number']}`
                        const viralLoadStatus = isHighViralLoadResult(t['Result'][0]['value'],t['Result'][0]['value_modifier'])
                        
                        vlMessage = {
                            'handler':handler,
                            'id':n.alert_id,
                            'arv':t['ARV-Number'] ,
                            'accession':t['Accession number'] ,
                            'order_date':toDate(t['Orde date']),
                            'results': t['Result'][0]['value_modifier'] +" "+ t['Result'][0]['value'],
                            'results_date':toDate(t['Result'][0]['date'])
                        }

                        if(viralLoadStatus)
                        {
                            vlMessageObs.highVL.push(vlMessage)
                            
                        }else
                        if(t['rejection_reason']){
                            vlMessage = {
                                'handler':handler,
                                'id':n.alert_id,
                                'arv':t['arv_number'] ,
                                'accession':t['accession_number'] ,
                                'order_date':toDate(t['order_date']),
                                'rejection_reason':t['rejection_reason']
                            }
                            vlMessageObs.rejectedVL.push(vlMessage)

                        }else
                        if(!viralLoadStatus)
                        {
                            vlMessageObs.normalVL.push(vlMessage)
                        }
                        
                    }
                } catch (e) {
                    console.warn(e)
                }
                return {
                    handler,
                    message,
                    vlMessageObs,
                    title: type,
                    id: n.alert_id,
                    date: toDate(n.date_created)
                }
            })
            toastWarning(`You have ${notifications.length} unread notification(s)`)
        }
    }
    function isHighViralLoadResult(value: any,value_modifier: any) {
        
        if(value_modifier === '=' && parseFloat(value) >= 1000) return true

        if((value_modifier  === '<' || value_modifier  === '&lt') 
            && parseFloat(value) > 1000
        )  return true

        if((value_modifier  === '>' || value_modifier  === '&gt') 
            && (parseFloat(value) >= 1000 || `${value}`.toUpperCase().replace(/\s+/g, '') == 'LDL')
        )  return true

        return false
    }

    async function markAsRead(notification: NotificationInterface) {
        NotificationService.read([notification.id])
            .then(() => notification.read = true)
    }

    function openNotification(notification: NotificationInterface) {
        if (typeof notification.handler === 'function') {
            markAsRead(notification)
            notification.handler()
        }
    }

    return {
        markAsRead,
        openNotification,
        loadNotifications,
        clearNotification,
        sortedNotifications,
        hasUnreadNotifications,
        notificationCount,
        hasNotifications,
        notificationData
    }
}
