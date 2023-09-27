import { TaskInterface } from "@/apps/interfaces/TaskInterface";

export const PRIMARY_ACTIVITIES: TaskInterface[] = [
  {
    id: 'AETC patient registration',
    name: 'AETC Patient registration',
    icon: 'attributes.png'
  },
  {
    id: 'AETC vitals',
    name: 'AETC vitals',
    icon: 'vitals.png'
  },
  {
    id: 'AETC presenting complaints',
    name: 'AETC presenting complaints',
    icon: 'complaints.png'
  },
  {
    id: 'AETC hiv status',
    name: 'AETC hiv status',
    icon: 'aids.png',
    encounterTypeName: 'update hiv status',
    availableOnActivitySelection: false
  },
  {
    id: 'AETC outpatient diagnosis',
    name: 'AETC outpatient diagnosis',
    icon: 'diagnosis.png'
  },
  {
    id: 'AETC outcome status',
    name: 'AETC outcome status',
    icon: 'outcomes.png',
    availableOnActivitySelection: false
  },
  {
    id: 'lab orders',
    name: 'Lab orders',
    icon: 'clinical-notes.png',
    availableOnActivitySelection: false,
    action: ({patient}: any, router: any) => {
      router.push(`/los/forms/order/${patient.patient_id}?type=DRAW_SAMPLES`)
    }
  },
  {
    id: 'lab results',
    name: 'Lab results',
    icon: 'enter.png',
    availableOnActivitySelection: false,
    action: ({ patient }: any, router: any) => {
      router.push({ path: `/lab/results/${patient.patient_id}`})
    },
  },
  {
    id: 'AETC social history',
    name: 'AETC social history',
    icon: 'medical-report.png'
  },
  {
    id: 'AETC prescription',
    name: 'AETC prescription',
    encounterTypeName: 'Treatment',
    icon: 'drugs-given.png'
  },
  {
    id: 'AETC dispensation',
    name: 'AETC dispensation',
    workflowID:"Dispensing",
    icon: 'dispensing.png',
    availableOnActivitySelection: false
  },
]

export const SECONDARY_ACTIVITIES: TaskInterface[] = [
  {
    id: 'AETC radiology examination',
    name: 'AETC radiology examination',
    icon: 'radiology_types.png'
  },
]
