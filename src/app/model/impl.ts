import {ITdDynamicElementConfig, TdDynamicElement} from '@covalent/dynamic-forms';
import {Exclude, Type} from 'class-transformer';
import {Form, FormComponent, FormRow} from './model';

export class DefaultFormComponent implements FormComponent {
  configProperties: ITdDynamicElementConfig[];
  // extraCode: (ctx: FormComponent) => string;
  flex: string;
  flexFill?: boolean;
  // htmlCode: (ctx: FormComponent) => string;
  name: string;
  text: string;
  type: string;
  uuid: string;
}

export class DefaultFormRow implements FormRow {
  @Type(() => DefaultFormComponent)
  components: Array<DefaultFormComponent>;
  @Exclude()
  configProperties: ITdDynamicElementConfig[];
  description: string;
  fxLayout: string;
  fxLayoutAlignCrossAxis: string;
  fxLayoutAlignMainAxis: string;
  fxLayoutGap: string;
  fxLayoutWrap: boolean;
  type: string;
  uuid: string;

}
export class DefaultForm implements Form {
  @Exclude()
  configProperties: ITdDynamicElementConfig[];
  name: string;
  @Type(() => DefaultFormRow)
  rows: Array<FormRow>;

  constructor() {
    this.name = 'myNewForm';
    this.rows = [];
    this.configProperties = [
      {
        name: 'name',
        label: 'Name',
        type: TdDynamicElement.Input,
        hint: '',
        required: true
      }];
  }
}
