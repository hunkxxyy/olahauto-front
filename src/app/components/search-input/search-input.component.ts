import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
    search:string='';

    constructor(private _Router:Router) {
    }

    ngOnInit() {
    }

    onKeyUp(event) {
        if (event.keyCode == 13) {
            this.runSearch();
        }
    }

    runSearch() {

        if (this.search.length < 4) alert('A keresndő kulcsszó legalább 4 character hosszó legyen');
        else   this._Router.navigate(['searchresult', this.search]);
    }
}
