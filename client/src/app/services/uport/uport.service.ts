import { Injectable } from '@angular/core';

import { Credentials } from 'uport';
import { Connect, SimpleSigner } from 'uport-connect';

import { sha3_256 } from 'js-sha3';
import { Buffer } from 'buffer';

var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var HEX = '0123456789abcdef';
var base58 = require('base-x')(BASE58);
var hex = require('base-x')(HEX);

const credentials = new Credentials();

@Injectable()
export class UportService {
  uportConnect: any;
  signer: any;
  uportCredentials: any;
  constructor() {
    this.signer = SimpleSigner(
      'b55805d8634fdbf8ce8026c6cd3d459b50bc9d93ba1335c1eca6724144229e83'
    );
    this.uportCredentials = new Credentials({
      appName: 'DEAN Stack',
      address: '2ohwL2d34fvaYucBVMAUwRzoxB6DeSRbYtY',
      network: 'rinkeby',
      signer: this.signer,
    });
    this.uportConnect = new Connect('DEAN Stack', {
      clientId: '2ohwL2d34fvaYucBVMAUwRzoxB6DeSRbYtY',
      network: 'rinkeby',
      signer: this.signer,
    });
  }

  getUportConnect() {
    return this.uportConnect;
  }

  getUportCredentials() {
    return this.uportCredentials;
  }

  createRequest() {
    console.log('uportService - createRequest()');
    let req = {
      requested: ['name'],
      callbackUrl: 'https://localhost:3000/test',
      notifications: true,
    };
    this.uportCredentials.createRequest(req).then(jwt => {
      alert('JWT = ' + jwt);
      //this.showRequest(jwt);
      credentials.receive(jwt).then(creds => {
        console.log('creds = ');
        console.log(creds)
      });
    });
  }

  showRequest(requestToken) {
    console.log(this.uportConnect);
    this.uportCredentials.showRequest(requestToken).then(res => {
      console.log('showRequest() = ');
      console.log(res);
    });
  }

  checksum(payload) {
    return new Buffer(sha3_256(Buffer.concat(payload)), 'hex').slice(0, 4);
  }

  encode({ network, address }) {
    const payload = [
      new Buffer('01', 'hex'),
      hex.decode(network.slice(2)),
      new Buffer(address.slice(2), 'hex'),
    ];
    payload.push(this.checksum(payload));
    return base58.encode(Buffer.concat(payload));
  }

  decode(encoded) {
    const data = Buffer.from(base58.decode(encoded));
    const netLength = data.length - 24;
    const version = data.slice(0, 1);
    const network = data.slice(1, netLength);
    const address = data.slice(netLength, 20 + netLength);
    const check = data.slice(netLength + 20);
    if (check.equals(this.checksum([version, network, address]))) {
      return {
        network: `0x${hex.encode(network)}`,
        address: `0x${address.toString('hex')}`,
      };
    } else {
      throw new Error('Invalid address checksum');
    }
  }

  isMNID(encoded) {
    try {
      const data = Buffer.from(base58.decode(encoded));
      return data.length > 24 && data[0] === 1;
    } catch (e) {
      return false;
    }
  }
}
