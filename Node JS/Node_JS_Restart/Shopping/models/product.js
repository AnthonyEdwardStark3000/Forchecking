// // using sequelize
// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const Product = sequelize.define('product',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull:false,
//         primaryKey: true
//     },
//     title:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     price:{
//         type:Sequelize.DOUBLE,
//         allowNull:false,
//     },
//     imageUrl:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
// });
// module.exports = Product;
const getDb = require('../util/database').getDb;
class Product {
    constructor(title,price,imageUrl,description){
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }
    save(){
        const db = getDb();
        return db.collection('products')
        .insertOne(this)
        .then(result=>{
            console.log('result for save request');
            console.log(result);
        })
        .catch(err=>{
            console.log('while inserting with mongodb:',err);
        });
    }
}

module.exports = Product;