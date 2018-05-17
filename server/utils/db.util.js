const mongoose = require('mongoose')
let Schema = mongoose.Schema
// give the path to mongodb
mongoose.connect('mongodb://vivek:123456@ds016058.mlab.com:16058/dean-stack-db')

// define schema for contract
var contractSchema = Schema({
  contractAddress: String,
  owner: String
})

// create a model from the schema
var Contract = mongoose.model('Contract', contractSchema)

// ready to go!

// insert a contract
exports.insertNewContract = function (address, owner) {
  // create a new contract
  let newContract = new Contract({
    contractAddress: address,
    owner: owner
  })
  // save the contract
  newContract.save(err => {
    if (err) {
      console.log('Error saving contract to db')
    } else {
      console.log('Contract saved to db successfully')
    }
  })
}

// get all contracts
exports.getAllContracts = function () {
  return Contract.find({}, function (err, contracts) {
    if (err) {
      console.log('Error fetching all contracts')
    }
  })
}
