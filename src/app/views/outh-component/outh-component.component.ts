import { Component, OnDestroy } from '@angular/core';
import {Subscription} from'rxjs/RX';
import {Router} from '@angular/router';
import {APIService,ApiRequest} from '../../globals/services/API.service';
import {AuthService,AuthType} from '../../globals/services/auth.service';
import {globals} from '../../globals/global.constats';

@Component({

    selector: 'app-outh-component',
    templateUrl: 'outh-component.component.html',
    styleUrls: ['outh-component.component.css']
})
export class OuthComponentComponent implements OnDestroy {
    private subscription:Subscription;
    code:string;

    constructor(private _Router:Router, private _APIService:APIService, private _AuthService:AuthService) {
        this.subscription = _Router.routerState.root.queryParams.subscribe(
            (queryParam:any)=>this.code = queryParam['code']
        );
        /* console.log(this.search);*/
        let connection:ApiRequest = {
            link: 'api/settings/authenticate/' + this.code,
            methode: 'GET',
            microservice: globals.MS_SERVER
        };
         console.log(connection);
        this._APIService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                console.log(data);
                data = data.return;
                if (data.access_token != null) {
                    const auth:AuthType = {
                        access_token: data.access_token,
                        business_db: data.business_db,
                        business_name: data.business_name,
                        user_name: data.user_name
                    };
                    this._AuthService.setUser(auth);
                    this._Router.navigate(['/'], {queryParams: {}});

                    // this._Router.navigate(['/partners'],{queryParams:{'partner':'new'}});
                }

            },
                error=> {
                console.log(error);
            }
        )


    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
