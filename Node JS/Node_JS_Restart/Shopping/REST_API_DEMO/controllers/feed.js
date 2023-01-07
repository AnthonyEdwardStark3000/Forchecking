const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');
const Post = require('../models/post');

exports.getPosts = (req,res,next)=>{
    const currentPage = req.query.page||1;
    const perPage = 2;
    let totalItems;
    Post.find().countDocuments().then(
        count=>{
            totalItems = count;
            return Post.find().skip((currentPage-1)*perPage).limit(perPage)
            }
    ).then(posts=>{
            res.json({message:'Found the Posts',posts:posts,totalItems: totalItems});
            }).catch(err=>{
        console.log('error while finding all items:',err);
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.createPost = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('Entered incorrect value, so validation failed !');
       error.statusCode = 422;
       throw error;
    }
    if(!req.file){
        const error = new Error('No image file is provided !');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path.replace("\\" ,"/");
    console.log('after creation ImageUrl:',imageUrl);
    const title = req.body.title;
    const content = req.body.content;
    console.log(errors);
    const post = new Post({
            title: title,
            content: content,
            creator:{
                name:'Suresh',
            },
            imageUrl: imageUrl
    });
    post.save().then(result=>{
        console.log(result);
        res.status(201).json({
        message: 'POST created Successfully',
        post:result
    })
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })   
}

exports.getPost = (req,res,next)=>{
    const postId = req.params.postId;
    Post.findById(postId).then(post=>{
        if(!post){
            const error = new Error('The required Post/ Feed is not found !');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message:'Post / Feed has been found.',post:post});
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.updatePost = (req,res,next)=>{
        const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('Entered incorrect value, so validation failed !');
       error.statusCode = 422;
       throw error;
    }
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if(req.file){
        imageUrl = req.file.path;
    }
    if(!imageUrl){
        console.log('image addition error!');
        const error = new Error('No image found!');
        error.statusCode =422;
        throw error;
    }
    Post.findById(postId).then(
        post =>{
            if(!post){
            const error = new Error('The required Post/ Feed is not found !');
            error.statusCode = 404;
            throw error; 
            }
            if(imageUrl !== post.imageUrl){
                clearImage(post.imageUrl);
            }
            post.title = title;
            post.imageUrl = imageUrl;
            post.content = content;
            return post.save();
        }
    )
    .then(result=>{
        console.log('after updating the product:',result);
        res.status(200).json({message: 'Post got Updated!',post: result});
    })
    .catch(err=>{
        console.log('error while updating data :',err);
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deletePost = (req,res,next)=>{
    const postId = req.params.postId;
    Post.findById(postId).then(
        post =>{
            if(!post){
            const error = new Error('The required Post/ Feed is not found !');
            error.statusCode = 404;
            throw error; 
            }
            //check logged In user details
            clearImage(post.imageUrl);
            return Post.findByIdAndRemove(postId);
        }
    ).then(result=>{
        console.log('post deletion success!'); 
        res.status(200).json({message:'Post deleted Successfully',result:result});   
    })
    .catch(err=>{
        console.log('error while deleting the post:',err);
    });
}

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
