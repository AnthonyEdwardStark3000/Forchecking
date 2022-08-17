const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = function(req, res, next){
    // console.log(__dirname+" "+adminData.products);
    // console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/product-list',{prod: products, docTitle: 'My Shop', path:'/products', pageTitle:'All Products'});
    });
    // res.status(200).sendFile(path.join(rootFolder,'views','shop.html'));
};

exports.getProduct = function(req, res, next){
    // console.log("Base Page");
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findById(prodId, product =>{
        res.status(200).render('shop/product-detail', {prod: product, pageTitle: product.title, path:'/products'});
    });
};

exports.getIndex = (req, res, next) =>{
    // console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/index',{prod: products, docTitle: 'My Shop', path:'/', pageTitle:'Shop'});
    });
}

exports.getCart = (req, res, next) =>{
    // console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/cart',{prod: products, docTitle: 'My Shop', path:'/cart', pageTitle:'Your Cart'});
    });
}

exports.postCart = (req, res, next) =>{
    console.log("Post Cart Page");
    const prodId = req.body.productId;
    Product.findById(prodId, product =>{
        Cart.addProduct(prodId, product.price);     
    });
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) =>{
    // console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/orders',{prod: products, docTitle: 'My Shop', path:'/orders', pageTitle:'Your Orders'});
    });
}

exports.getCheckout = (req, res, next) =>{
    // console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/checkout',{prod: products, docTitle: 'My Shop', path:'/checkout', pageTitle:'Checkout'});
    });
}