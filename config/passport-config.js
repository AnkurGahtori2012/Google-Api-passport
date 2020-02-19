const passport = require('passport');
const keys = require('./keys')
const GoogleStrategy = require('passport-google-oauth20');
const User = require("../models/user-models")

passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})
passport.use(
    new GoogleStrategy({
        //option to start google
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //cb for passport
        // console.log(profile);
        //if user already exist
        User.findOne({
            googleid: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                //user already exist
                console.log("User already Exist : ");
                done(null,currentUser);
            } else {
                //if user not exist
                new User({
                    username: profile.displayName,
                    googleid: profile.id,
                    email:profile.emails[0].value,
                    img:profile.photos[0].value
                }).save().then((newUser) => {
                    //  console.log("New user created : ", newUser);
                    done(null,newUser);
                });
            }
        })

    })
)