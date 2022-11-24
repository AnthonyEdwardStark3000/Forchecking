const Product = require("../models/product");
const Cart = require("../models/old_cart");

exports.getProducts = (req,res,next)=>{
// Product.fetchAll((products)=>{

// // console.log('From shop.js handling admin.js Data', products);

// // res.sendFile(path.join(rootDir,'views','shop.html'));
// // For pug 
// // res.render('shop',{prods:products,title:'Shopify',path:'/'});

// // For handlebar

// res.render('shop/product-list',{
//     prods:products,
//     title:'All products',
//     path:'/products',
//     hasProducts:products.length>0?true:false,
//     productCss:true,
//     activeShop:true,
// });
// });
 //My Sql
//     Product.fetchAll().then(([rows,fieldData])=>{
//        res.render('shop/product-list',{
//     prods: rows,
//     title:'All products',
//     path:'/products',
//     hasProducts:rows.length>0?true:false,
//     productCss:true,
//     activeShop:true,
// }); 
//     }).catch(err=>{
//         console.log(err);
//     });
//Sequelize
    Product.findAll().then(products=>{
         res.render('shop/product-list',{
        prods: products,
        title:'All Products',
        path:'/products',    
        hasProducts:products.length>0?true:false,
        productCss:true,
        activeShop:true,
    }); 
    }).catch(err=>{
        console.log('while fetching all data from DB:',err);
    });
};

exports.getProduct = (req,res,next)=>{
    const prodId = req.params.productId;
    // Product.findById(prodId,product=>{
    //     console.log('The product that is clicked:',product);
    //     res.render('shop/product-details',{product:product,title:product.title,path:'/products'});
    // });
    // res.redirect('/');

    //My sql
    // Product.findById(prodId).then(([rows,fieldData])=>{
    //     console.log('The product that is clicked:',rows);
    //     res.render('shop/product-details',{product:rows[0],title:rows.title,path:'/products'});
    // }).catch(err=>{
    //     console.log('Getting single product in shop.js :',err);
    // });

    //sequelize
    Product.findByPk(prodId).then((rows,fieldData)=>{
        console.log('The product that is clicked:',rows);
        res.render('shop/product-details',{product:rows,title:rows.title,path:'/products'});
    }).catch(err=>{
        console.log('Getting single product in shop.js :',err);
    });
    // Product.findAll({where:{id:prodId}}).then((rows,fieldData)=>{
    //     console.log('The product that is clicked:',rows[0]);
    //     res.render('shop/product-details',{product:rows[0],title:rows[0].title,path:'/products'});
    // }).catch(err=>{
    //     console.log('Getting single product in shop.js :',err);
    // });
};

exports.postCart = (req,res,next)=>{
    const prodId = req.body.productId; 
    let fetchedCart;
    let newQuantity =1; 
    console.log('Id of product adding to cart:',prodId);
    // Product.findById(prodId,(product)=>{
    //     Cart.addProduct(prodId,product.price);
    // });
    // res.redirect('/cart');
    req.user.getCart()
    .then(cart=>{
        fetchedCart = cart;
        return cart.getProducts({where:{id:prodId}})
    })
    .then(products=>{
        let product;
        if(products.length>0){
            product = products[0];
        }
        if(product){
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity+1;
            return product;
        }
        return Product.findByPk(prodId)
    })
        .then(product=>{
            return fetchedCart.addProduct(product,{through:{quantity: newQuantity}});
        }).then(()=>{
            console.log('redirecting to cart');
            res.redirect('/cart');
        })
        .catch(err=>{console.log('err while getting cart product',err);})
}

// exports.postCartDeleteProduct = (req,res,err)=>{
//     const prodId = req.body.productId;
//     Product.findById(prodId,product=>{
//         Cart.deleteProduct(prodId, product.price);
//         res.redirect('/cart');
//     });
// }

exports.postCartDeleteProduct = (req,res,err)=>{
    console.log('Deleting a product');
    const prodId = req.body.productId;
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts({where:{id:prodId}})
    }).then(products=>{
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result=>{
        console.log('Product deleted');
        res.redirect('/cart');
    }).catch(err=>{console.log('Error while deleting data:',err)})
}

// My try
exports.getIndex = (req,res,next)=>{
//    Product.fetchAll((products)=>{
//     res.render('shop/index',{
//     prods:products,
//     title:'Shopify',
//     path:'/'
// });
// });

 //Mysql
    // Product.fetchAll().then(([rows,fieldData])=>{
    // res.render('shop/index',{
    //     prods: rows,
    //     title:'Shopify',
    //     path:'/'
    // }); 
    // }).catch(err=>{console.log(err)});
    //Sequelize
    Product.findAll().then(products=>{
         res.render('shop/index',{
        prods: products,
        title:'Shopify',
        path:'/'
    }); 
    }).catch(err=>{
        console.log('while fetching all data from DB:',err);
    });
};

exports.getCart = (req,res,next)=>{
    // Cart.getCart(cart=>{
    //     Product.fetchAll(products=>{
    //         const cartProducts = [];
    //         for(let product of products){
    //             const cartProductsData = cart.products.find(prod=>prod.id===product.id);
    //             if(cartProductsData){
    //                 cartProducts.push({productData:product,qty:cartProductsData.qty});
    //             }
    //         }
    //         res.render('shop/cart.ejs',{title:'Your Cart',path:'/cart',products:cartProducts});
    //     })
    // });
    // console.log(req);
    req.user.getCart().then(cart=>{
        // console.log(cart);
        return cart.getProducts().then(cartProducts=>{
        res.render('shop/cart.ejs',{title:'Your Cart',path:'/cart',products:cartProducts});
        }).catch(err=>{console.log('error while getting cart',err)});
    }).catch(err=>{
        console.log('Error while getting Cart:',err)
    });
};

exports.getAdminProducts = (req,res,next)=>{
    res.render('admin/admin-product-list.ejs',{title:'Admin Products',path:'/admin/products'});
};

exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout.ejs',{title:'Checkout',path:'/checkout'});
};

exports.postOrder = (req,res,next)=>{
    let fetchedCart;
    req.user.getCart()
    .then(cart=>{
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products=>{
        // console.log('Products in Order:',products);
        return req.user.createOrder()
        .then(order=>{
            return order.addProducts(
                products.map(product=>{
                    product.orderItem = {quantity:product.cartItem.quantity};
                    return product;
                })
            )
        })
        .then(result=>{
           return fetchedCart.setProducts(null);
        })
        .then(result=>{
            res.redirect('/orders');
        })
        .catch(err=>{
            console.log('Error while creating order table:',err)
        })
    })
    .catch(err=>{console.log(err)});
};

exports.getOrders = (req,res,next)=>{
    req.user.getOrders({include:['products']}).then(orders=>{
        res.render('shop/orders.ejs',{title:'Orders',path:'/orders',orders:orders});
    }).catch(err=>{
        console.log('Error while getting order:',err);
    });
};