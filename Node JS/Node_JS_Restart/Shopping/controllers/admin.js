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
    const imageUrl = req.body.imageUrl;
    console.log('check the imageUrl',imageUrl);
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null,title,imageUrl,price,description);
    console.log('Post Add product:',product);
    // product.save();
    // res.redirect('/');
    //mysql
    // product.save().then(()=>{
    //     res.redirect('/');
    // }).catch(err=>{
    //     console.log(err);
    // });
    //sequelize
    Product.create({title:title,imageUrl:imageUrl,price:price,description:description}).then((result)=>{
        console.log('creating a table:');
    }).catch((err)=>{
        console.log('error while creating:',err);
    });
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
    console.log('checking all the product:',req.body);
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId,updatedTitle,updatedImageUrl,updatedPrice,updatedDescription);
    console.log('changed product',updatedProduct);    
    updatedProduct.save();
    res.redirect('/admin/products');
};

//
exports.postDeleteProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    console.log('Product ID from postDeleteProduct:',prodId);
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}