import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(
    private http: HttpClient,
  ) { }

  async getGithubAccessCode(code: string): Promise<any> {
    return this.http.post(`${environment.API_BASE_URL}/access-code`, { code : code }).toPromise();
  }
}
