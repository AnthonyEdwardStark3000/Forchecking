    const http = require('http');
    const server = http.createServer((req,res)=>{
        console.log('Server started at port 3000');
        const url = req.url;
        const method = req.method;
        if(url==='/'){
            res.setHeader('Content-type','text/html');
            res.write('Hello you!');
            res.write(`<form action='/create-user' method='POST'>`);
            res.write(`<input type='text' name='user_input'>`);
            res.write(`</input>`);
            res.write(`<button type='submit'>Submit`);
            res.write(`</button'>`);
            res.write(`</form>`);
            res.end();
        }
        if(url==='/users'){
            res.setHeader('Content-type','text/html');
            res.write(`<ul>`);
            res.write(`<li>User 1</li>`);
            res.write(`<li>User 2</li>`);
            res.write(`<li>User 3</li>`);
            res.write(`<li>User 4</li>`);
            res.write(`<li>User 5</li>`);
            res.write(`<li>User 6</li>`);
            res.write('</ul>');
            res.end();
        }
        if(url==='/create-user' && method==='POST'){
            const message = [];
            req.on('data',(chunk)=>{message.push(chunk)});
            req.on('end',()=>{
                const bufferedMessage = Buffer.concat(message).toString();
                const text = bufferedMessage.split('=')[1].replace('+',' ');
                console.log('User entered :',text);
            });
            res.statusCode=302;
            res.setHeader('Location','/');
            res.end();
        }
    });

    server.listen(3000);