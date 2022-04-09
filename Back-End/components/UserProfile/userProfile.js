const express = require ('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require("ejs");
const User = require('../User/userSchema');
const Tweet = require('../Tweets/tweetsSchema');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

// creats new data of the user profile .(profile picture soon to be added)
/*router.post('/profile_settings',(req,res) => {
    const newprofile = new User({
        name:req.body.name,
        description:req.body.description,
        location:req.body.location,
        birthdate:req.body.birthdate

    });
    try{
        res.sendStatus(200);
        newprofile.save()
        .then(data =>{
            res.json(data);
        })
    }

    catch (err) {
        res.status(400);
        res.json({message: err});
    }
    
});*/

//gets data from the database about a single user
router.get('/:userProfileId/profile_settings',auth, async(req,res) => {



    try{
        const user = await User.findById(req.params.userProfileId);
        // console.log(user);
        const name = user.name;
        const location = user.location;
        const description = user.description;
        const birthDate = user.birthdate;
        //console.log(name,location)
        //const token = jwt.sign({ _id: user.userProfileId})
        return res.status(200).send({
            "name":name,
            "location":location,
            "description":description,
            "Birthdate":birthDate
        });
    }
    catch (err){
        return res.status(400).send("Couldnot find ID")
    }

});

//edits the existing values of a specific user in the database

router.patch('/:userProfileId/profile_settings',auth,async (req,res) => {
    try{
        const updateUserProfile = await User.updateOne(
            {_id: req.params.userProfileId},
            {$set:{name:req.body.name, description:req.body.description, location:req.body.location, birthdate:req.body.birthdate }});
        res.json(updateUserProfile);
    }
    catch (err){
        res.status(400).send("Couldnot find ID")
    }

});

//Deletes a specific user's data in case the profile is deleted
/*router.delete('/:userProfileId/profile_settings', async (req,res) =>{
    try{

        const removedProfile = await Profile.remove({ _id: req.params.userProfileId});
        res.json(removedProfile);
    }
    catch(err){
        res.status(400).send("Couldnot find ID")
    }
});*/



//-----------------------------------------------------phase 2----------------------------------------------------------
//profile tweets, Replies and likes
router.get('/:userProfileId',auth, async(req,res) => {//for pagination after route type:?page='number' example of route /user/:userProfileId?page=2

    try{
        
        const user = await User.findById(req.params.userProfileId);    
        const tweetss = user.tweets;
        const numbOfTweets = tweetss.length;

        const usertweets = [];

        for(var i = numbOfTweets-1; i >= 0;i--)
        {
            const tempTweet = await Tweet.findById(tweetss[i].toString());
            const likesOnTweet = tempTweet.likes.length;
            const repliesOnTweet = tempTweet.replyTo.length;
            const tweetRetweets = tempTweet.retweeters.length;
            if(!tempTweet.likes){
                likesOnTweet = 0;
            }
            if(!tempTweet.replyTo){
                repliesOnTweet = 0;
            }
            if(!tempTweet.retweeters){
                tweetRetweets = 0;
            }
            const tweetObject = {
                "tweet ID":tempTweet._id,
                "content":tempTweet.content,
                "Posted By":user.name,
                "likes":likesOnTweet,
                "replies":repliesOnTweet,
                "retweets":tweetRetweets,
            }
            usertweets.push(tweetObject);
        }


        // Pagination, TODO: Filter on DB level instead of reading all records and then paginate
        const pageSize = 5;
        const pageNumber = req.query.page | 1
        const startIndex = (pageNumber - 1) * pageSize
        const endIndex =  pageNumber * pageSize

        console.log(pageNumber)
        console.log(startIndex)
        console.log(endIndex)
        let filteredTweets
        if(usertweets.length > pageSize) {
           filteredTweets = usertweets.slice(startIndex, endIndex)
        } else {
            filteredTweets = usertweets
        }

        return res.status(200).send({filteredTweets});
    }
    catch (err){
        return res.status(400).send("User has no tweets.")
    }

});


router.get('/:userProfileId/with_replies',auth, async(req,res) => {

    try{
        const user = await User.findById(req.params.userProfileId);
        const tweetss = user.tweets;
        const numbOfTweets = tweetss.length;
        const replies = user.replies;
        const numbofreplies = user.replies.length;

        const usertweetsAndreplies = [];

        for(var i = numbofreplies-1; i >= 0;i--)
        {
            const tempTweet = await Tweet.findById(replies[i].toString());
            const likesOnTweet = tempTweet.likes.length;
            const repliesOnTweet = tempTweet.replyTo.length;
            const tweetRetweets = tempTweet.retweeters.length;
            const tweetposter = await User.findById(tempTweet.postedBy.toString())

            if(!tempTweet.likes){
                likesOnTweet = 0;
            }
            if(!tempTweet.replyTo){
                repliesOnTweet = 0;
            }
            if(!tempTweet.retweeters){
                tweetRetweets = 0;
            }
            const tweetObject = {
                "type":"Reply",
                "content":tempTweet.content,
                "Posted By":tweetposter.name,
                "likes":likesOnTweet,
                "replies":repliesOnTweet,
                "retweets":tweetRetweets,
            }
            usertweetsAndreplies.push(tweetObject);
        }


        for(var i = numbOfTweets-1; i >= 0;i--)
        {
            const tempTweet = await Tweet.findById(tweetss[i].toString());
            const likesOnTweet = tempTweet.likes.length;
            const repliesOnTweet = tempTweet.replyTo.length;
            const tweetRetweets = tempTweet.retweeters.length;
            const tweetposter = await User.findById(tempTweet.postedBy.toString())

            if(!tempTweet.likes){
                likesOnTweet = 0;
            }
            if(!tempTweet.replyTo){
                repliesOnTweet = 0;
            }
            if(!tempTweet.retweeters){
                tweetRetweets = 0;
            }
            const tweetObject = {
                "content":tempTweet.content,
                "Posted By":tweetposter.name,
                "likes":likesOnTweet,
                "replies":repliesOnTweet,
                "retweets":tweetRetweets,
            }
            usertweetsAndreplies.push(tweetObject);
        }

        const pageSize = 5;
        const pageNumber = req.query.page | 1
        const startIndex = (pageNumber - 1) * pageSize
        const endIndex =  pageNumber * pageSize

        console.log(pageNumber)
        console.log(startIndex)
        console.log(endIndex)
        let filteredTweetsAndreplies
        if(usertweetsAndreplies.length > pageSize) {
            filteredTweetsAndreplies = usertweetsAndreplies.slice(startIndex, endIndex)
        } else {
            filteredTweetsAndreplies = usertweetsAndreplies
        }

        return res.status(200).send({filteredTweetsAndreplies});}
    catch (err){
        return res.status(400).send("user has no tweets or replies.")
    }

});


router.get('/:userProfileId/likes',auth, async(req,res) => {

    
    try{
        const user = await User.findById(req.params.userProfileId);      
        const likedtweets = user.likes;
        const numbOfLikedTweets = likedtweets.length;
        const userLikes = [];


        for(var i = numbOfLikedTweets-1; i >= 0;i--)
        {
            const tempTweet = await Tweet.findById(likedtweets[i].toString());
            const likesOnTweet = tempTweet.likes.length;
            const repliesOnTweet = tempTweet.replyTo.length;
            const tweetRetweets = tempTweet.retweeters.length;
            const tweetposter = await User.findById(tempTweet.postedBy.toString())
            if(!tempTweet.likes){
                likesOnTweet = 0;
            }
            if(!tempTweet.replyTo){
                repliesOnTweet = 0;
            }
            if(!tempTweet.retweeters){
                tweetRetweets = 0;
            }
            const tweetObject = {
                "content":tempTweet.content,
                "Posted By":tweetposter.name,
                "likes":likesOnTweet,
                "replies":repliesOnTweet,
                "retweets":tweetRetweets,
            }
            userLikes.push(tweetObject);
        }

        const pageSize = 5;
        const pageNumber = req.query.page | 1
        const startIndex = (pageNumber - 1) * pageSize
        const endIndex =  pageNumber * pageSize

        console.log(pageNumber)
        console.log(startIndex)
        console.log(endIndex)
        let filteredlikes
        if(userLikes.length > pageSize) {
            filteredlikes = userLikes.slice(startIndex, endIndex)
        } else {
            filteredlikes = userLikes
        }

        
        return res.status(200).send({userLikes});}
    catch (err){
        return res.status(400).send("User has no likes.")
    }

});




module.exports = router;