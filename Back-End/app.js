const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose= require('./database');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended : true})); //for body-parser to return warning

// Users end points
var users = require('./routes/users');
app.use('/users', users);

const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server
