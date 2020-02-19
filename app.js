const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes=require('./routes/profile-routes');
const passportSetup = require('./config/passport-config')
const mongoose = require('mongoose');
const app = express();
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport=require('passport');
app.use(cookieSession({
    maxAge:10* 60 * 1000,
    keys: [keys.session.cookieKey]
}));


//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//set up view engine
app.use(express.static("views"))
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/MyDb', (err, result) => {
    if (err) {
        console.log("connection Failed")
    } else {
        console.log("connected to database");
    }
})

//create home route
app.get('/', (req, res) => {
    res.render('home',{'user':req.user});
});

//all calls of auth to authRoutes
app.use('/auth', authRoutes);
//all calls of profile to profileRoutes
app.use('/profile',profileRoutes);
app.listen(8081, () => {
    console.log("App now listening for requests on port", 8081);
})