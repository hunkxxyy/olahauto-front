import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jsonPrint'
})
export class JsonPrintPipe implements PipeTransform {

    transform(val) {
        let pritty = JSON.stringify(val, null, 2);
        pritty=pritty.replace(/C/g, '*')
/*
 JSON.stringify(val, null, 2)
 .replace(' ', '&nbsp;')
 .replace('\n', '<br/>')
 .replace(/{/g, '*******')
 .replace('}', '<br/>}');
 }
*/
        return pritty;
    }
}
