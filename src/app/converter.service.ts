import {Injectable} from '@angular/core';
import {Form, FormComponent, FormInputComponent, FormRow} from './model';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private _convertedTsCode: String;
  private _convertedHtmlCode: String;

  constructor() {
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
      if ((<FormInputComponent>component).formBuilderCode) {
        code += '\n' + (<FormInputComponent>component).formBuilderCode(component);
      }
    }

    code +=
`
    });
}
`;

    for (const component of components) {
      if (component.extraCode) {
        code += '\n' + component.extraCode(component) + '\n';
      }
    }
    return code;
  }

  private getHtmlCode(form: Form): string {
    let code = `\n<form [formGroup]=\'${form.name}\'>\n`;

    for (const row of form.rows) {
      code += `\n<div fxLayout='${row.fxLayout ? row.fxLayout : 'row'} ${row.fxLayoutWrap ? 'wrap' : ''}' fxLayoutAlign='${row.fxLayoutAlignMainAxis ? row.fxLayoutAlignMainAxis : 'space-around'} ${row.fxLayoutAlignCrossAxis ? row.fxLayoutAlignCrossAxis : 'center'}'>\n`;
      for (const component of row.components) {
        if (component.htmlCode) {
          code += '\n' + component.htmlCode(component) + '\n';
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
}
