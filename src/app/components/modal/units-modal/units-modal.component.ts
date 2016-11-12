import { Component, OnInit,EventEmitter,ElementRef } from '@angular/core';
interface fields{
  name:string;
  description:string;
}
@Component({
  
  selector: 'app-units-modal',
  templateUrl: 'units-modal.component.html',
  styleUrls: ['units-modal.component.css'],
  inputs: ['modalObject', 'btnCaption'],
  outputs: ['valueSaved','openedPopUp','onModalClosed']

})
export class UnitsModalComponent implements OnInit {

  valueSaved = new EventEmitter<any>();
  openedPopUp = new EventEmitter<any>();
  onModalClosed = new EventEmitter<string>();
  modalObject:any;
  btnCaption:string;
  setElemetToFocus:boolean;
  originalValues:fields; //need to contain the original values, because when cancel hapened i heve to reset the values to the original value.

  constructor(private _ElementRef:ElementRef) {

  }

  ngOnInit() {
  }
  modalClosed(){
    this.modalObject.name.value=this.originalValues.name;
    this.modalObject.description=this.originalValues.description;
    this.modalObject.name.error='';
    this.onModalClosed.emit('');

  }
  modalOpen(modal) {

    this.originalValues={name:this.modalObject.name.value,description:this.modalObject.description};
    this.openedPopUp.emit(modal);
    modal.open();


  }

  save() {

    this.valueSaved.emit(this.modalObject);

  }

}
