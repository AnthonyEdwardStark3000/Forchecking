const Product = require("../models/product");

exports.getAddProduct =  function(req, res, next){
    console.log("In middleware");
    // res.status(200).sendFile(path.join(rootFolder, 'views', 'add-product.html'));
    res.status(200).render('admin/add-product' ,{pageTitle: "Add Product", path: "/admin/add-product",productCSS: true, activeAddProduct: true});
}

exports.postAddProduct = function(req, res, next){
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.status(200).redirect('/');
}

exports.getProducts = function(req, res, next){
     console.log("Base Page");
     Product.fetchAll((products)=>{
         res.status(200).render('admin/products',{prod: products, docTitle: 'My Shop', path:'/admin/products', pageTitle:'Admin Products'});
     });
}
