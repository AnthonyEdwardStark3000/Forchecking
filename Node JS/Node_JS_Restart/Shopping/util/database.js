// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database:'node_complete',
//     password:'suresh',
// });

// module.exports = pool.promise();

// using sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_complete','root','suresh',{dialect:'mysql',host:'localhost'});

module.exports = sequelize;