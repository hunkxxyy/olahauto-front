import { Component,OnDestroy } from '@angular/core';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { HunkToolbarComponentComponent } from '../../components/hunk-toolbar-component/hunk-toolbar-component.component';

import { HtmlcontentsService} from '../../globals/services/htmlcontents.service';
import {Subscription} from'rxjs/RX';
import {ActivatedRoute,Router} from '@angular/router';
import {ApiRequest,APIService} from '../../globals/services/API.service';
import {AuthService} from '../../globals/services/auth.service';
import {globals} from '../../globals/global.constats';
import {Functions} from '../../globals/services/functions.service';

@Component({

    selector: 'app-dynamic-html',
    templateUrl: 'dynamic-html.component.html',
    styleUrls: ['dynamic-html.component.css'],


})
export class DynamicHtmlComponent implements OnDestroy {

    private subscription:Subscription;
    toolbarshow:boolean = false;
    editorshow:boolean = false;
    content:string = '';
    title:string = '';
    currentContent:string = 'oooo';
    routeIndex:string = '';
    remoteImagePath = '';
    spinner:string = '<div style="text-align: center;font-size:25;padding-top: 120px"><div>Folyamatban</div><div><img src="assets/images/spinner.gif"></div></div>';
    spinnerShow:boolean = false;

    constructor(private _Functions:Functions,
                private _APIService:APIService,
                private _Router:Router,
                public _HtmlcontentsService:HtmlcontentsService,
                private _ActivatedRoute:ActivatedRoute,
                public _AuthService:AuthService) {

        this.subscription = this._ActivatedRoute.url.subscribe(
            (param:any)=>this.createRouteIndex(param)
        );
    }


    createRouteIndex(routes) {

        let route = '';
        routes.forEach((obj, index)=> {
            console.log(obj);
            route += '/' + obj;
        });
        //  this.currentContent=this._HtmlcontentsService.getContent(route);
        this.remoteImagePath = this._Functions.removeOfWindows(route);
        this.routeIndex = route;

        this.loadsOneContents();
    }

    private loadsOneContents() {
        this.spinnerShow = true;
        this.toolbarshow = false;
        this.editorshow = false;
        let connection:ApiRequest = {
            link: 'api/getcontent/',
            //   link: 'api/partners/search/' + this.search + '&limit=5&offset=0&sort=name+',
            methode: 'PUT',
            params: {"route": this.routeIndex},
            microservice: globals.MS_SERVER
        };
        this._APIService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                //   console.log('data:'+data.return.content);

                this.currentContent = (data.return.content) ? data.return.content : 'Nincsen tartalom';

            },
                error=> {
                console.log('error:' + error);
            },
            ()=> {
                this.spinnerShow = false;
            }
        )


    }

    private saveOneContents() {
        this.spinnerShow = true;
        this.editorshow = false;
        this.toolbarshow = false;
        let connection:ApiRequest = {
            link: 'api/setcontent/',
            //   link: 'api/partners/search/' + this.search + '&limit=5&offset=0&sort=name+',
            methode: 'PUT',
            params: {"route": this.routeIndex, "content": this.currentContent},
            microservice: globals.MS_SERVER
        };

        this._APIService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                console.log(data);

            },
                error=> {
                console.log('error:' + error);
            },
            ()=> {
                this.spinnerShow = false;
            }
        )


    }

    onValueChanged(content) {

        this.currentContent = content;
        // this._HtmlcontentsService.contents[this.currentContent].content = content;
        //this.co


    }

    onChangeView(viewMode) {
        this.editorshow = (viewMode == 'edit') ? true : false;

    }

    saveContent(event) {

        this.saveOneContents();
        /*
         this._HtmlcontentsService.setContent(this._HtmlcontentsService.contents[this.currentContent].id, this._HtmlcontentsService.contents[this.currentContent].content);
         this.toolbarshow = false;
         this.editorshow = false;*/
    }

    onToolbarLeave(action) {
        if (action=='leave')
            this.toolbarshow = false;
        else{
            if(this._AuthService.logged)
                this.toolbarshow = true;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}