import {FormComponent, FormInputComponent, FormRow} from './model';
import {TdDynamicElement} from '@covalent/dynamic-forms';

export class Config {

  static flexRow: FormRow = {
    type: 'flexRow',
    description: 'Flex Row',
    fxLayout: 'row',
    fxLayoutAlign: '',
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
      }],
    setProperties: (ctx: FormRow, values: any) => {
      ctx.fxLayout = values['fxLayout'] + (values['fxLayoutWrap'] ? ' wrap' : '');
      ctx.fxLayoutGap = values['fxLayoutGap'];
      ctx.fxLayoutAlign = values['fxLayoutAlignMainAxis'] + ' ' + values['fxLayoutAlignCrossAxis'];
    }
  };

  static input: FormInputComponent = {
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

  static textarea: FormInputComponent = {
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

  static select: FormInputComponent = {
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

  static button: FormComponent = {
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
}
