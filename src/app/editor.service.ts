import { Injectable } from '@angular/core';
import {Config} from './config';
import {FormComponent, FormRow} from './model';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _containers = new Map<string, FormRow>([
    [Config.flexRow.type, Config.flexRow]
  ]);

  private _components = new Map<string, FormComponent>([
    [Config.input.type, Config.input],
    [Config.textarea.type, Config.textarea],
    [Config.select.type, Config.select],
    [Config.button.type, Config.button]
  ]);

  constructor() {

  }

  get containers() {
    return this._containers;
  }

  get components() {
    return this._components;
  }
}
