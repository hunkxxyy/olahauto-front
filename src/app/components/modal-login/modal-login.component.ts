import { Component, EventEmitter,OnInit,ViewChild  } from '@angular/core';
import { APIService,ApiRequest  } from '../../globals/services/API.service';
import { AuthService,AuthType  } from '../../globals/services/auth.service';
import { globals  } from '../../globals/global.constats';
import {Router} from '@angular/router';
@Component({
    selector: 'app-modal-login',
    templateUrl: './modal-login.component.html',
    styleUrls: ['./modal-login.component.css'],
    inputs: [],
    outputs: []
})
export class ModalLoginComponent implements OnInit {


    @ViewChild('modal') modal:any;
    password:string='editke76';
    username:string='hunk74@gmail.com';
    error:boolean=false;
    valueSaved = new EventEmitter<any>();
    openedPopUp = new EventEmitter<any>();
    onModalClosed = new EventEmitter<string>();
    modalObject:any;
    btnCaption:string;

    ngOnInit() {
        this.modal.open();
    }


    constructor(private _APIService:APIService,private _AuthService:AuthService , private _Router:Router) {
    }
    onKeyUp(event) {
        if (event.keyCode == 13) {
            this.login();
        }
    }
    login() {

        let connection:ApiRequest = {
            /* console.log(this.search);*/
            link: 'auth/login',
            params:{
                grant_type:'password',
                client_id:'1',
                client_secret:'olahauto2016',
                password:this.password,
                username:this.username
            },
            methode: 'POST',
            microservice: globals.MS_SERVER
        };
        this._APIService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                console.log(data);
                    this.error=false;
                    this.modal.close();

                    this._AuthService.setUser({access_token:data.oauth.access_token, user_name:'admin'});
                    this._Router.navigate(['/']);

            },
                error=> {
                this.error=true;;
            }
        )
    }


}
