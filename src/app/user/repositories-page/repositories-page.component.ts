import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { UserService } from '../user.service';


@Component({
  selector: 'repositories-page',
  templateUrl: './repositories-page.component.html',
  styleUrls: ['./repositories-page.component.css']
})
export class RepositoriesPageComponent implements OnInit {
  dataSource: any = null;
  searchResults: any = null;
  displayedColumns: Array<string> = ['name', 'license', 'createdAt', 'watchersCount', 'language', 'description', 'action'];
  repositories: any = null;
  userInfo: any = null;
  hasStored: boolean = true;

  constructor(
    private userService: UserService,
  ) { }

  async ngOnInit() {
    this.userInfo = await this.userService.getUserInformation();
    this.repositories = await this.getRepositories();
    if (!this.repositories || this.repositories.length === 0) {
      this.hasStored = false;
      await this.getData();
    } else {
      this.dataSource = await this.normalizeData(this.repositories);
    }
  }

  async getRepositories() {
    if (this.userInfo && this.userInfo.id) {
      return await this.userService.getRepositories(this.userInfo.id)
    }
  }

  async getData() {
    await this.resetDisplayedColumns();
    const starredRepositories = await this.userService.getStarredRepoList(this.hasStored, this.userInfo.id);
    this.dataSource = await this.normalizeData(starredRepositories);
    this.repositories = await this.getRepositories();
  }

  async normalizeData(data: Array<Object>) {
    if (data && data.length > 0) {
      data.map(((el: any) => {
        el.license_name = el.license_name ? el.license_name : el.license ? el.license.name : null;
        el.watchers_count = new DecimalPipe('en-us').transform(el.watchers_count);
        el.created_at = new DatePipe('en-us').transform(el.created_at, 'LLL d, yyyy');
      }));
    }
    return data;
  }

  async searchRepositories(row: any) {
    this.searchResults = await this.userService.searchRepositories(row.description);
    this.displayedColumns = ['name', 'license', 'createdAt', 'watchersCount', 'language', 'description'];
    this.dataSource = await this.normalizeData(this.searchResults);
  }

  async refresh() {
    this.dataSource = null;
    this.hasStored = false;
    await this.getData();
  }

  async goBack() {
    this.searchResults = null;
    await this.resetDisplayedColumns();
    this.repositories = await this.getRepositories();
    this.dataSource = await this.normalizeData(this.repositories);
  }

  async resetDisplayedColumns() {
    this.displayedColumns = ['name', 'license', 'createdAt', 'watchersCount', 'language', 'description', 'action'];
  }
}
