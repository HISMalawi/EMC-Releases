import Checkboxes from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import DatePicker from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import MultipleSelect from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import RadioSelect from "@/components/Forms/DesktopForms/FormElements/DTRadioSelect.vue"
import Select from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import SingleCheckbox from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"
import Text from "@/components/Forms/DesktopForms/FormElements/DTtext.vue"

export enum FieldType {
    DT_SELECT= 'Select',
    DT_TEXT = 'Text',
    DT_RADIO = 'RadioSelect',
    DT_DATEPICKER = 'DatePicker',
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
    Text
}
