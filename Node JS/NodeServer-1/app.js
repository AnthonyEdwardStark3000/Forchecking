const http = require('http');
const server = http.createServer(function(req, res){
    console.log(req);
    //process.exit();
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Printing from node js</h1>');
    res.write('</body>');
    res.write('</html>');
});

server.listen(3000);