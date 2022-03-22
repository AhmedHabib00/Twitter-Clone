const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../User/userSchema');
const tweet=require('./tweetsSchema'); //returns the model 
const express = require('express');

const app=express();
app.use(bodyParser.urlencoded({extended: false}));

router.get("/",function(req,res){

})

router.post("/",async function(req,res){

    //if the tweet content exists
    if(req.body.tweetContent!=null){

    //Creating a tweet object using the content and user information.
    const userTweet=new tweet({
        postedBy: req.session.user,
        content: req.body.content
    });
    
    var posted= await userTweet.save(async(err) =>{
        if(err)
           res.sendStatus(400);
        else
        {
          await user.populate(posted, { path: "postedBy" });
          await tweet.populate(posted, { path: "replyTo" });

        }              
    });
    }

    else{
        res.status(400).send();
    }

})

module.exports =router;
