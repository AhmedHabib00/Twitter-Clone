const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const userSchema = require('./userSchema')
const tweetSchema = require('../Tweets/tweetsSchema')

const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

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
    
        userData = await userSchema.findById(req.user._id,"_id name username email profilePic coverPhoto birthdate description followers following blocks likes bookmarks role banned createdAt replies tweets");
        if (!userData || userData.role != "User") {
            return res.status(500).send('unAuth. User');
        }

        // return user data
        return res.status(200).send(userData);
});

// information of many users by search : GET /users?page=&size=&search=
router.get('/', async (req, res, next) =>{
    try {
        let { page, size, search } = req.query;
  
        // If the page is not entered in query.
        if (!page) {
            // Make the Default value 1.
            page = 1;
        }
        
        // If the size is not entered in query.
        if (!size) {
            size = 10;
        }
        //  Make it integer because query parameter -> string
        const limit = parseInt(size);

        // If the search is not entered in query. 
        if(!search){
            search = "";
        }

        usersData = await userSchema.find({
            "role":"User",
            "username": {$regex:  ".*"+search+".*", $options:"si"} 
        },
            '_id name username description profilePic role',
        ).limit(limit).skip(size*(page-1)).sort( 'createdAt' )
        
        noUsers = await userSchema.count({
            "role":"User",
            "username": {$regex:  ".*"+search+".*", $options:"i"}
        });
        
        noOfpages = parseInt(Math.ceil(noUsers/size));

        return res.status(200).send({
            "count": noUsers,
            "length": noOfpages,
            Info: usersData
        });
    }
    catch (error) {
        res.sendStatus(500).send("Error");
    }
});
// Information of a single user by the ID : GET /users/:id
router.get('/:id', async (req, res) =>{
    try{
        userData = await userSchema.findById(req.params.id,'_id name username description profilePic role');
        if (userData.role == "User") {
            // return followers data
            return res.status(200).send(userData);
        }else{
            return res.status(500).send("Not valid user id");
        }
    }catch(err){
        return res.sendStatus(500);
    }
});

// Information of a single user by username : GET /users/by/username/:username
router.get('/by/username/:username', async (req, res) =>{
    try{
        userData = await userSchema.findOne({"username": req.params.username}, '_id name username description profilePic role');
        if (userData.role == "User") {
            // return followers data
            return res.status(200).send(userData);
        }else{
            return res.status(500).send("Not valid username");
        }
    }catch(err){
        return res.sendStatus(500);
    }
});

//"""Bookmarks endpoints"""
// List of bookmarked tweets of the user ID : GET /users/:id/bookmarks/
router.get('/:id/bookmarks', auth, async (req, res) =>{

    // Authorization
    if (req.user.role != "User" || req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    // Get data by id
    // userData = await userSchema.findById(req.params.id).populate('bookmarks');
    let { page, size } = req.query;
    
    //default value is 1 if page parameter is not given.
    if (!page) {
        page = 1;
    }
    //default value is 10 if page parameter is not given.
    if (!size) {
        size = 10;
    }

    //Casting the size string to integer.
    const limit = parseInt(size);
            
    finalArray= []
    
    var user = await userSchema.findById(req.params.id).limit(limit).skip(size*(page-1))
    .populate("bookmarks")
    .sort({"createdAt":-1})    
    .catch(error => {
        console.log(error);
        return res.status(400).send("error: problem with finding the tweets")
    });

    bookmarksList = user.bookmarks;
    
    if (!bookmarksList) return res.status.send('No tweets found');

    for(i = 0; i < bookmarksList.length; i++){
                
        Liked=false;
        Retweeted=false;

        //Checking if the tweet is liked by the current user.
        var userLiked = bookmarksList[i].likes.some(item => item._id == req.params.id)
        if(userLiked) Liked = true;
            
        //Checking if the tweet is retweeted by the current user.
        var userRetweeted = bookmarksList[i].retweeters.some(item => item._id == req.params.id)
        if(userRetweeted) Retweeted = true;

        var contentTemp="";
        var gifTemp = bookmarksList[i]["gifs"];
        var tempMedia = bookmarksList[i]["media"];
        var urls=[];

        if(!tempMedia || tempMedia.length == 0){
            if(!gifTemp || gifTemp.length == 0)
            {
                urls=[];
            }
            else
            {
                urls.push(gifTemp);
            }
        }
        else{
            urls=tempMedia;
        }

        if(bookmarksList[i]["content"])
            contentTemp = bookmarksList[i]["content"];

        var userTweet = await userSchema.findById(bookmarksList[i].postedBy);

        const Obj= ({
                id: bookmarksList[i]["_id"],
                userName: userTweet.username,
                displayName: userTweet.name,
                content: contentTemp,
                url: userTweet.profilePic,
                URLs: urls,
                isLiked: Liked,
                isRetweeted: Retweeted,
                noOfLike: bookmarksList[i].numberLikes,
                noOfReplies: bookmarksList[i].numberReplies,
                noOfRetweets: bookmarksList[i].numberRetweets
            });

        finalArray.push(Obj);              
        
    }

    if (user.role=="User") {
        // return bookmarks data
        return res.status(200).send({
            "count": finalArray.length,
            "data": finalArray
        });
    }else{
        return res.status(500).send("Specefied id not an user");
    }
});

// Allows an user to bookmark tweet : POST /users/{id}/bookmarks/{tweet_id}
router.post('/:id/bookmarks/:tweet_id', auth, async (req, res) =>{

    // Authorization
    if (req.user.role != "User" || req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to bookmark by id
    userSchema.findById(req.params.id).exec(async(err, userData)=>{
        if (!userData) {
            return res.status(500).send({"data": {
                "bookmarked": false,
                "reason": "Undefined User"
            }});
        }

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

                    return res.status(200).send({"data": {
                        "bookmarked": true
                    }});
   
                }else{
                    return res.status(200).send({"data": {
                        "bookmarked": false,
                        "reason": "Already bookmarked"
                    }});
                }    
            } else {
                return res.status(500).send({"data": {
                    "bookmarked": false,
                    "reason": "Unknown tweet id"
                }}); 
            }
        }else{
            return res.status(500).send({"data": {
                "bookmarked": false
            }});
        }
    })
});

