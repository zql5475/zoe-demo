import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
  ) { }

  async loginToGithub(): Promise<any> {
    return this.http.get(`${environment.API_BASE_URL}/login`).toPromise();
  }
}
