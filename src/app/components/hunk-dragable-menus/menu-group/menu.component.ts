import { Component, OnInit } from '@angular/core';
import {ElementRef ,ViewChild } from '@angular/core';
import {DragDropItem } from '../dragable-item/dragable-item.component';
import {APIService,ApiRequest } from '../../../globals/services/API.service';
import {globals } from '../../../globals/global.constats';
import {Functions } from '../../../globals/services/functions.service';
import { ItemgroupsModalComponent } from '../menu-modal/menu-modal.component';
import { HunkInputClass } from '../../hunkInput/HunkInputType';
import {ItemgroupServiceService} from'../itemgroup-service.service';
interface ItemGroupType{
  name:HunkInputClass;
  parent_id:number,
  desrciption?:string
}
enum DroppingPosition {
  dpAbove,
  dpBelow,
  dpIn
}

@Component({
  
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],


})
export class ItemGroupComponent implements OnInit {
  @ViewChild('dragingarea') dragingarea:ElementRef;
  @ViewChild('obectContainer') obectContainer:ElementRef;
  isDraging:boolean = false;

  groups:DragDropItem[] = [];
  sorted:Array<any>;
  classes = ['dragAndDropItem', 'draging'];
  style = {};
  selectedObject:DragDropItem; //moving by mouse
  hoverObject:DragDropItem; //hoveringItem
  hover:number = 0;
  treeLevel:number = 0;
  itsMoved=false;
  private areaTop:number;

  PopUp:any;
  currentItemGroup:ItemGroupType;

  constructor(private _ItemgroupServiceService:ItemgroupServiceService,
              private _APIService:APIService,
              private _Functions:Functions) {
    this.createEmptyObject();
    this.itemListGroupLoadedCallback = () => {

      this.loadRoot();
    }
  }

  itemListGroupLoadedCallback:(any) => void;

  ngOnInit() {
    this.groups = [];
    this._ItemgroupServiceService.loadItemGroup(this.itemListGroupLoadedCallback);
    // this.loadGroupParents();
    this.areaTop = this.dragingarea.nativeElement.getBoundingClientRect().top;
  //  console.log(this.dragingarea.nativeElement.getBoundingClientRect());

  }

  loadRoot() {
    this._ItemgroupServiceService.treeView.forEach((obj, index)=> {
      if (obj.parent_id == 0)
        this.groups.push(obj);
    });
  }

  /*Drag&Drop and tree methods*/
  onselected(obj) {

    this.selectedObject = obj;

  }

  ondropped(droppedObj) {
    console.log('DROPPED');
    if (this.selectedObject != null && this.itsMoved) {

      this.selectedObject.dragingPosition = {position: 'relative', 'z-index': '1'};

      droppedObj.top = this.checkDroppedInssideAGroup(droppedObj, this.hover);

      console.log(droppedObj);
      this.selectedObject = droppedObj;

      this.rendezes();
      this.selectedObject = null;
      this.itsMoved=false;

    }
    if (window.getSelection) window.getSelection().removeAllRanges();

  }

  private checkDroppedInssideAGroup(droppedObj:DragDropItem, newPos:number) {

    const pivotDistance = 17;
    const tolerance = 10;
    let originalPos = droppedObj.top;
    let done = false;
    let allTops=[];
    this.groups.forEach((obj:DragDropItem, index)=> {
      if (obj.id != droppedObj.id) {
        console.log(obj);
        let objTop={'top':obj.top,'id':obj.id};
        allTops.push(objTop);
        const pivotDifference = Math.abs((obj.top + pivotDistance) - (newPos + pivotDistance));
        if (pivotDifference < tolerance && !done) {

          done = true;
          this.objectGetToSubobject(obj, droppedObj);
          originalPos = newPos;

        }else  if (pivotDifference > tolerance && !done)
        {

          //dont use this condition if you dont want to reorder it
          originalPos = newPos;
        }

      }
    });
    if (!done){
      let objTop={'top':originalPos,'id':droppedObj.id};
      allTops.push(objTop);
      this._ItemgroupServiceService.move(droppedObj.parent_id,droppedObj,allTops);
    }
    return originalPos;
  }

  private objectGetToSubobject(parent:DragDropItem, newChield:DragDropItem) {
    //console.log({parent: parent, newChield: newChield});
    this._ItemgroupServiceService.move(parent.id, newChield,null);

    let copy:DragDropItem;
    this._ItemgroupServiceService.treeView.forEach((obj:DragDropItem, index)=> {
      if (obj.id == newChield.id) {

        copy = Object.assign({}, this._ItemgroupServiceService.treeView[index]);
        copy.parent_id = parent.id;
        delete (this._ItemgroupServiceService.treeView[index]);

        this._ItemgroupServiceService.treeView.push(copy);
      }
    });

    this.groups.forEach((obj:DragDropItem, index)=> {
      if (obj.id == parent.id) {
        this.groups[index].chield.push(copy);


      }
      if (obj.id == newChield.id) {
        delete(this.groups[index]);


      }
    });

    // console.log(this._ItemgroupServiceService.treeView);
    parent.parentOpen = true;
    this.colapseSubmenu(parent);
    this.onSubmenuClick(parent);

  }

