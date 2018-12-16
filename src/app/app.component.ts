import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {EditorService} from './editor.service';
import {Form, FormComponent, FormRow} from './model/model';
import {ConverterService} from './converter.service';
import * as _ from 'lodash';
import {TdDynamicFormsComponent} from '@covalent/dynamic-forms';
import uuidv1 from 'uuid/v1';
import {FormBuilder, FormGroup} from '@angular/forms';
import {classToPlain, plainToClass} from 'class-transformer';
import {DefaultForm} from './model/impl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('selectedFormProperties') selectedFormProperties: TdDynamicFormsComponent;
  @ViewChild('selectedRowProperties') selectedRowProperties: TdDynamicFormsComponent;
  @ViewChild('selectedComponentProperties') selectedComponentProperties: TdDynamicFormsComponent;

  savedForms: DefaultForm[];

  selectedForm: DefaultForm;
  selectedRow: FormRow = null;
  selectedComponent: FormComponent = null;

  importForm: FormGroup;

  exportJson = '';

  constructor(public editorService: EditorService,
              public converterService: ConverterService,
              private changeDetectorRef: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.importFormSetup();
  }

  ngOnInit(): void {
    this.loadAllSavedForms();
    if (!this.savedForms) {
      this.savedForms = [new DefaultForm()];
    }
    this.selectedForm = this.savedForms[0]; // first selectedForm automatically selected
    this.setCurrentFormValues();

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
    this.selectedForm.rows.push(clonedRow);
    this.selectedRow = clonedRow;

    this.refreshGeneratedCode();
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

  setCurrentFormValues() {
    setTimeout(() => {
      this.selectedFormProperties.form.patchValue(this.selectedForm);
    });

    this.refreshGeneratedCode();
  }

  selectComponent(component: FormComponent, row: FormRow) {
    this.selectedRow = row;
    this.selectedComponent = component;

    this.changeDetectorRef.detectChanges();

    // I have to set the values after the selectedForm elements are refreshed (after the detect changes cycle)
    setTimeout(() => {
      if (this.selectedRowProperties) {
        // console.log('Patching selectedForm row ' + row.type);
        this.selectedRowProperties.form.patchValue(row);
      }

      if (this.selectedComponentProperties) {
        // console.log('Patching selectedForm component ' + component.name);
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
      if (me.selectedForm[name] !== undefined) {
        me.selectedForm[name] = value[name];
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
    this.selectedForm = new DefaultForm();

    this.refreshGeneratedCode();
  }


  deleteRow() {
    const idx = this.selectedForm.rows.findIndex(row => row.uuid === this.selectedRow.uuid);
    this.selectedForm.rows.splice(idx, 1);
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
      this.selectedForm = plainToClass<Form, string>(DefaultForm, importedForm);
      this.refreshGeneratedCode();
    }
  }

  loadAllSavedForms() {
    const formsJson = localStorage.getItem('forms-data');
    // this.savedForms = plainToClass<DefaultForm[], string>(DefaultForm[], formsJson);
  }

  saveAllSavedForms() {
    localStorage.setItem('forms-data', JSON.stringify(this.savedForms));
  }

  // Code generation
  private refreshGeneratedCode() {
    this.converterService.convert(this.selectedForm);
    // this.exportJson = JSON.stringify(classToPlain(this.selectedForm), undefined, 0);
    this.exportJson = JSON.stringify((this.selectedForm), undefined, 0);
  }
}
