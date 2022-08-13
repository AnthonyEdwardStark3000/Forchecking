const Product = require("../models/product");

exports.getAddProduct =  function(req, res, next){
    console.log("In middleware");
    // res.status(200).sendFile(path.join(rootFolder, 'views', 'add-product.html'));
    res.status(200).render('admin/add-product' ,{pageTitle: "Add Product", path: "/admin/add-product",productCSS: true, activeAddProduct: true});
}

exports.postAddProduct = function(req, res, next){
    console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.status(200).redirect('/');
}

exports.getProducts = function(req, res, next){
    // console.log(__dirname+" "+adminData.products);
    console.log("Base Page");
    Product.fetchAll((products)=>{
        res.status(200).render('shop/product-list',{prod: products, docTitle: 'My Shop', path:'/', pageTitle:'Shop', hasProducts: products.length>0 ?true : false , activeShop: true, productCSS:true});
    });
    // res.status(200).sendFile(path.join(rootFolder,'views','shop.html'));
};