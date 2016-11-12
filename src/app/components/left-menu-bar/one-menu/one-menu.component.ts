import { Component, OnInit,EventEmitter } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/core';
import {Router} from '@angular/router';
export interface DragableMenuType {
    id: number,
    name: string,
    chield:any[],
    menuType: string,
    fontsize:string,
    style?:string
}
@Component({
    selector: 'app-one-menu',
    templateUrl: './one-menu.component.html',
    styleUrls: ['./one-menu.component.css'],
    inputs: ['menuType', 'menu'],
    outputs: ['menuClicked'],
    animations: [
        trigger('movementtrigger', [ //meghat�rozom az anim�ci� azonos�t�j�t
            state('first', style({
                'height': '0px',

                'padding-top': '0px',
                'padding-left': '0px',
                'border-bottom': '0px',
                'opacity': '0.0'
            })),
            state('second', style({
                'height': '45px',

                'padding-top': '13px',
                'padding-left': '26px',
                'border-bottom': '1px',
                'border-bottom-style': 'solid',
                'border-color': '#d9d9d9',

                'opacity': '1.0'
            })),
            transition('first=>second', [
                animate('300ms ease-out')
            ]),
            transition('second=>first', [
                animate('300ms ease-in')
            ])
        ])
    ]

})
export class OneMenuComponent implements OnInit {
    menuClicked = new EventEmitter<boolean>();
    aboveArrow:boolean=false;
    menuType:string = 'standard'; //head, standard, haveSubMenu, submenu
    submenuOpened = new EventEmitter<any>();
    states:any[] = [];
    state1:string = 'first';
    state2:string = 'first';
    menu:DragableMenuType;
    submenus:any[] = [];

    constructor(private _Router:Router) {
        this.menu = {
            id: 0,
            name: '',
            chield: [],
            menuType: '',
            fontsize: '6px'
        }
    }

    ngOnInit() {

    }

    menuOpen(menu) {

        this.states[menu.id]=( this.states[menu.id]=='first')?'second':'first';
        if (this.states[menu.id]=='first'){

            this.closeSubMenus(menu);
        }
    }
    private closeSubMenus(parent){
         parent.chield.forEach((obj, index)=> {
             if (obj.chield.length>0) this.closeSubMenus(obj);
             this.states[obj.id]='first';
             });

    }
    doIHaveChield(menu) {
        let haveSubmenu = false;
        if (menu.chield)
            haveSubmenu = (menu.chield.length > 0);
        return haveSubmenu;
    }

    openRoute(route) {
        // console.log(event.srcElement.indexOf("arrow"));

        if (route !== null && !this.aboveArrow) {
         //   console.log(route);
            this._Router.navigate(['/' + route]);
            this.menuClicked.emit(true);
        }

    }
    getState(id){
        if (!this.states[id])
        {
            this.states[id]='first';
        }

        return  this.states[id];
    }
}
