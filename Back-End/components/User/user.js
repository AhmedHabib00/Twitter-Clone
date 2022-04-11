const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const userSchema = require('./userSchema')
const tweetSchema = require('../Tweets/tweetsSchema')
const ObjectId = userSchema.ObjectId;

// users ||Test||
router.get('/', function(req,res){
    res.status(200).send({"UserPage":true});
});


//"""Bookmark endpoints"""
// List of bookmarked tweets of the user ID : GET /users/:id/bookmarks/
router.get('/:id/bookmarks', async (req, res) =>{
    // Get data by id
    userSchema.findById(req.params.id).populate('bookmarks').exec(function(err, bookmarksData){
        try {
            // return followers data
            res.status(200).send(bookmarksData.bookmarks);
        }
        catch(err){
            res.sendStatus(500);
        }
    })
});

// Allows an user to bookmark tweet : POST /users/{id}/bookmarks/{tweet_id}
router.post('/:id/bookmarks/:tweet_id', async (req, res) =>{
    // Get data of the user who want to bookmark by id
    userSchema.findById(req.params.id).exec(async(err, userData)=>{
        try {
            // Get data of the tweet that will be bookmarked by id
            tweetData = await tweetSchema.findById(req.params.tweet_id);
            if (tweetData) {
                // Check if the tweet_id not already bookmarked by the user id
                bookmarkExistPass = userData.bookmarks.find(bookmark => bookmark == req.params.tweet_id)
    
                if (!bookmarkExistPass) {
                    // Add tweet_id to the bookamrks list of the user
                    userData.bookmarks.push(req.params.tweet_id);
                    userData.save();

                    // Check if the tweet_id not already bookmarked by the user id
                    bookmarkExistPass = userData.bookmarks.find(bookmark => bookmark == req.params.tweet_id)
                    
                    if (bookmarkExistPass) {
                        res.status(200).send({"data": {
                            "bookmarked": true
                        }});
                    }else{
                        throw err;
                    }
                    
                }else{
                    throw err;
                }    
            } else {
                throw err;  
            }
        } catch(err) {
            res.status(500).send({"data": {
                "following": false
            }});
        }
    })
});

// Allows an user to unbookmark tweet : DEL /users/{id}/bookmarks/{tweet_id}
router.delete('/:id/bookmarks/:tweet_id', async (req, res) =>{
    // Get data of the user who want to unbookmark by id
    userSchema.findById(req.params.id).exec(async(err, userData)=>{
        try {            
            // Get tweet that will be bookmarked by id
            tweetData = await tweetSchema.findById(req.params.tweet_id);

            if (tweetData){
                // Check if the tweet_id not already bookmarked by the user id
                bookmarkExistPass = userData.bookmarks.find(bookmark => bookmark == req.params.tweet_id)

                if (bookmarkExistPass) {
                    // Delete bookmarks
                    userData.bookmarks = removeItem(userData.bookmarks, req.params.tweet_id);
                    userData.save();
                    
                    // Check if the tweet_id not already bookmarked by the user id
                    bookmarkExistPass = userData.bookmarks.find(bookmark => bookmark == req.params.tweet_id)
                    
                    if (!bookmarkExistPass) {
                        res.status(200).send({"data": {
                            "bookmarked": false
                        }}); 
                    }else{
                        throw err;
                    }
                }else{
                    throw err;
                }
            }else{
                throw err;
            }
        } catch(err) {
            res.status(500).send({"data": {
                "bookmarked": false
            }});
        }
    })
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

// Allows a user ID to follow another user : POST /users/{source_user_id}/following/{target_user_id}
router.post('/:source_user_id/following/:target_user_id', async (req, res) =>{
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