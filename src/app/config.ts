import {FormComponent, FormInputComponent, FormRow} from './model';
import {TdDynamicElement} from '@covalent/dynamic-forms';

export class Config {


  static formInputComponentDefaultConfigProperties = [
    {
      name: 'name',
      label: 'Name',
      type: TdDynamicElement.Input
    },
    {
      name: 'text',
      label: 'Text',
      type: TdDynamicElement.Input,
      required: false
    },
    {
      name: 'flex',
      label: 'Flex',
      type: TdDynamicElement.Input,
      hint: 'i.e. 50%',
      required: false
    }];

  static flexRow: FormRow = {
    type: 'flexRow',
    description: 'Flex Row',
    fxLayout: 'row',
    fxLayoutWrap: false,
    fxLayoutAlignMainAxis: 'space-around',
    fxLayoutAlignCrossAxis: 'center',
    fxLayoutGap: '',
    components: [],
    configProperties: [
      {
        name: 'fxLayout',
        label: 'fxLayout',
        type: TdDynamicElement.Select,
        required: true,
        selections: ['row', 'column', 'row-reverse', 'column-reverse'],
        default: 'row'
      },
      {
        name: 'fxLayoutWrap',
        label: 'fxLayout+Wrap',
        type: TdDynamicElement.Checkbox,
        default: false,
        required: true
      },
      {
        name: 'fxLayoutAlignMainAxis',
        label: 'fxLayoutAlign-MainAxis',
        type: TdDynamicElement.Select,
        required: true,
        selections: ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'],
        default: 'start'
      },
      {
        name: 'fxLayoutAlignCrossAxis',
        label: 'fxLayoutAlign-CrossAxis',
        type: TdDynamicElement.Select,
        required: true,
        selections: ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly', 'stretch'],
        default: 'start'
      },
      {
        name: 'fxLayoutGap',
        label: 'fxLayoutGap',
        type: TdDynamicElement.Input,
        hint: 'i.e. 10px',
        required: false
      }]
  };

  static input: FormInputComponent = {
    type: 'input',
    name: 'myInputText',
    text: 'myInputText',
    flex: 'auto',
    configProperties: Config.formInputComponentDefaultConfigProperties,
    formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<input matInput placeholder="${ctx.text}" formControlName="${ctx.name}">\n</mat-form-field>`;
    },
  };

  static textarea: FormInputComponent = {
    type: 'textarea',
    name: 'myTextarea',
    text: 'myTextarea',
    flex: 'auto',
    configProperties: Config.formInputComponentDefaultConfigProperties,
    formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<textarea matInput placeholder="${ctx.text}" formControlName="${ctx.name}"></textarea>\n</mat-form-field>`;
    },
  };

  static select: FormInputComponent = {
    type: 'select',
    name: 'mySelect',
    text: 'mySelect',
    flex: 'auto',
    configProperties: Config.formInputComponentDefaultConfigProperties,
    formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<mat-select placeholder="${ctx.text}" formControlName="${ctx.name}"></mat-select>\n</mat-form-field>`;
    },
  };

  static button: FormComponent = {
    type: 'button',
    name: 'myButton',
    text: 'myButton',
    flex: 'none',
    configProperties: Config.formInputComponentDefaultConfigProperties,
    extraCode: (ctx: FormComponent) => {
      return `${ctx.name}Clicked() {\n   console.log('${ctx.name} clicked');\n}`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<button mat-raised-button color='primary' (click)='${ctx.name}Clicked()'>${ctx.text}</button>`;
    }
  };

}
