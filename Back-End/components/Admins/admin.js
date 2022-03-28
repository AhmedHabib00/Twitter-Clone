const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const adminSchema = require('./adminSchema')
const ObjectId = adminSchema.ObjectId;

// Admin ||Test||
router.get('/', function(req,res){
    res.send("Admin Api")
});

