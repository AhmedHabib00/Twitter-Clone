const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../User/userSchema');
const tweet=require('./tweetsSchema'); //returns the model 

const { redirect } = require("express/lib/response");
// const express = require('express');
const app=express();
app.use(bodyParser.urlencoded({extended: false}));

const multer=require('multer')

  const upload=multer({
    dest:'uploads/'
});



// const u1=new user({
//     firstName:"Ali",
//     lastName: "Adel",
//     username: "Ali_adell098",
//     email: "ali2000@gmail.com",
//     password: "123"
// });
// u1.save();

// const t1=new tweet({
//     content:"hi world"
// })
// t1.save()



router.post("/",upload.array('im'), function(req,res){

    console.log("awel 7aga")

    let token = req.headers["authorization"]
    token = token.split(" ")[1];
    console.log(token)
 
     mediaTemp=[]
     contentTemp=""
     console.log("iam here");
        
     
     if(req.body.tweetContent!=""){
 
         contentTemp=req.body.tweetContent
     }
 
 
     if(!req.files){
         console.log("no img")
     }
     else{
         m=req.files
         for(i=0;i<m.length;i++)
          {
                 mediaTemp.push(req.files[i].path)
          }
     }
 
     if(contentTemp!="" || mediaTemp!="")
     {
            const userTweet= new tweet({
             content: req.body.tweetContent,
             postedBy: token,
             likes: token,
             retweeters:  token,
             retweetInfo:  token,
             media: mediaTemp
         });
 
             userTweet.save(async function(err){
             if(err)
             {
                 console.log("heeree");
                 res.sendStatus(400);
             }
             else
             {
                 await user.populate(userTweet, { path: "postedBy" });
                 await user.populate(userTweet, { path: "likes" });
                 await user.populate(userTweet, { path: "retweeters" });
                 await tweet.populate(userTweet, { path: "retweetInfo" });
                 res.sendStatus(200);
             }
         });
     }
     else{
         console.log("hiooooo")
         res.sendStatus(400);
     }
 });
 
 
 //Deleting a tweet:
 router.delete("/:id", function(req, res){
     tweet.findByIdAndDelete(req.params.id)
     .then(() => res.sendStatus(202))
     .catch(function(error){
            res.sendStatus(400);
     })
 })



module.exports =router;
