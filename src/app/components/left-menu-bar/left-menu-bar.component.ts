import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
import { AuthService } from '../../globals/services/auth.service';





@Component({
  selector: 'app-left-menu-bar',
  templateUrl: './left-menu-bar.component.html',
  styleUrls: ['./left-menu-bar.component.css'],



})
export class LeftMenuBarComponent implements OnInit {



  customStyle={'background-color':'#e31e24','color':'white'}
  constructor(
      public _MenuService:MenuService,
      public _AuthService:AuthService) {
  }

  ngOnInit() {

  }

  onMenuClicked(e){
    this._MenuService.leftMenuPanelOpen=false;
  }
  public _toggleSidebar() {
    this._MenuService.leftMenuPanelOpen=!this._MenuService.leftMenuPanelOpen;
    
  }
}
