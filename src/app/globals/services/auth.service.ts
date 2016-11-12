import {Injectable} from "@angular/core";

import {globals} from '../global.constats';

export interface AuthType {
    access_token:string,

    user_name:string

}
export class AuthService {
    public user:AuthType;
    //public loginPage= 'http://dev.billcity.hu:8081/login/oauth/auth?client_id=' + globals.FRONTEND_OAUTH_CLIENT_ID + '&response_type=code&redirect_uri=' + globals.FRONTEND_OAUTH_REDIRECT;
    public loginPage:string;

    public logged = false;

    constructor() {
        //  this.userDestroy();
/*
       this.loginPage=globals.LOGIN_PAGE+'?client_id=' + globals.FRONTEND_OAUTH_CLIENT_ID + '&response_type=code&redirect_uri=' + globals.FRONTEND_OAUTH_REDIRECT;
       console.log(this.loginPage);
        this.getUser();*/

        this.getUser();
    }

    public grantType() {
        return (this.logged) ? 'refresh_token' : 'password';
    }

    private getUser() {
        if (!this.user) {
            const token = this.getCookie('access_token');

            const user_name = this.getCookie('user_name');


            if (token) {

                this.user = {
                    access_token: token,

                    user_name:user_name


                };


                this.logged = true;


            }
            else {
                this.user = {
                    access_token: '',

                    user_name:''

                };

                /*this.logged = false;
                var url = window.location.href;

                //var url = 'http://localhost:4200/#/oauth?code=3da348bf70ec69c26428f4213a4e4432';
                var matches = url.match(/.*oauth\?code=(.*)/);
                if (matches) {

                }
                else
                {

                   window.location.href = this.loginPage;
                }*/



            }
            console.log(this.user);
        }
        //    console.log(this._user);

    }

    public userDestroy() {
        this.setCookie('access_token', '', 1);

        this.setCookie('user_name', 0, 1);

        this.logged = false;
        return this.logged;


    }

    public setUser(authType:AuthType) {
        this.user = authType;

        this.setCookie('access_token', this.user.access_token, 7);

       this.setCookie('user_name', this.user.user_name, 7);

        this.logged = true;
        return this.logged;

    }


    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
}
