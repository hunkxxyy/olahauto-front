import { Component, OnInit,EventEmitter } from '@angular/core';

@Component({
  
  selector: 'app-ckeditor',
  templateUrl: 'ckeditor.component.html',
  styleUrls: ['ckeditor.component.css'],

  outputs: ['valueChanged'],
  inputs: ['htmlValue','fileUploader','PATH','INDEX','imgParams'],
})
export class CkeditorComponent implements OnInit {
  fileUploader:boolean=false;
  imagelistShow:boolean=false;
  sourceShow:boolean=false;
  valueChanged = new EventEmitter<string>();
  htmlValue:string;
  constructor(){

  }
  editorReady(event){
    console.log('ready');

    console.log(event);
  }
  change(event){
    console.log(event);
    this.valueChanged.emit(event);
  }
  ngOnInit(){

  }

  onSubmitModelForm(form){
    console.log(form);
  }

  onSubmitTemplateForm(form){
    console.log(form);
  }

}