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
const mongodb = require('mongodb');

class Product {
    constructor(title,price,imageUrl,description,id){
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }
    save(){
        const db = getDb();
        let dbOp;
        if(this._id){
            dbOp = db.collection('products').updateOne({_id: this._id},{$set:this}) 
        }
        else{
            dbOp = db.collection('products')
        .insertOne(this); 
        }
        return dbOp
        .then(result=>{
            console.log('result for save request');
            console.log(result);
        })
        .catch(err=>{
            console.log('while inserting with mongodb:',err);
        });
    }
    static fetchAll(){
        const db = getDb();
        return db.collection('products').find()
        .toArray()
        .then(products=>{
            console.log('Products from Mongo:',products);
            return products;
        }).catch(err=>{
            console.log('while fetching Data from mongodb',err);
        })
    }
    static findById(prodId){
        const db = getDb();
        return db.collection('products').find({_id:new mongodb.ObjectId(prodId)}).next().then(
            product=>{
                console.log('clicked Product:',product);
                return product;
            }
        )
        .catch(err=>{
            console.log('Error while getting single product:',err);
        })
    }
    static deleteById(prodId){
        const db = getDb();
        return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
        .then(
            result=>{
                console.log('deleted the product');
            }
        )
        .catch(err=>{
            console.log('Error while deleting product',err);
        })
    }
}

module.exports = Product;