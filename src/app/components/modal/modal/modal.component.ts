import { Component, OnInit,EventEmitter,ElementRef } from '@angular/core';


interface fields{
  name:string;
  description:string;
}
@Component({
  
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],

  inputs: ['modalObject', 'btnCaption'],
  outputs: ['valueSaved','openedPopUp','onModalClosed']


})
export class ModalComponent implements OnInit {
  valueSaved = new EventEmitter<any>();
  openedPopUp = new EventEmitter<any>();
  onModalClosed = new EventEmitter<string>();
  modalObject:any;
  btnCaption:string;



  originalValues:fields; //need to contain the original values, because when cancel hapened i heve to reset the values to the original value.

  constructor(private _ElementRef:ElementRef) {

  }

  ngOnInit() {
  }
  modalClosed(){
    this.modalObject.name.value=this.originalValues.name;
    this.modalObject.name.error='';
    this.modalObject.description=this.originalValues.description;

    this.onModalClosed.emit('');

  }
  modalOpen(modal) {

    this.originalValues={name:this.modalObject.name.value,description:this.modalObject.description};
    this.openedPopUp.emit(modal);
    modal.open();

   // console.log(this._ElementRef);
  }

  save() {
    this.valueSaved.emit(this.modalObject);

  }
}
