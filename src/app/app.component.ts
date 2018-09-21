import { Component } from '@angular/core';
import {EditorService} from './editor.service';
import {FormComponent} from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formLayout: Array<FormComponent> = [];
  selectedComponent: FormComponent = null;

  constructor(public editorService: EditorService) {

  }

  addComponent(component: FormComponent) {
    this.formLayout.push(component);
    this.selectComponent(component);
  }

  selectComponent(component: FormComponent) {
    this.selectedComponent = component;
  }

  deselectComponent() {
    this.selectedComponent = null;
  }
}
