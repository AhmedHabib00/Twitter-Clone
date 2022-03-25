const express = require('express');
var router = express.Router();

const userSchema = require('../components/User/userSchema')
const ObjectId = userSchema.ObjectId;

// users
router.get('/', function(req,res){
    res.send("Users")
});


//"""Follow endpoints"""
// List of users who are followers of the user ID : GET /users/{id}/followers
router.get('/:id/followers', function(req,res){
    userSchema.find({"_id": req.params.id}).populate('followers').exec(function(err, followersData){
        if (!err) {
            res.send(followersData[0].followers)
        } else {
            res.send(err)
        }
    })
    //res.send("Get users Follows " + req.params['id'])
});

// List of users the specified user ID is following : GET /users/{id}/following
router.get('/:id/following', function(req,res){ 
    userSchema.find({"_id": req.params.id}).populate('following').exec(function(err, followingData){
        if (!err) {
            res.send(followingData[0].following)
        } else {
            res.send(err)
        }
    })
});

// Allows a user ID to follow another user : POST /users/{id}/following
router.post('/:id/following', function(req,res){
    userSchema.find({"_id": req.params.id}).exec(function(err, followingData){
        if (!err) {
            const userFollowers = followingData[0].followers;
            userFollowers.push(req.body.target_user_id);
            console.log(req.body.target_user_id)

            res.send(userFollowers);
        } else {
            res.send(err);
        }
    })
});

// Allows a user ID to unfollow another user : DEL /users/{source_user_id}/following/{target_user_id}
router.delete('/:source_user_id/following/:target_user_id', function(req,res){
    res.send(req.params.source_user_id + " " + req.params.target_user_id)
});

module.exports = router