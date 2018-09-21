
export interface FormComponent {
  type: string;
  name: string;
  text: string;

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
