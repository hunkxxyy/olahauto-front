import { Component, OnInit,EventEmitter,ElementRef,ViewChild } from '@angular/core';

import { HunkInput } from '../../hunkInput/hunkInput.component';
import { ComboPartnerGroupComponent } from '../../combo-partner-group/comboPartnerGroup.component';
import { Partner } from '../../../views/partners/default';
import { ApiRequest,APIService } from '../../../globals/services/API.service';
import { Functions } from '../../../globals/services/functions.service';
import { globals } from '../../../globals/global.constats';


interface fields {
    name:string;
    description:string;
}
@Component({
    
    selector: 'app-new-partner-modal',
    templateUrl: 'new-partner-modal.component.html',
    styleUrls: ['new-partner-modal.component.css'],

    inputs: ['modalObject', 'btnCaption'],
    outputs: ['valueSaved', 'openedPopUp', 'onModalClosed']

})
export class NewPartnerModalComponent implements OnInit {
    @ViewChild('modal') modal:any;
    valueSaved = new EventEmitter<any>();
    openedPopUp = new EventEmitter<any>();
    onModalClosed = new EventEmitter<boolean>();
    modalObject:any;
    btnCaption:string;
    hasError:boolean=true;
    setElemetToFocus:boolean;
    originalValues:fields; //need to contain the original values, because when cancel hapened i heve to reset the values to the original value.

    partner:Partner;

    constructor(private _ElementRef:ElementRef, private _APIService:APIService, private _Functions:Functions) {
        this.partner = new Partner;
    }

    ngOnInit() {

    }

    modalClosed(withOitEvent) {
        /* this.modalObject.name.value=this.originalValues.name;
         this.modalObject.description=this.originalValues.description;
         this.modalObject.name.error='';
         this.onModalClosed.emit('');*/

        this.partner.name.value='';

        this.onModalClosed.emit(this.hasError);

    }

    modalOpen(modal) {

        /*   this.originalValues={name:this.modalObject.name.value,description:this.modalObject.description};
         this.openedPopUp.emit(modal);*/
        //modal.open();

        this.modal.open();


    }

    public openModal(tempPartnerName) {

        this.partner = new Partner;
        this.partner.name.value = tempPartnerName;

        this.modal.open();
    }

    savePartnerCallback:(any) => void;
    errorWithInputs:(any) => void;
    save(){
        if (!this.checkFieldValues()) this.saveToApi();
    }
    checkFieldValues(){
        let save = this._Functions.compressRequest(this.partner);
       let  error=false;
        if (save.addresses[0].postalCode==null)
        {
            this.partner.addresses[0].postalCode.error = 'Kötelező!';
            error=true;
        }
        else this.partner.addresses[0].postalCode.error = '';
        if (save.addresses[0].city==null)
        {
            this.partner.addresses[0].city.error = 'A város mező kitöltése kötelező!';
            error=true;
        }
        else this.partner.addresses[0].city.error = '';
        if (save.addresses[0].address==null)
        {
            this.partner.addresses[0].address.error = 'A cím mező kitöltése kötelező!'
            error=true;
        }
        else this.partner.addresses[0].address.error = '';
        if (save.name==null)
        {
            this.partner.name.error = 'A cím mező kitöltése kötelező!'
            error=true;
        }
        else this.partner.name.error = '';
        return error;
    }
    saveToApi() {



        let save = this._Functions.compressRequest(this.partner);
        console.log(save);
        const connection:ApiRequest = {
            link: 'api/partners/partner/',
            methode: 'POST',
            microservice: globals.MS_PARTNER,
            params: save,
            errorSucces: 0


        };

        this.savePartnerCallback = (data) => {
            console.log(data);
            this.valueSaved.emit(data);
            this.hasError=false;
            this.modal.close();


        }
        this.errorWithInputs = (errors) => {
            console.log(errors);

        }
        //   console.log(connection);
        this._APIService.loadDatasFromApi(connection, this.savePartnerCallback);

    }

    onPartnerGroupChanged(event) {
        this.partner.partner_group_id = event;
    }

}
