// imports
const fileUtil = require('./file.util');
var solc = require('solc');

// deploy a given contract-> returns a promise
exports.deployContract = function(abi, bytecode, arguements, account) {
  // deploy the contract
  var options = {
    data: bytecode,
    arguments: arguements,
  };
  var contract = new web3.eth.Contract(abi, null, options);
  return contract
    .deploy(options)
    .send({
      from: account,
      gas: 4700000,
    })
    .then(function(instance) {
      if (instance) {
        // if contract is deployed successfully, set the deployed address to the contract instance
        contract.options.address = instance.options.address;
        return contract;
      } else {
        throw 'Error deploying the contract!';
      }
    });
};

// get abi and bytecode of a given solidity file
exports.getABIBytecode = function(path) {
  return fileUtil.fileToString(path).then(function(input) {
    var output = solc.compile(input, 1);
    var res = [];
    // display errors(if any) in solidity file
    if(output.errors) {
      console.log('ERRORS = ' + output.errors.length);
      console.log(output.errors);
    }
    for (var contractName in output.contracts) {
      var data = {
        name: contractName,
        abi: JSON.parse(output.contracts[contractName].interface),
        bytecode: output.contracts[contractName].bytecode,
      };
      res.push(data);
    }
    return res;
  });
};

// get ABI bytecode of a contract
exports.getABIBytecodeOf = function(contractName) {
  var ABIByteCode = null;
  ABIByteCodes.forEach(_ABIByteCode => {
    if (_ABIByteCode.name == ':' + contractName) {
      ABIByteCode = _ABIByteCode;
    }
  });
  return ABIByteCode;
};

// get all past events of a contract
exports.getAllPastEvents = function(contract) {
  return contract.getPastEvents(
    'allEvents',
    { filter: {}, fromBlock: 0, toBLock: 'latest' },
    (error, events) => {
      return events;
    }
  );
};
