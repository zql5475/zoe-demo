import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {  
  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
  }

  async onClick() {
    try {
      const result = await this.loginService.loginToGithub();
      if (result && result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      this.snackBar.open('Authorizing GitHub fail', '', {
        duration: 3000,
        panelClass: 'notif-error',
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }
}
