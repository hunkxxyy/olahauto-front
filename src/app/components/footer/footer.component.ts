import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public _MenuService:MenuService) {

  }

  ngOnInit() {
  }

}
