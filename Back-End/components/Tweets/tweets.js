const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../User/userSchema');
const tweet=require('./tweetsSchema'); //returns the model 

const http = require('https'); // or 'https' for https:// URLs
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



router.post("/", async function(req,res){

    //A tweet can have content or images or gifs, but it can not be empty 
    //A tweet can have maximum 4 images/4 gifs.
    //number of characters in a tweet is maximum: 
    //same goes for a reply


    //If there is an error with uploading the images, send a 400 status
    //an error is not the same as not uploading images
    upload(req,res,async function(err){
    if(err)
            return res.sendStatus(400)
        
    else{

    // Token passed in the header     
    let token = req.headers["authorization"]
    token = token.split(" ")[1];
    console.log(token)
 
    
    //initialising images,gifs,content,reply as empty
     mediaTemp=[]
     contentTemp=""
     replyTemp=undefined
     gifTemp=[]
        
     
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

     //if the tweet has gifs:
     if(req.body.gifs.length!=0)
     {
         console.log(req.body.gifs.length)
         console.log("here")
         m=req.body.gifs
         //more than 4 gifs belong to the tweet
         if(m.length>4)
            return res.sendStatus(400)

         for(i=0;i<m.length;i++)  
         {
             s=Date.now()+".gif"
             const file = fs.createWriteStream("./gifs/"+s);
 
             const request = http.get(m[i], function(response) {
             response.pipe(file);
             });
             gifTemp.push("gifs/"+s)
        }
    }

     //if the tweet is a reply to another tweet
     if(req.body.replyId!="") 
     {
        replyTemp = req.body.replyId
     }
               
             
    //The tweet/reply has to have at least one of these to be valid
     if(contentTemp!="" || mediaTemp!="" || gifTemp!="")
     {  

            const userTweet= new tweet({
             content: req.body.content,
             postedBy: token,
             likes: token,
             retweeters:  token,
             retweetInfo:  token,
             media: mediaTemp,
             replyTo:replyTemp,
             gifs:gifTemp
            });

             console.log("new tweet")
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
 
 
 //Deleting a tweet:
 router.delete("/:id", async function(req, res){

    //delete the images/gifs still not done

    try
    {
        deletedTweet=await tweet.findByIdAndDelete(req.params.id)
    }
    catch(error) 
    {
         return res.sendStatus(400);
    }

    if(!deletedTweet)
    {
        return res.sendStatus(400);
    }
    else
    {
        return res.sendStatus(200);
    }
     
 })




//Liking and unliking posts:
//put not post(tell nouran)
router.put("/:id/like",async(req,res)=>{
    console.log("aywa")
    console.log(req.params.id); //post id
    var postId=req.params.id;
    let token = req.headers["authorization"]
    token = token.split(" ")[1];
    console.log(token)
    
    //checking if this tweet exists:
    var tweetFound=await tweet.find({_id:postId});
    if(tweetFound.length==0){
        return res.sendStatus(404)
    }

    var foundLike= await user.find({_id:token,likes:{ $all:[postId]}},{new:true})

    if(foundLike.length!=0){

        await user.findByIdAndUpdate(token,{$pull:{likes: postId}},{new:true})
        await tweet.findByIdAndUpdate(postId,{$pull:{likes: token}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

    }
    else{
        await user.findByIdAndUpdate(token,{$addToSet:{likes: postId}},{new:true})
        await tweet.findByIdAndUpdate(postId,{$addToSet: {likes: token}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

    }
        return res.sendStatus(200);

})

//Retweeting and unretweeting:
router.put("/:id/retweet",async(req,res)=>{

    console.log(req.params.id); //post id
    var postId=req.params.id; 
    let token = req.headers["authorization"]
    token = token.split(" ")[1];
    console.log(token)
    
    //checking if the tweet we want to retweet exists:
    var tweetFound=await tweet.find({_id:postId});
    if(tweetFound.length==0){
        return res.sendStatus(404)
    }
    

    //problem is en ma3nash id el retweeted tweet ele hia hatkonn el generated tweet law fe3lan howa msh 3amel retweet:
    //checking law fe retweet 3al post ele bel id el ma3ana(haykoon fe info ek retweet data)
    console.log("refrefr")
    found=await tweet.find({retweetInfo:postId,postedBy:token}).select("_id") 


    if(found.length==0) //couldn't find the retweet, therefore create it.
        {
            //create a tweet in table tweets di hatkoon el retweet
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
        else 
        {
            // console.log(found[_id])
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

        res.sendStatus(200)

})

//reply has to have content/image
//reply to one tweet?
//added fields in userschema
//post or put
//populate
//token
//count of likes
//api documentation
//character count when posting tweets
//deleting check law not found
//pagenation
//breaks connection if id not valid
//catch try errors
//https or http?

//gifs
//QUOTE RETWEET!
//NOTE:
//when deleting a tweet delete also the images that were part of it from file uploads :O
//will I need the gif/image stored in a file?


module.exports =router;
