const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req,res,next)=>{
Product.fetchAll((products)=>{
// console.log('From shop.js handling admin.js Data', products);

// res.sendFile(path.join(rootDir,'views','shop.html'));
// For pug 
// res.render('shop',{prods:products,title:'Shopify',path:'/'});

// For handlebar
res.render('shop/product-list',{
    prods:products,
    title:'All products',
    path:'/products',
    hasProducts:products.length>0?true:false,
    productCss:true,
    activeShop:true,
});
});
};

exports.getProduct = (req,res,next)=>{
    const prodId = req.params.productId;
    Product.findById(prodId,product=>{
        console.log('The product that is clicked:',product);
        res.render('shop/product-details',{product:product,title:product.title,path:'/products'});
    });
    // res.redirect('/');
};

exports.postCart = (req,res,next)=>{
    const prodId = req.body.productId; 
    console.log('Id of product adding to cart:',prodId);
    Product.findById(prodId,(product)=>{
        Cart.addProduct(prodId,product.price);
    });
    res.redirect('/cart');
}

// My try
exports.getIndex = (req,res,err)=>{
   Product.fetchAll((products)=>{
    res.render('shop/index',{
    prods:products,
    title:'Shopify',
    path:'/'
});
});
};

exports.getCart = (req,res,err)=>{
    res.render('shop/cart.ejs',{title:'Your Cart',path:'/cart'});
};

exports.getAdminProducts = (req,res,err)=>{
    res.render('admin/admin-product-list.ejs',{title:'Admin Products',path:'/admin/products'});
};

exports.getCheckout = (req,res,err)=>{
    res.render('shop/checkout.ejs',{title:'Checkout',path:'/checkout'});
};

exports.getOrders = (req,res,err)=>{
    res.render('shop/orders.ejs',{title:'Orders',path:'/orders'});
};