const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const databse = require('./database');
const session = require('express-session');
const mongoose= require('./database');

var  multer = require('multer');
var cors = require('cors');
app.use(cors({origin: '*'}));

const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// SignUp and Auth
const signUp = require('./components/Auth/signupRoute');
const login = require('./components/Auth/loginRoute');
const oAuth = require('./components/Auth/OAuthRoute');
const forgotPassword = require('./components/Auth/forgotPasswordRoute');
// Users  
var users = require('./components/User/user');
//user profile 
const userProfileRoute = require('./components/UserProfile/userProfile');
//tweets 
const postRoute = require('./components/Tweets/tweets');
//Admins
const admins = require('./components/Admins/admin');

app.use('/uploads',express.static('uploads'));

app.use('/imgUploads',express.static('imgUploads'));


// Users endpoints
app.use('/users', users);

//User Profile endpoints
app.use('/user', userProfileRoute);

//tweets endpoints
app.use("/tweets", postRoute);

//signUp and auth endpoints
app.use ('/signUp',signUp);
app.use ('/login',login);
app.use ('/auth',oAuth);
app.use ('/forgotPassword',forgotPassword);

// Admins end points
app.use("/admins", admins)

// Test
app.use('/__test__',express.static('__test__'));

const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server
