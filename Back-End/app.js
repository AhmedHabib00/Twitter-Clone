const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const databse = require('./database');
var  multer = require('multer')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


const userProfileRoute = require('./components/UserProfile/userProfile')
/*var storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads')
    },
    filename: (req,file,cb) =>{
        cb(null,file.fieldname + '-' + Date.now())
    }
})

var upload = multer({storage:storage});*/

app.use('/user', userProfileRoute);

app.listen(3000,function(){
    console.log("Server is up and running on port 3000");
});

module.exports = app;
