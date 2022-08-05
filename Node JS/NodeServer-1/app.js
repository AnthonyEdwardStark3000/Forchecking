const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes);

server.listen(3000,function(){
    console.log("Server started at port 3000")

});
