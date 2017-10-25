import { HttpClient, HttpParams } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable()
export class GithubApi extends Api {
    url: string = 'https://api.github.com';

    constructor(public http: HttpClient) {
      super(http);
    }

    createHeaders() {
      let headers = super.createHeaders();
      headers.append('content-type', 'application/vnd.github.v3+json');
      return headers;
    }

    getUserRepos(userName: string) {
      return this.get('users/${userName}/repos');
    }
}
