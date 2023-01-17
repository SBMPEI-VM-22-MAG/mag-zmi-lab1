import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numMarkToStr'
})
export class NumMarkToStrPipe implements PipeTransform {

  transform(value: number): string {
    return `a${ value }`;
  }

}
