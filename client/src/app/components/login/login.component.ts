import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import kjua = require('kjua');

// services
import { UportService } from '../../services/uport/uport.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  router: Router;
  httpService: HttpService;
  uportService: UportService;
  uportConnect: any;
  uportCredentials: any;
  qr: any;
  createRequestQR: any;

  constructor(
    router: Router,
    uportService: UportService,
    httpService: HttpService
  ) {
    this.router = router;
    this.httpService = httpService;
    this.uportService = uportService;
    this.uportConnect = uportService.getUportConnect();
    this.uportCredentials = uportService.getUportCredentials();
  }

  ngOnInit() {
    this.generateQRCode();
  }

  generateQRCode() {
    this.uportConnect
      .requestCredentials(
        {
          requested: ['name'],
          callbackUrl: 'http://localhost:3000/test',
          notifications: false,
        },
        uri => {
          console.log(uri);
          this.qr = kjua({
            text: uri,
            fill: '#000000',
            size: 500,
            back: 'rgba(255,255,255,1)',
          });
        }
      )
      .then(userProfile => {
        console.log(userProfile);
        // decode the MNID to get the address
        let address = this.uportService.decode(userProfile.address).address;
        alert('Welcome '+ userProfile.name +' Your uPort address = ' + address);
        this.router.navigateByUrl('/home');
      });
  }
}
