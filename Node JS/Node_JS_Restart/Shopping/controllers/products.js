const Product = require("../models/product");
exports.getAddProduct = (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    // For pug
    // res.status(200).render('add-product',{title:'Add Product',path:'/admin/add-product'});
    
    // For handlebar
    res.status(200).render('add-product',{
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
const products = Product.fetchAll();
console.log('From shop.js handling admin.js Data', products);
// res.sendFile(path.join(rootDir,'views','shop.html'));
// For pug 
// res.render('shop',{prods:products,title:'Shopify',path:'/'});

// For handlebar
res.render('shop',{
    prods:products,
    title:'Shopify',
    path:'/',
    hasProducts:products.length>0?true:false,
    productCss:true,
    activeShop:true,
});
};