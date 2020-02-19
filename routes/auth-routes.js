const router = require('express').Router();
const passport = require('passport');
//auth login
router.get('/login', (req, res) => {
    res.render('login',{'user':req.user});
});
//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
   req.logOut();
   res.redirect('/');
})
//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile','email']
}));
//callback route to google for redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
   //this will work when google will redirect and callback function of passport is completed
   res.redirect('/profile/')
})
module.exports = router;