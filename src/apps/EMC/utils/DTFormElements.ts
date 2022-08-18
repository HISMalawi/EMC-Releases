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