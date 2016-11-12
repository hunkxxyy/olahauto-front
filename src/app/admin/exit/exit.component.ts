import { Component, OnInit } from '@angular/core';
import { APIService,ApiRequest  } from '../../globals/services/API.service';
import { AuthService,AuthType  } from '../../globals/services/auth.service';
import {Router} from '@angular/router';
import { globals  } from '../../globals/global.constats';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.css']
})
export class ExitComponent implements OnInit {

  constructor(private _APIService:APIService,private _AuthService:AuthService, private _Router:Router) { }

  ngOnInit() {

  this.logOut();
  }
  logOut(){

            /* console.log(this.search);*/
             let connection:ApiRequest = {
                link: 'auth/exit',
                methode: 'GET',
                 microservice: globals.MS_SERVER
             };
             this._APIService.getResponseFromMicroService(connection)
                 .subscribe(
                     data=> {
                       this._AuthService.userDestroy();
                         this._Router.navigate(['/']);

                 },
                     error=> {
                     console.log(error);
                 }
             )

  }

}
