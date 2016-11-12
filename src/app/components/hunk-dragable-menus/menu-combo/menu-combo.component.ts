import { Component, OnInit,ElementRef,EventEmitter,ViewChild } from '@angular/core';
import {Functions} from '../../../globals/services/functions.service'
import {ItemGroupType} from '../itemgroup-service.service'
import { SafeHtml } from '@angular/platform-browser';
enum SearchType {
  stNone,
  stPart,
  stWhole,


}

@Component({
  
  selector: 'app-menu-combo',
  templateUrl: 'menu-combo.component.html',
  styleUrls: ['menu-combo.component.css'],
  inputs: ['comboBase','selectedObject'],

  outputs: ['selectedValueChanged']

})
export class ItemGroupComboComponent implements OnInit {
  comboBase:ItemGroupType[]=[];
  public matchesCount = 0;
  public newComboBasesInSearchField:SearchType;
  fixlist=true;
  selectedValueChanged = new EventEmitter<ItemGroupType>();
  public comboBaseSuggestion:Array<ItemGroupType> = [];
  selectedObject:ItemGroupType;
  dorpDownOpen = false;
  selectedIndex:number = -1;
  cursor:string = 'text';
  clientWidth:number=340;
  @ViewChild('comboBaseSerach') comboBaseSerach:ElementRef;
  constructor(private _Functions:Functions,private _ElementRef:ElementRef) {
 //   this.searchField.value='';
  }
  ngOnInit() {
   // console.log(this.comboBaseSerach);
   // this.clientWidth = this.comboBaseSerach.nativeElement.offsetParent.clientWidth;

  }

  onKeyDown(event) {
    if (this.fixlist) {
      if (window.getSelection().toString() != "") {
      //  this.searchField.name = '';
        this.selectedObject = {name: ''};
      }
      let success = false;
      if (event.key.length == 1) {

        for (var group of this.comboBase) {
          if (this._Functions.matchAccent(group.searchContent, this.selectedObject.name + event.key)) {
            success = true;
          }
        }
        if (!success) event.preventDefault();

      }

    }



    if (event.keyCode === 40 && this.selectedIndex < this.comboBaseSuggestion.length - 1) {//down key,// increment selectedIndex
      event.preventDefault();
      this.selectedIndex++;

    } else if (event.keyCode === 38 && this.selectedIndex > 0) { //up key, decrement selectedIndex
      event.preventDefault();
      this.selectedIndex--;
    } else if (event.keyCode === 13) { // || event.keyCode === 9 //i cahnged the tab  event to blur
      // this.selectedObject=this.compObject.suggestions[this.selectedIndex].return;
      this.selectObject();
      // this.selectObject();

    } else if (event.keyCode === 9) {
      this.newComboBasesInSearchField = SearchType.stPart; //same reason as in choseByMous
    }


  }
  onKeyUp(event) {

    if (event.keyCode !== 40 && event.keyCode !== 38 && event.keyCode !== 13 && event.keyCode !== 9)
      this.reload(this.selectedObject.name)


  }
  onMouseOver(event) {

    this.cursor = (event.offsetX > this.clientWidth - 80) ? 'pointer' : 'text';
  }
  downArrowClick(){

    if (this.dorpDownOpen){
      this.dorpDownOpen = false;
      this.onBlur();
    }
    else {
      this.reload('');
      this.dorpDownOpen = true;
    }
  }
  onInputClick() {
    if (this.cursor == 'pointer') {
      this.downArrowClick();

    }
  }

  private reload(value) {
    this.matchesCount = 0;
    this.newComboBasesInSearchField = SearchType.stNone;
    this.comboBaseSuggestion = [];

    for (var comboBase of this.comboBase) {


      if (this._Functions.matchAccent(comboBase.searchContent, value)) {
        //   console.log(comboBase);
        this.matchesCount++;
        var copy = Object.assign({}, comboBase);

          this.comboBaseSuggestion.push(copy);



        if (this._Functions.compairStrings(comboBase.searchContent, value)) {
          this.newComboBasesInSearchField = SearchType.stWhole;
          let tmp = this.comboBaseSuggestion[0];
          this.comboBaseSuggestion[0] = copy;
          this.comboBaseSuggestion[this.comboBaseSuggestion.length - 1] = tmp;
        }
      }

    }

    this.dorpDownOpen = true;
    if (this.comboBaseSuggestion.length == 0) this.newComboBasesInSearchField == SearchType.stNone;
    else if (this.newComboBasesInSearchField != SearchType.stWhole) this.newComboBasesInSearchField = SearchType.stPart;


  }
  onBlur() {


      if (this.newComboBasesInSearchField < 2) {
        this.selectObject();

    }
  }

  choseeByMouse(index) {
    this.selectedIndex = index;
     this.newComboBasesInSearchField = SearchType.stPart;

  }
  selectObject() {

    if (this.comboBaseSuggestion.length > 0 && this.selectedIndex > -1) {
      this.selectedObject = this.comboBaseSuggestion[this.selectedIndex];
      this.newComboBasesInSearchField = SearchType.stWhole;
    }
    else if (this.comboBaseSuggestion.length > 0)
    {

      if (this.selectedObject.name!='' )
      {

        console.log( this.comboBaseSuggestion[0]);
        this.selectedObject = this.comboBaseSuggestion[0];
      }

      else
      {
        this.selectedObject.id=0;
      }

    }


    //    if (this.cannotBeEmpty)this.selectedObject = this.comboBaseSuggestion[0];
    this.comboBaseSuggestion = [];
    this.dorpDownOpen = false;
    this.selectedIndex = -1;

    this.selectedValueChanged.emit(this.selectedObject);
  }

}
