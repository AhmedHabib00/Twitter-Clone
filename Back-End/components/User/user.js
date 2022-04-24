const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const userSchema = require('./userSchema')
const tweetSchema = require('../Tweets/tweetsSchema')
const ObjectId = userSchema.ObjectId;

const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const request = require('request');


// users ||Test||
router.get('/', function(req,res){
    res.status(200).send({"UserPage":true});
});

// Test || Token || - TO-DELETE
router.get('/gToken/:id',async(req,res)=>{
    userInfo = await userSchema.findById(req.params.id);
    const token = jwt.sign({
        _id: req.params.id,
        email: userInfo.email,
        role: userInfo.role
    },process.env.JWT_SECRET_KEY ,{expiresIn :'1d'});

    res.send(token);
});



//"""Users lookup endpoints"""

// Information about an authorized (current) user : GET /users/me/
router.get('/me', auth, async (req, res) =>{

        try{
            userData = await userSchema.findById(req.user._id,"_id name username email profilePic coverPhoto birthdate description followers following blocks likes bookmarks role banned createdAt replies tweets");
            if (userData.role == "User") {
                // return followers data
                res.status(200).send(userData);
            }else{
                throw err;
            }

        }catch(err){
            res.sendStatus(500);
        }
});

//"""Bookmark endpoints"""
// List of bookmarked tweets of the user ID : GET /users/:id/bookmarks/
router.get('/:id/bookmarks', auth, async (req, res) =>{

    if (req.user.role != "User" && req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    // Get data by id
    userSchema.findById(req.params.id).populate('bookmarks').exec(async (err, bookmarksData) =>{
        try {
            userData = await userSchema.findById(req.params.id);
            if (userData.role=="User") {
                // return followers data
                res.status(200).send(bookmarksData.bookmarks);
            }else{
                throw err;
            }
        }
        catch(err){
            res.sendStatus(500);
        }
    })
});

// Allows an user to bookmark tweet : POST /users/{id}/bookmarks/{tweet_id}
router.post('/:id/bookmarks/:tweet_id', auth, async (req, res) =>{

    // Authorization
    if (req.user.role != "User" && req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to bookmark by id
    userSchema.findById(req.params.id).exec(async(err, userData)=>{
        try {
            if (userData.role=="User") {
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
                        res.status(200).send({"data": {
                            "bookmarked": true
                        }});
                    }    
                } else {
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

// Allows an user to unbookmark tweet : DEL /users/{id}/bookmarks/{tweet_id}
router.delete('/:id/bookmarks/:tweet_id', auth, async (req, res) =>{
    
    // Authorization
    if (req.user.role != "User" && req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to unbookmark by id
    userSchema.findById(req.params.id).exec(async(err, userData)=>{
        try {
            if (userData.role=="User") {
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
                        res.status(200).send({"data": {
                            "bookmarked": false
                        }});
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

//"""Block endpoints"""
// List of blocked users of the user ID : GET /users/:id/blocking/
router.get('/:id/blocking', auth, async (req, res) =>{

    if (req.user.role != "User" && req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    // Get data by id
    userSchema.findById(req.params.id).populate('blocks','_id name username email profilePic covorPhoto description').exec(async (err, bookmarksData) =>{
        try {
            userData = await userSchema.findById(req.params.id);
            if (userData.role=="User") {
                // return followers data
                res.status(200).send(bookmarksData.blocks);
            }else{
                throw err;
            }
        }
        catch(err){
            res.sendStatus(500);
        }
    })
});

// Allows an user to block another user : POST /users/{source_user_id}/blocking/{target_user_id}
router.post('/:source_user_id/blocking/:target_user_id', auth, async (req, res) =>{

    // Authrization
    if (req.user.role != "User" && req.user._id != req.params.source_user_id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to block by id
    userSchema.findById(req.params.source_user_id).exec(async (err, userData)=>{
        try {
            // Get data of the user that will be followed from body request by target_user_id
            sourceUserData = await userSchema.findById(req.params.source_user_id);
            targetUserData = await userSchema.findById(req.params.target_user_id);

            if (sourceUserData.role == "User" && targetUserData.role == "User") {
                // Check if the source_user_id not already blocking the target_user_id

                blockExistPass = userData.blocks.find(blocking => blocking == req.params.target_user_id)

                // Check if user is the same as target_user
                selfPass = req.params.source_user_id == req.params.target_user_id
                
                if (!selfPass) {
                    if (!blockExistPass) {
                        // Delete follow relation between source_user_id and target_user_id
                        // Delete following
                        userData.following = removeItem(userData.following, req.params.target_user_id);
                        userData.following = removeItem(userData.following, req.params.source_user_id);

                        // Delete follower
                        userData.followers = removeItem(userData.followers, req.params.source_user_id);
                        userData.followers = removeItem(userData.followers, req.params.target_user_id);
                        
                        // Add target_user_id to the block list of the user
                        userData.blocks.push(req.params.target_user_id);
                        userData.save();
                        
                        blockExistPass = userData.blocks.find(blocking => blocking == req.params.target_user_id)
                        
                        if (blockExistPass) {
                            res.status(200).send({"data": {
                                "blocking": true
                            }});
                        }else{
                            throw err;
                        }   
                    }else{
                        res.status(200).send({"data": {
                            "blocking": true
                        }});
                    }
                }else{
                    res.status(500).send({"data": {
                        "blocking": false,
                        "reason": "Same target_user_id and source_user_id"
                    }});
                }
            }else{
                res.status(500).send({"data": {
                    "blocking": false,
                    "reason": "Not auth. user"
                }});
            }            
        } catch(err) {
            console.log(err);
            res.status(500).send({"data": {
                "blocking": false,
            }});
        }
    })
});

// Allows an user to unblock user : DEL /users/{source_user_id}/blocking/{target_user_id}
router.delete('/:source_user_id/blocking/:target_user_id', auth, async (req, res) =>{
    // Authrization
    if (req.user.role != "User" && req.user._id != req.params.source_user_id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to unblock by source_user_id
    userSchema.findById(req.params.source_user_id).exec(async(err, userData)=>{
        try {
            // Get data of the target_user_id
            sourceUserData = await userSchema.findById(req.params.source_user_id);
            targetUserData = await userSchema.findById(req.params.target_user_id);

            if (sourceUserData.role == "User" && targetUserData.role == "User") {
                // Check if source_user already blocking target_user
                blockingExistPass = userData.blocks.find(blocking => blocking == req.params.target_user_id);

                // Check if target_user is the same as source_user
                selfPass = req.params.target_user_id == req.params.source_user_id;

                if (!selfPass) {
                    if (blockingExistPass) {
                        // Delete following
                        userData.blocks = removeItem(userData.blocks, req.params.target_user_id);
                        userData.save();
                        
                        blockingExistPass = userData.blocks.find(blocking => blocking == req.params.target_user_id);
                        
                        if(!blockingExistPass){
                            res.status(200).send({"data": {
                                "blocking": false
                            }}); 
                        }else{
                            throw err;
                        }
                    }else{
                        res.status(200).send({"data": {
                            "blocking": false
                        }}); 
                    }
                }else{
                    throw err;
                }
            }else{
                throw err;
            }                
        } catch(err) {
            res.status(500).send({"data": {
                "blocking": true
            }});
        }
    })    
});


//"""Follow endpoints"""
// List of users who are followers of the user ID : GET /users/{id}/followers
router.get('/:id/followers', auth, async (req, res) =>{

    // Get data by id
    userSchema.findById(req.params.id).populate('followers', "_id name username email profilePic covorPhoto description").exec(async (err, followersData)=>{
        try {
            userData = await userSchema.findById(req.params.id);
            if (userData.role=="User") {
                // return followers data
                res.status(200).send(followersData.followers);
            }else{
                res.sendStatus(500).send("Specefied id not an User");
            }
        }
        catch(err){
            res.sendStatus(500);
        }
    })
});

// List of users the specified user ID is following : GET /users/{id}/following
router.get('/:id/following', auth, async (req, res) =>{ 

    // Get data by id
    userSchema.findById(req.params.id).populate('following', "_id name username email profilePic covorPhoto description").exec(async (err, followingData)=>{
        try {
            userData = await userSchema.findById(req.params.id);
            if (userData.role=="User") {
                // return following data
                res.status(200).send(followingData.following);
            }else{
                throw err;
            }
        } catch(err) {
            res.sendStatus(500);
        }
    })
});

// Allows a user ID to follow another user : POST /users/{source_user_id}/following/{target_user_id}
router.post('/:source_user_id/following/:target_user_id', auth, async (req, res) =>{

    // Authrization
    if (req.user.role != "User" && req.user._id != req.params.source_user_id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to follow by id
    userSchema.findById(req.params.source_user_id).exec(async (err, followingData)=>{
        try {
            // Get data of the user that will be followed from body request by target_user_id
            userSchema.findById(req.params.target_user_id).exec(async(err, followerData)=>{
                try {
                    sourceUserData = await userSchema.findById(req.params.source_user_id);
                    targetUserData = await userSchema.findById(req.params.target_user_id);
                    if (sourceUserData.role == "User" && targetUserData.role == "User") {
                        // Check if the source_user_id not already follow the target_user_id
                        followingExistPass = followingData.following.find(following => following == req.params.target_user_id)
                        followerExistPass = followerData.followers.find(follower => follower == req.params.source_user_id)

                        // Check if user is the same as target_user
                        selfPass = req.params.source_user_id == req.params.target_user_id

                        if (!selfPass) {
                            if (!followerExistPass && !followingExistPass) {
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
                                res.status(200).send({"data": {
                                    "following": true
                                }});
                            }
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
router.delete('/:source_user_id/following/:target_user_id', auth, async (req, res) =>{
    
    // Authrization
    if (req.user.role != "User" && req.user._id != req.params.source_user_id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to unfollow by source_user_id
    userSchema.findById(req.params.source_user_id).exec(async(err, followingData)=>{
        try {
            // Get data of the target_user_id
            userSchema.findById(req.params.target_user_id).exec(async(err, followerData)=>{
                try {
                    sourceUserData = await userSchema.findById(req.params.source_user_id);
                    targetUserData = await userSchema.findById(req.params.target_user_id);

                    if (sourceUserData.role == "User" && targetUserData.role == "User") {
                        // Check if source_user already followed target_user
                        followingExistPass = followingData.following.find(following => following == req.params.target_user_id);
                        followerExistPass = followerData.followers.find(follower => follower == req.params.source_user_id);

                        // Check if target_user is the same as source_user
                        selfPass = req.params.target_user_id == req.params.source_user_id;

                        if (!selfPass) {
                            if (followerExistPass && followingExistPass) {
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
                                res.status(200).send({"data": {
                                    "following": false
                                }}); 
                            }
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