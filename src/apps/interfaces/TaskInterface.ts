export interface TaskInterface {
    id: string;
    name: string;
    globalProperty?: string;
    availableOnActivitySelection?: boolean;
    description?: string;
    url?: string;
    workflowID?: string;
    encounterTypeName?: string;
    taskCompletionChecklist?: string[];
    action?: Function;
    icon: string;
    taskCompleted?: boolean;
    condition?: (params: any) => boolean | Promise<boolean>;
}
