var fs = require('fs');

exports.fileToString = function(url) {
  return new Promise(function(resolve, reject) {
    var text = fs.readFileSync(url);
    return fs.readFile(url, 'utf8', function(err, data) {
      if (err) reject(err);
      console.log('OK: ' + url);
      data = data.replace(/(\r\n|\n|\r|\s+)/gm, ' ');
      resolve(data);
    });
  });
};
