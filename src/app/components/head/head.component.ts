import { Component, OnInit,EventEmitter  } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']


})
export class HeadComponent implements OnInit {
 // headerMenu=['max4KAPCSOLAT','VÁSÁRLÓI INFORMÁCIÓK','SZÁLLÍTÁSI INFORMÁCIÓK','CÉGINFORMÁCIÓ'];

  constructor(public _MenuService:MenuService) {

  }

  ngOnInit() {

  }


  private _toggleSidebar() {
     this._MenuService.leftMenuPanelOpen=true;
  }
}
