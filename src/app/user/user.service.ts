import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  async getStarredRepoList(hasStored: boolean, userId: any): Promise<any> {
    return this.http.post(`${environment.API_BASE_URL}/starred`, { access_code : this.authService.getToken(), has_stored: hasStored, user_id: userId }).toPromise();
  }

  async searchRepositories(searchKey: any): Promise<any> {
    return this.http.post(`${environment.API_BASE_URL}/search`, { search_key : searchKey, access_code : this.authService.getToken() }).toPromise();
  }

  async getRepositories(id: any): Promise<any> {
    return this.http.post(`${environment.API_BASE_URL}/repositories`, { user_id : id }).toPromise();
  }

  async getUserInformation(): Promise<any> {
    return this.http.post(`${environment.API_BASE_URL}/user`, { access_code : this.authService.getToken() }).toPromise();
  }
}
