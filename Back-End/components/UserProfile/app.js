const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


const userProfileRoute = require('./routes/userProfile')

app.use('/user', userProfileRoute);

app.listen(3000,function(){
    console.log("Server is up and running on port 3000");
});

module.exports = app;