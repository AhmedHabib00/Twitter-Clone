const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../User/userSchema');
const tweet=require('./tweetsSchema');  
const auth=require('../middleware/auth');

const http = require('https'); 
const fs = require('fs');


const multer=require('multer')

const filestorageEngine=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./uploads")
    },
    filename:(req,file,cb) => {
    cb (null,Date.now()+"-"+file.originalname);
    }
});

objectMulter={
    storage: filestorageEngine
}

const upload=multer(objectMulter).array('images',4);



// const u1=new user({
//     name:"Aliokk",
//     username: "Adellflfl",
//     email: "Ali_adell0983232525",
//     password: "1232431431"
// });
// u1.save();

// const t1=new tweet({
//     content:"hi world"
// })
// t1.save()
router.get("/",(req,res,next)=>{
    let token=jwt.sign({
        _id:"624e4262ebc21b56c4edc433"
    },config.get('jwtPrivateKey')
)
  res.json({
      token:token
  })
});

//////////////////////////////////////////////////////////////////////////////Posting and replying
router.post("/",auth, async function(req,res){

    //A tweet can have content or images or gifs, but it can not be empty 
    //A tweet can have maximum 4 images/1 gif.
    //number of characters in a tweet is maximum: 
    //same goes for a reply


    //If there is an error with uploading the images, send a 400 status
    //an error is not the same as not uploading images
    upload(req,res,async function(err){
    if(err)
            return res.sendStatus(400)
        
    else{

    token=req.user._id
    try
    {
        userInfo=await user.findById(req.user._id)
    }
    catch(error) //error with finding (invalid id)
    {
         return res.sendStatus(400);
    }

    if(!userInfo) //the id of the user is not found
    {
        return res.sendStatus(400);
        
    }
    
    
    //initialising images,gifs,content,reply as empty
     mediaTemp=[]
     contentTemp=""
     replyTemp=undefined //represents an empty object
     gifTemp=""
        
     
     //if the tweet has content 
     if(req.body.content!="")
     {
         contentTemp=req.body.content
         //checking that the tweet is maximum 280 charcters
         if(contentTemp.length>280)
            return res.sendStatus(400)
     }
 
    //if the tweet has images
     if(req.files)
     {
         console.log(req.files)
         m=req.files
         
         for(i=0;i<m.length;i++)
          {
                 mediaTemp.push(req.files[i].path.replace("\\","/"))
          }
     }

     //if the tweet has a gif:
     if(req.body.gifs.length!=0)
     {
        if(typeof(req.body.gifs)=="string")
            {
                gifTemp=req.body.gifs
            }

        else
            {
                return res.sendStatus(400)  //can not have more than 1 gif    
            } 

        
        if(mediaTemp.length!=0) //can not have images and a gif
            {
                 return res.sendStatus(400)
            }
              

     }


     //if the tweet is a reply to another tweet
     if(req.body.replyId!="") 
     {
        replyTemp = req.body.replyId

        //checking if the id of the tweet we are repling to is valid.
        try
        {
            originalTweet=await tweet.findById(req.body.replyId)
        }
        catch(error) //error with finding (invalid id)
        {
             return res.sendStatus(400);
        }
    
        if(!originalTweet) //the id of the tweet is not found
        {
            return res.sendStatus(400);
            
        }

     }
               
             
    //The tweet/reply has to have at least one of these to be valid
     if(contentTemp!="" || mediaTemp!="" || gifTemp!="")
     {  

            const userTweet= new tweet({
             content: req.body.content,
             postedBy: token,
             media: mediaTemp,
             replyTo:replyTemp,
             gifs:gifTemp
            });

             userTweet.save(async function(err,theTweet){
             if(err)
             {
                return res.sendStatus(400);
             }
             else
             {
                //If it is not a reply
                 if(replyTemp==undefined)
                 {
                    //add the tweet to the user's tweets 
                    await user.findByIdAndUpdate(token,{$addToSet:{tweets: theTweet.id}},{new:true})
                    .catch(error => {
                     console.log(error);
                     return res.sendStatus(400);
                    })  
                 }

                 //if it is a reply
                 else 
                 {
                   //add the tweet to the user's replies
                   await user.findByIdAndUpdate(token,{$addToSet:{replies: replyTemp}},{new:true})
                   .catch(error => {
                      console.log(error);
                      return res.sendStatus(400);
                }) 
                 }
                 return res.sendStatus(200);
             }
         });
     }
     else{
        
         return res.sendStatus(400);
     }  
        }
  });

});
 
 
 //////////////////////////////////////////////////////////////////////////////Deleting a tweet:
 router.delete("/:id",auth, async function(req, res){

    try
    {
        userInfo=await user.findById(req.user._id)
    }
    catch(error) //error with finding (invalid id)
    {
         return res.sendStatus(400);
    }

    if(!userInfo) //the id of the user is not found
    {
        return res.sendStatus(400);
        
    }

    try
    {
        deletedTweet=await tweet.findByIdAndDelete(req.params.id)
    }
    catch(error) //error with deleting
    {
         return res.sendStatus(400);
    }

    if(!deletedTweet) //the id of the tweet in the path parameters is not found
    {
        return res.sendStatus(400);
    }
    else
    {
        //deleting the tweet's images from the uploads file
        if(deletedTweet.media.length!=0)
        {
            for(i=0;i<deletedTweet.media.length;i++)
            {
                //from index 5 till the end
                fileName= deletedTweet.media[i].substring(8,deletedTweet.media[i].length)
                fs.unlinkSync("./uploads/"+fileName)
            }
        }

        return res.sendStatus(200);
    }
     
 })




