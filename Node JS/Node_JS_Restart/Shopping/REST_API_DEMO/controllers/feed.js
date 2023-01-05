const {validationResult} = require('express-validator');
const Post = require('../models/post');

exports.getPosts = (req,res,next)=>{
    Post.find().then(posts=>{
        res.json({message:'Found the Posts',posts:posts});
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.createPosts = (req,res,next)=>{
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
    const imageUrl = req.file.path;
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