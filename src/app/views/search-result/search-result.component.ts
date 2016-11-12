import { Component, OnDestroy } from '@angular/core';
import {Subscription} from'rxjs/RX';
import {ActivatedRoute,Router} from '@angular/router';
import {APIService,ApiRequest} from '../../globals/services/API.service';
import {globals} from '../../globals/global.constats';
interface SearchResults{
  title?:string;
  content:string;
  route?:string;
}
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnDestroy {
  search:string='valami';
  result:SearchResults[]=[];
  private subscription:Subscription;
  constructor(  private _APIService:APIService, private _ActivatedRoute:ActivatedRoute) {
    this.subscription = this._ActivatedRoute.params.subscribe(
        (param:any)=> this.loadResult(param['id'])

    )
  }

   loadResult(search) {
    this.search=search;
          /* console.log(this.search);*/
           let connection:ApiRequest = {
              link: 'api/search/' + this.search ,
            //   link: 'api/partners/search/' + this.search + '&limit=5&offset=0&sort=name+',
               methode: 'GET',
               microservice: globals.MS_SERVER
           };
           this._APIService.getResponseFromMicroService(connection)
               .subscribe(
                   data=> {
                       console.log(data);
                     this.result=data;

               },
                   error=> {
                   console.log(error);
               }
           )
       }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
