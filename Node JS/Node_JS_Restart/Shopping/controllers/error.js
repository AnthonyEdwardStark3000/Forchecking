exports.error404 = (req,res,next)=>{
    // res.status(404).sendFile(path.join(rootDir,'views','page-not-found.html'));
    res.status(404).render('page-not-found',{title:'Page Not Found !',path:'/404',isAuthenticated: req.session.isLoggedIn});
};

exports.error500 = (req,res,next)=>{
    res.status(500).render('500',{title:'OOPS !',path:'/500',isAuthenticated: req.session.isLoggedIn});
};