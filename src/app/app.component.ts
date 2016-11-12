import { Component } from '@angular/core';
import {ErrorService} from "./globals/services/error.service";
import {AuthService} from "./globals/services/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
      private _AuthService:AuthService,
      private _ErrorService:ErrorService) {

  }

}
