import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  router: Router;
  deployContract_greetMessage: string;
  getAllEvents_contractAddress: string;
  updateContract_contractAddress: string;
  updateContract_greetMessage: string;

  appService: AppService;

  logs: any;

  constructor(router: Router, appService: AppService) {
    this.router = router;
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
          'Contract deployed successfully! \nContract Address : ' +
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
      .subscribe(data => {
        console.log(data);
        if (data['error']) {
          alert('Error: ' + data['error']);
        } else {
          this.logs.push({
            heading: 'Events of ' + this.getAllEvents_contractAddress,
            body: JSON.stringify(data['events'], null, 2),
          });
          alert(
            data['events']['length'] +
              ' event(s) found! \nEvents will be logged in logs.'
          );
        }
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
      .subscribe(data => {
        console.log(data);
        if (data['error']) {
          alert('Error: ' + data['error']);
        } else {
          this.logs.push({
            heading: 'Contract Updated',
            body: JSON.stringify(data['receipt'], null, 2),
          });
          alert('Contract updated! \nReceipt will be logged in logs.');
        }
      });
  }

  getDataFromDB(event, form) {
    event.preventDefault();
    this.appService.getDataFromDB().subscribe(data => {
      console.log(data);
      if (data['error']) {
        alert('Error: ' + data['error']);
      } else {
        this.logs.push({
          heading: 'Data from DB',
          body: JSON.stringify(data['data'], null, 2),
        });
        alert('Fetched Data from DB! \nData will be logged in logs.');
      }
    });
  }

  clearLogs() {
    this.logs = [];
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
