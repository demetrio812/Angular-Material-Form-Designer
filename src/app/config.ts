import {FormComponent, FormInputComponent} from './model';

export class Config {

  private static inputText: FormInputComponent = {
    type: 'inputText',
    name: 'myInputText',
    text: 'myInputText',
    formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<input matInput placeholder="${ctx.name}" formControlName="${ctx.name}">\n</mat-form-field>`;
    },
  };

  private static button: FormComponent = {
    type: 'button',
    name: 'myButton',
    text: 'myButton',
    extraCode: (ctx: FormComponent) => {
      return `${ctx.name}Clicked() {\n   console.log('${ctx.name} clicked');\n}`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<button mat-raised-button color='primary' (click)='${ctx.name}Clicked()'>${ctx.text}</button>`;
    }
  };

  public static components: Array<FormComponent> = [
    Config.inputText,
    Config.button
  ];
}
