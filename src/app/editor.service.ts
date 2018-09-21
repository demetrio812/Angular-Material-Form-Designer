import { Injectable } from '@angular/core';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor() { }

  get components() {
    return Config.components;
  }
}
