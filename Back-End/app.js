const express=require('express');
const bodyParser= require('body-parser');
const session = require('express-session');
const mongoose= require('./database');
const jwt = require('jsonwebtoken');



const signUp = require('./components/Auth/signupRoute');

const port = process.env.PORT || 3000;
const config=require('config');
const app = express();
app.use(bodyParser.urlencoded({extended : true})) //for body-parser to return warning
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'));




if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR')
    process.exit(1);
}



// const server =app.listen(port,()=>
// console.log(`app is running on port ${port}`));


const postRoute = require('./components/Tweets/tweets');

app.use("/tweets", postRoute);



// app.use(bodyParser.urlencoded({extended : true})) //for body-parser to return warning
app.use(express.json());
app.use ('/signUp',signUp);

const server =app.listen(port,()=>
console.log(`app is running on port ${port}`));


module.exports = server
