const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../User/userSchema');
const tweet=require('./tweetsSchema'); //returns the model 

// const { redirect } = require("express/lib/response");
// const express = require('express');
// const app=express();
// app.use(bodyParser.urlencoded({extended: false}));


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

const upload=multer(objectMulter).array('im',4);



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

    upload(req,res,async function(err){
    if(err){
            console.log("here")
            res.sendStatus(400);
            
        }
    
    else
    {
        console.log("awel 7aga")

    let token = req.headers["authorization"]
    token = token.split(" ")[1];
    console.log(token)
    // token="623ed35374a406aca722ac9b"
 
     mediaTemp=[]
     contentTemp=""
     replyTemp=undefined
     console.log("iam here");
        
     
     if(req.body.tweetContent!="")
     {
         contentTemp=req.body.tweetContent
     }
 
 
     if(!req.files)
     {
         console.log("no img")
     }
     else{
         m=req.files
         for(i=0;i<m.length;i++)
          {
                 mediaTemp.push(req.files[i].path)
          }
     }

     //if the tweet is a reply to another tweet
     if(req.body.replyId!="") 
     {
        replyTemp = req.body.replyId
     }
               
             
 
     if(contentTemp!="" || mediaTemp!="")
     {  

            const userTweet= new tweet({
             content: req.body.tweetContent,
             postedBy: token,
             likes: token,
             retweeters:  token,
             retweetInfo:  token,
             media: mediaTemp,
             replyTo:replyTemp
            });

 
             userTweet.save(async function(err,theTweet){
             if(err)
             {
                 res.sendStatus(400);
             }
             else
             {
                
                 if(replyTemp==undefined)
                 {
                    await user.findByIdAndUpdate(token,{$addToSet:{tweets: theTweet.id}},{new:true})
                    .catch(error => {
                    console.log(error);
                    return res.sendStatus(400);
                    })  
                 }
                 else{
                   //add to user the reply
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
 router.delete("/:id", function(req, res){
     tweet.findByIdAndDelete(req.params.id)
     .then(() => res.sendStatus(202))
     .catch(function(error){
            res.sendStatus(400);
     })
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
    var found=await tweet.find({retweetInfo:postId,postedBy:token},{_id:1})
    .catch(error => {
        console.log(error);
        return res.sendStatus(400);
    })
    console.log(found)
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
            });
        
            //add to retweets in users table
            await user.findByIdAndUpdate(token,{$addToSet:{retweets: theRetweet.id}},{new:true})
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
        }
        else 
        {
            console.log("sfrs")
            //remove the retweet from tweets
            await tweet.findByIdAndDelete(found)
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })
            
            //remove from retweets in users table
            await user.findByIdAndUpdate(token,{$pull:{retweets: found}},{new:true})
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



module.exports =router;
