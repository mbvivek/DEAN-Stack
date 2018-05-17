// imports
let contractUtil = require('./../utils/contract.util')
let dbUtil = require('./../utils/db.util')

// set the contract file path
let contractFilePath = './contracts/greet.contract.sol'

// functions
exports.deployContract = function (request, response) {
  let message = request.params.message
  // get ABI and Bytecode
  return contractUtil.getABIBytecode(contractFilePath).then(abiBytecodes => {
    let abi = abiBytecodes[0].abi
    let bytecode = abiBytecodes[0].bytecode
    // deploy the contract
    // include all arguements that needs to be passed to the contract
    let arguements = [message]
    // set the owner
    let account = web3.eth.accounts[0]
    return contractUtil
      .deployContract(abi, bytecode, arguements, account)
      .then(contract => {
        // save the contract to db
        dbUtil.insertNewContract(
          contract['options'].address,
          web3.eth.accounts[0]
        )
        response.json(contract)
      })
  })
}

exports.updateContract = function (request, response) {
  let contractAddress = request.params.contractAddress
  let message = request.params.message
  // get ABI and Bytecode
  return contractUtil.getABIBytecode(contractFilePath).then(abiBytecodes => {
    let abi = abiBytecodes[0].abi
    let bytecode = abiBytecodes[0].bytecode
    let options = {
      data: bytecode
    }
    // get contract
    var contract = null
    try {
      var contract = new web3.eth.Contract(abi, contractAddress, options)
    } catch (err) {
      console.log('No contract found with address = ' + contractAddress)
    }
    if (contract) {
      // set options
      let _options = {
        from: web3.eth.accounts[0],
        value: 4700000
      }
      // call update method
      contract.methods
        .updateMessage(message)
        .send({ from: web3.eth.accounts[0] })
        .then(receipt => {
          console.log('receipt')
          response.json({ receipt: receipt })
        })
    } else {
      response.json({
        error: 'No contract found with address = ' + contractAddress
      })
    }
  })
}

exports.getAllEvents = function (request, response) {
  let contractAddress = request.params.contractAddress
  // get ABI and Bytecode
  return contractUtil.getABIBytecode(contractFilePath).then(abiBytecodes => {
    let abi = abiBytecodes[0].abi
    let bytecode = abiBytecodes[0].bytecode
    let options = {
      data: bytecode
    }
    // get contract
    var contract = null
    try {
      contract = new web3.eth.Contract(abi, contractAddress, options)
    } catch (err) {
      console.log('No contract found with address = ' + contractAddress)
    }
    if (contract) {
      // get events
      contractUtil.getAllPastEvents(contract).then(events => {
        response.json({ events: events })
      })
    } else {
      response.json({
        error: 'No contract found with address = ' + contractAddress
      })
    }
  })
}

exports.getDataFromDB = function (request, response) {
  dbUtil.getAllContracts().then(data => {
    console.log('data = ' + data)
    response.json({ data: data })
  })
}
