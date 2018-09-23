import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EditorService} from './editor.service';
import {FormComponent, FormRow} from './model';
import {ConverterService} from './converter.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formLayout: Array<FormRow> = [];
  selectedRow: FormRow = null;
  selectedComponent: FormComponent = null;

  constructor(public editorService: EditorService,
              public converterService: ConverterService,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    // test
    const row = this.editorService.containers.get('flexRow');
    this.addRow(row);
    this.addComponent(this.editorService.components.get('input'));
    this.addComponent(this.editorService.components.get('input'));
    this.addRow(row);
    this.addComponent(this.editorService.components.get('select'));
    this.addRow(row);
    this.addComponent(this.editorService.components.get('textarea'));
    this.addRow(row);
    this.addComponent(this.editorService.components.get('button'));
  }

  addRow(row: FormRow) {
    const clonedRow = _.cloneDeep(row);
    this.formLayout.push(clonedRow);
    this.selectedRow = clonedRow;
  }

  addComponent(component: FormComponent) {
    if (this.selectedRow) {
      const clonedComponent = _.cloneDeep(component);
      this.selectedRow.components.push(clonedComponent);
      this.selectComponent(clonedComponent, this.selectedRow);

      this.converterService.convert(this.formLayout);
    }
  }

  selectComponent(component: FormComponent, row: FormRow) {
    this.selectedRow = row;
    this.selectedComponent = component;

    this.changeDetectorRef.detectChanges();
  }

  deselectComponent() {
    this.selectedRow = null;
    this.selectedComponent = null;
  }


}
