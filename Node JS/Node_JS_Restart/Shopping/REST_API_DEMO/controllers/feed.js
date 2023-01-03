exports.getPosts = (req,res,next)=>{
    res.status(200).json({
        posts: [{
            title: 'Sample Product 1 title',
            description: 'Sample Product 1 description',
        }]
    });
}

exports.createPosts = (req,res,next)=>{
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'POST created Successfully',
        post:{
            id: new Date().toISOString(),
            title: title,
            content: content
        }
    })
}