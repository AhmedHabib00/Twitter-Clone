const express=require('express');
const bodyParser= require('body-parser');
const session = require('express-session');
const mongoose= require('./database');



const signUp = require('./components/Auth/signupRoute');

const port = process.env.PORT || 3000;
const app = express();




app.use(bodyParser.urlencoded({extended : true})) //for body-parser to return warning
app.use(express.json());
app.use ('/signUp',signUp);

const server =app.listen(port,()=>
console.log(`app is running on port ${port}`));
