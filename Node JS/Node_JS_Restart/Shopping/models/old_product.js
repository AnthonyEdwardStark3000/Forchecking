// const fs = require('fs');
// const path = require('path');

// const rootDir = require('../util/path');
const Cart = require('./cart');    
const db = require('../util/database');

// const p = path.join(rootDir,'data','products.json');

// const getProductsFromFile =(callback)=>{
//         fs.readFile(p,(err,fileContent)=>{
//             if(err){
//                 console.log(err);
//                 return callback([]);
//             }else{
//                 callback(JSON.parse(fileContent));
//             }
//         });  
// };

module.exports = class Product{
    constructor(id,title,imageUrl,price,description){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    save(){
    //     getProductsFromFile((products)=>{
    //         if(this.id){
    //             const existingProductIndex = products.findIndex(prod=>prod.id === this.id);
    //             const updatedProducts = [...products];
    //             updatedProducts[existingProductIndex] = this;
    //             fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
    //                 console.log('Error while getting Products during save:',err);
    //             });
    //         }else{
    //             this.id = Math.random().toString();
    //             products.push(this);
    //             fs.writeFile(p,JSON.stringify(products),err=>{
    //                 console.log(err);
    //             });
    //         }
    //    });
        //My sql
        return db.execute('INSERT INTO products (title,price,description,imageUrl)VALUES(?,?,?,?)',
        [this.title,this.price,this.description,this.imageUrl]);
    }

    static deleteById(id){
        // getProductsFromFile(products=>{
        //     const product = products.find(prod=>prod.id===id);
        //     console.log('product to be deleted now:',product);
        //     const updatedProducts = products.filter(prod=>prod.id!==id);
        //     fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
        //         if(!err){
        //             Cart.deleteProduct(id,product.price);
        //         }
        //     });
        // });
    }

    static fetchAll(){
    // static fetchAll(callback){
        //   getProductsFromFile(callback);
        return db.execute('SELECT * FROM products');
    }
    static findById(id){
    // static findById(id,callback){
        // getProductsFromFile(products=>{
        //     const product = products.find(p=>p.id===id);
        //     callback(product);
        // });
        console.log('The id going to be checked:',id);
        return db.execute('SELECT * FROM products WHERE products.id= ?',[id]);
    }
};