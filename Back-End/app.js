const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const databse = require('./database');
const session = require('express-session');
const mongoose= require('./database');


const signUp = require('./components/Auth/signupRoute');

const port = process.env.PORT || 3000;

app.use('/__test__',express.static('__test__'));

app.use(bodyParser.json());
app.use(express.json());


// Users end points
var users = require('./routes/users')
app.use('/users', users)


// const server =app.listen(port,()=>
// console.log(`app is running on port ${port}`));

app.use(bodyParser.urlencoded({
    extended: true
}));



const userProfileRoute = require('./components/UserProfile/userProfile')

app.use('/user', userProfileRoute);

const postRoute = require('./components/Tweets/tweets');

app.use("/tweets", postRoute);



// app.use(bodyParser.urlencoded({extended : true})) //for body-parser to return warning
app.use ('/signUp',signUp);


const server =app.listen(port,()=>
console.log(`app is running on port ${port}`));


module.exports = server
