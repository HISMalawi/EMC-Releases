import { TaskInterface } from "@/apps/interfaces/TaskInterface";

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
        icon: 'surgical_history.png'
    },
    {
        id: 'medical history',
        name: 'Medical History',
        icon: 'medical_history.png'
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
        icon: 'social_history.png'
    },
    {
        id: 'lab results',
        name: 'Lab Results',
        icon: 'lab.png'
    },
    {
        id: 'obstetric history',
        name: 'Obstetric history',
        icon: 'obstetric_history.png'
    },
    {
        id: 'current pregnancy',
        name: 'Current Pregnancy',
        icon: 'current_preg.png'
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
        condition: () => false
    },
    {
        id: "hiv reception",
        name: "HIV reception",
        workflowID: "HIV reception visits",
        icon: "reception.png",
        condition: () => false
    },
    {
        id: "hiv staging",
        name: "HIV staging",
        workflowID: "HIV staging visits",
        icon: "hiv-staging.png",
        condition: () => false
    },
    {
        id: "hiv clinic consultation",
        name: "HIV clinic consultation",
        workflowID: "HIV clinic consultations",
        taskCompletionChecklist: [
          'Medication orders'
        ],
        icon: "consultation.png",
        condition: () => false
    },
    {
        id: "art adherence",
        name: "ART adherence",
        workflowID: "ART adherence",
        icon: "adherence.png",
        condition: () => false
    },
    {
        id: "treatment",
        name: "Treatment",
        workflowID: "Prescriptions",
        icon: "prescription.png",
        condition: () => false
    },
    {
        id: "dispensing",
        name: "Drug Dispensations",
        encounterTypeName: "DISPENSING",
        workflowID: "Drug Dispensations",
        icon: "dispensing.png",
        condition: () => false
    }
]
