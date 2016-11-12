import { Directive, ElementRef, HostListener,HostBinding, OnChanges } from '@angular/core';

@Directive({
  selector: '[hunkhtml]',
  inputs: ['htmlContent'],
})
export class Hunkhtml implements   OnChanges{
  htmlContent:string='';

  constructor(private _ElementRef:ElementRef) {

  }
  ngOnChanges(){

    this._ElementRef.nativeElement.innerHTML = this.htmlContent;
  }
  /*ngOnInit(){
    this._ElementRef.nativeElement.innerHTML = this.htmlContent;
  }*/
}