//////////////////////////////////////////////////////////////////////////////Liking and unliking posts:
router.put("/:id/like",auth,async(req,res)=>{
    console.log("aywa")
    console.log(req.params.id); //post id
    var postId=req.params.id;
    token=req.user._id
    try
    {
        userInfo=await user.findById(req.user._id)
    }
    catch(error) //error with finding (invalid id)
    {
         return res.sendStatus(400);
    }

    if(!userInfo) //the id of the user is not found
    {
        return res.sendStatus(400);
        
    }
    
    //checking if this tweet exists:
    try
    {
        var tweetFound=await tweet.find({_id:postId});
    }
    catch(error) //invalid tweet
    {
        return res.sendStatus(400);
    }
    if(tweetFound.length==0){ //tweet not found
        return res.sendStatus(400)
    }

    var foundLike= await user.find({_id:token,likes:{ $all:[postId]}},{new:true})

    //if the tweet is liked, unlike it
    if(foundLike.length!=0){

        await user.findByIdAndUpdate(token,{$pull:{likes: postId}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })
        await tweet.findByIdAndUpdate(postId,{$pull:{likes: token}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

    }
    //if the tweet is unliked,like it.
    else{
        await user.findByIdAndUpdate(token,{$addToSet:{likes: postId}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })
        await tweet.findByIdAndUpdate(postId,{$addToSet: {likes: token}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

    }
        return res.sendStatus(200);

})



//////////////////////////////////////////////////////////////////////////////Retweeting and unretweeting:
router.post("/:id/retweet",auth,async(req,res)=>{

    console.log(req.params.id); //post id
    var postId=req.params.id; 
    token=req.user._id
    try
    {
        userInfo=await user.findById(req.user._id)
    }
    catch(error) //error with finding (invalid id)
    {
         return res.sendStatus(400);
    }

    if(!userInfo) //the id of the user is not found
    {
        return res.sendStatus(400);
        
    }
    
    //checking if the tweet we want to retweet exists:
    try
    {
        var tweetFound=await tweet.find({_id:postId});
    }
    catch(error) //invalid tweet
    {
        return res.sendStatus(400);
    }
    if(tweetFound.length==0){ //tweet not found
        return res.sendStatus(400)
    }    
    

    //Checking if the retweet already exists
    found=await tweet.find({retweetInfo:postId,postedBy:token}).select("_id") 
    .catch(error => {
        console.log(error);
        return res.sendStatus(400);
    })


    if(found.length==0) //couldn't find the retweet, therefore create it.
        {
            //create a new retweet 
            //A retweet has no content.
            const userTweet= new tweet({
                postedBy: token,
                retweetInfo: postId,
            });
    
            userTweet.save(async function(err,theRetweet){
            if(err)
                return res.sendStatus(400)
            
            
            //add to retweets in users table
            await user.findByIdAndUpdate(token,{$addToSet:{tweets: theRetweet.id}},{new:true})
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })
            //add to retweeters of the post in table tweets
            await tweet.findByIdAndUpdate(postId,{$addToSet:{retweeters: token}},{new:true})
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })
        });
        }

        //there is a retweet, therefore unretweet.
        else 
        {
            //remove the retweet from tweets
            RetweetID=await tweet.findByIdAndDelete(found)
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })
            
            
            //remove from retweets in users table
            await user.findByIdAndUpdate(token,{$pull:{tweets: RetweetID._id}},{new:true})
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })
            //remove from retweeters in tweets table
            await tweet.findByIdAndUpdate(postId,{$pull:{retweeters: token}},{new:true})
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })

        }

        return res.sendStatus(200)

})



module.exports =router;
