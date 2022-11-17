const Product = require("../models/product");
exports.getAddProduct = (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    // For pug
    // res.status(200).render('add-product',{title:'Add Product',path:'/admin/add-product'});
    
    // For handlebar
    res.status(200).render('admin/add-product',{
        title:'Add Product',
        path:'/admin/add-product',
        productCss:true,
        activeAddProduct:true
    }
    );
};

exports.postAddProduct = (req,res,next)=>{
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req,res,next)=>{
Product.fetchAll((products)=>{
console.log('From shop.js handling admin.js Data', products);
// res.sendFile(path.join(rootDir,'views','shop.html'));
// For pug 
// res.render('shop',{prods:products,title:'Shopify',path:'/'});

// For handlebar
res.render('shop/product-list',{
    prods:products,
    title:'Shopify',
    path:'/',
    hasProducts:products.length>0?true:false,
    productCss:true,
    activeShop:true,
});
});
};
// My try
exports.getIndexProducts = (req,res,err)=>{
    res.render('shop/index.ejs',{title:'Index',path:'/products'});
};

exports.getCartProducts = (req,res,err)=>{
    res.render('shop/cart.ejs',{title:'My Cart',path:'/cart'});
};

exports.getAdminProducts = (req,res,err)=>{
    res.render('admin/admin-product-list.ejs',{title:'Admin Products',path:'/admin/products'});
};