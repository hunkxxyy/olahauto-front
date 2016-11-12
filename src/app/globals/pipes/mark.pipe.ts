import {Pipe,PipeTransform} from '@angular/core';
import {Functions} from '../../globals/services/functions.service';
@Pipe({
    name:'markPipe'

})
export class markPipe implements PipeTransform {
    constructor(private _Functions:Functions){};
    transform(value:string, args:any[]){

        if (args){

            let replace= this._Functions.markSubstring(value,args, 'color:red; font-weight:bold', false);

            value =(replace)?replace:value;

        }


        return value ;
    }
}
