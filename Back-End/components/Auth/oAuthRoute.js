const bcrypt = require('bcrypt');
const User = require('../User/userSchema');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)



const express = require('express');
const router = express.Router();

const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
//const GoogleTokenStrategy = require('passport-google-token').Strategy;

router.use(passport.initialize());


passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(user,done){
  User.findById(id , function(err,user){
    done(err,user);
  })
});


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `http://${process.env.DOMAIN}:${process.env.PORT}/auth/facebook/secrets`,
    profileFields: ['id', 'displayName','email']
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile); //ties profile to req.user object to be used in the callback
    }
));

router.post("/google", async (req, res) => {
  if (!req.body.tokenId) return res.status(400).send('Provide Google tokenId');
  const  token   = req.body.tokenId
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGEL_CLIENT_ID
  });
  const { name, email } = ticket.getPayload();    
  var user = await User.findOne({ email:email});
        if (!user) {
          const uniqueUsername = await createUniqueUsername(email);
            user = new User({
              name: name,
              email: email,
              //googleId: profile.user.id,
              username:uniqueUsername
            });
            await user.save() 
        } 
        const newToken = user.generateJWT();
        return res.status(201).header('x-auth-token',newToken).send({
          message:'User Registeration Successful!',
          data: {userId: user._id,role:user.role},
          "x-auth-token":newToken
        }); 
   
})
// router.post("/facebook", async (req, res) => {
//   const  token   = req.body.tokenId
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGEL_CLIENT_ID
//   });
//   const { name, email } = ticket.getPayload();    
//   var user = await User.findOne({ email:email});
//         if (!user) {
//           const uniqueUsername = await createUniqueUsername(email);
//             user = new User({
//               name: name,
//               email: email,
//               //googleId: profile.user.id,
//               username:uniqueUsername
//             });
//             await user.save() 
//         } 

//         const newToken = user.generateJWT();
//         return res.status(201).header('x-auth-token',newToken).send({
//           message:'User Registeration Successful!',
//           data: {userId: user._id,role:user.role},
//           "x-auth-token":newToken
//         }); 
   
// })

// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/facebook/secrets', passport.authenticate('facebook', { failureMessage: true }),async function(req, res) {
//     // Successful authentication.
//     var user = await User.findOne({$or:[{facebookId: req.user.id },{ email:req.user.emails[0].value}]});

//     if (!user) {
//         const uniqueUsername = await createUniqueUsername(req.user.emails[0].value);
//         user = new User({
//             name: req.user.displayName,
//             email: req.user.emails[0].value,
//             facebookId: req.user.id,
//             username:uniqueUsername
//         });
//         await user.save() ;   
//     } 
        
//         const token = user.generateJWT();
//         return res.status(201).header('x-auth-token',token).send({
//           message:'User Registeration Successful!',
//           data: {userId: user._id,role:user.role},
//           "x-auth-token":token
//         }); 
// });



router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/secrets', passport.authenticate('facebook', { failureMessage: true }),async function(req, res) {
    // Successful authentication.
    var user = await User.findOne({$or:[{facebookId: req.user.id },{ email:req.user.emails[0].value}]});

    if (!user) {
        const uniqueUsername = await createUniqueUsername(req.user.emails[0].value);
        user = new User({
            name: req.user.displayName,
            email: req.user.emails[0].value,
            facebookId: req.user.id,
            username:uniqueUsername
        });
        await user.save() ;   
    } 
        
        const token = user.generateJWT();
        return res.status(201).header('x-auth-token',token).send({
          message:'User Registeration Successful!',
          data: {userId: user._id,role:user.role},
          'x-auth-token':token
        }); 
});

router.get('/getRole',auth, async (req, res) => {
  const user =  await User.findOne({ _id: req.user._id});
  if (user){
    return res.status(200).send({"role":user.role });
  }
    return res.status(400).send( "user not found");

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