import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

@Pipe({
  name: 'limitStringBy'
})
export class LimitStringBy implements PipeTransform {
  transform(s: string, by: number): string {
    if (!s) {
      return '';
    }

    if (s.length > by) {
      return s.slice(0, by).concat('...');
    }

    return s;
  }
}
