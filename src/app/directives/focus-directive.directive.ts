import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[focusMe]'

})
export class FocusDirective {

  constructor(private el: ElementRef) {}
  ngAfterViewInit() {

    //console.log('init');
    this.el.nativeElement.focus();

  }

}
