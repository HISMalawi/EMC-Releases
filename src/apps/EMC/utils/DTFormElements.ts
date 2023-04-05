import { Option } from "@/components/Forms/FieldInterface";

export function toOptions(str: string[]) {
  return str.map<Option>(s => ({
    value: s,
    label: s
  }))
}

export const yesNoOptions: Option[] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" }
]

export const genderOptions: Option[] = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
];

export const tbStatusOptions: Option[] = [
  ...toOptions([
    "TB NOT suspected",
    "TB suspected",
    "Confirmed TB NOT on treatment",
    "Confirmed TB on treatment"
  ])
]

export const initialTbStatusOptions: Option[] = [
  ...toOptions([
    "Current",
    "Last 2 years",
    "More than 2 years",
    "Never"
  ])
]

export const HIVTestOptions = [
  { label: 'Rapid antibody test', value: 'HIV rapid test'},
  { label: 'DNA PCR', value: 'HIV DNA polymerase chain reaction'},
  { label: 'Not done', value: 'Not done' }
]

export const tptHistoryOptions = toOptions([
  "Currently on IPT",
  "Currently on 3HP (RFP + INH)",
  "Currently on INH 300 / RFP 300 (3HP)",
  "Complete course of 3HP in the past (3 months RFP+INH)",
  "Complete course of IPT in the past (min. 6 months of INH)",
  "Aborted course of 3HP (RFP + INH) in the past",
  "Aborted course of INH 300 / RFP 300 (3HP) in the past",
  "Aborted course of IPT in the past",
  "Never taken IPT or 3HP"
])

export const transferOutReasons = toOptions([
  'Workplace transfer/lost job-related reasons',
  'Relocation to another place/home village',
  'Transport due to long distance',
  'School',
  'Business',
  'Marriage',
  'Unknown',
  'Clinic not helping',
  'Other'
])