import { Service } from "./service";

export class NotificationService extends Service {
    static read(Notifications: any) {
        return this.putJson('notifications/update', { alerts: Notifications });
    }

    static unread() {
        return this.getJson('notifications');
    }
}
