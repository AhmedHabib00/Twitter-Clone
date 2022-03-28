const express=require('express');
const bodyParser= require('body-parser');
const session = require('express-session');
const mongoose= require('./database');
const port = process.env.PORT || 3000;
const app = express();


app.use( bodyParser.json() );       // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended : true})) // For body-parser to return warning
const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

// Admins end points
var admins = require('./components/Admins/admin')
app.use('/Admin', admins)
