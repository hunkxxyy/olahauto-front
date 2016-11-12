import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCompress'
})
export class TextCompressPipe implements PipeTransform {

  transform(value: string, args?: number): any {
    if (value)
    {
      if (value.length>args) value=value.substr(0, args)+'...';
      return value ;

    }
  }

}
