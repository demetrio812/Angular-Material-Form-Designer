import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minimiseJson'
})
export class MinimiseJsonPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return JSON.stringify(value, undefined, 0);
  }

}
