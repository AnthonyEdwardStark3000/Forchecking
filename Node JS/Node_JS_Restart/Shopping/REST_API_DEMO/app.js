const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const app = express();

// setting up storage to save file upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4())
    }
});

// restricting unwanted image format
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg') {
        cb(null, true);
        console.log('Image check success');
    }
    else {
        cb(null, false);
        console.log('Image check fail');
    }
}
//setting up CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST,PUT,GET,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next()
});

// app.use(bodyParser.urlencoded('false')); //x-www-form-urlencoded <form> </form>
app.use(bodyParser.json()); // application/json

//configure multer to use file/image upload
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
});
const connectionUrl = process.env.MONGODB_CONNECTION_URI;
mongoose.connect(connectionUrl)
    .then(result => {
        // app.listen(8080,function(){
        //     console.log(`Server started at port 8080`);
        // });
        const server = app.listen(8080);
        console.log('server started at port 8080');
        const io = require('./socket').init(server);
        io.on('connection', socket => {
            console.log('From socket:Client got connected');
        });
    }).catch(err => {
        console.log('Error while establishing the connection:', err);
    });
