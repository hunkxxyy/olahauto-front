import { Component, OnInit,EventEmitter,ElementRef } from '@angular/core';

interface fields{
  name:string;
  description:string;
  taxRate?:string;
}
@Component({
  
  selector: 'app-taxcodes-modal',
  templateUrl: 'taxcodes-modal.component.html',
  styleUrls: ['taxcodes-modal.component.css'],
  inputs: ['modalObject', 'btnCaption'],
  outputs: ['valueSaved','openedPopUp','onModalClosed']

})
export class taxcodesModalComponent implements OnInit {

  valueSaved = new EventEmitter<any>();
  openedPopUp = new EventEmitter<any>();
  onModalClosed = new EventEmitter<string>();
  modalObject:any;
  btnCaption:string;
  setElemetToFocus:boolean;
  originalValues:fields; //need to contain the original values, because when cancel hapened i heve to reset the values to the original value.
  avaibleTaxTypes=[{name:'Értékesítési ÁFA kód',value:'SALES'},{name:'Beszerzési ÁFA kód',value:'PURCHASE'}]
  constructor(private _ElementRef:ElementRef) {

  }

  ngOnInit() {
  }

  modalClosed(){
    this.modalObject.taxRate.value=this.originalValues.taxRate;
    this.modalObject.taxRate.error='';
    this.modalObject.name.value=this.originalValues.name;
    this.modalObject.name.error='';
    this.modalObject.description=this.originalValues.description;

    this.onModalClosed.emit('');

  }
  modalOpen(modal) {

    this.originalValues={
      name:this.modalObject.name.value,
      description:this.modalObject.description,
      taxRate:this.modalObject.taxRate.value
    };
    this.openedPopUp.emit(modal);
    modal.open();


  }

  save() {

    this.valueSaved.emit(this.modalObject);

  }

}
