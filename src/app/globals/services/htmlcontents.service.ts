import { Injectable } from '@angular/core';
import { APIService,ApiRequest } from '../services/API.service';
import { globals } from '../../globals/global.constats';
export interface ContentsType {
    tartalom:string;
    index:string;
    id:number;
}

@Injectable()
export class HtmlcontentsService {
    public kapcsolat_cim:string = '';
    public contents:any;
    /* public contents:any =
     {
     kapcsolat_tartalom: "",
     kapcsolat_cim: "",
     regisztracio_mielott: "",
     adataim_balbox: "",
     aszf:""
     }


     ;*/

    constructor(private _APIService:APIService) {
        this.loadsAllContents();
    }

    public getContent(index:string) {

        //return this.loadsOneContents(index);


        /*if (this.contents) {

            return this.contents[index].content;
        }*/

    }

    public getTitle(index:string) {
        if (this.contents) {

            return this.contents[index].title;
        }

    }

    public setContent(id, content) {
        let connection:ApiRequest = {
            link: 'api/setcontents/' + id,
            //   link: 'api/partners/search/' + this.search + '&limit=5&offset=0&sort=name+',
            methode: 'PUT',
            microservice: globals.MS_SERVER
        };
        this._APIService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                console.log(data);

            },
                error=> {
                console.log(error);
            }
        )
    }


    private loadsAllContents() {
        let connection:ApiRequest = {
            link: 'api/getcontents/',
            //   link: 'api/partners/search/' + this.search + '&limit=5&offset=0&sort=name+',
            methode: 'GET',
            microservice: globals.MS_SERVER
        };
        this._APIService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                console.log(data);

            },
                error=> {
                console.log(error);
            }
        )


    }
    private loadsOneContents(routeIndex) {
        let connection:ApiRequest = {
            link: 'api/getcontent/',
            //   link: 'api/partners/search/' + this.search + '&limit=5&offset=0&sort=name+',
            methode: 'PUT',
            params:{ "route":"/Cegbemutatkozas/Magyar-nyelven" },
            microservice: globals.MS_SERVER
        };
        this._APIService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                console.log(data);

            },
                error=> {
                console.log(error);
            }
        )


    }

}
