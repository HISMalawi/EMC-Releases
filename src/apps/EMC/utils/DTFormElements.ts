import { Option } from "@/components/Forms/FieldInterface";

function strToOptions(str: string[]) {
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
  ...strToOptions([
    "TB NOT suspected",
    "TB suspected",
    "Confirmed TB NOT on treatment",
    "Confirmed TB on treatment"
  ])
]

export const HIVTestOptions = [
  ...strToOptions([
    "Rapid Antibody Test",
    "DNA PCR",
    "Not Done",
  ])
]