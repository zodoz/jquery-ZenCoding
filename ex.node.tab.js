var fs = require('fs');
var parser = require('./ex.tab.js');

console.log(parser);

fs.readFile('ex.tab.file', 'ascii', function(err, data) {
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }
  var parsed = parser.parse(data);
  console.log(parsed);
});
