import {Component} from '@angular/core';
import {EditorService} from './editor.service';
import {FormComponent, FormRow} from './model';
import {ConverterService} from './converter.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formLayout: Array<FormRow> = [];
  selectedRow: FormRow = null;
  selectedComponent: FormComponent = null;

  constructor(public editorService: EditorService,
              public converterService: ConverterService) {

  }

  addRow() {
    const row = {
      flexLayout: 'row wrap',
      components: []
    };
    this.formLayout.push(row);
    this.selectedRow = row;
  }

  addComponent(component: FormComponent) {
    if (this.selectedRow) {
      const clonedComponent = _.cloneDeep(component);
      this.selectedRow.components.push(clonedComponent);
      this.selectComponent(clonedComponent);

      this.converterService.convert(this.formLayout);
    }
  }

  selectComponent(component: FormComponent) {
    this.selectedComponent = component;
  }

  deselectComponent() {
    this.selectedComponent = null;
  }

}
