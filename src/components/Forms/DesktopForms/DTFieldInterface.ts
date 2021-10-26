import { Option } from "../FieldInterface";
import { DTFieldType } from "@/components/Forms/DesktopForms/DTFormElements"

export interface DerivedInterface {
    observes: string[];
    update: (
        tracking: {
            field: string;
            value: Option | Option[] | null;
        },
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
     * Configure row size as displayed on different device  
     */
    colSizes?: {
        sm: number;
        md: number;
        lg: number;
    };
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
    defaultValue?: string;
    onUpdateDefaultValue?: DerivedInterface;
    /**
     * List of selection options for a field
     */
    options?: Option[];
    onUpdateOptions?: DerivedInterface;
    /**
     * Toggle field visibility when formData changes
    */
    visible?: boolean;
    onUpdateVisible?: DerivedInterface; 
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
