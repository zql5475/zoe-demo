import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>  {
    return new Promise((resolve) => {
      if (this.authService.isAuthenticated()) {
        resolve(true);
      } else {
        this.authService.forceLogout();
        resolve(false);
      }
    });
  }
}