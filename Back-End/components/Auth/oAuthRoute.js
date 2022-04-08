const bcrypt = require('bcrypt');
const User = require('../User/userSchema');
const jwt = require('jsonwebtoken');


const express = require('express');
const router = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
router.use(passport.initialize());


passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(user,done){
  User.findById(id , function(err,user){
    done(err,user);
  })
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/secrets'
  },
    function(accessToken, refreshToken, profile, done) {
    
    User.findOne({'googleId': profile.id }, function(err, user) {
        if (err) {
          return done(err);
        }
      //No user was found... so create a new user with values from google profile
      if (!user) {
          user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
          });
          user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
          });
      } else {
          //found user. Return
          return done(err, user);
      }
  });
  }
  ));

router.get('/google', 
    passport.authenticate('google', { scope: ['profile','email'] })
);

router.get('/google/secrets', 
  passport.authenticate('google', { failureMessage: true }),async function(req, res) {
    // Successful authentication.

    if (!req.user.username){
        const uniqueUsername = await createUniqueUsername(req.user.email);
        const result = await User.updateOne({_id:req.user._id},{$set:{username:uniqueUsername}});
    }
    
    const token = req.user.generateJWT();
    return res.status(201).header('x-auth-token',token).send({
      message:'User Registeration Successful!',
      data: {userId: req.user._id}
  });
  });

/////////////////utilities functions///////////////
  const isUniqueUsername = async function isUnique(givenUsername) {
    // checks whether or not username is unique
    const user = await User.findOne({ username:givenUsername });
    return user;
  };
  
  const createUniqueUsername = async function createUniqueUsername(email) {
    // checks whether or not display name is unique
    const emailBase = email.split('@')[0];
  
    let i = 0;
    while (await isUniqueUsername(emailBase + i.toString())) {
      i += 1;
    }
    return emailBase + i.toString();
  };
  ///////////////////////////////////////////////////////////////////////////
module.exports = router;