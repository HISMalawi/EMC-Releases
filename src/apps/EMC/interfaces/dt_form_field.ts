export interface DTFormField {
  [x: string]: {
    value: any;
    error: string;
    validation?: Function;
    computedValue?: Function;
  };
}