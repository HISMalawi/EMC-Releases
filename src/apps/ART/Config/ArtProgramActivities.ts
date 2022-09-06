import { TaskInterface } from "../../interfaces/TaskInterface"
import { PatientPrintoutService } from "@/services/patient_printout_service"
import { Patientservice } from "@/services/patient_service"
import Store from "@/composables/ApiStore"

export const PRIMARY_ACTIVITIES: TaskInterface[] = [
  {
    id: "hiv clinic registration",
    name: "Hiv clinic registration",
    workflowID: "HIV first visits",
    icon: "registration.png"
  },
  {
    id: "hiv reception",
    name: "HIV reception",
    workflowID: "HIV reception visits",
    icon: "reception.png"
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
    id: "hiv staging",
    name: "HIV staging",
    workflowID: "HIV staging visits",
    icon: "hiv-staging.png"
  },
  {
    id: "hiv clinic consultation",
    name: "HIV clinic consultation",
    workflowID: "HIV clinic consultations",
    taskCompletionChecklist: [
      'Medication orders'
    ],
    icon: "consultation.png"
  },
  {
    id: "art adherence",
    name: "ART adherence",
    workflowID: "ART adherence",
    icon: "adherence.png"
  },
  {
    id: "treatment",
    name: "Treatment",
    workflowID: "Prescriptions",
    icon: "prescription.png"
  },
  {
    id: "fast track assesment",
    name: "Fast Track assesment",
    icon: "fast-track.png",
    condition: () => Store.get('IS_ART_FAST_TRACK_ENABLED'),
    availableOnActivitySelection: false
  },
  {
    id: "dispensing",
    name: "Drug Dispensations",
    encounterTypeName: "DISPENSING",
    workflowID: "Drug Dispensations",
    icon: "dispensing.png"
  },
  {
    id: "appointment",
    name: "Manage Appointments",
    encounterTypeName: "APPOINTMENT",
    workflowID: "Manage Appointments",
    icon: "appointment.png"
  },
  {
    id: "patient type",
    name: "Patient Type",
    encounterTypeName: "Registration",
    icon: "patient-type.png",
    availableOnActivitySelection: false
  },
  {
    id: "bp_management",
    name: "bp_management",
    icon: "dispensing.png",
    encounterTypeName: "Hypertension management",
    condition: () => Store.get('IS_ART_HTN_ENABLED'),
    availableOnActivitySelection: false
  },
  {
    id: "bp_alert",
    name: "bp_alert",
    icon: "dispensing.png",
    condition: () => Store.get('IS_ART_HTN_ENABLED'),
    availableOnActivitySelection: false
  }
]

export const SECONDARY_ACTIVITIES: TaskInterface[] = [
  {
    id: "master_card",
    name: "Master card",
    description: "View mastercard",
    action: ({ patient }: any, router: any) => {
      router.push(`/art/mastercard/${patient.patient_id}`)
    },
    icon: "card.png"
  },
  {
    id: "f_number",
    name: "Filing Number (Print)",
    description: "Print Patient Filing Number",
    condition: async({patient}: any) => {
      const p = new Patientservice(patient)
      return (await Store.get('IS_ART_FILING_NUMBER_ENABLED')) && (p.hasActiveFilingNumber() || p.hasDormantFilingNumber())
    },
    action({ patient }: any) {
      const lbl = new PatientPrintoutService(patient.patient_id)
      return lbl.printFilingNumberLbl()
    },
    icon: "folder.png"
  },
  {
    id: "archive_client",
    name: "Archive client",
    description: "Archive a client",
    action: ({ patient }: any, router: any) => {
      router.push(`/art/filing_numbers/${patient.patient_id}?archive=true`)
    },
    condition: async ({ patient }: any) => {
      return (await Store.get('IS_ART_FILING_NUMBER_ENABLED')) && new Patientservice(patient).hasActiveFilingNumber()
    },
    icon: "archive.png"
  },
  {
    id: "assign_filing_number",
    name: "Assign filing number",
    description: "Assign a new filing number",
    condition: async ({patient}: any) => {
      const _p = new Patientservice(patient)
      return (await Store.get('IS_ART_FILING_NUMBER_ENABLED')) && (_p.hasDormantFilingNumber() || !_p.hasActiveFilingNumber())
    },
    action: ({ patient }: any, router: any) => {
      router.push(`/art/filing_numbers/${patient.patient_id}?assign=true`)
    },
    icon: "archive.png"
  },
  {
    id: "filing_number_trail",
    name: "View filing number trail",
    description: "view trail",
    action: ({ patient }: any, router: any) => {
      router.push(`/art/filing_numbers/${patient.patient_id}?trail=true`)
    },
    condition: () =>  Store.get('IS_ART_FILING_NUMBER_ENABLED'),
    icon: "folder.png"
  }
]
