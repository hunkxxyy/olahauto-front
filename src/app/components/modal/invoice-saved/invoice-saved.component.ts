import { Component, OnInit,EventEmitter,ElementRef,ViewChild } from '@angular/core';

import { globals } from '../../../globals/global.constats';
import { Functions } from '../../../globals/services/functions.service';
import { AuthService } from '../../../globals/services/auth.service';

interface fields {
  name:string;
  description:string;
}
@Component({
  
  selector: 'app-invoice-saved',
  templateUrl: 'invoice-saved.component.html',
  styleUrls: ['invoice-saved.component.css'],

  inputs: ['modalObject', 'btnCaption'],
  outputs: ['valueSaved', 'openedPopUp', 'onModalClosed']
})
export class InvoiceSavedComponent implements OnInit {

  @ViewChild('modalx') modalx:any;
  valueSaved = new EventEmitter<any>();
  openedPopUp = new EventEmitter<any>();
  onModalClosed = new EventEmitter<string>();
  modalObject:any;
  btnCaption:string;
  setElemetToFocus:boolean;
  originalValues:fields; //need to contain the original values, because when cancel hapened i heve to reset the values to the original value.

  invoiceNumber:string='';

  constructor(private _AuthService:AuthService, private _Functions:Functions) {

  }

  ngOnInit() {

  }

  modalClosed() {


  }

  modalOpen(modal) {

    /*   this.originalValues={name:this.modalObject.name.value,description:this.modalObject.description};
     this.openedPopUp.emit(modal);*/
    //modal.open();

    this.modalx.open();


  }

  public popIt(invoiceNumber) {
    this.invoiceNumber=this._Functions.removeOfWindows(invoiceNumber);


    this.modalx.open();
  }




  printInvoice(){
   this.modalx.close();



    // console.log(formatedInvoiceNumber);

    let w = window.open( globals.MS_INVOICES+'api/invoices/invoice/getpdf/Számla '+ this.invoiceNumber+'?authorization='+ this._AuthService.user.access_token+'&db='+this._AuthService.user.business_db);


  }
}
