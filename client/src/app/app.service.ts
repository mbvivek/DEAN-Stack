import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  serverURL: string;
  constructor(private http: HttpClient) {
    this.serverURL = 'http://localhost:3000/';
  }

  deployContract(greetMessage: string) {
    let apiUrl = this.serverURL + 'greetContract/deploy/' + greetMessage;
    return this.http.get(apiUrl);
  }

  getAllEvents(contractAddress: string) {
    let apiUrl = this.serverURL + 'greetContract/allEvents/' + contractAddress;
    return this.http.get(apiUrl);
  }

  updateContract(contractAddress: string, greetMessage: string) {
    let apiUrl =
      this.serverURL +
      'greetContract/update/' +
      contractAddress +
      '/' +
      greetMessage;
    return this.http.get(apiUrl);
  }

  getDataFromDB() {
    let apiUrl = this.serverURL + 'db';
    return this.http.get(apiUrl);
  }
}
