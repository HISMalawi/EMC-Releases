import Checkboxes from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import DatePicker from "@/components/Forms/DesktopForms/FormElements/DTDatePicker.vue"
import MultipleSelect from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import RadioSelect from "@/components/Forms/DesktopForms/FormElements/DTRadioSelect.vue"
import Select from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import SingleCheckbox from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import Text from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import Number from "@/components/Forms/DesktopForms/FormElements/DTNumber.vue"
import Secret from "@/components/Forms/DesktopForms/FormElements/DTsecret.vue"

export enum DTFieldType {
    DT_NUMBER = 'Number',
    DT_SECRET = 'Secret',
    DT_SELECT= 'Select',
    DT_TEXT = 'Text',
    DT_RADIO = 'RadioSelect',
    DT_DATE = 'DatePicker',
    DT_MULTIPLE_SELECT = 'MultipleSelect',
    DT_SINGLE_CHECKBOX = 'SingleCheckbox',
    DT_CHECKBOXES = 'Checkboxes'
}
export const DesktopFormElements = {
    Checkboxes,
    DatePicker,
    MultipleSelect,
    RadioSelect,
    Select,
    SingleCheckbox,
    Text,
    Number,
    Secret
}
