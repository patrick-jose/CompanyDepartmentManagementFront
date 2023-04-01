import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeStatus'
})
export class ActiveStatusPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    return value ? 'Active' : 'Inactive';
  }

}
