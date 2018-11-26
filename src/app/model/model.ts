import {ITdDynamicElementConfig} from '@covalent/dynamic-forms';

export interface Form {
  name: string;
  rows: Array<FormRow>;
  configProperties: ITdDynamicElementConfig[];
}

export interface FormRow {
  uuid: string;
  type: string;
  description: string;
  fxLayout?: string;
  fxLayoutWrap?: boolean;
  fxLayoutAlignMainAxis?: string;
  fxLayoutAlignCrossAxis?: string;
  fxLayoutGap?: string;
  components: Array<FormComponent>;
  configProperties: ITdDynamicElementConfig[];
}

export interface FormComponent {
  uuid: string;
  type: string;
  name: string;
  text: string;
  flex?: string;
  flexFill?: boolean;

  configProperties: ITdDynamicElementConfig[];

  // extraCode?: (ctx: FormComponent) => string;
  // htmlCode?: (ctx: FormComponent) => string;
}

export interface FormInputComponent extends FormComponent {
  required: boolean;
  validators?: Array<FormInputValidator>;
  // formBuilderCode?: (ctx: FormComponent) => string;
}

export interface FormInputValidator {
  type: string;
  value: string;
  code?: (ctx: FormComponent) => string;
  // htmlCode?: (ctx: FormComponent) => string;
}

export interface ComponentConverter<CLASS> {
  type: string;
  formBuilderCode?: (ctx: CLASS) => string;
  extraCode?: (ctx: CLASS) => string;
  htmlCode?: (ctx: CLASS) => string;
}
