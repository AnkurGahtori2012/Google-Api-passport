const router=require('express').Router();
const authCheck=(req,res,next)=>{
    //if user is not login
    if(!req.user){
        //redirect to login page
        res.redirect('/auth/login')
    }
    else{
        //if logged in
        next();
    }
}
router.get('/',authCheck,(req,res)=>{
    // res.send("You are opening your profile : "+req.user.username);
    res.render('profile.ejs',{'user':req.user});
})
module.exports=router;