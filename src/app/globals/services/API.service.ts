import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Headers} from '@angular/http';
import {AuthService} from './auth.service';

import 'rxjs/Rx';
import {globals} from "../../globals/global.constats";

import {ErrorService,ErrorMsg,MessageTypes} from "./error.service"
export interface ApiRequest {

    microservice:string,
    methode:string,
    link:string,
    params?:any
    errorSucces?: MessageTypes;

}



@Injectable()
export class APIService {
    /*
     RESTAPI hiba
     rossz components esetén enm jön vissza error
     */

    response:String;
    private _apiErrors = [];

    constructor(private _http:Http,
                private _AuthService:AuthService,
                private _ErrorService:ErrorService) {

    }

    private getHeader() {
        /* A headerben átküldeni az acces token a következőket kell beállítani:
         header.append('Authorization', 'Bearer '+token);
         .httaccess
         RewriteCond %{HTTP:Authorization} .
         RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
         */
        let token = this._AuthService.user.access_token;


        var header = new Headers();
        header.append('Content-Type', 'application/json');
        if (token){
            /*every variable in header get lovercase automaticly*/


            header.append('Authorization', 'Bearer '+token);
        }

       // console.log(header);
        return header;

    }



    public getResponseFromMicroService(param:ApiRequest) {

        let showLog = false;
        if (showLog) {
            console.log('---   getResponseFromMicroService  ------');
            console.log(param.microservice + param.link + ' methode:' + param.methode);
            console.log('Params (json):');
            console.log(param.params);
            console.log('--- END getResponseFromMicroService ------');
        }
        let response:any;
        switch (param.methode) {
            case 'POST':

                var json = JSON.stringify(param.params);

                response = this._http.post(param.microservice + param.link, json, {
                    headers: this.getHeader()
                }).map(res => res.json());
                break;
            case 'PUT':
                var json = JSON.stringify(param.params);

                response = this._http.put(param.microservice + param.link, json, {
                    headers: this.getHeader()
                }).map(res => res.json());
                break;
            case 'GET':
                response = this._http.get(param.microservice + param.link, {
                    headers: this.getHeader()
                }).map(res => res.json());
                break;
        }
        return response;
    }


    public loadDatasFromApi(request:ApiRequest, callback:Function = null, errorWithInputs:Function = null, whenDone:Function = null) {
        this.getResponseFromMicroService(request)
            .subscribe(
                data=> {
               // console.log(data);
                if (data.errors != null) {
                    data.message = {
                        'http_status': data.http_status

                    }
                }

                if (data.message.http_status == null) {
                    console.log('Error:(loadDatasFromApi:http_status is  missing:) ');
                    console.log(request);
                }

                if (data.message.http_status == 422 && errorWithInputs) {
                    errorWithInputs(data.errors);
                }
                else if (data.message.http_status == '200' || data.message.http_status == '204') {
                    var error = <ErrorMsg> {
                        msg: data.message.message_in_current_language,
                        type: MessageTypes.mtInfo
                    };

                    if (typeof  request.errorSucces !== 'undefined') {
                        error.type = request.errorSucces;
                    }

                    this._ErrorService.setErrorMsg(error);
                    callback(data.return);
                }
                else {
                    let error = <ErrorMsg> {
                        msg: 'HTTP:[' + data.message.http_status + '] ' + data.message.message_in_current_language,
                        type: MessageTypes.mtDanger
                    };
                    this._ErrorService.setErrorMsg(error);

                }

            },
                error=> {
                   console.log(error);
                error = <ErrorMsg> {
                    msg: 'Nem sikerült kapcsolodni a szerverhez, kére próbálja meg újra!',
                    type: MessageTypes.mtDanger
                };
                this._ErrorService.setErrorMsg(error);
            },
            ()=>{
                if (whenDone!=null)
                whenDone();
            }

        )
    }

    public getResponse(param:ApiRequest) {

        let response:any;
        switch (param.methode) {
            case 'POST':

                var json = JSON.stringify(param.params);

                response = this._http.post(param.microservice + param.link, json, {

                }).map(res => res.json());
                break;
            case 'PUT':
                var json = JSON.stringify(param.params);

                response = this._http.put(param.microservice + param.link, json, {

                }).map(res => res.json());
                break;
            case 'GET':
                response = this._http.get(param.microservice + param.link, {

                }).map(res => res.json());
                break;
        }
        return response;

    }



    public getResponseGETNoMs(link) { //not from microservice, it need complette link like Oauth ms

        let showLog = false;
        if (showLog) {
            console.log('---   getResponseGET  ------');
            console.log(link);
            console.log('--- END getResponseGET ------');
        }
        return this._http.get(link, {

        }).map(res => res.json());
    }
    /*
    public getResponsePUT(link, json) {
        json = JSON.stringify(json);
        //  alert(json);


        let showLog = false;
        if (showLog) {
            console.log('---   PUT  ------');
            console.log(API_URL + link);
            console.log(json);
            console.log('--- ENDPOST ------');

        }
        return this._http.put(API_URL + link, json, {
            headers: this.getHeader()
        }).map(res => res.json());
    }

    public getMenus($logged) {
        let link = ($logged) ? 'Szintek/menulogged' : 'Szintek/menu';
        return this.getResponseGET(link);

    }

    public getHtmls(link) {

        return this.getResponseGET('Szintek/tartalom/' + link);

    }

    public logOut() {
        return this.getResponseGET('oauth/exit');
    }*/

    /*   PUBLIC API Requiests    */




    public  downloadPdf() {

    }
}
