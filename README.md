# DEAN Stack

DEAN Stack is a blockchain enabled, Angular and NodeJS powered framework to build decentralized web-apps.

![alt text](https://raw.githubusercontent.com/mbvivek/DEAN-Stack/master/Dean-Stack-Architecture.jpg "DEAN Stack Architecture")

# Architecture
#### Client
  - Angular
  - Uport-connect

#### Server
  - NodeJS
  - Ganache-cli (Testrpc for Ethereum)
  - Mongo DB
  - Uport-js

> `client` and `server` interacts using `REST`ful APIs

This framework uses a number of open source projects to work properly:

| Project         | Version |
| --------------- | -------:|
| angular         |  `v5.2` |
| uport-connect   |  `v0.7` |
| bootstrap       |  `v4.1` |
| jquery          |  `v3.3` |
| node            |  `v8.11`|
| web3            |  `v1.0` |
| uport           |  `v0.6` |
| express         |  `v4.16`|
| solc            |  `v0.4` |
| mongoose        |  `v5.1` |

This framework requires the below to be already installed on the system

| Project         | Version |
| --------------- | -------:|
| angular CLI     |  `v1.7` |
| npm             |  `v5.6` |
| ganache-cli     |  `v6.1` |
| mongodb         |  `v3.4` |

> `ganache-cli` should be running before starting the `server`

> [mLab](https://www.mlab.com/) - Database-as-a-Service is used for MongoDB

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
