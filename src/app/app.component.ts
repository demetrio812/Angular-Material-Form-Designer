import {Component} from '@angular/core';
import {EditorService} from './editor.service';
import {FormComponent} from './model';
import {ConverterService} from './converter.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formLayout: Array<FormComponent> = [];
  selectedComponent: FormComponent = null;

  constructor(public editorService: EditorService,
              public converterService: ConverterService) {

  }

  addComponent(component: FormComponent) {
    const clonedComponent = _.cloneDeep(component);
    this.formLayout.push(clonedComponent);
    this.selectComponent(clonedComponent);

    this.converterService.convert(this.formLayout);
  }

  selectComponent(component: FormComponent) {
    this.selectedComponent = component;
  }

  deselectComponent() {
    this.selectedComponent = null;
  }

}
