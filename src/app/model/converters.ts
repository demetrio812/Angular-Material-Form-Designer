import {ComponentConverter, FormComponent, FormInputComponent} from './model';

function getMatErrorCode(ctx: FormInputComponent) {
  return `  <mat-error *ngIf="${ctx.name}.hasError('required') && migrateFormSubmitted">
    This is <strong>required</strong>
  </mat-error>`;
}

export class FormInputComponentConverter implements ComponentConverter<FormInputComponent> {
  extraCode: (ctx: FormInputComponent) => string;
  formBuilderCode: (ctx: FormInputComponent) => string;
  htmlCode: (ctx: FormInputComponent) => string;
  type: string;

  constructor() {
    this.type = 'input';
    this.formBuilderCode = (ctx: FormInputComponent) => {
      if (ctx.required) {
        return `${ctx.name}: ['', [Validators.required]],`;
      } else {
        return `${ctx.name}: '',`;
      }
    };
    this.extraCode = (ctx: FormComponent) => {
      return `
  get ${ctx.name}() {
    return this.migrateForm.get('${ctx.name}');
  }
`;
    };
    this.htmlCode = (ctx: FormInputComponent) => {
      return `<mat-form-field [fxFlex]="${ctx.flex}"${ctx.flexFill ? ' fxFlexFill' : ''}>\n  <input matInput placeholder="${ctx.text}" formControlName="${ctx.name}">\n${getMatErrorCode(ctx)}\n</mat-form-field>`;
    };
  }
}

export class FormTextAreaComponentConverter implements ComponentConverter<FormInputComponent> {
  extraCode: (ctx: FormInputComponent) => string;
  formBuilderCode: (ctx: FormInputComponent) => string;
  htmlCode: (ctx: FormInputComponent) => string;
  type: string;

  constructor() {
    this.type = 'textarea';
    this.formBuilderCode = (ctx: FormInputComponent) => {
      if (ctx.required) {
        return `${ctx.name}: ['', [Validators.required]],`;
      } else {
        return `${ctx.name}: '',`;
      }
    };
    this.extraCode = (ctx: FormComponent) => {
      return `
  get ${ctx.name}() {
    return this.migrateForm.get('${ctx.name}');
  }
`;
    };
    this.htmlCode = (ctx: FormInputComponent) => {
      return `<mat-form-field [fxFlex]="${ctx.flex}"${ctx.flexFill ? ' fxFlexFill' : ''}>\n<textarea matInput placeholder="${ctx.text}" formControlName="${ctx.name}"></textarea>\n${getMatErrorCode(ctx)}\n</mat-form-field>`;
    };
  }
}

export class FormSelectComponentConverter implements ComponentConverter<FormInputComponent> {
  extraCode: (ctx: FormInputComponent) => string;
  formBuilderCode: (ctx: FormInputComponent) => string;
  htmlCode: (ctx: FormInputComponent) => string;
  type: string;

  constructor() {
    this.type = 'select';
    this.formBuilderCode = (ctx: FormInputComponent) => {
      if (ctx.required) {
        return `${ctx.name}: ['', [Validators.required]],`;
      } else {
        return `${ctx.name}: '',`;
      }
    };
    this.extraCode = (ctx: FormComponent) => {
      return `
  get ${ctx.name}() {
    return this.migrateForm.get('${ctx.name}');
  }
`;
    };
    this.htmlCode = (ctx: FormInputComponent) => {
      return `<mat-form-field [fxFlex]="${ctx.flex}"${ctx.flexFill ? ' fxFlexFill' : ''}>\n<mat-select placeholder="${ctx.text}" formControlName="${ctx.name}"></mat-select>\n${getMatErrorCode(ctx)}\n</mat-form-field>`;
    };
  }
}

export class ButtonComponentConverter implements ComponentConverter<FormComponent> {
  extraCode: (ctx: FormComponent) => string;
  formBuilderCode: (ctx: FormComponent) => string;
  htmlCode: (ctx: FormComponent) => string;
  type: string;

  constructor() {
    this.type = 'button';
    this.extraCode = (ctx: FormComponent) => {
      return `
  ${ctx.name}Clicked() {
    console.log('${ctx.name} clicked');
    this.${ctx.name}Submitted = true;
    if (this.${ctx.name}.valid) {
      const value = this.${ctx.name}.value;
      console.log('Form valid: ' + JSON.stringify(value));
    } else {
      console.log('Form invalid');
    }
  }
`;
    };
    this.htmlCode = (ctx: FormComponent) => {
      return `<button mat-raised-button color='primary' [fxFlex]="${ctx.flex}" fxFlexFill (click)='${ctx.name}Clicked()'>${ctx.text}</button>`;
    };
  }
}
