import { Component, EventEmitter} from '@angular/core';
import {AuthService} from '../../globals/services/auth.service';


@Component({
    
    selector: 'app-hunk-toolbar-component',
    templateUrl: 'hunk-toolbar-component.component.html',
    styleUrls: ['hunk-toolbar-component.component.css'],
    inputs: ['show'],
    outputs: ['toolbarLeave', 'changeView', 'save'],

})
export class HunkToolbarComponentComponent {
    show:boolean = false;
    admin=true;
    mode:string[] = ['preview', 'edit'];
    captionArr:string[] = ['Élő nézet', 'Szerkeztői nézet'];
    caption:string;
    selectedMode:boolean = false;
    toolbarLeave = new EventEmitter<string>();
    changeView = new EventEmitter<string>();
    save = new EventEmitter<string>();

    constructor(private _AuthService:AuthService) {
        this.caption = this.captionArr[1];
        console.log(this._AuthService);
    }

    leave() {
        this.toolbarLeave.emit('any');
    }

    onChangeView() {
        this.toolbarLeave.emit('any');
        this.selectedMode = !this.selectedMode;
        this.caption = (this.selectedMode) ? this.captionArr[0] : this.captionArr[1];
        this.changeView.emit((this.selectedMode) ? this.mode[1] : this.mode[0]);

    }

    onSave() {
        this.toolbarLeave.emit('any');
        this.selectedMode = false;
        this.caption = this.captionArr[1];

        this.save.emit('');
    }

}
