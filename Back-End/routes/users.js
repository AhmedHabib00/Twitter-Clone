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
            userSchema.find({"_id": req.body.target_user_id}).exec(function(err, followerData){
                if (!err) {
                    followingExistPass = followingData[0].following.find(following => following == req.body.target_user_id)
                    followerExistPass = followerData[0].followers.find(follower => follower == req.params.id)

                    selfPass = req.body.target_user_id == req.params.id
        
                    if (!followerExistPass && !followingExistPass && !selfPass) {
                        followingData[0].following.push(req.body.target_user_id);
                        followingData[0].save();

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
    userSchema.find({"_id": req.params.source_user_id}).exec(function(err, followingData){
        if (!err) {
            userSchema.find({"_id": req.params.target_user_id}).exec(function(err, followerData){
                if (!err) {
                    followingExistPass = followingData[0].following.find(following => following == req.params.target_user_id)
                    followerExistPass = followerData[0].followers.find(follower => follower == req.params.source_user_id)

                    selfPass = req.params.target_user_id == req.params.source_user_id

                    if (followerExistPass && followingExistPass && !selfPass) {

                        followingData[0].following = removeItem(followingData[0].following, req.params.target_user_id);
                        followingData[0].save();

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


function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}