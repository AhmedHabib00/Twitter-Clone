const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const userSchema = require('./userSchema')
const ObjectId = userSchema.ObjectId;

// users ||Test||
router.get('/', function(req,res){
    res.send({"UserPage":true});
});


//"""Follow endpoints"""
// List of users who are followers of the user ID : GET /users/{id}/followers
router.get('/:id/followers', function(req,res){
    // Get data by id
    userSchema.find({"_id": req.params.id}).populate('followers').exec(function(err, followersData){
        if (!err) {
            // return followers data
            res.send(followersData[0].followers)
        } else {
            res.send(err)
        }
    })
});

// List of users the specified user ID is following : GET /users/{id}/following
router.get('/:id/following', function(req,res){ 
    // Get data by id
    userSchema.find({"_id": req.params.id}).populate('following').exec(function(err, followingData){
        if (!err) {
            // return following data
            res.send(followingData[0].following)
        } else {
            res.send(err)
        }
    })
});

// Allows a user ID to follow another user : POST /users/{id}/following
router.post('/:id/following', function(req,res){
    // Get data of the user who want to follow by id
    userSchema.find({"_id": req.params.id}).exec(function(err, followingData){
        if (!err) {
            // Get data of the user that will be followed from body request by target_user_id
            userSchema.find({"_id": req.body.target_user_id}).exec(function(err, followerData){
                if (!err) {
                     // Check if user not follow target_user
                    followingExistPass = followingData[0].following.find(following => following == req.body.target_user_id)
                    followerExistPass = followerData[0].followers.find(follower => follower == req.params.id)

                    // Check if user is the same as target_user
                    selfPass = req.body.target_user_id == req.params.id
        
                    if (!followerExistPass && !followingExistPass && !selfPass) {
                        // Add target_user_id to the following list of the user
                        followingData[0].following.push(req.body.target_user_id);
                        followingData[0].save();

                        // Add user_id to the followers list of the target_user
                        followerData[0].followers.push(req.params.id);
                        followerData[0].save();
        
                        res.send({"data": {
                            "following": true
                        }});
                    }else{
                        res.send({"data": {
                            "following": false
                        }});
                    }
                } else {
                    res.send({"data": {
                        "following": false
                    }});
                }
            });
        } else {
            res.send({"data": {
                "following": false
            }});
        }
    })
});

// Allows a user ID to unfollow another user : DEL /users/{source_user_id}/following/{target_user_id}
router.delete('/:source_user_id/following/:target_user_id', function(req,res){
    // Get data of the user who want to unfollow by source_user_id
    userSchema.find({"_id": req.params.source_user_id}).exec(function(err, followingData){
        if (!err) {
            // Get data of the target_user_id
            userSchema.find({"_id": req.params.target_user_id}).exec(function(err, followerData){
                if (!err) {
                    // Check if source_user already followed target_user
                    followingExistPass = followingData[0].following.find(following => following == req.params.target_user_id)
                    followerExistPass = followerData[0].followers.find(follower => follower == req.params.source_user_id)
                    
                    // Check if target_user is the same as source_user
                    selfPass = req.params.target_user_id == req.params.source_user_id

                    if (followerExistPass && followingExistPass && !selfPass) {

                        // Delete following
                        followingData[0].following = removeItem(followingData[0].following, req.params.target_user_id);
                        followingData[0].save();

                        // Delete follower
                        followerData[0].followers = removeItem(followingData[0].followers, req.params.source_user_id);
                        followerData[0].save();
                        
                        res.send({"data": {
                            "following": false
                        }});
                    }else{
                        res.send({"data": {
                            "following": true
                        }});
                    }
                } else {
                    res.send({"data": {
                        "following": true
                    }});
                }
            });
        } else {
            res.send({"data": {
                "following": true
            }});
        }
    })
});

module.exports = router


// Remove element from array function
function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}