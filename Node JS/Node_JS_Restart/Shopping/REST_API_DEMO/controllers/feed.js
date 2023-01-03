exports.getPosts = (req,res,next)=>{
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'Sample Product 1 title',
            description: 'Sample Product 1 description',
            imageUrl: '../images/82574-W0iw3w9eN-transformed.jpeg',
            creator:{
                name:'Suresh',
            },
            createdAt : Date.now()
        }]
    });
}

exports.createPosts = (req,res,next)=>{
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'POST created Successfully',
        post:{
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator:{
                name:'Suresh',
            },
            createdAt: Date.now()
        }
    })
}