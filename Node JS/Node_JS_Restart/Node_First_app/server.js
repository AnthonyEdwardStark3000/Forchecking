const fs = require('fs');
console.log('Writing process begins');
fs.writeFileSync('hello_world.txt','Saying Hello world');
console.log('Completed the writing');