const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log('Started the server');
    const url =req.url;
    const method =req.method;
    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>Welcome</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Click Me</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/message' && method ==='POST'){
        const body = [];
        req.on('data',(chunk)=>{body.push(chunk)});
        return req.on('end',()=>{
            const bufferedString = Buffer.concat(body).toString();
            const message = bufferedString.split('=')[1];
            console.log(bufferedString);
            fs.writeFile('message.txt',message,err=>{
            console.log(err);
            res.statusCode = 302;
            console.log(body);
            res.setHeader('Location','/');        
            return res.end();
        });
        });
        
    }
    // process.exit();
    res.setHeader('Content-Type','text/html');
    res.write(`<h1 style="text-align:'center'">Hello By Node JS !</h1>`);
    res.end();
});

server.listen(3000);