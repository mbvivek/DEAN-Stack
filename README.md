# DEAN Stack

DEAN Stack is a blockchain enabled, Angular and NodeJS powered framework to build decentralized web-apps.

![alt text](https://raw.githubusercontent.com/mbvivek/DEAN-Stack/master/Dean-Stack-Architecture.jpg "DEAN Stack Architecture")

# Architecture
##### Client
  - Angular
  - uport-connect

##### Server
  - NodeJS
  - Ganache-cli (Testrpc for Ethereum)
  - Mongo DB
  - uport-js

> `client` and `server` interacts using `REST`ful APIs

This framework uses a number of open source projects to work properly:

| Project         | Version |
| -------------   |  ------:|
| Angular         |  `v5.2` |
| uport-connect   |  `v0.7` |
| bootstrap       |  `v4.1` |
| jquery          |  `v3.3` |
| Node            |  `v8.11`|
| web3            |  `v1.0` |
| uport           |  `v0.6` |
| express         |  `v4.16`|
| solc            |  `v0.4` |
| mongoose        |  `v5.1` |

>   Angular         `v5.2`
>   uport-connect   `v0.7`
>   bootstrap       `v4.1`
>   jquery          `v3.3`
>   Node            `v8.11`
>   web3            `v1.0`
>   uport           `v0.6`
>   express         `v4.16`
>   solc            `v0.4`
>   mongoose        `v5.1`

This framework requires the below to be already installed on the system

>   Angular CLI     `v1.7`
>   npm             `v5.6`
>   ganache-cli     `v6.1` (should be running before starting the `server`)
>   mongodb         (by default [mLab](https://www.mlab.com/) Database-as-a-Service for MongoDB is used)

# Installation
#### Client
```sh
$ cd client
$ npm install
$ ng serve
```
#### Server
```sh
$ cd server
$ npm install
$ node server
```
