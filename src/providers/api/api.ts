import { HttpClient, HttpParams } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
 @Injectable()
export class Api {
  url: string = 'https://example.com/api/v1';

  constructor(public http: HttpClient) {
  }

  createHeaders() {
    let headers = new Headers();
    return headers;
  }

  get(endpoint: string, params?: any, reqOpts = {}) {
    reqOpts['params'] = new HttpParams();
    reqOpts['headers'] = this.createHeaders();

    // Support easy query params for GET requests
    if (params) {
      for (let k in params) {
        reqOpts['params'].set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts = {}) {
    reqOpts['headers'] = this.createHeaders();
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts = {}) {
    reqOpts['headers'] = this.createHeaders();
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts = {}) {
    reqOpts['headers'] = this.createHeaders();
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts = {}) {
    reqOpts['headers'] = this.createHeaders();
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
