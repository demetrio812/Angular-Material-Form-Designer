import {Injectable} from '@angular/core';
import {FormComponent, FormInputComponent} from './model';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private _convertedTsCode: String;
  private _convertedHtmlCode: String;

  constructor() {
  }

  convert(formLayout: Array<FormComponent>) {
    this._convertedTsCode = this.getTsCode(formLayout);
    this._convertedHtmlCode = this.getHtmlCode(formLayout);
  }

  get convertedHtmlCode(): String {
    return this._convertedHtmlCode;
  }

  get convertedTsCode(): String {
    return this._convertedTsCode;
  }

  private getTsCode(formLayout: Array<FormComponent>): string {
    let code = '\nthis.myForm = this.fb.group({\n';

    for (const component of formLayout) {
      if ((<FormInputComponent>component).formBuilderCode) {
        code += '\n' + (<FormInputComponent>component).formBuilderCode(component) + '\n';
      }
    }

    code += '\n});\n\n';

    for (const component of formLayout) {
      if (component.extraCode) {
        code += '\n' + component.extraCode(component) + '\n';
      }
    }
    return code;
  }

  private getHtmlCode(formLayout: Array<FormComponent>): string {
    let code = `\n<form [formGroup]=\'myForm\'>\n`;

    for (const component of formLayout) {
      if (component.htmlCode) {
        code += '\n' + component.htmlCode(component) + '\n';
      }
    }

    code += '\n<form>\n\n';

    return code;
  }

}
