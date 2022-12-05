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
    // const product = new Product(null,title,imageUrl,price,description);
    // console.log('Post Add product:',product);
    // product.save();
    // res.redirect('/');
    //mysql
    // product.save().then(()=>{
    //     res.redirect('/');
    // }).catch(err=>{
    //     console.log(err);
    // });
    
    //sequelize
    // Product.create({title:title,imageUrl:imageUrl,price:price,description:description,userId:req.user.id})
    // req.user.createProduct({title:title,imageUrl:imageUrl,price:price,description:description})
    // .then((result)=>{
    //     console.log('creating a table:',result);
    //     res.redirect('/admin/products');
    // }).catch((err)=>{
    //     console.log('error while creating:',err);
    // });

    // const product = new Product(title,price,imageUrl,description,null,req.user._id);
    // product.save().then(result=>{
    //     console.log('creating a table:',result);
    //     res.redirect('/admin/products');
    // })
    //using mongoose for mongodb
    const product = new Product({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description,
        userId: req.user
        });
        console.log('product:',product);
    product.save().then(result=>{
        console.log('creating a table:',result);
        res.redirect('/admin/products');
    })
    .catch((err)=>{
        console.log('error while creating:',err);
    });
};

exports.getEditProduct = (req,res,next)=>{
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    // Product.findById(prodId,(product)=>{
    //     console.log('product found:',product);
    //     res.status(200).render('admin/edit-product',{
    //         title:'Edit Product',
    //         path:'/admin/edit-product',
    //         editing:editMode,
    //         product: product
    //     }
    //     );
    // });

    // Product.findByPk(prodId).then((product)=>{
    // req.user.getProducts({where:{id:prodId}}).then((products)=>{
    //     console.log('product found:',products);
    //     const product =products[0];
    //     if(!products){
    //         res.redirect('/');
    //     }
    //     res.status(200).render('admin/edit-product',{
    //         title:'Edit Product',
    //         path:'/admin/edit-product',
    //         editing:editMode,
    //         product: product
    //     }
    //     );
    // }).catch(err=>{console.log('While getting edit product:',err)});
    //Mongo Db
    Product.findById(prodId)
    .then(product => {
        console.log('product found:',product);
        if(!product){
            res.redirect('/');
        }
        res.status(200).render('admin/edit-product',{
            title:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product: product
        }
        );
    }).catch(err=>{console.log('While getting edit product:',err)});
};

exports.getProducts = (req,res,next)=>{
//     Product.fetchAll((products)=>{
//     console.log('From admin.js handling products Data');
//     res.render('admin/admin-product-list',{
//     prods:products,
//     title:'Admin products',
//     path:'/admin/products'
// });
// });

//Sequelize
// Product.findAll()
// req.user.getProducts().then((products)=>{
//     console.log('From admin.js handling products Data');
//     res.render('admin/admin-product-list',{
//     prods:products,
//     title:'Admin products',
//     path:'/admin/products'
// });
// }).catch(err=>{console.log(err)});
        //mongoDb
// Product.fetchAll()
// mongoDb mongoose
Product.find()
// .select('title price -_id')
// .populate('userId','name')

.then((products)=>{
    console.log('From admin.js handling products Data');
    res.render('admin/admin-product-list',{
    prods:products,
    title:'Admin products',
    path:'/admin/products'
});
}).catch(err=>{console.log('while getting products for admin',err)});
};

exports.postEditProduct = (req,res,next)=>{
    console.log('checking all the product:',req.body);
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    // const updatedProduct = new Product(prodId,updatedTitle,updatedImageUrl,updatedPrice,updatedDescription);
    // console.log('changed product',updatedProduct);    
    // updatedProduct.save();
    // res.redirect('/admin/products');
    // Product.findByPk(prodId).then((product)=>{
    //     product.title = updatedTitle;
    //     product.imageUrl = updatedImageUrl;
    //     product.price = updatedPrice;
    //     product.description = updatedDescription;
    //     product.save();
    // }).then(result=>{
    //     console.log('Updated products',result);
    //     res.redirect('/admin/products');
    // }).catch(err=>{
    //     console.log('Error while editing:',err);
    // });
    
    //MongoDb
    //    const product = new Product(updatedTitle,updatedPrice,updatedImageUrl,updatedDescription,prodId);
    // product.save()
    // .then(result=>{
    //MongoDb mongoose   
    Product.findById(prodId).then(product=>{
        product.title = updatedTitle;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product.save()     
    }).then(result=>{
        console.log('Updated products',result);
        res.redirect('/admin/products');
    }).catch(err=>{
        console.log('Error while editing:',err);
    });

};

// //
exports.postDeleteProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    console.log('Product ID from postDeleteProduct:',prodId);
    // Product.deleteById(prodId);
    // res.redirect('/admin/products');
    // Product.findByPk(prodId).then((product)=>{
    //    return product.destroy();
    // }).then(result=>{
    //     console.log('Deleted the product successfully');
    //     res.redirect('/admin/products');
    // }).catch(err=>{
    //     console.log('While deleting Product:',err);
    // });
    //Mongo Db
    // Product.deleteById(prodId)
    //Mongo Db mongoose
    Product.findByIdAndRemove(prodId)
    .then(
        result=>{console.log('Delete controller success');
        res.redirect('/admin/products');
    })
    .catch(err=>{console.log('deletion controller:',err)});
}