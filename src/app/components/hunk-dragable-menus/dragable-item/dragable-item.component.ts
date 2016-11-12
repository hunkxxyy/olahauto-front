import { Component, OnInit,EventEmitter,ElementRef,ViewChild } from '@angular/core';
import { HunkInputClass } from '../../../components/hunkInput/HunkInputType';
import { ItemgroupServiceService } from '../itemgroup-service.service';
interface ItemGroupModalType{
  id:number;
  name:HunkInputClass;
  parent_id:number,
  parent_name?:string,
  desrciption?:string,
  route?:string
}
export interface DragDropItem {
  name:string;
  id:number;
  route?:string;
  chield?:DragDropItem[];
  class?:string;
  top?:number;
  description?:string;
  parent_id?:number;
  dragingPosition?:{};
  parentOpen?:boolean;
  treeLevel?:number;
  modalObject:ItemGroupModalType;
  editable:boolean;

}
@Component({
  
  selector: 'app-dragable-item',
  templateUrl: 'dragable-item.component.html',
  styleUrls: ['dragable-item.component.css'],
  inputs:['object'],
  outputs: ['selected','dropped','submenuClick','groupHasModified','groupHasArchived'],









})
export class DragableItemComponent implements OnInit {
  @ViewChild('row') row:ElementRef;
  object:DragDropItem;
  private currentTimeout:any;
  dragDellay = 500;
  classes=['dragAndDropItem','draging']; //row class
  selected = new EventEmitter<DragDropItem>();
  dropped = new EventEmitter<DragDropItem>();
  groupHasModified = new EventEmitter<any>();
  groupHasArchived = new EventEmitter<any>();

  submenuClick = new EventEmitter<DragDropItem>();
  draggingEnable=false;

  cursor:string='move';
  disableMouseUp=false;
  cancaledAction=false;

  popUp:any;
  constructor( private _ElementRef:ElementRef, private _ItemgroupServiceService:ItemgroupServiceService) {}

  ngOnInit() {
   // this.createModalObject();
    this.object.top=this._ElementRef.nativeElement.offsetTop;
    this.object.class=this.classes[0];
    this.object.top=this.row.nativeElement.getBoundingClientRect().top+document.body.scrollTop;
    this.object.dragingPosition={position: 'relative', 'z-index': '1','padding-left':+30+this.object.treeLevel*30+'px'};
  }

  onMouseDown(e){


    if (this.cursor=='move' && this.object.editable){

      clearTimeout(this.currentTimeout);
      this.currentTimeout = undefined;
      this.currentTimeout = setTimeout(() => {

        this.delayMove(e);
      }, this.dragDellay);
   }
    else{
      this.disableMouseUp=true;

      this.object.parentOpen=!this.object.parentOpen;
      this.submenuClick.emit(this.object);
    }

  }
  delayMove(e){
    console.log('DELAY');
    if (this.object.parentOpen)
    {
      this.disableMouseUp=true;
      this.object.parentOpen=!this.object.parentOpen;
      this.submenuClick.emit(this.object);

    }else
    {
      this.selected.emit(this.object);
      this.object.class=this.classes[1];

    }
  }
  onMouseUp(e){
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
    if (e.offsetX>30) {

      this.object.class = this.classes[0];
      this.dropped.emit(this.object);
    }
  }
  mouseOver(e){
    if (this.object.chield.length)
    this.cursor=(e.offsetX<30)?'pointer':'move';

  }
  archive(object){
    this.groupHasArchived.emit(object);
  }
 /* createModalObject(){
  //  console.log(this.object);
    this.modalObject = {
      id:this.object.id,
      name: new HunkInputClass('Név'),
      parent_id: this.object.parent_id,
      parent_name:this._ItemgroupServiceService.getFieldNameById(this.object.parent_id)
    }
    this.modalObject.name.value=this.object.name;


  }*/
  onPopUp(popUp){
    this.popUp=popUp;
  }

  onNewValueSaved(modifiedObject){
  this.groupHasModified.emit(modifiedObject);
  }

}
