import { Option } from '@/components/Forms/FieldInterface';

export interface DTFormField {
  value: any;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  validation?: (value: Option, form: DTForm) => Promise<string[] | false | null | undefined>;
  computedValue?: (value: any, form?: DTForm) => any;
}

export interface DTForm {
  [key: string]: DTFormField;
}