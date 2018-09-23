import { Injectable } from '@angular/core';
import {Config} from './config';
import {FormComponent, FormRow} from './model';

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

  constructor() {

  }

  get containers() {
    return this._containers;
  }

  get components() {
    return this._components;
  }
}
