const express=require('express');
const bodyParser= require('body-parser');
const session = require('express-session');
const mongoose= require('./database');



const signUp = require('./components/Auth/signupRoute');
const login = require('./components/Auth/loginRoute');
const oAuth = require('./components/Auth/OAuthRoute');
const forgotPassword = require('./components/Auth/forgotPasswordRoute');


const port = process.env.PORT || 3000;
const app = express();




app.use(bodyParser.urlencoded({extended : true})) //for body-parser to return warning
app.use(express.json());
app.use ('/signUp',signUp);
app.use ('/login',login);
app.use ('/auth',oAuth);
app.use ('/forgotPassword',forgotPassword);



const server =app.listen(port,()=>
console.log(`app is running on port ${port}`));

module.exports = server
