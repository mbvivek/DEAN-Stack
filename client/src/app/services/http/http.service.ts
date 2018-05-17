import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  serverURL: string;
  constructor(private http: HttpClient) {
    this.serverURL = 'http://localhost:3000/';
  }

  get(url: string) {
    let apiUrl = this.serverURL + url;
    return this.http.get(apiUrl);
  }

}
