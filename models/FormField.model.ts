export interface FormField {
  type:
    | "form-field-checkbox"
    | "form-field-file"
    | "form-field-upload-file"
    | "form-field-upload-file-multiple"
    | "form-field-label"
    | "form-field-select"
    | "form-field-select-combobox"
    | "form-field-select-autocomplete"
    | "form-field-text"
    | "form-field-text-markup"
    | "form-field-text-preview"
    | "form-field-text-preview-xl"
    | "form-field-textarea"
    | "form-field-title"
    | "form-field-password"
    | "form-field-preview"
    | "form-field-date-standard"
    | "form-field-date-year"
    | "form-field-download-button";
  onClick?: () => any;
  if?: () => Boolean;
  modelKey?: string;
  valueFunc?: (item: any) => string;
  label?: string;
  rules?: Array<any>;
  loading?: Boolean | (() => Boolean);
  disabled?: Boolean | (() => Boolean);
  multiple?: Boolean | (() => Boolean);
  readonly?: Boolean | (() => Boolean);
  items?: Array<any> | (() => Array<any>);
  placeholder?: string;
  "item-value"?: string;
  "item-text"?: string;
  to?: string;
  color?: string;
  colAttrs?: {
    "align-self"?: string;
    cols?: Boolean | string | number;
    lg?: Boolean | string | number;
    md?: Boolean | string | number;
    offset?: string | number;
    "offset-lg"?: string | number;
    "offset-md"?: string | number;
    "offset-sm"?: string | number;
    "offset-xl"?: string | number;
    order?: string | number;
    "order-lg"?: string | number;
    "order-md"?: string | number;
    "order-sm"?: string | number;
    "order-xl"?: string | number;
    sm?: Boolean | string | number;
    tag?: string;
    xl?: Boolean | string | number;
  };
}
