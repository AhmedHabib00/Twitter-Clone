const express = require('express');
const ejs = require("ejs");
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('./database');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());       // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended : true})) // For body-parser to return warning

// Test
app.use('/__test__',express.static('__test__'));

// Admins end points
const admins = require('./components/Admins/admin')
app.use("/admins", admins)

const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server

