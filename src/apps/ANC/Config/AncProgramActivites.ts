import { TaskInterface } from "@/apps/interfaces/TaskInterface";
import Apps from '@/apps/app_lib'
import { alertConfirmation } from "@/utils/Alerts";
import { PatientTypeService } from "@/apps/ART/services/patient_type_service";
import { AncLabResultService } from "@/apps/ANC/Services/anc_lab_result_service"
import router from "@/router";

/**
 * Callback method for Encounters that integrate with ART system
 * @param params 
 * @param contextAction 
 */
async function onPMTCTworkflowTask(params: any) {
    if ((await alertConfirmation(`Do you want switch to ART Application to proceed with PMTCT tasks?`))) {
        Apps.switchAppWorkflow('ART', params.patientID, params.router, 
        async () => {
            const enc = new PatientTypeService(params.patientID, -1);
            await enc.createEncounter()
            await enc.savePatientType('New patient')
        })
    } else {
        params.router.push('/patient/dashboard/'+params.patientID)
    }
}

function encounterWasSaved(savedEncounters: string[] | undefined, encounterName: string) {
    if (Array.isArray(savedEncounters)) {
        return savedEncounters.includes(encounterName)
    }
    return false
}

export const SECONDARY_ACTIVITIES: TaskInterface[] = [
    {
        id: 'print_session_lab_results',
        name: 'Lab results (Print)',
        icon: "barcode.svg",
        action: async ({ patientID, visitDate }: any) => {
            const lab = new AncLabResultService(patientID, -1)
            lab.date = visitDate
            await lab.printLabResults()
        }
    }
]

export const PRIMARY_ACTIVITIES: TaskInterface[] = [
    {
       id: 'anc dispensing',
       name: 'TTV VACCINATION',
       encounterTypeName: 'DISPENSING',
       icon: 'prescription/medication.png'
    },
    {
        id: 'anc visit type',
        name: 'ANC VISIT TYPE',
        icon: 'registration.png'
    },
    {
        id: 'surgical history',
        name: 'SURGICAL HISTORY',
        icon: 'surgical_history.png',
        disabled: (params: any) => {
            return encounterWasSaved(
                params.savedEncounters, 
                'SURGICAL HISTORY'
            )
        }
    },
    {
        id: 'medical history',
        name: 'Medical History',
        icon: 'medical_history.png',
        disabled: (params: any) => {
            return encounterWasSaved(
                params.savedEncounters, 
                'MEDICAL HISTORY'
            )
        }
    },
    {
        id: 'anc examination',
        name: 'Examination',
        workflowID: 'ANC examination',
        encounterTypeName: 'ANC EXAMINATION',
        icon: 'diagnosis.png'
    },
    {
        id: 'social history',
        name: 'Social History',
        icon: 'social_history.png',
        disabled: (params: any) => {
            return encounterWasSaved(
                params.savedEncounters, 
                'SOCIAL HISTORY'
            )
        }
    },
    {
        id: 'lab results',
        name: 'Lab Results',
        icon: 'lab.png'
    },
    {
        id: 'obstetric history',
        name: 'Obstetric history',
        icon: 'obstetric_history.png',
        disabled: (params: any) => {
            return encounterWasSaved(
                params.savedEncounters, 
                'OBSTETRIC HISTORY'
            )
        }
    },
    {
        id: 'current pregnancy',
        name: 'Current Pregnancy',
        icon: 'current_preg.png',
        disabled: (params: any) => {
            return encounterWasSaved(
                params.savedEncounters, 
                'CURRENT PREGNANCY'
            )
        }
    },
    {
        id: 'anc treatment',
        workflowID: 'Give drugs',
        name: 'anc treatment',
        encounterTypeName: 'TREATMENT',
        icon: 'dispensing.png'
    },
    {
        id: 'art_followup',
        name: 'art_followup',
        workflowID: 'ARV Follow Up',
        icon: 'pmtct.png'
    },
    {
        id: "vitals",
        name: "Vitals",
        icon: "vitals.png",
        action: (params: any) => {
            router.push(`/anc/encounters/vitals/${params.patientID}`)
        },
        taskCompletionChecklist: [
          'Weight'
        ]
    },
    {
        id: "appointment",
        name: "Manage Appointments",
        encounterTypeName: "APPOINTMENT",
        workflowID: "Manage appointment",
        icon: "appointment.png"
    },
    {
        id: "hiv clinic registration",
        name: "Hiv clinic registration",
        workflowID: "HIV first visits",
        icon: "registration.png",
        action: (params: any) => onPMTCTworkflowTask(params),
        condition: () => false
    },
    {
        id: "hiv reception",
        name: "HIV reception",
        workflowID: "HIV reception visits",
        icon: "reception.png",
        action: (params: any) => onPMTCTworkflowTask(params),
        condition: () => false
    }
]
