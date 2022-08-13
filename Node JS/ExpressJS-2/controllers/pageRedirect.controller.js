exports.PageNotFound = function(req, res, next){
    // res.status(400).sendFile(path.join(rootFolder, './', 'views', '404.html'));
    res.status(400).render('404',{content:'Page Not Found !', pageTitle:'Page Not Found !', path:''});
};