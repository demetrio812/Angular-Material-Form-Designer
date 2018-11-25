import {Injectable} from '@angular/core';
import {FormComponent, FormInputComponent, FormRow} from './model';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private _convertedTsCode: String;
  private _convertedHtmlCode: String;

  constructor() {
  }

  convert(formLayout: Array<FormRow>) {
    this._convertedTsCode = this.getTsCode(formLayout);
    this._convertedHtmlCode = this.getHtmlCode(formLayout);
  }

  get convertedHtmlCode(): String {
    return this._convertedHtmlCode;
  }

  get convertedTsCode(): String {
    return this._convertedTsCode;
  }

  private getTsCode(formLayout: Array<FormRow>): string {
    const components = this.getComponentsArray(formLayout);

    let code = '\nthis.myForm = this.fb.group({';

    for (const component of components) {
      if ((<FormInputComponent>component).formBuilderCode) {
        code += '\n' + (<FormInputComponent>component).formBuilderCode(component);
      }
    }

    code += '\n});\n\n';

    for (const component of components) {
      if (component.extraCode) {
        code += '\n' + component.extraCode(component) + '\n';
      }
    }
    return code;
  }

  private getHtmlCode(formLayout: Array<FormRow>): string {
    let code = `\n<form [formGroup]=\'myForm\'>\n`;

    for (const row of formLayout) {
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
