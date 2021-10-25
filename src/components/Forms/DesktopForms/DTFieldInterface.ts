import { Option } from "../FieldInterface";
import { FieldType } from "@/components/Forms/DesktopForms/DTFormElements"

export interface DtFieldInterface {
    /**
     * Uniquely identifies a field and might be used
     * as a direct reference for posting data
     */
    id: string;
    /**
     * Type of component to use for this field
     */
    type: FieldType;
    /**
     * Group form fields together in a single row
     */
    group?: string;
    /**
     * Configure row size as displayed on different device  
     */
    colSizes: {
        sm: number;
        md: number;
        lg: number;
    };
    /**
     * Label for field
     */
    helpText: {
        derive: Array<string> | 'All' | 'None';
        handler: (formData: any, computedData: any) => string;
    };
    /**
     * Field wont be allow to be empty if set to true
     */
    required?:  {
        derive: Array<string> | 'All' | 'None';
        handler: (formData: any, computedData: any) => boolean;
    };
    /**
     * Preset a value on a field that allows for a single value 
    */
    defaultValue?: (formData: any, computedData: any) => string | number;
    /**
     * List of selection options for a field
     */
    options?: {
        derive: Array<string> | 'All' | 'None';
        handler: (formData: any, computedData: any) => Promise<Option[]> | Option[];
    };
    /**
     * Convert current input into something else
     */
    computeValue?: (value: Option[] | Option, formData: any, computedData: any) => any;
    /**
     * Validation check that runs before submission
    */
    validation?: (value: Option, formData: any, computedData: any) => null | Array<string>;
    /**
     * Run value check before registering it
     */
    beforeValue?: (val: Option | Option[]) => boolean;
    /**
     * Toggle field visibility when formData changes
     */
    visible?: (formData: any, computedData: any) => boolean;
    /**
     * Disable a field component's actions
     */
    disabled?: (formData: any, computedData: any) => boolean;
    /**
     * Miscelleneous configurations for field
    */
    config: {
        component?: Record<string, any>;
        global?: Record<string, any>;
    };
}
