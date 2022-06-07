import { Option } from '@/components/Forms/FieldInterface';

export interface DTFormField {
  value: any;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  validation?: Function;
  computedValue?: Function;
}

export interface DTForm {
  [key: string]: DTFormField;
}