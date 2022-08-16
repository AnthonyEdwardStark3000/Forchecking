const Product = require("../models/product");


exports.getProducts = function(req, res, next){
    // console.log(__dirname+" "+adminData.products);
    console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/product-list',{prod: products, docTitle: 'My Shop', path:'/products', pageTitle:'All Products'});
    });
    // res.status(200).sendFile(path.join(rootFolder,'views','shop.html'));
};

exports.getProduct = function(req, res, next){
    console.log("Base Page");
    const prodId = req.params.productId;
    // console.log(prodId);
    Product.findById(prodId, product =>{
        console.log(product);
    });
    res.redirect('/');
};

exports.getIndex = (req, res, next) =>{
    console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/index',{prod: products, docTitle: 'My Shop', path:'/', pageTitle:'Shop'});
    });
}

exports.getCart = (req, res, next) =>{
    console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/cart',{prod: products, docTitle: 'My Shop', path:'/cart', pageTitle:'Your Cart'});
    });
}

exports.getOrders = (req, res, next) =>{
    console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/orders',{prod: products, docTitle: 'My Shop', path:'/orders', pageTitle:'Your Orders'});
    });
}

exports.getCheckout = (req, res, next) =>{
    console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/checkout',{prod: products, docTitle: 'My Shop', path:'/checkout', pageTitle:'Checkout'});
    });
}