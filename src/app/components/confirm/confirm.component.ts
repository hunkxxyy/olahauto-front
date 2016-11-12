import { Component, OnInit,EventEmitter,ViewChild } from '@angular/core';

@Component({

  selector: 'app-confirm',
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.component.css'],
  inputs: ['callingButton','question','title','btnConfirmCaption'],
  outputs: ['valueConfirmed','openedPopUp']

})
export class ConfirmComponent implements OnInit {
  @ViewChild('modal') modal:any;
  valueConfirmed = new EventEmitter<any>(); //the question has confirmed
  openedPopUp = new EventEmitter<any>(); //get a modalcomponent be to caller component
  callingButton:string; //button html code
  question:string; //the question in the confirm dialog.
  title:string;//the confirm dialogs title
  btnConfirmCaption:string='Törlés';//the right button caption
  constructor() {}

  ngOnInit() {
  }
  modalClosed(){
   /* this.modalObject.name.value=this.originalValues.name;
    this.modalObject.description=this.originalValues.description;

    this.onModalClosed.emit('');*/

  }
  modalOpen(modal) {

    this.openedPopUp.emit(modal);
    modal.open();


  }
  public popIt(){

   this.modal.open();
  }
  confirm(){

    this.valueConfirmed.emit('true');
  }
}
