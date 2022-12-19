// // Sequelize
// // const Sequelize = require('sequelize');
// // const sequelize = require('../util/database');

// // const User = sequelize.define('user',{
// //     id:{
// //         type:Sequelize.INTEGER,
// //         autoIncrement: true,
// //         allowNull:false,
// //         primaryKey: true
// //     },
// //     name:{
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     },
// //     email:{
// //         type:Sequelize.STRING,
// //         allowNull: false
// //     }
// // });

// // module.exports = User;

// // Mongodb
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User{
//     constructor(username,email,cart,id){
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//         console.log('user data constructor:',this._id);
//     }
//     save(){
//         const db = getDb();
//         return db.collection('users').insertOne(this).then(result=>{
//             console.log('User data saved.');
//         }).catch(err=>{
//             console.log('err while saving user:',err);
//         });
//     }
//     addToCart(product){
//         // console.log('add to cart:',this);
//         const cartProductIndex = this.cart.items.findIndex(cp=>{
//             console.log('cp.productId:',cp.productId);
//             console.log('product._id:',product._id);
//             return cp.productId.toString() === product._id.toString();
//         });
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];

//         if(cartProductIndex>=0){
//             newQuantity = this.cart.items[cartProductIndex].quantity+1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         }
//         else{
//             updatedCartItems.push({productId: new ObjectId(product._id),quantity:newQuantity});
//         }
//         const updatedCart = {items:updatedCartItems};
//         console.log('product to cart',product);
//         // const updatedCart = {items:[{productId: new ObjectId(product._id),quantity:1}]};
//         const db = getDb();
//         return db.collection('users').updateOne( { _id: new ObjectId(this._id) },{$set:{cart:updatedCart}});
//     }

//     static findById(userId){
//         const db = getDb();
//         return db.collection('users').find({_id: new ObjectId(userId)})
//         .next()
//         .then((user)=>{
//             console.log("found the user:",user);
//             return user;
//         })
//         .catch(err=>{console.log('Error Fetching user form mongo:',err)});
//     } 

//     getCart(){
//         const db = getDb();
//         const productIds = this.cart.items.map(i=>{ 
//             console.log('products IDS:',this.cart.items);
//            return i.productId;
//         });
        
//         return db.collection('products').find({_id:{$in: productIds}})
//         .toArray()
//         .then(products=>{
//             return products.map(p=>{
//                 return {...p,quantity:this.cart.items.find(i=>{
//                     return i.productId.toString() === p._id.toString();
//                 }).quantity
//             };
//             });
//         });
//     }
//     deleteItemFromCart(productId){
//         const updatedCartItems = this.cart.items.filter(item=>{
//             return item.productId.toString()!==productId.toString();
//         });
//         const db = getDb();
//         return db.collection('users')
//         .updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:updatedCartItems}}});
//     }
    
//     addOrder(){
//         const db = getDb();
//          return this.getCart().then(products =>{
//             const order = {
//                 items: products,
//                 user:{
//                     _id: new ObjectId(this._id),
//                     name: this.name
//                 }
//             };
//           return db.collection('orders').insertOne(order);
//         }).then(result=>{
//             console.log('order placed successfully');
//             this.cart = {items:[]};
//             return db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:[]}}})
//         });
//     }

//     getOrders(){
//         const db = getDb();
//         return db.collection('orders').find({'user._id':new ObjectId(this._id)}).toArray();
//     }
// }

// module.exports = User;

// Mongo Db Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
      password:{
        type:String,
        required:true
    },
    resetToken:String,
    resetTokenExpiration: Date,
    cart:{
        items:[
       {
         productId:{
            type: Schema.Types.ObjectId,
            ref:'Product', 
            required: true
    },
    quantity:{
        type: Number,
        required: true
    }
}
    ]}
});

userSchema.methods.addToCart = function(product){
     console.log('add to cart:',this);
        const cartProductIndex = this.cart.items.findIndex(cp=>{
            console.log('error check:',cp);
            console.log('cp.productId:',cp.productId);
            console.log('product._id:',product._id);
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex>=0){
            newQuantity = this.cart.items[cartProductIndex].quantity+1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else{
            updatedCartItems.push({productId: product._id,quantity:newQuantity});
        }
        const updatedCart = {items:updatedCartItems};
        console.log('product to cart',product);
        this.cart = updatedCart;
        return this.save();
    
}
userSchema.methods.removeFromCart = function(productId){
     const updatedCartItems = this.cart.items.filter(item=>{
            return item.productId.toString()!==productId.toString();
        });
        this.cart.items = updatedCartItems;
        return this.save();
}
userSchema.methods.clearCart = function(){
    this.cart = {items:[]};
    return this.save();
};
userSchema.methods.addOrder = function(){}
module.exports = mongoose.model('User',userSchema);