  mouseMove(e) {

    const mouseTouchDif = 34;
    if (this.selectedObject) {
      console.log('MOVED');
      this.itsMoved=true;
      //console.log(document.body.scrollTop);
      const incrase = document.body.scrollTop + mouseTouchDif;
      let top = e.clientY - this.areaTop + incrase;
      this.hover = this.calculateHoverTop(e.clientY + incrase);
      this.selectedObject.dragingPosition = {position: 'absolute', top: top + 'px', 'z-index': '100'}
    }

  }

  private calculateHoverTop(eventTop:number) {

    let movingTop = eventTop - 47 - 5;
    if (movingTop < this.selectedObject.top) return movingTop; else return eventTop - 5;

  }

  sortList() {
    this.groups.sort((a, b)=> {

        if (a.top > b.top) return 1;
        else if (a.top < b.top) return -1;
        else  return 0;

      }
    )
    //  console.log(this.groups);
  }

  rendezes() {

    this.sorted = [];
    this.sortList();
    this.groups.forEach((obj, index)=> {
      this.sorted.push(Object.assign({}, obj))
    });

    this.groups = [];
    this.groups = this.sorted;
  }

  onSubmenuClick(parent:DragDropItem) {

    if (parent.parentOpen)this.openSubmenu(parent);
    else this.colapseSubmenu(parent);
    this.rendezes();
  }

  private openSubmenu(parent:DragDropItem) {


    this._ItemgroupServiceService.treeView.forEach((group:DragDropItem, index)=> {

      if (group.parent_id == parent.id) {
        group.treeLevel = parent.treeLevel + 1;
        group.top = parent.top + (index * 0.001);
        this.groups.push(group);
      }

    })
    //console.log(this.groups);
  }

  private colapseSubmenu(parent:DragDropItem) {
    this.groups.forEach((group:DragDropItem, index)=> {
      if (group.parent_id == parent.id) {

        if (group.parentOpen) this.colapseSubmenu(group);
        delete(this.groups[index]);
      }

    })
  }

  //New Modify/Delete actioons


  createEmptyObject() {
    this.currentItemGroup = {
      name: new HunkInputClass('Név'),
      parent_id: 0
    }
    this.currentItemGroup.name.value='';
    this.currentItemGroup.desrciption='';

  }


  onPopUp(popup)
  {
    this.PopUp=popup;
  }
  groupSavedCallback:(any) => void;
  groupSavedErrorCallback:(any) => void;

  onNewValueSaved(newGroup) {

    const compressed=this._Functions.compressRequest(newGroup);

    if (!compressed.parent_id) compressed.parent_id=0;
    console.log(compressed);

    let connection:ApiRequest = {
      link: 'api/dragable-menu/',
      methode: 'POST',
      params: compressed,
      microservice: globals.MS_SERVER
    };
    this.groupSavedCallback = (data) => {

      console.log(data);
      this.PopUp.close();
      this.groups = [];
      this._ItemgroupServiceService.loadItemGroup(this.itemListGroupLoadedCallback);
    }
    this.groupSavedErrorCallback = (data) => {
      console.log(data);
      if (data.name) this.currentItemGroup.name.error=data.name;
    }
    this._APIService.loadDatasFromApi(connection, this.groupSavedCallback,this.groupSavedErrorCallback);

  }
  groupModifiedCallback:(any) => void;
  groupModifiedErrorCallback:(any) => void;
  onGroupHasModified(modifiedGroup){
    const compressed=this._Functions.compressRequest(modifiedGroup);
    if (!compressed.parent_id) compressed.parent_id=0;


    let connection:ApiRequest = {
      link: 'api/dragable-menu/modify/'+modifiedGroup.id,
      methode: 'PUT',
      params: compressed,
      microservice: globals.MS_SERVER
    };
    this.groupModifiedCallback = (data) => {

      console.log(data);


      //this.PopUp.close();
      this.groups = [];
      this._ItemgroupServiceService.loadItemGroup(this.itemListGroupLoadedCallback);
    }
    this.groupModifiedErrorCallback = (data) => {

      if (data.name) modifiedGroup.name.error =data.name;
    }
    this._APIService.loadDatasFromApi(connection, this.groupModifiedCallback,this.groupModifiedErrorCallback);

  }
  onGroupHasArchived(groupForArchive){
    let connection:ApiRequest = {
      link: 'api/dragable-menu/archive/'+groupForArchive.id,
      methode: 'PUT',

      microservice: globals.MS_SERVER
    };
           this._APIService.getResponseFromMicroService(connection)
               .subscribe(
                   data=> {
                   console.log(data);
                     this.groups = [];
                     this._ItemgroupServiceService.loadItemGroup(this.itemListGroupLoadedCallback);

               },
                   error=> {
                  console.log(error);
               }
           )
  }

}
