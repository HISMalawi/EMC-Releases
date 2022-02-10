import { WorkflowService } from "@/services/workflow_service"
import { isEmpty } from "lodash"

export enum WorkflowSessionKeys {
    NextTask = 'next-task'
}

export interface NextWorkflow {
    from: string;
    to: string;
}

export function addWorkflowTask(patientID: number, task: NextWorkflow) {
    if (!sessionStorage.getItem(WorkflowSessionKeys.NextTask)) {
        sessionStorage.setItem(
            WorkflowSessionKeys.NextTask,
            JSON.stringify({ patientID, tasks: [] })
        )
    } 
    const data = JSON.parse(sessionStorage.getItem(WorkflowSessionKeys.NextTask) as any)
    if (patientID === data.patientID) {
        data.tasks.push(task)
    } else {
        data.patientID = patientID
        data.tasks = [task]
    }
    sessionStorage.setItem(WorkflowSessionKeys.NextTask, JSON.stringify(data))
}

function goToNextSessionTask(patientID: number, router: any, curRoute: any) {
    const sessionData = sessionStorage.getItem(WorkflowSessionKeys.NextTask)

    if (!sessionData) return -1

    const data = JSON.parse(sessionData)

    if (patientID != data.patientID) return -1

    let task = ''
    let index = -1
    data.tasks.forEach((t: NextWorkflow, i: number) => {
        if (t.from === curRoute.name) {
            task = t.to
            index = i
        } 
    })
    if (task) {
        data.tasks.splice(index, 1)
        sessionStorage.setItem(WorkflowSessionKeys.NextTask, JSON.stringify(data))
        router.push(task)
        return 1
    }
    return -1
}

export async function nextTask(patientID: number, router: any, curRoute: any = {}) {
   try {
        if (!isEmpty(curRoute)) {
            const sessionTask = goToNextSessionTask(patientID, router, curRoute)
            if (sessionTask != -1) return
        }
        const { name } = await WorkflowService.nextTask(patientID)
        if (name) {
            router.push({
                name: name.toLowerCase(),
                params: { 'patient_id': patientID }
            })
            return
        }
   } catch (e) { 
       console.log(e) 
    }
   router.push(`/patient/dashboard/${patientID}`)
}
