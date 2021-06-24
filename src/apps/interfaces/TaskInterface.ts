export interface TaskInterface {
    id: string;
    name: string;
    description?: string;
    url?: string;
    action?: Function;
    icon: string;
}