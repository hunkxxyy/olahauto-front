import { Directive } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ROUTER_DIRECTIVES, Router} from  '@angular/router';
import {Subscription} from'rxjs/RX';
@Directive({
  selector: '[ProtectedDirective]'
})
export class ProtectedDirective {

/*  private sub:any = null;
auth=true;
  constructor(private authService:AuthService, private router:Router, private location:Location) {
    if (this.auth) {
    //  this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigate(['PublicPage']);
    }

    this.sub = this.authService.subscribe((val) => {
      if (!val.authenticated) {
      //  this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['LoggedoutPage']); // tells them they've been logged out (somehow)
      }
    });
  }

  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }*/
}
