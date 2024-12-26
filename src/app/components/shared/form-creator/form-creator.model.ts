export interface FormCreatorModel {
}


export interface FormModalField {
  type: FormFieldType;
  className?: string[] | string;
  label: string;
  name: string;
  value: string | boolean | number;
  validations: string[];
  command?: (event?: any, field?: FormModalField) => any;
  mask?: string;
  placeholder?: string;
  suffix?: string;
  ltr?: boolean;
  showEdit?: boolean;
  readonly?: boolean;
  extraDataComplete?: any;
  extraData?: FormFieldSelectData[];
  extraOption?: FormFieldSelectOption
}

export interface FormFieldCommand {

}

export interface FormModalOptions {
  loading: boolean;
  doubleCheck: boolean;
  editable: boolean;
  label?: string;
}

export interface FormFieldSelectOption {
  filter?: boolean;
  filterBy?: string;
  showClear?: boolean;
}


export interface FormFieldSelectData {
  label: string,
  value: string | number,
  icon?: string,
  styleClass?:string
}


export enum FormFieldType {
  HIDDEN = 'hidden',
  TEXT = 'text',
  NUMBER = 'text',
  SWITCH = 'switch',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  SELECT = 'select',
  SELECT_TEMPLATE='select_template',
  SELECT_BUTTON='select_button',
  AUTOCOMPLETE = 'autoComplete',
  EDITOR = 'editor',
  PASSWORD = 'password',
  DATE = 'date',
}
