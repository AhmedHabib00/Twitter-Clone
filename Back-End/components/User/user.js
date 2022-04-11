const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const userSchema = require('./userSchema')
const ObjectId = userSchema.ObjectId;

// users ||Test||
router.get('/', function(req,res){
    res.status(200).send({"UserPage":true});
});


//"""Follow endpoints"""
// List of users who are followers of the user ID : GET /users/{id}/followers
router.get('/:id/followers', async (req, res) =>{
    // Get data by id
    userSchema.findById(req.params.id).populate('followers').exec(function(err, followersData){
        try {
            // return followers data
            res.status(200).send(followersData.followers);
        }
        catch(err){
            res.sendStatus(500);
        }
    })
});

// List of users the specified user ID is following : GET /users/{id}/following
router.get('/:id/following', async (req, res) =>{ 
    // Get data by id
    userSchema.findById(req.params.id).populate('following').exec(function(err, followingData){
        try {
            // return following data
            res.status(200).send(followingData.following);
        } catch(err) {
            res.sendStatus(500);
        }
    })
});

// Allows a user ID to follow another user : PATCH /users/{source_user_id}/following/{target_user_id}
router.patch('/:source_user_id/following/:target_user_id', async (req, res) =>{
    // Get data of the user who want to follow by id
    userSchema.findById(req.params.source_user_id).exec(function(err, followingData){
        try {
            // Get data of the user that will be followed from body request by target_user_id
            userSchema.findById(req.params.target_user_id).exec(function(err, followerData){
                try {
                     // Check if the source_user_id not already follow the target_user_id
                    followingExistPass = followingData.following.find(following => following == req.params.target_user_id)
                    followerExistPass = followerData.followers.find(follower => follower == req.params.source_user_id)

                    // Check if user is the same as target_user
                    selfPass = req.params.source_user_id == req.params.target_user_id
        
                    if (!followerExistPass && !followingExistPass && !selfPass) {
                        // Add target_user_id to the following list of the user
                        followingData.following.push(req.params.target_user_id);
                        followingData.save();

                        // Add user_id to the followers list of the target_user
                        followerData.followers.push(req.params.source_user_id);
                        followerData.save();
                        
                        followingExistPass = followingData.following.find(following => following == req.params.target_user_id)
                        followerExistPass = followerData.followers.find(follower => follower == req.params.source_user_id)
                        
                        if (followingExistPass && followerExistPass) {
                            res.status(200).send({"data": {
                                "following": true
                            }});
                        }else{
                            throw err;
                        }
                        
                    }else{
                        throw err;
                    }
                } catch(err) {
                    res.status(500).send({"data": {
                        "following": false
                    }});
                }
            });
        } catch(err) {
            res.status(500).send({"data": {
                "following": false
            }});
        }
    })
});

// Allows a user ID to unfollow another user : DEL /users/{source_user_id}/following/{target_user_id}
router.delete('/:source_user_id/following/:target_user_id', async (req, res) =>{
    // Get data of the user who want to unfollow by source_user_id
    userSchema.findById(req.params.source_user_id).exec(function(err, followingData){
        try {
            // Get data of the target_user_id
            userSchema.findById(req.params.target_user_id).exec(function(err, followerData){
                try {
                    // Check if source_user already followed target_user
                    followingExistPass = followingData.following.find(following => following == req.params.target_user_id);
                    followerExistPass = followerData.followers.find(follower => follower == req.params.source_user_id);
                    
                    // Check if target_user is the same as source_user
                    selfPass = req.params.target_user_id == req.params.source_user_id;

                    if (followerExistPass && followingExistPass && !selfPass) {
                        // Delete following
                        followingData.following = removeItem(followingData.following, req.params.target_user_id);
                        followingData.save();

                        // Delete follower
                        followerData.followers = removeItem(followerData.followers, req.params.source_user_id);
                        followerData.save();
                        
                        followingExistPass = followingData.following.find(following => following == req.params.target_user_id);
                        followerExistPass = followerData.followers.find(follower => follower == req.params.source_user_id);
                        
                        if(!followingExistPass && !followerExistPass){
                            res.status(200).send({"data": {
                                "following": false
                            }}); 
                        }else{
                            throw err;
                        }
                    }else{
                        throw err;
                    }
                } catch(err) {
                    res.status(500).send({"data": {
                        "following": true
                    }});
                }
            });
        } catch(err) {
            res.status(500).send({"data": {
                "following": true
            }});
        }
    })
});

// Remove element from array function
function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

module.exports = router