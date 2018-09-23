import {FormComponent, FormInputComponent} from './model';

export class Config {

  private static input: FormInputComponent = {
    type: 'input',
    name: 'myInputText',
    text: 'myInputText',
    flex: 'auto',
    formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<input matInput placeholder="${ctx.text}" formControlName="${ctx.name}">\n</mat-form-field>`;
    },
  };

  private static textarea: FormInputComponent = {
    type: 'textarea',
    name: 'myTextarea',
    text: 'myTextarea',
    flex: 'auto',
    formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<textarea matInput placeholder="${ctx.text}" formControlName="${ctx.name}"></textarea>\n</mat-form-field>`;
    },
  };

  private static select: FormInputComponent = {
    type: 'select',
    name: 'mySelect',
    text: 'mySelect',
    flex: 'auto',
    formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<mat-select placeholder="${ctx.text}" formControlName="${ctx.name}"></mat-select>\n</mat-form-field>`;
    },
  };

  private static button: FormComponent = {
    type: 'button',
    name: 'myButton',
    text: 'myButton',
    flex: 'none',
    extraCode: (ctx: FormComponent) => {
      return `${ctx.name}Clicked() {\n   console.log('${ctx.name} clicked');\n}`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<button mat-raised-button color='primary' (click)='${ctx.name}Clicked()'>${ctx.text}</button>`;
    }
  };

  public static components: Array<FormComponent> = [
    Config.input,
    Config.textarea,
    Config.select,
    Config.button
  ];
}
