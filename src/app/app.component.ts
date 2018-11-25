import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {EditorService} from './editor.service';
import {FormComponent, FormRow} from './model';
import {ConverterService} from './converter.service';
import * as _ from 'lodash';
import {TdDynamicFormsComponent} from '@covalent/dynamic-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('selectedRowProperties') selectedRowProperties: TdDynamicFormsComponent;
  @ViewChild('selectedComponentProperties') selectedComponentProperties: TdDynamicFormsComponent;

  formLayout: Array<FormRow> = [];
  selectedRow: FormRow = null;
  selectedComponent: FormComponent = null;

  constructor(public editorService: EditorService,
              public converterService: ConverterService,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    // test
    const row = this.editorService.containers[0];
    this.addRow(row);
    this.addComponent(this.editorService.components[0]);
    this.addComponent(this.editorService.components[0]);
    this.addRow(row);
    this.addComponent(this.editorService.components[2]);
    this.addRow(row);
    this.addComponent(this.editorService.components[1]);
    this.addRow(row);
    this.addComponent(this.editorService.components[3]);
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

    // I have to set the values after the form elements are refreshed (after the detect changes cycle)
    setTimeout(() => {
      if (this.selectedRowProperties) {
        // console.log('Patching form row ' + row.type);
        this.selectedRowProperties.form.patchValue(row);
      }

      if (this.selectedComponentProperties) {
        // console.log('Patching form component ' + component.name);
        this.selectedComponentProperties.form.patchValue(component);
      }
    });
  }

  deselectComponent() {
    this.selectedRow = null;
    this.selectedComponent = null;
  }

  saveRowProperties(value: any) {
    console.log('saveRowProperties = ' + JSON.stringify(value));
    // this.selectedRow.setProperties(this.selectedRow, value);

    const me = this;
    Object.keys(value).forEach(name => {
      if (me.selectedRow[name] !== undefined) {
        me.selectedRow[name] = value[name];
      }
    });

    console.log('edited = ' + JSON.stringify(this.selectedRow));
  }

  saveComponentProperties(value: any) {
    console.log('saveComponentProperties = ' + JSON.stringify(value));
    // this.selectedComponent.setProperties(this.selectedComponent, value);

    const me = this;
    Object.keys(value).forEach(name => {
      if (me.selectedComponent[name] !== undefined) {
        me.selectedComponent[name] = value[name];
      }
    });

    console.log('edited = ' + JSON.stringify(this.selectedComponent));
  }

  deleteRow() {
    this.deselectComponent();
    const idx = this.formLayout.findIndex(row => row === this.selectedRow);
    this.formLayout.splice(idx, 1);
  }

  deleteComponent() {
    this.selectedComponent = null;
    const idx = this.selectedRow.components.findIndex(component => component === this.selectedComponent);
    this.selectedRow.components.splice(idx, 1);
  }
}
