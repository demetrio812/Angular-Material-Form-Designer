import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {EditorService} from './editor.service';
import {Form, FormComponent, FormRow} from './model';
import {ConverterService} from './converter.service';
import * as _ from 'lodash';
import {TdDynamicFormsComponent} from '@covalent/dynamic-forms';
import uuidv1 from 'uuid/v1';
import {DefaultForm} from './config';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('selectedFormProperties') selectedFormProperties: TdDynamicFormsComponent;
  @ViewChild('selectedRowProperties') selectedRowProperties: TdDynamicFormsComponent;
  @ViewChild('selectedComponentProperties') selectedComponentProperties: TdDynamicFormsComponent;

  form: DefaultForm = new DefaultForm();
  selectedRow: FormRow = null;
  selectedComponent: FormComponent = null;

  importForm: FormGroup;

  constructor(public editorService: EditorService,
              public converterService: ConverterService,
              private changeDetectorRef: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.importFormSetup();
  }

  ngOnInit(): void {
    this.setFormValues();

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
    clonedRow.uuid = uuidv1();
    this.form.rows.push(clonedRow);
    this.selectedRow = clonedRow;
  }

  addComponent(component: FormComponent) {
    if (this.selectedRow) {
      const clonedComponent = _.cloneDeep(component);
      clonedComponent.uuid = uuidv1();
      this.selectedRow.components.push(clonedComponent);
      this.selectComponent(clonedComponent, this.selectedRow);

      this.refreshGeneratedCode();
    }
  }

  setFormValues() {
    setTimeout(() => {
      this.selectedFormProperties.form.patchValue(this.form);
    });
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

  saveFormProperties(value: any) {
    console.log('saveFormProperties = ' + JSON.stringify(value));
    // this.selectedRow.setProperties(this.selectedRow, value);

    const me = this;
    Object.keys(value).forEach(name => {
      if (me.form[name] !== undefined) {
        me.form[name] = value[name];
      }
    });

    this.refreshGeneratedCode();
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

    this.refreshGeneratedCode();
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

    this.refreshGeneratedCode();
  }

  clearForm() {
    this.deselectComponent();
    this.form = new DefaultForm();

    this.refreshGeneratedCode();
  }


  deleteRow() {
    const idx = this.form.rows.findIndex(row => row.uuid === this.selectedRow.uuid);
    this.form.rows.splice(idx, 1);
    this.deselectComponent();

    this.refreshGeneratedCode();
  }

  deleteComponent() {
    const idx = this.selectedRow.components.findIndex(component => component.uuid === this.selectedComponent.uuid);
    this.selectedRow.components.splice(idx, 1);
    this.selectedComponent = null;

    this.refreshGeneratedCode();
  }

  // Import
  private importFormSetup(): void {
    this.importForm = this.fb.group({
      jsonDescriptor: '',
    });
  }

  importBtnClicked() {
    const value = this.importForm.value;
    console.log('you submitted value:', value);
    if (this.importForm.valid) {
      console.log('valid');
      const importedForm = JSON.parse(value['jsonDescriptor']);
      this.form = importedForm;
    }
  }

  // Code generation
  private refreshGeneratedCode() {
    this.converterService.convert(this.form);
  }
}
