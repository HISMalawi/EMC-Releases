import { FieldType } from "@/components/Forms/BaseFormElements"

export interface OptionDescriptionInterface {
    color: 'primary' | 'warning' | 'danger' | 'secondary' | 'light';
    show?: 'onChecked' | 'always';
    text: string;
}

export interface BtnStates {
    visible?: Record<string, (formData: any, computedData: any) => boolean>;
    disabled?: Record<string, (formData: any, computedData: any) => boolean>;
}

export interface FormFooterBtns {
    name: string;
    size?: 'large' | 'small';
    slot?: 'start' | 'end';
    color?: 'success' | 'primary' | 'warning' | 'secondary' | 'danger';
    state?: BtnStates;
    onClick: (btn: FormFooterBtns, formData: any) => void;

}
export interface Option {
    label: string;
    value: string | number;
    other?: any;
    isChecked?: boolean;
    disabled?: boolean;
    description?: OptionDescriptionInterface;
}

export interface Field {
    id: string | number;
    helpText: string;
    type: FieldType;
    group?: string;  // Categories fields with related data
    computedValue?: Function;
    preset?: Option | Record<string, any>;
    defaultValue?: (fdata?: any, cdata?: any, other?: any) => any;
    condition?: Function;
    validation?: Function;
    beforeNext?: Function;
    onValue?: Function;
    onValueUpdate?: Function;
    onload?: Function;
    unload?: Function;
    summaryMapValue?: Function;
    appearInSummary?: Function;
    options?(fdata?: any, cdata?: any, other?: any): Promise<Option[]> | Array<Option>;
    requireNext?: boolean;
    config?: Record<string, any>;
}
