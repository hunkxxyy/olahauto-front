import { Injectable } from '@angular/core';
import { APIService ,ApiRequest} from '../globals/services/API.service';
import { globals} from '../globals/global.constats';
interface MenuType{
    id:number,
    parent_id:number,
    top:number,
    name:string,
    route?:string,
    style?:any,
    editable:boolean,
    admin_only:boolean,
    description?:string,
    chield:MenuType[] ,
    menuType:boolean,
    fontsize?: string
}
@Injectable()

export class MenuService {

    mainMenu:any;
    leftMenu:any;
    headMenu:any;
    footerMenu:any;
    adminMenu:any[]=[];
    public leftMenuPanelOpen=false;
    constructor(private _APIService:APIService) {
        this.loadMenu();
    }
    getMenGroupByName(name){
        let selectedMenu:MenuType;
        this.mainMenu.forEach((obj:MenuType, index)=> {

                if (obj.name==name)
                selectedMenu=obj;
             });
      
        return selectedMenu;
    }
    loadMenu() {

        /* console.log(this.search);*/
        let connection:ApiRequest = {
            link: 'api/dragable-menu/all',
            //   link: 'api/partners/search/' + this.search + '&limit=5&offset=0&sort=name+',
            methode: 'GET',
            microservice: globals.MS_SERVER
        };
        this._APIService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                    this.mainMenu = data.return;
                /*this.leftMenu = data.return[2].chield;*/
                this.leftMenu = this.getMenGroupByName('BAL MENÜ').chield;

                this.headMenu =  this.getMenGroupByName('FELSŐ MENÜ').chield;
                this.footerMenu = this.getMenGroupByName('LÁB MENÜ').chield;
                this.adminMenu.push(this.getMenGroupByName('ADMIN'));

                console.log(data);

            },
                error=> {
                console.log(error);
            }
        )
    }


}
