import { Injectable } from '@angular/core';
import {Config} from './model/config';
import {ComponentConverter, FormComponent, FormRow} from './model/model';
import {
  ButtonComponentConverter,
  FormInputComponentConverter,
  FormSelectComponentConverter,
  FormTextAreaComponentConverter
} from './model/converters';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _containers: Array<FormRow> = [
    Config.flexRow
  ];

  private _components: Array<FormComponent> = [
    Config.input,
    Config.textarea,
    Config.select,
    Config.button
  ];

  private _converters: Array<ComponentConverter<FormComponent>> = [
    new FormInputComponentConverter(),
    new FormTextAreaComponentConverter(),
    new FormSelectComponentConverter(),
    new ButtonComponentConverter()
  ];

  constructor() {

  }

  get containers() {
    return this._containers;
  }

  get components() {
    return this._components;
  }

  get converters() {
    return this._converters;
  }

  getConverterForType(type: string) {
    return this.converters.find(conv => conv.type === type);
  }
}
