import {Injectable} from '@angular/core';
import {ComponentConverter, Form, FormComponent, FormInputComponent, FormRow} from './model/model';
import {EditorService} from './editor.service';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private _convertedTsCode: String;
  private _convertedHtmlCode: String;

  constructor(private editorService: EditorService) {
  }

  convert(form: Form) {
    this._convertedTsCode = this.getTsCode(form);
    this._convertedHtmlCode = this.getHtmlCode(form);
  }

  get convertedHtmlCode(): String {
    return this._convertedHtmlCode;
  }

  get convertedTsCode(): String {
    return this._convertedTsCode;
  }

  private getTsCode(form: Form): string {
    const components = this.getComponentsArray(form.rows);

    let code =
`
${form.name}: FormGroup;

constructor(private fb: FormBuilder) {
    this.${form.name}Setup();
}

private ${form.name}Setup(): void {
    this.${form.name} = this.fb.group({
`;

    for (const component of components) {
      const converter = this.getConverterForType(component.type);
      if (converter.formBuilderCode) {
        const genCode = converter.formBuilderCode(<FormInputComponent>component);
        code += '\n' + genCode;
      }
    }

    code +=
`
    });
}
`;

    for (const component of components) {
      const converter = this.getConverterForType(component.type);
      if (converter.extraCode) {
        const genCode = converter.extraCode(<FormInputComponent>component);
        code += '\n' + genCode + '\n';
      }
    }
    return code;
  }

  private getHtmlCode(form: Form): string {
    let code = `\n<form [formGroup]=\'${form.name}\'>\n`;

    for (const row of form.rows) {
      code += `\n<div fxLayout='${row.fxLayout ? row.fxLayout : 'row'} ${row.fxLayoutWrap ? 'wrap' : ''}' fxLayoutAlign='${row.fxLayoutAlignMainAxis ? row.fxLayoutAlignMainAxis : 'space-around'} ${row.fxLayoutAlignCrossAxis ? row.fxLayoutAlignCrossAxis : 'center'}'>\n`;
      for (const component of row.components) {
        const converter = this.getConverterForType(component.type);
        if (converter.htmlCode) {
          const genCode = converter.htmlCode(<FormInputComponent>component);
          code += '\n' + genCode + '\n';
        }
      }
      code += `\n</div>\n`;
    }

    code += '\n</form>\n';

    return code;
  }

  private getComponentsArray(formLayout: Array<FormRow>): Array<FormComponent> {
    // get the entire list of components
    const components: Array<FormComponent> = [];
    for (const row of formLayout) {
      for (const comp of row.components) {
        components.push(comp);
      }
    }
    return components;
  }

  private getConverterForType(type: string): ComponentConverter<FormComponent> {
    return this.editorService.getConverterForType(type);
  }
}
