import { TaskInterface } from "@/apps/interfaces/TaskInterface";

export const PRIMARY_ACTIVITIES: TaskInterface[] = [
  {
    id: 'patient registration',
    name: 'Patient registration',
    icon: 'attributes.png'
  },
  {
    id: 'vitals',
    name: 'Vitals',
    icon: 'vitals.png'
  },
  {
    id: 'presenting complaints',
    name: 'Presenting complaints',
    icon: 'complaints.png'
  },
  {
    id: 'hiv status',
    name: 'HIV STatus',
    icon: 'aids.png',
    encounterTypeName: 'update hiv status',
    availableOnActivitySelection: false
  },
  {
    id: 'outpatient diagnosis',
    name: 'Outpatient diagnosis',
    icon: 'diagnosis.png'
  },
  {
    id: 'outcome status',
    name: 'Outcome status',
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
    id: 'OPD social history',
    name: 'OPD social history',
    icon: 'medical-report.png',
    availableOnActivitySelection: false
  },
  {
    id: 'prescription',
    name: 'Prescription',
    encounterTypeName: 'Treatment',
    icon: 'drugs-given.png'
  },
  {
    id: 'dispensation',
    name: 'Dispensing',
    encounterTypeName: 'dispensing',
    icon: 'dispensing.png',
  },
]

export const SECONDARY_ACTIVITIES: TaskInterface[] = [
  {
    id: 'radiology examination',
    name: 'radiology examination',
    icon: 'radiology_types.png'
  },
]
