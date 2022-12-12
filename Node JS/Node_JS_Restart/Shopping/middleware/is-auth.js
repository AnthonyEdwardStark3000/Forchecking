module.exports = (req,res,next)=>{
    console.log("Inside is-auth middleware.");
     if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    next();
}