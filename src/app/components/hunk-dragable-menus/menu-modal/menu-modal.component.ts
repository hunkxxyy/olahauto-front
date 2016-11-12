import { Component, OnInit,EventEmitter,ElementRef } from '@angular/core';
import {APIService,ApiRequest } from '../../../globals/services/API.service';
import {ItemgroupServiceService} from'../itemgroup-service.service';
interface fields{
  name:string;
  description:string;
  taxRate?:string;
}
@Component({
  
  selector: 'app-menu-modal',
  templateUrl: 'menu-modal.component.html',
  styleUrls: ['menu-modal.component.css'],

  inputs: ['modalObject', 'btnCaption'],
  outputs: ['valueSaved','openedPopUp','onModalClosed']
})
export class ItemgroupsModalComponent implements OnInit {

  itemGroupElements:any[] = [];
  valueSaved = new EventEmitter<any>();
  openedPopUp = new EventEmitter<any>();
  onModalClosed = new EventEmitter<string>();
  modalObject:any;
  btnCaption:string;
  setElemetToFocus:boolean;
  selectedObject:any;
  originalValues:fields; //need to contain the original values, because when cancel hapened i heve to reset the values to the original value.

  constructor(private _ElementRef:ElementRef, private _ItemgroupServiceService:ItemgroupServiceService) {

  }

  ngOnInit() {
    if (this.modalObject.parent_id)
    {
    //  console.log(this.modalObject);
      this.selectedObject={name:this.modalObject.parent_name};
    }else
      this.selectedObject={name:''};

  }

  modalClosed(){
   /* this.modalObject.taxRate.value=this.originalValues.taxRate;
    this.modalObject.taxRate.error='';
    this.modalObject.name.value=this.originalValues.name;
    this.modalObject.name.error='';
    this.modalObject.description=this.originalValues.description;

    this.onModalClosed.emit('');*/

  }
  modalOpen(modal) {
    this.itemGroupElements=this._ItemgroupServiceService.groupsForComboList;
    //console.log(this.modalObject);
   // console.log(this.itemGroupElements);
   // console.log(this._ItemgroupServiceService.groupsSource);
    /*this.originalValues={
      name:this.modalObject.name.value,
      description:this.modalObject.description,
      taxRate:this.modalObject.taxRate.value
    };*/
    this.openedPopUp.emit(modal);
    modal.open();


  }
  groupTarentSelected(parent){
    this.modalObject.parent_id=parent.id;
    //console.log(parent);
  }
  save() {


    this.valueSaved.emit(this.modalObject);

  }

}
