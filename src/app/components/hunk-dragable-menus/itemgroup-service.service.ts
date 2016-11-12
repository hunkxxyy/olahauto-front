import { Injectable } from '@angular/core';
import {ApiRequest, APIService} from'../../globals/services/API.service';
import {globals} from'../../globals/global.constats';
import {Functions} from'../../globals/services/functions.service';
import {DragDropItem} from'../hunk-dragable-menus/dragable-item/dragable-item.component';
import {HunkInputClass} from'../../components/hunkInput/HunkInputType';
export interface ItemGroupType {
  id?:number,
  name: string,
  treeLevel?: number,
  haveChield?:boolean,

  searchContent?:string
}
@Injectable()
export class ItemgroupServiceService {

  constructor(private _APIService:APIService, private _Functions:Functions) {
  }

  public groupsSource:any[] = [];
  public treeView:any[] = [];
  public groupsForComboList:any[] = [];
  private treeLevel:number = 0;

  public loadItemGroup(callback:Function = null) {
    let connection:ApiRequest = {
      link: 'api/dragable-menu/all',
      methode: 'GET',
      microservice: globals.MS_SERVER
    };
    this._APIService.getResponseFromMicroService(connection)
      .subscribe(
        data=> {

        this.treeView = [];
        this.groupsSource = [];
        this.groupsForComboList = [];
        this.treeLevel = 0;
        this.createTreeView(data.return);
        this.setParentnamesForModal();
        this.treeLevel = 0;
        this.createGroupsForComboList(data.return);
       console.log(data);
          if (callback)
            callback();
        //

      },
        error=> {

      }
    )
  }

  private createTreeView(data) {

    data.forEach((obj:DragDropItem, index)=> {
      if (obj.chield) {
        this.treeLevel++;
        this.createTreeView(obj.chield);
      }
      let route=(obj.route)?obj.route:'';
      obj.treeLevel = this.treeLevel;
      obj.modalObject={
        id:obj.id,
        name:new HunkInputClass('név'),
        parent_id:obj.parent_id,
        route:route,
        desrciption:obj.description
    };

      obj.modalObject.name.value=obj.name;


      this.treeView.push(obj);

    })
    this.treeLevel--;
  }

  private createGroupsForComboList(data) {
    data.forEach((obj:DragDropItem, index)=> {
      let group:ItemGroupType = {
        id: obj.id,
        name: obj.name,
        treeLevel: this.treeLevel,
        haveChield: false,

        searchContent: ''
      };

      group.searchContent = this.getSearchContent(obj, obj.name);
      this.groupsForComboList.push(group);
      if (obj.chield) {

        this.treeLevel++;
        this.createGroupsForComboList(obj.chield);
      }
      if (obj.chield.length > 0)  group.haveChield = true;
    })

    this.treeLevel--;
    //console.log(this.groupsForComboList);

  }

  private getSearchContent(group, searchContent) {
    let more = '';
    if (group.chield) {

      group.chield.forEach((obj, index)=> {
        if (!this._Functions.matchAccent(searchContent, obj.name))
          searchContent += '@' + obj.name;
        if (obj.chield.length) {
          more = this.getSearchContent(obj, searchContent);
        }
      });
    }
    return searchContent + more;
  }
  private setParentnamesForModal(){
    this.treeView.forEach((obj:DragDropItem, index)=> {

     obj.modalObject.parent_name=this.getParentnamesForModal(obj.parent_id);
    });

  }
  public getParentnamesForModal( fieldId){
    let res='';

    this.treeView.forEach((obj, index)=> {

           if(obj.id==fieldId){

             res= obj.name;
           }
         });
    return res;
  }
  public move(parentId, Chield,tops)
  {
    console.log(Chield);
    console.log(tops);
    let connection:ApiRequest = {
      link: 'api/dragable-menu/move/',
      methode: 'PUT',
      params: {id:Chield.id,parent:parentId,tops:tops},
      microservice: globals.MS_SERVER
    };
          this._APIService.getResponseFromMicroService(connection)
               .subscribe(
                   data=> {
                   console.log(data);
                    // this.createGroupsForComboList(data);

               },
                   error=> {

               }
           )
  }
}
