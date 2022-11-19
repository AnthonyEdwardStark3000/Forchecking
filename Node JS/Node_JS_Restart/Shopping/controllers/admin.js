const Product = require("../models/product");
exports.getAddProduct = (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    // For pug
    // res.status(200).render('add-product',{title:'Add Product',path:'/admin/add-product'});
    
    // For handlebar
    res.status(200).render('admin/edit-product',{
        title:'Add Product',
        path:'/admin/add-product',
        productCss:true,
        activeAddProduct:true,
        editing: false,
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

exports.getEditProduct = (req,res,next)=>{
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId,(product)=>{
        console.log('product found:',product);
        res.status(200).render('admin/edit-product',{
            title:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product: product
        }
        );
    });
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

exports.postEditProduct = (req,res,next)=>{
    console.log('Post Edit Product:',req.body);
};