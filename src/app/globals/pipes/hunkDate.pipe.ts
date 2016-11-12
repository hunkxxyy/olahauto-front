import {Pipe,PipeTransform} from '@angular/core';
@Pipe({
    name:'hunkDate'

})
export class hunkDate implements PipeTransform {
    transform(value:string, args:string){
     // console.log(args);
        if (typeof value === 'undefined') return '1974-08-30';
        const datesTime =value.split(" ", 2);
        const dates =datesTime[0].split("-", 3);
        const months=['Jan.','Febr.','Márc.','Ápr.','Máj.','Jún.','Júl.','Aug.','Szept.','Okt.','Nov.','Dec.']
        if (args=='magyar')
        {
            value= dates[0]+'.'+dates[1]+'.'+dates[2];

        }
        else if (args=='engDate'){
            value= datesTime[0];
        }
        else if (args=='Y')
        {
            value=dates[0];
        }
        else if (args=='shortDay')
        {
            const index:number=(+dates[1]-1);
            value=months[index];
        }
        return value ;
    }
}
