import {ITdDynamicElementConfig} from '@covalent/dynamic-forms';

export interface FormRow {
  type: string;
  description: string;
  fxLayout?: string;
  fxLayoutAlign?: string;
  fxLayoutGap?: string;
  components: Array<FormComponent>;
  configProperties: ITdDynamicElementConfig[];
  setProperties: (ctx: FormRow, values: any) => void;
}

export interface FormComponent {
  type: string;
  name: string;
  text: string;
  flex?: string;

  extraCode?: (ctx: FormComponent) => string;
  htmlCode?: (ctx: FormComponent) => string;
}

export interface FormInputComponent extends FormComponent {
  validators?: Array<FormInputValidator>;
  formBuilderCode?: (ctx: FormComponent) => string;
}

export interface FormInputValidator {
  type: string;
  value: string;
  code?: (ctx: FormComponent) => string;
  htmlCode?: (ctx: FormComponent) => string;
}
