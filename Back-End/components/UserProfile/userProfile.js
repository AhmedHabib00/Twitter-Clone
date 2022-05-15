const express = require ('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require("ejs");
const User = require('../User/userSchema');
const Tweet = require('../Tweets/tweetsSchema');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
const Multer = require('multer');
const path = require('path');
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const uuid = require("uuid")
const uuidv1 = uuid.v1
const {check ,validationResult} = require('express-validator');

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

const storage = new Storage({projectId: process.env.GCLOUD_PROJECT, credentials: {client_email: process.env.GCLOUD_CLIENT_EMAIL, private_key: process.env.GCLOUD_PRIVATE_KEY}})

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize:5 * 1024 * 1024

    }
});

const bucket = storage.bucket(process.env.GCS_BUCKET)

/*const maxImgSize = 8*1024*1024;

let processFile = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: maxSize },
  }).single("file");
let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });
  


const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  // A bucket is a container for objects (files).
const {Storage}=require('@google-cloud/storage');
const storage = new Storage({projectId:process.env.GCLOUD_PROJECT,credentials:{client_email:process.env.GCLOUD_CLIENT_EMAIL,private_key:process.env.GCLOUD_PRIVATE_KEY}});
const bucket = storage.bucket(process.env.GCS_BUCKET);*/

//gets data from the database about a single user
router.get('/:userProfileId/profile_settings', async(req,res) => {

    try{
        const user = await User.findById(req.params.userProfileId);
        // console.log(user);
        const name = user.username;
        const location = user.location;
        const description = user.description;
        const birthDate = user.birthdate;
        const profilePicture = user.profilePic;
        const coverPhoto = user.coverPhoto;
        //console.log(name,location)
        //const token = jwt.sign({ _id: user.userProfileId})
        return res.status(200).send({
            "displayName":name,
            "username":user.username,
            "location":location,
            "description":description,
            "Birthdate":birthDate,
            "Profile Picture":profilePicture,
            "Cover Photo": coverPhoto
        });
    }
    catch (err){
        return res.status(400).send("Couldnot find ID")
    }

});

//edits the existing values of a specific user in the database

router.patch('/:userProfileId/profile_settings', [
    check('birthdate','birthdate must bein the form YYYY/MM/DD')
    .isDate()
],async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }
    try{
        const updateUserProfile = await User.updateOne(
            {_id: req.params.userProfileId},
            {$set:{name:req.body.name, description:req.body.description, location:req.body.location, birthdate:req.body.birthdate }});
        return res.status(200).send("Updated user profile successfully");
    }
    catch (err){
        return res.status(400).send("Couldnot find ID")
    }

});

router.patch('/:userProfileId/profilePicture',multer.any(),async (req,res) => {
    // console.log(req);
    var mediaTemp = ""
    const newfilename = uuidv1() + "-" + req.files[0].originalname;
    const blob = bucket.file(newfilename);
    const blobStream = blob.createWriteStream({resumable:false});
    //console.log(blobStream);
    try{
            blobStream.on('finish', () => {
                 publicUrl = format(`https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`);
            });
            mediaTemp = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            blobStream.end(req.files[0].buffer);
    }
    
    catch (err){
        //console.log(err)
        // console.log(req.files)
        return res.status(400).send("Couldnot find ID")
    }
    try{
        const updateUserProfile = await User.updateOne(
            {_id: req.params.userProfileId},
            {$set:{profilePic:mediaTemp}});
            return res.status(200).send("Updated Profile picture successfully");
    }
    catch(err){
        console.log(err)
        //console.log(req.files.originalname)
        return res.status(400).send("Error Uploading Image, Please make sure its the right format and no more than 5MB")
    }

});


