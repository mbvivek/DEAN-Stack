# DEAN Stack

DEAN Stack is a blockchain enabled, Angular and NodeJS powered framework to build decentralized web-apps that includes [uPort](https://www.uport.me/) for identity management.

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

# Working
#### Client
Built on Angular - a powerful front-end framework. At first user needs to use `uport` app and scan the QR code on the login screen to login.

After logging in, an example smart contract is written in solidity language. You can deploy the deploy a contract, fetch events from it, and update it.

Every result of an action will be logged in the logs.

#### Server
Built on NodeJS and Express framework. Server is connected to Ethereum test-rpc using `web3` and connected to MongoDB using `mongoose`. 

Client will interact with the server using REST APIs. The server, upon request from the client, deploys contract on the test-rpc, fetches events from a contract and updates a contract. An appropriate response is sent back to the client after serving the request.

# Utilities
> The framework has solidity compiler in-built and methods compile, deploy and interact with smart contracts. Means, no need to use any third-party apps such as `remix` to compile, deploy and interact with smart contracts.
