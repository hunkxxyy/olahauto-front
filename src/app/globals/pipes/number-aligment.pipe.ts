import { Pipe, PipeTransform} from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Pipe({
  name: 'numberAligment',

})
export class NumberAligmentPipe implements PipeTransform {

  transform(value:number, maxDecimal:any, zeroWidth:any, currencyAfter:string=''):any{
    if (value==0) return '';
    let d=new DecimalPipe('en' );
    let num=d.transform(value*1.0,'1.'+maxDecimal+'-'+maxDecimal);
    let strValue=String(num);
    strValue=strValue.replace(",", " ");

    let newValue:string =strValue.replace(",", " ");
    newValue=newValue.replace(".", ",");
    let parts=newValue.split(",");

    let newStrValue:string='';
    let rightPadding=0;
    let done=false;

    for (var i=strValue.length;i>strValue.length-maxDecimal;i--)
    {

      let currentChar=strValue[i-1];
      if (currentChar=='0' && !done)
      {

        rightPadding+=zeroWidth;
      }
      else
      {
        newStrValue=currentChar+newStrValue;
        done=true;
      }

    }
    newValue=parts[0]+','+newStrValue;

    if (newValue=='0,') newValue='';
    else newValue= `<span style="padding-right: `+rightPadding+`px" >${newValue}</span>`+currencyAfter;

    if (value/Math.round(value)==1)
    {


      let integerValue=strValue.replace(".", ",");
      let integerParts=integerValue.split(",");


      newValue= `<span style="padding-right: `+(rightPadding+zeroWidth/2)+`px" >${integerParts[0]}</span>`+currencyAfter;

    }
    if (maxDecimal==0) newValue=String(Math.round(value))+currencyAfter;
    //console.log(newValue);
    return newValue;
  }

}
