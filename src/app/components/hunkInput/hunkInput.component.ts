import {Component, OnInit,EventEmitter,ElementRef} from '@angular/core';

import {HunkInputType,HunkInputClass} from  './HunkInputType';

@Component({
  selector: 'hunk-input',

  template: `



        <div [ngClass]="getStyle()">

        <input


        type="text"
                [style.padding-right]="getPadding()"
                [style.cursor]="cursor"
                 [(ngModel)]="compObject.value"
                placeholder="{{compObject.placeHolder}}"
               class="{{className}}"

               autocomplete="off"
                (keydown)="onKeyDown()"
                (keyup)="countCharacters()"
               (blur)="onBlur()"
               (click)="onClick($event)"




                >

<span  *ngIf="maxchar && !compObject.error" style="position: absolute;top: 12px;right:0px;padding-right:20px;color:#bfafaf" ><small >{{charlen}}{{maxchar}}</small></span>
<span   *ngIf="compObject.error" style="font-size:18px;position: absolute;top: 5px;right:0px;padding-right:10px;color:#bfafaf" >
<i style="color:red;" class="fa fa-warning" aria-hidden="true"></i></span>
<!--<span class="form-control-feedback"  *ngIf="compObject.error">
    <i class="fa fa-warning" aria-hidden="true"></i>
</span>-->



<span class="feedbackLabel"> {{compObject.error}}</span>


</div>

`,


  inputs: ['compObject', 'cursor', 'className', 'maxchar'],
  outputs: ['onBlurEvent', 'onClickEvent'],
  providers: [],
  styleUrls: ["hunkInput.css"]


})
export class HunkInput implements OnInit {
  //counter:any={'top':'40px'};


  className = 'form-control';
  onBlurEvent = new EventEmitter<any>();
  onClickEvent = new EventEmitter<any>();
  cursor:string;
  showDropArrow:boolean;
  bgColor = '#fff';
  compObject:HunkInputClass;
  maxchar:number;
  charlen:string;
  previusValue:string;
  paddingRight:'250px';

  private _clientWidth:number;
  /* constructor(private _DictionaryService:LanguageService) {
   }*/
  constructor(private _element:ElementRef) {
  //  console.log( this._element);

  }

;
  onBlur() {
    this.onBlurEvent.emit(this.compObject.value);
  }

  onClick(event) {

    this.onClickEvent.emit(event);
  }


  getPadding() {
    return (this.maxchar) ? '50px' : '';
  }

  getStyle() {

    return (this.compObject.error) ? 'has-error has-feedback' : '';
  }

  ngOnInit():any {
    if (this.maxchar)this.charlen = '0 / ';
    //console.log(this._element.nativeElement.children[0].children[0].value);
   /* if (this.isFocused)*/
    //this._element.nativeElement.hide();

    //  console.log(this._element.nativeElement);

  }

  countCharacters() {
    if (this.compObject.value) {
      if (this.maxchar) {
        length = this.compObject.value.length;
        if (length > this.maxchar) {
          length--;
          this.compObject.value = this.previusValue;
        }
        this.charlen = length + ' / ';
        this.previusValue = this.compObject.value;
      }

    }


  }
    onKeyDown(){
        this.compObject.error='';
    }
}
