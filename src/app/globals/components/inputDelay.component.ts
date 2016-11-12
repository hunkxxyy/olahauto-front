import {Component,  EventEmitter} from '@angular/core';

@Component({
  selector: 'input-delay',
  template:'<input (keyup)="change($event)" [(ngModel)]="search" type="text" class="form-control" [placeholder]="placeholder" >',
  outputs: ['value'],
  inputs:['placeholder']

})
export class inputDelayComponent {
    search:string;
    private currentTimeout:any;
    keyUpDellay = 500;
  value=new EventEmitter<string>();
  change(e){
      clearTimeout(this.currentTimeout);
      this.currentTimeout = undefined;
      this.currentTimeout = setTimeout(() => {

          this.value.emit(this.search);
      }, this.keyUpDellay);
  }
}
