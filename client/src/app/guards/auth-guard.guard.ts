import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private _authService:AuthService
  ){}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this._authService.currenUserValue
    if (currentUser) {
      //check de role
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        //not authorized
        this.router.navigate(['/'])
        return false
      }
      return true;
    }

    //not logged
    //this.router.navigate(['/login'])
    return false
  }
}
