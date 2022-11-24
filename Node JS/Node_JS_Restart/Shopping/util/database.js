// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database:'node_complete',
//     password:'suresh',
// });

// module.exports = pool.promise();

// using sequelize
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('node_complete','root','suresh',{dialect:'mysql',host:'localhost'});

// module.exports = sequelize;

// using MongoDB
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://suresh:4QxDcAZHwqDoB7BK@cluster0.c2cpwhf.mongodb.net/?retryWrites=true&w=majority')
    .then(client=>{
        console.log('connection with mongodb successful');
        _db = client.db();
        callback();
    }).catch(err=>{
        console.log('error occurred while connecting to mongoDb:',err);
        throw err;
    });
};

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw 'No database found';
}
module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;