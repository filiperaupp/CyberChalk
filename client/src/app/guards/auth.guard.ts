import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private _authService:AuthService
  ){}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this._authService.currenUserValue
    if (currentUser) {
      //check de role
      if (route.data.roles && route.data.roles.indexOf(currentUser.type) === -1) {
        //not authorized
        this.router.navigate(['/'])
        return false
      }
      return true;
    }

    //not logged
    this.router.navigate(['/'])
    return false
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this._authService.currenUserValue
    if (currentUser) {
      //check de role
      if (route.data.roles && route.data.roles.indexOf(currentUser.type) === -1) {
        //not authorized
        this.router.navigate(['/dashboard'])
        return false
      }
      return true;
    }

    //not logged
    this.router.navigate(['/'])
    return false
  }
}
