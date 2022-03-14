import { Option } from "../FieldInterface";
import { DTFieldType } from "@/components/Forms/DesktopForms/DTFormElements"

export interface DerivedInterface {
    observes: string[];
    update: (
        field: string,
        fieldData: Option | Option[] | null,
        FormData: Record<string, any>, 
        computedData: Record<string, any>
    ) => any;
}

export interface DtFieldInterface {
    /**
     * Uniquely identifies a field and might be used
     * as a direct reference for posting data
     */
    id: string;
    /**
     * Type of component to use for this field
     */
    type: DTFieldType;
    /**
     * Group form fields together in a single row
     */
    group?: string;
    /**
     * Label for field
     */
    helpText?: string;
    onUpdateHelpText?: DerivedInterface;
    /**
     * Field wont be allow to be empty if set to true
     */
    required?: boolean;
    onUpdateRequired?: DerivedInterface;
    /**
     * Preset a value on a field that allows for a single value 
    */
    defaultValueInput?: string | boolean | number;
    onUpdateDefaultValueInput?: DerivedInterface;
    /**
     * Default values to be checked from optionsList
     */
    defaultCheckedOptions?: Option[];
    onUpdateDefaultCheckOptions?: DerivedInterface;
    /**
     * Default single value Option
     */
    defaultValueOption?: Option | Promise<Option>;
    onUpdateDefaultValueOption?: DerivedInterface;
    /**
     * List of selection options for a field
     */
    options?: Option[] | Promise<Option[]>;
    onUpdateOptions?: DerivedInterface;
    /**
     * Toggle field visibility when formData changes
    */
    condition?: boolean;
    onUpdateCondition?: DerivedInterface; 
    /**
     * Disable a field component's actions
     */
    disabled?: boolean;
    onUpdateDisabled?: DerivedInterface;
    /**
     * Convert current input into something else
     */
    computeValue?: (value: Option[] | Option, formData: any, computedData: any) => any;
    /**
     * Validation check that runs before submission
    */
    validation?: (
        value:  Option | Option[] | null, 
        formData: any, 
        computedData: any
    ) => null | Array<string>;
    /**
     * Run value check before registering it
     */
    beforeValue?: (val: Option | Option[]) => boolean;
    /**
     * Miscelleneous configurations for field
     */
    config?: {
        component?: Record<string, any>;
        global?: Record<string, any>;
    };
}

export interface DtFormSections {
    section: string;
    fields: DtFieldInterface[]
}
