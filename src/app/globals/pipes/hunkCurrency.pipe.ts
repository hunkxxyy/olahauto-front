import {Pipe,PipeTransform} from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Pipe({
  name:'hunkCurrency'

})
export class hunkCurrencyPipe implements PipeTransform {
  transform(value:number, currencyAfter:string='', maxDecimal:any, zeroWidth:any){
   /* let strValue=String(value);
    let newValue:string =strValue.replace(",", " ");
    newValue=newValue.replace(".", ",");
    return newValue+' Ft';*/
    if (maxDecimal==null) maxDecimal=2;
    let d=new DecimalPipe('en' );
    let num=d.transform(value*1.0,'1.'+maxDecimal+'-'+maxDecimal);
    let newValue:string = String(num).replace(/,/g, " ");
    newValue= newValue.replace(".", ",");
    newValue= newValue.replace(",00", "");
    if (currencyAfter)
      newValue+=currencyAfter;
    return newValue;
  }
}
