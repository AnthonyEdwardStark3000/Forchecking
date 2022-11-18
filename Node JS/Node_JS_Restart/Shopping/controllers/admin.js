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
    const title = req.body.title;
    const imageUrl = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title,imageUrl,price,description);
    console.log(product);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req,res,next)=>{
    Product.fetchAll((products)=>{
    console.log('From admin.js handling products Data');
    res.render('admin/admin-product-list',{
    prods:products,
    title:'Admin products',
    path:'/admin/products'
});
});
};