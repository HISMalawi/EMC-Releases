export interface DTFormField {
  value: any;
  error: string;
  validation?: Function;
  computedValue?: Function;
}

export interface DTForm {
  [key: string]: DTFormField;
}