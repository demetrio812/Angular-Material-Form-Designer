import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeNewLines'
})
export class RemoveNewLinesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/(?:\r\n|\r|\n)/g, '');
  }

}
