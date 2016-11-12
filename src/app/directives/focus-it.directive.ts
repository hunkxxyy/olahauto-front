import { Directive,ElementRef , OnChanges} from '@angular/core';

@Directive({
    selector: '[focus-it]',
    inputs: ['focus'],
})
export class FocusIt implements OnChanges {
    focus:boolean = false;

    constructor(private _ElementRef:ElementRef) {
    }

    ngOnChanges() {
        console.log('FOCUS');
        if (this.focus) {
            console.log(this._ElementRef);
           // this._ElementRef.nativeElement.children[0].focus();
            this._ElementRef.nativeElement.children[0].children[0].focus();
            this.focus = false;
        }
    }

    setFocus() {
        this._ElementRef.nativeElement.children[0].focus();

    }
}
