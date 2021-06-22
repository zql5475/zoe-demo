import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../home/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) { }

  isAuthenticated() {
    const token = this.getToken();
    return typeof token !== 'undefined' && token;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  forceLogout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  async logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Are you sure you want to sign out?`,
        buttonText: {
          ok: 'SIGN OUT',
          cancel: 'CANCEL'
        }
      }
    });
    const confirmed = await dialogRef.afterClosed().toPromise();
    if (confirmed) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}