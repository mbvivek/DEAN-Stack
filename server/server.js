// App Server

// express
var express = require('express')
var bodyParser = require('body-parser')

// web3
Web3 = require('web3')
Accounts = require('web3-eth-accounts')

//uport
Uport = require('uport')
SimpleSigner = Uport.SimpleSigner
Credentials = Uport.Credentials

credentials = new Credentials({
  appName: 'DEAN Stack',
  address: '2ohwL2d34fvaYucBVMAUwRzoxB6DeSRbYtY',
  network: 'rinkeby',
  signer: SimpleSigner("b55805d8634fdbf8ce8026c6cd3d459b50bc9d93ba1335c1eca6724144229e83"),
});

// create server app
var app = express()

// create web3 object
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// optional (if using testrpc)
// add testrpc accounts
web3.eth.getAccounts().then(accounts => {
  web3.eth.accounts = accounts
})

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// add router
require('./router.js')(app)

// listen for requests
app.listen(3000, function () {
  console.log('Server is listening on port 3000')
})

