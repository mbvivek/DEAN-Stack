import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  deployContract_greetMessage: string;
  getAllEvents_contractAddress: string;
  updateContract_contractAddress: string;
  updateContract_greetMessage: string;

  appService: AppService;

  logs: any;

  constructor(appService: AppService) {
    this.appService = appService;
  }

  ngOnInit() {
    this.deployContract_greetMessage = '';
    this.getAllEvents_contractAddress = '';
    this.updateContract_contractAddress = '';
    this.updateContract_greetMessage = '';
    this.logs = [];
  }

  deployContract(event, form) {
    event.preventDefault();
    if (!form.valid) {
      alert('Invalid Data!');
      return;
    }
    this.appService
      .deployContract(this.deployContract_greetMessage)
      .subscribe(contract => {
        console.log(contract);
        this.logs.push({
          heading: 'Contract Deployed',
          body: 'at ' + contract['options'].address,
        });
        alert(
          'Contract deployed successfully! \n Contract Address : ' +
            contract['options'].address
        );
      });
  }

  getAllEvents(event, form) {
    event.preventDefault();
    if (!form.valid) {
      alert('Invalid Data!');
      return;
    }
    this.appService
      .getAllEvents(this.getAllEvents_contractAddress)
      .subscribe(events => {
        console.log(events);
        this.logs.push({
          heading: 'Events of ' + this.getAllEvents_contractAddress,
          body: JSON.stringify(events, null, 2),
        });
        alert(events['length'] + ' event(s) found!');
      });
  }

  updateContract(event, form) {
    event.preventDefault();
    if (!form.valid) {
      alert('Invalid Data!');
      return;
    }
    this.appService
      .updateContract(
        this.updateContract_contractAddress,
        this.updateContract_greetMessage
      )
      .subscribe(receipt => {
        console.log(receipt);
        this.logs.push({
          heading: 'Contract Updated',
          body: JSON.stringify(receipt, null, 2),
        });
        alert('Contract updated!');
      });
  }
}
