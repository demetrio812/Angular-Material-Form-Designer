import {ITdDynamicElementConfig, TdDynamicElement} from '@covalent/dynamic-forms';
import {FormComponent, FormInputComponent, FormRow} from './model';
import {DefaultFormRow} from './impl';

export class Config {


  static formInputComponentDefaultConfigProperties: ITdDynamicElementConfig[] = [
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
    },
    {
      name: 'flexFill',
      label: 'Flex fill',
      type: TdDynamicElement.Checkbox,
      default: false,
      required: false
    },
    {
      name: 'required',
      label: 'Required',
      type: TdDynamicElement.Checkbox,
      default: false,
      required: false
    }];

  static flexRow: DefaultFormRow = {
    uuid: '',
    type: 'flexRow',
    description: 'Flex Row',
    fxLayout: 'row',
    fxLayoutWrap: false,
    fxLayoutAlignMainAxis: 'start',
    fxLayoutAlignCrossAxis: 'start',
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
    uuid: '',
    type: 'input',
    name: 'myInputText',
    text: 'myInputText',
    flex: 'auto',
    flexFill: false,
    required: false,
    configProperties: Config.formInputComponentDefaultConfigProperties,
    /*formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<input matInput placeholder="${ctx.text}" formControlName="${ctx.name}">\n</mat-form-field>`;
    },*/
  };

  static textarea: FormInputComponent = {
    uuid: '',
    type: 'textarea',
    name: 'myTextarea',
    text: 'myTextarea',
    flex: 'auto',
    flexFill: false,
    required: false,
    configProperties: Config.formInputComponentDefaultConfigProperties,
    /*formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<textarea matInput placeholder="${ctx.text}" formControlName="${ctx.name}"></textarea>\n</mat-form-field>`;
    },*/
  };

  static select: FormInputComponent = {
    uuid: '',
    type: 'select',
    name: 'mySelect',
    text: 'mySelect',
    flex: 'auto',
    flexFill: false,
    required: false,
    configProperties: Config.formInputComponentDefaultConfigProperties,
    /*formBuilderCode: (ctx: FormComponent) => {
      return `${ctx.name}: '',`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<mat-form-field>\n<mat-select placeholder="${ctx.text}" formControlName="${ctx.name}"></mat-select>\n</mat-form-field>`;
    },*/
  };

  static button: FormComponent = {
    uuid: '',
    type: 'button',
    name: 'myButton',
    text: 'myButton',
    flex: 'none',
    flexFill: false,
    configProperties: Config.formInputComponentDefaultConfigProperties,
    /*extraCode: (ctx: FormComponent) => {
      return `${ctx.name}Clicked() {\n   console.log('${ctx.name} clicked');\n}`;
    },
    htmlCode: (ctx: FormComponent) => {
      return `<button mat-raised-button color='primary' (click)='${ctx.name}Clicked()'>${ctx.text}</button>`;
    }*/
  };

}