// Allows an user to unbookmark tweet : DEL /users/{id}/bookmarks/{tweet_id}
router.delete('/:id/bookmarks/:tweet_id', auth, async (req, res) =>{
    
    // Authorization
    if (req.user.role != "User" || req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to unbookmark by id
    userSchema.findById(req.params.id).exec(async(err, userData)=>{
        if (!userData){
            return res.status(500).send({"data": {
                "bookmarked": false,
                "reason": "Unkown user id"
            }});
        }
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
                        
                        return res.status(200).send({"data": {
                            "bookmarked": false
                        }}); 

                    }else{
                        return res.status(200).send({"data": {
                            "bookmarked": true,
                            "reason": "Already unbookmarked"
                        }});
                    }
                }else{
                    return res.status(500).send({"data": {
                        "bookmarked": true,
                        "reason": "Unkown tweet id"
                    }});
                }
            }else{
                throw err;
            }
        } catch(err) {
            return res.status(500).send({"data": {
                "bookmarked": true
            }});
        }
    })
});

//"""Block endpoints"""
// List of blocked users of the user ID : GET /users/:id/blocking/
router.get('/:id/blocking', auth, async (req, res) =>{

    if (req.user.role != "User" || req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    // Get data by id
    userSchema.findById(req.params.id).populate('blocks','_id name username email profilePic covorPhoto description').exec(async (err, userData) =>{

        if (userData.role=="User") {
                // return blocks data
                return res.status(200).send({
                    "count": userData.blocks.length,
                    "data": userData.blocks
            });
        }else{
            return res.status(500).send("Specefied id not an user");
        }

    })
});

// Allows an user to block another user : POST /users/{source_user_id}/blocking/{target_user_id}
router.post('/:source_user_id/blocking/:target_user_id', auth, async (req, res) =>{

    // Authrization
    if (req.user.role != "User" || req.user._id != req.params.source_user_id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to block by id
    try {
        // Get data of the user that will be followed from body request by target_user_id
        sourceUserData = await userSchema.findById(req.params.source_user_id);
        targetUserData = await userSchema.findById(req.params.target_user_id);

        if (!sourceUserData || !targetUserData) {
            return res.status(500).send({"data": {
                "blocking": false,
                "reason": "Unknown specified id"
            }}); 
        }

        if (sourceUserData.role == "User" && targetUserData.role == "User") {
            // Check if the source_user_id not already blocking the target_user_id

            blockExistPass = sourceUserData.blocks.find(blocking => blocking == req.params.target_user_id)

            // Check if user is the same as target_user
            selfPass = req.params.source_user_id == req.params.target_user_id
            
            if (!selfPass) {
                if (!blockExistPass) {

                    // Delete follow relation between source_user_id and target_user_id
                    // Delete followers
                    targetUserData.followers = removeItem(targetUserData.followers, req.params.source_user_id);
                    await userSchema.updateOne({"_id":req.params.target_user_id},{"followers":targetUserData.followers});

                    // Delete following
                    sourceUserData.following = removeItem(sourceUserData.following, req.params.target_user_id);
                    // Add target_user_id to the block list of the user
                    sourceUserData.blocks.push(req.params.target_user_id);
                    await userSchema.updateOne({"_id":req.params.source_user_id},{"following":sourceUserData.following,"blocks": sourceUserData.blocks});

                    blockExistPass = sourceUserData.blocks.find(blocking => blocking == req.params.target_user_id)
                    
                    if (blockExistPass) {
                        return res.status(200).send({"data": {
                            "blocking": true
                        }});
                    }else{
                        throw err;
                    }   
                }else{
                    return res.status(200).send({"data": {
                        "blocking": true,
                        "reason": "Already blocked."
                    }});
                }
            }else{
                return res.status(500).send({"data": {
                    "blocking": false,
                    "reason": "Same target_user_id and source_user_id"
                }});
            }
        }else{
            return res.status(500).send({"data": {
                "blocking": false,
                "reason": "Not auth. user"
            }});
        }            
    } catch(err) {
        return res.status(500).send({"data": {
            "blocking": false,
        }});
    }
});

// Allows an user to unblock user : DEL /users/{source_user_id}/blocking/{target_user_id}
router.delete('/:source_user_id/blocking/:target_user_id', auth, async (req, res) =>{
    // Authrization
    if (req.user.role != "User" || req.user._id != req.params.source_user_id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to unblock by source_user_id
    try {
        // Get data of the target_user_id
        sourceUserData = await userSchema.findById(req.params.source_user_id);
        targetUserData = await userSchema.findById(req.params.target_user_id);

        if (!sourceUserData || !targetUserData) {
            return res.status(500).send({"data": {
                "blocking": false,
                "reason": "Unknown specified id"
            }}); 
        }

        if (sourceUserData.role == "User" && targetUserData.role == "User") {
            // Check if source_user already blocking target_user
            blockingExistPass = sourceUserData.blocks.find(blocking => blocking == req.params.target_user_id);

            // Check if target_user is the same as source_user
            selfPass = req.params.target_user_id == req.params.source_user_id;

            if (!selfPass) {
                if (blockingExistPass) {
                    // Delete following
                    sourceUserData.blocks = removeItem(sourceUserData.blocks, req.params.target_user_id);
                    await userSchema.updateOne({"_id":req.params.source_user_id},{"blocks": sourceUserData.blocks});
                    // Check
                    blockingExistPass = sourceUserData.blocks.find(blocking => blocking == req.params.target_user_id);
                    if(!blockingExistPass){
                        return res.status(200).send({"data": {
                            "blocking": false
                        }}); 
                    }else{
                        throw err;
                    }
                }else{
                    return res.status(200).send({"data": {
                        "blocking": false,
                        "reason": "Already unblocked"
                    }}); 
                }
            }else{
                return res.status(500).send({"data": {
                    "blocking": false,
                    "reason": "Same target_user_id and source_user_id"
                }});
            }
        }else{
            throw err;
        }                
    } catch(err) {
        return res.status(500).send({"data": {
            "blocking": true
        }});
    }
});


//"""Follow endpoints"""
// List of users who are followers of the user ID : GET /users/{id}/followers
router.get('/:id/followers', async (req, res) =>{
    // Get data by id
    userSchema.findById(req.params.id).populate('followers', "_id name username email profilePic covorPhoto description").exec(async (err, userData)=>{
        try {
            if (userData.role=="User") {
                // return followers data
                return res.status(200).send({
                    "count": userData.followers.length,
                    "data": userData.followers});
            }else{
                return res.status(500).send("Specefied id not an user");
            }
        }
        catch(err){
            return res.sendStatus(500);
        }
    })
});

// List of users the specified user ID is following : GET /users/{id}/following
router.get('/:id/following', async (req, res) =>{ 

    try {
        // Get data by id
        userSchema.findById(req.params.id).populate('following', "_id name username email profilePic covorPhoto description").exec(async (err, userData)=>{
            if (userData.role=="User") {
                // return following data
                return res.status(200).send({
                    "count": userData.following.length,
                    "data": userData.following});
            }else{
                return res.status(500).send("Specefied id not an user");
            }
        });
    } catch(err) {
        return res.status(500).send("Unknown error happened.");
    }
});

// Allows a user ID to follow another user : POST /users/{source_user_id}/following/{target_user_id}
router.post('/:source_user_id/following/:target_user_id', auth, async (req, res) =>{

    // Authrization
    if (req.user.role != "User" || req.user._id != req.params.source_user_id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to follow by id
    userSchema.findById(req.params.source_user_id).exec(async (err, sourceUserData)=>{
        try {
            // Get data of the user that will be followed from body request by target_user_id
            userSchema.findById(req.params.target_user_id).exec(async(err, targetUserData)=>{
                try {

                    if (!sourceUserData || !targetUserData) {
                        return res.status(500).send({"data": {
                            "following": false,
                            "reason": "Unknown specified id"
                        }}); 
                    }

                    if (sourceUserData.role == "User" && targetUserData.role == "User") {
                        // Check if the source_user_id not already follow the target_user_id
                        followingExistPass = sourceUserData.following.find(following => following == req.params.target_user_id)
                        followerExistPass = targetUserData.followers.find(follower => follower == req.params.source_user_id)

                        targetUserBlocked = sourceUserData.blocks.find(blocking => blocking == req.params.target_user_id);
                        sourceUserBlocked = targetUserData.blocks.find(blocking => blocking == req.params.source_user_id);
    
                        // Check if user is the same as target_user
                        selfPass = req.params.source_user_id == req.params.target_user_id

                        if (!selfPass) {
                            if (!followerExistPass && !followingExistPass) {
                                if (!targetUserBlocked && !sourceUserBlocked) {
                                    // Add user_id to the followers list of the target_user
                                    targetUserData.followers.push(req.params.source_user_id);
                                    await userSchema.updateOne({"_id":req.params.target_user_id},{"followers":targetUserData.followers});

                                    // Add target_user_id to the following list of the user
                                    sourceUserData.following.push(req.params.target_user_id);
                                    await userSchema.updateOne({"_id":req.params.source_user_id},{"following":sourceUserData.following});
                                    
                                    followingExistPass = sourceUserData.following.find(following => following == req.params.target_user_id)
                                    followerExistPass = targetUserData.followers.find(follower => follower == req.params.source_user_id)
                                    
                                    if (followingExistPass && followerExistPass) {
                                        return res.status(200).send({"data": {
                                            "following": true
                                        }});
                                    }else{
                                        throw err;
                                    }   
                                }else{
                                    return res.status(200).send({"data": {
                                        "following": false,
                                        "reason": "User blocks another."
                                    }});
                                }
                            }else{
                                return res.status(200).send({"data": {
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
                    return res.status(500).send({"data": {
                        "following": false
                    }});
                }
            });
        } catch(err) {
            return res.status(500).send({"data": {
                "following": false
            }});
        }
    })
});

// Allows a user ID to unfollow another user : DEL /users/{source_user_id}/following/{target_user_id}
router.delete('/:source_user_id/following/:target_user_id', auth, async (req, res) =>{
    
    // Authrization
    if (req.user.role != "User" || req.user._id != req.params.source_user_id) {
        return res.status(403).send("Access denied");
    }

    // Get data of the user who want to unfollow by source_user_id
    userSchema.findById(req.params.source_user_id).exec(async(err, sourceUserData)=>{
        try {
            // Get data of the target_user_id
            userSchema.findById(req.params.target_user_id).exec(async(err, targetUserData)=>{
                try {
                    if (!sourceUserData || !targetUserData) {
                        return res.status(500).send({"data": {
                            "following": false,
                            "reason": "Unknown specified id"
                        }}); 
                    }

                    if (sourceUserData.role == "User" && targetUserData.role == "User") {
                        // Check if source_user already followed target_user
                        followingExistPass = sourceUserData.following.find(following => following == req.params.target_user_id);
                        followerExistPass = targetUserData.followers.find(follower => follower == req.params.source_user_id);

                        // Check if target_user is the same as source_user
                        selfPass = req.params.target_user_id == req.params.source_user_id;

                        if (!selfPass) {
                            if (followerExistPass && followingExistPass) {
                                // Delete following
                                sourceUserData.following = removeItem(sourceUserData.following, req.params.target_user_id);
                                await userSchema.updateOne({"_id":req.params.source_user_id},{"following":sourceUserData.following});

                                // Delete follower
                                targetUserData.followers = removeItem(targetUserData.followers, req.params.source_user_id);
                                await userSchema.updateOne({"_id":req.params.target_user_id},{"followers":targetUserData.followers});
                                
                                // Check
                                followingExistPass = sourceUserData.following.find(following => following == req.params.target_user_id);
                                followerExistPass = targetUserData.followers.find(follower => follower == req.params.source_user_id);
                                
                                if(!followingExistPass && !followerExistPass){
                                    return res.status(200).send({"data": {
                                        "following": false
                                    }}); 
                                }else{
                                    throw err;
                                }
                            }else{
                                return res.status(200).send({"data": {
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
                    return res.status(500).send({"data": {
                        "following": true
                    }});
                }
            });
        } catch(err) {
            return res.status(500).send({"data": {
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