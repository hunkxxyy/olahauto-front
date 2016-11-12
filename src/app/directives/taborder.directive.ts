import { Directive,ElementRef,HostListener } from '@angular/core';
/*Ezt nem használom csupán működés kevéért benne hagytam, mert még később jól jöhet*/
@Directive({
  selector: '[taborder]',
  inputs: ['order']


})
export class Taborder {
  @HostListener('blur') blur(){
    console.log('blur');
  }
  @HostListener('keyup', ['$event'])
  klikk(event) {
   // console.log("betű: " + event.key);
    console.log("kód: " + event.keyCode);
    //if (event.keyCode==8)
      event.preventDefault();
  }


  constructor() {}



}