router.patch('/:userProfileId/coverPhoto',multer.any(),async (req,res) => {
    // console.log(req);
    var mediaTemp = ""
    const newfilename = uuidv1() + "-" + req.files[0].originalname;
    const blob = bucket.file(newfilename);
    const blobStream = blob.createWriteStream({resumable:false});
    //console.log(blobStream);
    try{
            blobStream.on('finish', () => {
                 publicUrl = format(`https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`);
            });
            mediaTemp = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            blobStream.end(req.files[0].buffer);
    }
    
    catch (err){
        //console.log(err)
        // console.log(req.files)
        return res.status(400).send("Couldnot find ID")
    }
    try{
        const updateUserProfile = await User.updateOne(
            {_id: req.params.userProfileId},
            {$set:{coverPhoto:mediaTemp}});
            return res.status(200).send("Updated cover photo successfully");
    }
    catch(err){
        console.log(err)
        //console.log(req.files.originalname)
        return res.status(400).send("Error Uploading Image, Please make sure its the right format and no more than 5MB")
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
router.get('/:userProfileId', async(req,res) => {//for pagination after route type:?page='number' example of route /user/:userProfileId?page=2

    try{
        
        const user = await User.findById(req.params.userProfileId);    
        const tweetss = user.tweets;
        console.log(tweetss)
        const numbOfTweets = tweetss.length;
        console.log(numbOfTweets)

        const usertweets = [];

        for(var i = numbOfTweets-1; i >= 0;i--)
        {
            const tempTweet = await Tweet.findById(tweetss[i].toString());
            var likesOnTweet = tempTweet.numberLikes;
            var repliesOnTweet = tempTweet.numberReplies;
            var tweetRetweets = tempTweet.numberRetweets;
            if(!tempTweet.likes){
                likesOnTweet = 0;
            }
            // if(!tempTweet.replyTo){
            //     repliesOnTweet = 0;
            // }
            if(!tempTweet.retweeters){
                tweetRetweets = 0;
            }
            const tweetObject = {
                "tweet ID":tempTweet._id,
                "content":tempTweet.content,
                "Posted By":user.username,
                "likes":likesOnTweet,
                //"replies":repliesOnTweet,
                "retweets":tweetRetweets,
            }
            usertweets.push(tweetObject);
            console.log(tweetObject);
        }


        // Pagination, TODO: Filter on DB level instead of reading all records and then paginate
        const pageSize = 5;
        const pageNumber = req.query.page | 1
        const startIndex = (pageNumber - 1) * pageSize
        const endIndex =  pageNumber * pageSize

        // console.log(pageNumber)
        // console.log(startIndex)
        // console.log(endIndex)
        let filteredTweets
        if(usertweets.length > pageSize) {
           filteredTweets = usertweets.slice(startIndex, endIndex)
        } else {
            filteredTweets = usertweets
        }

        return res.status(200).send({filteredTweets});
    }
    catch (err){
        console.log(err)
        return res.status(400).send("User has no tweets.")
    }

});


router.get('/:userProfileId/with_replies', async(req,res) => {

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
            var likesOnTweet = tempTweet.numberLikes;
            var repliesOnTweet = tempTweet.numberReplies;
            var tweetRetweets = tempTweet.numberRetweets;
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
                "Posted By":tweetposter.username,
                "likes":likesOnTweet,
                "replies":repliesOnTweet,
                "retweets":tweetRetweets,
            }
            usertweetsAndreplies.push(tweetObject);
        }


        for(var i = numbOfTweets-1; i >= 0;i--)
        {
            const tempTweet = await Tweet.findById(tweetss[i].toString());
            var likesOnTweet = tempTweet.numberLikes;
            var repliesOnTweet = tempTweet.numberReplies;
            var tweetRetweets = tempTweet.numberRetweets;
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
                "Posted By":tweetposter.username,
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

        // console.log(pageNumber)
        // console.log(startIndex)
        // console.log(endIndex)
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


router.get('/:userProfileId/likes', async(req,res) => {

    
    try{
        const user = await User.findById(req.params.userProfileId);      
        const likedtweets = user.likes;
        const numbOfLikedTweets = likedtweets.length;
        const userLikes = [];


        for(var i = numbOfLikedTweets-1; i >= 0;i--)
        {
            const tempTweet = await Tweet.findById(likedtweets[i].toString());
            var likesOnTweet = tempTweet.numberLikes;
            var repliesOnTweet = tempTweet.numberReplies;
            var tweetRetweets = tempTweet.numberRetweets;
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
                "Posted By":tweetposter.username,
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

        // console.log(pageNumber)
        // console.log(startIndex)
        // console.log(endIndex)
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