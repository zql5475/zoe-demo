import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  code: string;
  accessCode: any = null;
  modules: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private authService: AuthService,
  ) {
    this.code = this.activatedRoute.snapshot.queryParams.code;
  }

  async ngOnInit() {
    if (!this.authService.getToken()) {
      await this.getAccessCode();
    }
    await this.populateModules();
  }

  async populateModules() {
    this.modules = [
      {
        title: 'Demo Module',
        link: '/home',
        matIcon: 'search',
      }, {
        title: 'Repositories Management',
        link: '/user/repositories',
        matIcon: 'verified',
      },
    ];
  }

  async getAccessCode() {
    try {
      const accessCodeInfo = await this.homeService.getGithubAccessCode(this.code);
      if (accessCodeInfo) {
        this.accessCode = accessCodeInfo.access_code;
        this.authService.setToken(this.accessCode);
      }
    } catch (error) {
      this.authService.forceLogout();
    }
  }
}
