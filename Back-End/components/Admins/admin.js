const express = require('express');
var router = express.Router();

// const adminSchema = require('./adminSchema')
// const ObjectId = adminSchema.ObjectId;


// Admin <|| Test ||>
router.get('/', function(req,res){
    return res.send("Admin Api")
});

// GET: admins/users/ -> Retrieve all users
router.get('/users', function(req,res){
    return res.send("Retrieve all users")
});

// GET: admins/statistics/ -> Retrive statistics data about users
router.get('/statistics', function(req,res){
    return res.send("Retrive statistics data about users")
});

// POST: admins/:id/banning/:target_user_id/ -> Ban a user by admin
router.post('/:id/banning/:target_user_id', function(req,res){
    return res.send("Ban a user by admin")
});

// POST: admins/:id/adding/ -> Ban a user by admin
router.post('/:id/adding', function(req,res){
    return res.send("Add a new admin")
});

// DELETE: admins/:id/adding/ -> Delete user by admin
router.delete('/:id/deleting/:target_user_id', function(req,res){
    return res.send("Delete user by admin")
});

module.exports = router